import { computed, reactive } from 'vue'
import { alunosApi, cursosApi, departamentosApi, professoresApi, tccsApi, unidadesApi } from '../api/recursos'
import { mensagemErro } from '../api/client'

/*
 * "Catálogo": guarda em memória todos os dados da API, compartilhados entre as telas.
 *
 * Por que carregar tudo? A API devolve os TCCs só com IDs (aluno: 5, orientador: 3)
 * e não tem paginação. Mantendo as listas aqui conseguimos mostrar nomes, cruzar
 * dados (ex.: bancas de um professor) e filtrar sem fazer uma requisição por linha.
 */

const estado = reactive({
  carregando: false,
  carregado: false,
  erro: null,
  unidades: [],
  departamentos: [],
  cursos: [],
  alunos: [],
  professores: [],
  tccs: [],
})

const indexar = (lista) => new Map(lista.map((item) => [item.id, item]))

const indices = {
  unidades: computed(() => indexar(estado.unidades)),
  departamentos: computed(() => indexar(estado.departamentos)),
  cursos: computed(() => indexar(estado.cursos)),
  alunos: computed(() => indexar(estado.alunos)),
  professores: computed(() => indexar(estado.professores)),
  tccs: computed(() => indexar(estado.tccs)),
}

let promessa = null

/** Carrega tudo uma vez (chamadas repetidas reaproveitam a mesma requisição). */
function carregarTudo({ forcar = false } = {}) {
  if (promessa && !forcar) return promessa
  estado.carregando = true
  estado.erro = null
  promessa = Promise.all([
    unidadesApi.listar(),
    departamentosApi.listar(),
    cursosApi.listar(),
    alunosApi.listar(),
    professoresApi.listar(),
    tccsApi.listar(),
  ])
    .then(([unidades, departamentos, cursos, alunos, professores, tccs]) => {
      Object.assign(estado, { unidades, departamentos, cursos, alunos, professores, tccs, carregado: true })
    })
    .catch((erro) => {
      estado.erro = mensagemErro(erro)
      promessa = null // permite tentar de novo
    })
    .finally(() => {
      estado.carregando = false
    })
  return promessa
}

const buscar = (indice, id) => (id == null || id === '' ? undefined : indice.value.get(Number(id)))

const unidade = (id) => buscar(indices.unidades, id)
const departamento = (id) => buscar(indices.departamentos, id)
const curso = (id) => buscar(indices.cursos, id)
const aluno = (id) => buscar(indices.alunos, id)
const professor = (id) => buscar(indices.professores, id)
const tcc = (id) => buscar(indices.tccs, id)

const nomeAluno = (id) => aluno(id)?.nome ?? '—'
const nomeProfessor = (id) => professor(id)?.nome ?? '—'
const cursoDoAluno = (id) => curso(aluno(id)?.curso)
const departamentoDoProfessor = (id) => departamento(professor(id)?.departamento)
const unidadeDoDepartamento = (id) => unidade(departamento(id)?.unidade_academica)

const tccsDoAluno = (id) => estado.tccs.filter((t) => t.aluno === Number(id))

/** Atualiza (ou adiciona) um TCC na memória depois de salvar na API. */
function salvarTccLocal(novo) {
  const i = estado.tccs.findIndex((t) => t.id === novo.id)
  if (i >= 0) estado.tccs.splice(i, 1, novo)
  else estado.tccs.push(novo)
}

function removerTccLocal(id) {
  const i = estado.tccs.findIndex((t) => t.id === id)
  if (i >= 0) estado.tccs.splice(i, 1)
}

const catalogo = {
  estado,
  carregarTudo,
  unidade,
  departamento,
  curso,
  aluno,
  professor,
  tcc,
  nomeAluno,
  nomeProfessor,
  cursoDoAluno,
  departamentoDoProfessor,
  unidadeDoDepartamento,
  tccsDoAluno,
  salvarTccLocal,
  removerTccLocal,
}

export function useCatalogo() {
  return catalogo
}
