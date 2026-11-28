import { reactive } from 'vue'

/*
 * Janela de confirmação que funciona como uma Promise:
 *   if (await confirmar({ titulo: 'Excluir?' })) { ... }
 * O componente <JanelaConfirmacao> (em App.vue) desenha a janela.
 */
const estado = reactive({
  aberto: false,
  titulo: '',
  mensagem: '',
  textoConfirmar: 'Confirmar',
  perigo: false,
  resolver: null,
})

function confirmar(opcoes) {
  estado.resolver?.(false) // fecha uma confirmação anterior que tenha ficado aberta
  return new Promise((resolve) => {
    Object.assign(estado, {
      titulo: 'Tem certeza?',
      mensagem: '',
      textoConfirmar: 'Confirmar',
      perigo: false,
      ...opcoes,
      aberto: true,
      resolver: resolve,
    })
  })
}

function responder(valor) {
  estado.aberto = false
  estado.resolver?.(valor)
  estado.resolver = null
}

export function useConfirmacao() {
  return { estado, confirmar, responder }
}
