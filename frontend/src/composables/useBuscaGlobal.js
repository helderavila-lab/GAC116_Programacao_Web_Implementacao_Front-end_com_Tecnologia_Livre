import { ref } from 'vue'

// Controla a janela de busca global (atalho Ctrl+K).
const aberta = ref(false)

export function useBuscaGlobal() {
  return {
    aberta,
    abrir: () => (aberta.value = true),
    fechar: () => (aberta.value = false),
  }
}
