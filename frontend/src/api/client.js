import axios from 'axios'

// Endereço base da API. Pode ser trocado criando um arquivo .env.local com VITE_API_URL.
export const API_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000/api'

const http = axios.create({
  baseURL: API_URL,
  timeout: 20000,
})

export default http

/**
 * Converte um erro do axios/DRF em uma mensagem legível.
 * O DRF devolve erros de validação no formato { campo: ["mensagem"] }.
 */
export function mensagemErro(erro) {
  if (!erro?.response) {
    return `Não foi possível conectar à API (${API_URL}). Verifique se o backend está rodando.`
  }
  const dados = erro.response.data
  if (typeof dados === 'string') return `Erro ${erro.response.status} no servidor.`
  if (dados?.detail) return dados.detail
  if (dados && typeof dados === 'object') {
    const primeiro = Object.entries(dados)[0]
    if (primeiro) {
      const [campo, msgs] = primeiro
      return `${campo}: ${Array.isArray(msgs) ? msgs.join(' ') : msgs}`
    }
  }
  return `Erro ${erro.response.status} ao falar com a API.`
}

/** Devolve os erros de validação por campo ({ titulo: "…" }) ou null. */
export function errosPorCampo(erro) {
  const dados = erro?.response?.data
  if (erro?.response?.status !== 400 || !dados || typeof dados !== 'object') return null
  return Object.fromEntries(
    Object.entries(dados).map(([campo, msgs]) => [campo, Array.isArray(msgs) ? msgs.join(' ') : String(msgs)]),
  )
}
