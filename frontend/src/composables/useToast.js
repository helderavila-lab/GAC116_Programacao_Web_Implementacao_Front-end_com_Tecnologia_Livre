import { ref } from 'vue'

// Notificações flutuantes ("toasts") compartilhadas por toda a aplicação.
const toasts = ref([])
let proximoId = 0

function fechar(id) {
  toasts.value = toasts.value.filter((t) => t.id !== id)
}

function mostrar(mensagem, tipo = 'sucesso', duracao = 3500) {
  const id = ++proximoId
  toasts.value.push({ id, mensagem, tipo })
  setTimeout(() => fechar(id), duracao)
}

export function useToast() {
  return {
    toasts,
    fechar,
    sucesso: (m) => mostrar(m, 'sucesso'),
    info: (m) => mostrar(m, 'info'),
    erro: (m) => mostrar(m, 'erro', 6000),
  }
}
