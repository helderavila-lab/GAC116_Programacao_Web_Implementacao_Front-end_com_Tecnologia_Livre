<script setup>
import { onBeforeUnmount, onMounted } from 'vue'
import Icone from './Icone.vue'

// Janela modal genérica: fecha com Esc ou clicando fora.
const props = defineProps({
  titulo: { type: String, default: '' },
  largura: { type: String, default: '520px' },
  semCabecalho: Boolean,
})
const emit = defineEmits(['fechar'])

function tecla(e) {
  if (e.key === 'Escape') emit('fechar')
}
onMounted(() => {
  document.addEventListener('keydown', tecla)
  document.body.style.overflow = 'hidden'
})
onBeforeUnmount(() => {
  document.removeEventListener('keydown', tecla)
  document.body.style.overflow = ''
})
</script>

<template>
  <Teleport to="body">
    <div class="fundo" @mousedown.self="emit('fechar')">
      <div class="janela" role="dialog" aria-modal="true" :aria-label="titulo" :style="{ maxWidth: props.largura }">
        <header v-if="!semCabecalho" class="topo">
          <h2>{{ titulo }}</h2>
          <slot name="acoes" />
          <button class="botao fantasma icone" aria-label="Fechar" @click="emit('fechar')">
            <Icone nome="fechar" />
          </button>
        </header>
        <slot />
      </div>
    </div>
  </Teleport>
</template>

<style scoped>
.fundo {
  position: fixed;
  inset: 0;
  z-index: 100;
  background: rgb(10 18 14 / 55%);
  backdrop-filter: blur(2px);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 16px;
  animation: aparecer 0.15s ease;
}
.janela {
  width: 100%;
  max-height: calc(100vh - 32px);
  display: flex;
  flex-direction: column;
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  box-shadow: var(--shadow-lg);
  overflow: hidden;
  animation: subir 0.18s ease;
}
.topo {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 14px 16px 14px 20px;
  border-bottom: 1px solid var(--border);
}
.topo h2 {
  flex: 1;
  font-size: 1.05rem;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
@keyframes aparecer {
  from {
    opacity: 0;
  }
}
@keyframes subir {
  from {
    transform: translateY(8px) scale(0.99);
    opacity: 0;
  }
}
</style>
