import { ref, watch } from 'vue'

// Tema claro/escuro. O index.html já aplica o tema salvo antes do Vue iniciar.
const tema = ref(document.documentElement.dataset.tema === 'escuro' ? 'escuro' : 'claro')

watch(tema, (valor) => {
  document.documentElement.dataset.tema = valor
  try {
    localStorage.setItem('tema', valor)
  } catch {
    // navegação privada pode bloquear o localStorage; o tema só não fica salvo
  }
})

export function useTema() {
  return {
    tema,
    alternar: () => (tema.value = tema.value === 'escuro' ? 'claro' : 'escuro'),
  }
}
