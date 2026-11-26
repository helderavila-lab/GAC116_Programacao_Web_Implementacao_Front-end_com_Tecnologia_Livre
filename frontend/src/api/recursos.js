import axios from 'axios'
import http from './client'

/** Cria as funções de CRUD padrão para um endpoint do DRF (ModelViewSet). */
function crud(rota) {
  return {
    listar: (params) => http.get(`/${rota}/`, { params }).then((r) => r.data),
    obter: (id) => http.get(`/${rota}/${id}/`).then((r) => r.data),
    criar: (dados) => http.post(`/${rota}/`, dados).then((r) => r.data),
    atualizar: (id, dados) => http.patch(`/${rota}/${id}/`, dados).then((r) => r.data),
    remover: (id) => http.delete(`/${rota}/${id}/`),
  }
}

export const unidadesApi = crud('unidades-academicas')
export const departamentosApi = crud('departamentos')
export const cursosApi = crud('cursos')
export const alunosApi = crud('alunos')
export const professoresApi = crud('professores')

export const tccsApi = {
  ...crud('tccs'),

  estatisticas: () => http.get('/tccs/estatisticas/').then((r) => r.data),

  /** Troca só o status (PATCH com JSON). */
  alterarStatus: (id, status) => http.patch(`/tccs/${id}/`, { status }).then((r) => r.data),

  /**
   * Cria (POST) ou edita (PATCH) um TCC usando multipart/form-data,
   * que é o formato exigido pelo backend para enviar o arquivo PDF.
   * `aoProgredir` recebe um número de 0 a 100 durante o upload.
   */
  salvar(dados, { id = null, arquivo = null, aoProgredir } = {}) {
    const form = new FormData()
    for (const [campo, valor] of Object.entries(dados)) {
      form.append(campo, valor ?? '') // '' vira null nos campos opcionais do DRF
    }
    if (arquivo) form.append('arquivo', arquivo)

    const config = {
      timeout: 0, // uploads grandes podem demorar
      onUploadProgress: (e) => {
        if (aoProgredir && e.total) aoProgredir(Math.round((e.loaded / e.total) * 100))
      },
    }
    const requisicao = id ? http.patch(`/tccs/${id}/`, form, config) : http.post('/tccs/', form, config)
    return requisicao.then((r) => r.data)
  },

  /** Envia apenas um novo PDF para um TCC já existente. */
  enviarArquivo(id, arquivo, aoProgredir) {
    return this.salvar({}, { id, arquivo, aoProgredir })
  },
}

/**
 * Baixa o PDF como "blob". O Django bloqueia a exibição direta em <iframe>
 * (X-Frame-Options), então baixamos o arquivo e mostramos uma cópia local.
 */
export function baixarPdf(url) {
  return axios.get(url, { responseType: 'blob', timeout: 0 }).then((r) => new Blob([r.data], { type: 'application/pdf' }))
}
