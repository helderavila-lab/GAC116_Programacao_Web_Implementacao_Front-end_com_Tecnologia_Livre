/** Remove acentos e deixa minúsculo: "Elaboração" -> "elaboracao". */
export const normalizar = (s) =>
  String(s ?? '')
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .trim()

/** Busca sem diferenciar acentos nem maiúsculas. */
export const contem = (alvo, termo) => normalizar(alvo).includes(normalizar(termo))

/** Espera o usuário parar de digitar antes de executar `fn`. */
export function debounce(fn, ms = 300) {
  let timer
  return (...args) => {
    clearTimeout(timer)
    timer = setTimeout(() => fn(...args), ms)
  }
}

export function formatarBytes(bytes) {
  if (!bytes) return '0 B'
  const unidades = ['B', 'KB', 'MB', 'GB']
  const i = Math.min(Math.floor(Math.log(bytes) / Math.log(1024)), unidades.length - 1)
  return `${(bytes / 1024 ** i).toFixed(i ? 1 : 0)} ${unidades[i]}`
}

export const porcentagem = (parte, total) => (total ? Math.round((parte / total) * 100) : 0)

/** Nome do arquivo a partir da URL (".../media/tccs/meu_tcc.pdf" -> "meu_tcc.pdf"). */
export const nomeDoArquivo = (url) => decodeURIComponent(String(url ?? '').split('/').pop() || 'arquivo.pdf')

/** Gera e baixa um CSV (separado por ";" para abrir certo no Excel em português). */
export function baixarCsv(nome, cabecalho, linhas) {
  const escapar = (c) => `"${String(c ?? '').replace(/"/g, '""')}"`
  const csv = [cabecalho, ...linhas].map((l) => l.map(escapar).join(';')).join('\r\n')
  const blob = new Blob(['﻿' + csv], { type: 'text/csv;charset=utf-8' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = nome
  a.click()
  URL.revokeObjectURL(url)
}
