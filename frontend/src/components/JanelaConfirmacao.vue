<script setup>
import JanelaModal from './JanelaModal.vue'
import Icone from './Icone.vue'
import { useConfirmacao } from '../composables/useConfirmacao'

const { estado, responder } = useConfirmacao()
</script>

<template>
  <JanelaModal v-if="estado.aberto" sem-cabecalho largura="440px" @fechar="responder(false)">
    <div class="corpo">
      <div class="icone" :class="{ perigo: estado.perigo }">
        <Icone :nome="estado.perigo ? 'alerta' : 'info'" :tamanho="22" />
      </div>
      <div>
        <h2>{{ estado.titulo }}</h2>
        <p v-if="estado.mensagem">{{ estado.mensagem }}</p>
      </div>
    </div>
    <footer>
      <button class="botao" @click="responder(false)">Cancelar</button>
      <button
        class="botao"
        :class="estado.perigo ? 'perigo' : 'primario'"
        autofocus
        @click="responder(true)"
      >
        {{ estado.textoConfirmar }}
      </button>
    </footer>
  </JanelaModal>
</template>

<style scoped>
.corpo {
  display: flex;
  gap: 14px;
  padding: 22px 22px 8px;
}
.icone {
  flex: none;
  width: 42px;
  height: 42px;
  border-radius: 50%;
  display: grid;
  place-items: center;
  background: var(--primary-soft);
  color: var(--primary);
}
.icone.perigo {
  background: var(--danger-soft);
  color: var(--danger);
}
h2 {
  font-size: 1.1rem;
  margin-top: 8px;
}
p {
  color: var(--text-soft);
  margin: 6px 0 0;
}
footer {
  display: flex;
  justify-content: flex-end;
  gap: 8px;
  padding: 16px 22px 20px;
}
</style>
