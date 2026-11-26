// Valores fixos definidos no backend (core/models.py).

export const STATUS = [
  { valor: '0', rotulo: 'Em Elaboração', classe: 'elab', descricao: 'O aluno ainda está escrevendo o trabalho.' },
  { valor: '1', rotulo: 'Enviado', classe: 'enviado', descricao: 'Entregue e aguardando avaliação da banca.' },
  { valor: '2', rotulo: 'Aprovado', classe: 'aprovado', descricao: 'A banca aprovou o trabalho.' },
  { valor: '3', rotulo: 'Reprovado', classe: 'reprovado', descricao: 'A banca reprovou o trabalho.' },
]

export const TIPOS = [
  { valor: 'MONOGRAFIA', rotulo: 'Monografia' },
  { valor: 'RELATORIO_ESTAGIO', rotulo: 'Relatório de Estágio' },
  { valor: 'RELATORIO_TECNICO', rotulo: 'Relatório Técnico' },
  { valor: 'ARTIGO', rotulo: 'Artigo' },
]

export const IDIOMAS = [
  { valor: 'PT', rotulo: 'Português' },
  { valor: 'EN', rotulo: 'Inglês' },
]

export const SEMESTRES = (() => {
  const lista = []
  for (let ano = 2020; ano <= 2026; ano++) {
    lista.push(`${ano}/1`)
    if (ano < 2026) lista.push(`${ano}/2`)
  }
  return lista
})()

export const statusPorValor = (v) => STATUS.find((s) => s.valor === String(v))
export const statusPorRotulo = (r) => STATUS.find((s) => s.rotulo === r)
export const rotuloTipo = (v) => TIPOS.find((t) => t.valor === v)?.rotulo ?? v
export const rotuloIdioma = (v) => IDIOMAS.find((i) => i.valor === v)?.rotulo ?? v

/** Tamanho máximo aceito para o PDF no front-end. */
export const TAMANHO_MAX_PDF = 20 * 1024 * 1024
