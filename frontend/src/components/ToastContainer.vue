<script setup>
import Icone from './Icone.vue'
import { useToast } from '../composables/useToast'

const { toasts, fechar } = useToast()
const icones = { sucesso: 'check', erro: 'alerta', info: 'info' }
</script>

<template>
  <div class="toasts" aria-live="polite">
    <TransitionGroup name="toast">
      <div v-for="t in toasts" :key="t.id" class="toast" :class="t.tipo" role="status">
        <Icone :nome="icones[t.tipo]" />
        <span>{{ t.mensagem }}</span>
        <button class="fechar" aria-label="Fechar aviso" @click="fechar(t.id)">
          <Icone nome="fechar" :tamanho="14" />
        </button>
      </div>
    </TransitionGroup>
  </div>
</template>

<style scoped>
.toasts {
  position: fixed;
  right: 20px;
  bottom: 20px;
  z-index: 200;
  display: flex;
  flex-direction: column;
  gap: 8px;
  max-width: min(400px, calc(100vw - 32px));
}
.toast {
  display: flex;
  align-items: flex-start;
  gap: 10px;
  padding: 12px 14px;
  border-radius: var(--radius-sm);
  background: var(--surface);
  border: 1px solid var(--border);
  border-left: 4px solid var(--primary);
  box-shadow: var(--shadow);
  font-size: 0.9rem;
}
.toast svg {
  flex: none;
  margin-top: 2px;
}
.toast span {
  flex: 1;
}
.toast.sucesso svg {
  color: var(--st-aprovado);
}
.toast.erro {
  border-left-color: var(--danger);
}
.toast.erro svg {
  color: var(--danger);
}
.toast.info {
  border-left-color: var(--st-enviado);
}
.fechar {
  border: 0;
  background: none;
  cursor: pointer;
  color: var(--text-faint);
  padding: 2px;
}
.toast-enter-active,
.toast-leave-active {
  transition: all 0.2s ease;
}
.toast-enter-from,
.toast-leave-to {
  opacity: 0;
  transform: translateX(24px);
}
@media (max-width: 760px) {
  .toasts {
    left: 16px;
    right: 16px;
    bottom: 16px;
    max-width: none;
  }
}
</style>
