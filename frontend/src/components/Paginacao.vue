<script setup>
import { computed } from 'vue'
import Icone from './Icone.vue'

// A API não pagina, então a paginação é feita aqui no front-end.
const props = defineProps({
  pagina: { type: Number, required: true },
  total: { type: Number, required: true },
  porPagina: { type: Number, default: 12 },
})
const emit = defineEmits(['update:pagina'])

const totalPaginas = computed(() => Math.max(1, Math.ceil(props.total / props.porPagina)))
const inicio = computed(() => (props.total ? (props.pagina - 1) * props.porPagina + 1 : 0))
const fim = computed(() => Math.min(props.pagina * props.porPagina, props.total))

// Mostra no máximo 5 números de página ao redor da atual.
const paginas = computed(() => {
  const n = totalPaginas.value
  let de = Math.max(1, props.pagina - 2)
  const ate = Math.min(n, de + 4)
  de = Math.max(1, ate - 4)
  return Array.from({ length: ate - de + 1 }, (_, i) => de + i)
})

const ir = (p) => emit('update:pagina', Math.min(Math.max(1, p), totalPaginas.value))
</script>

<template>
  <nav v-if="total > 0" class="paginacao" aria-label="Paginação">
    <span class="contagem">{{ inicio }}–{{ fim }} de {{ total }}</span>
    <div class="acoes">
      <button class="botao icone pequeno" :disabled="pagina <= 1" aria-label="Página anterior" @click="ir(pagina - 1)">
        <Icone nome="esquerda" :tamanho="16" />
      </button>
      <button
        v-for="p in paginas"
        :key="p"
        class="botao pequeno"
        :class="{ primario: p === pagina }"
        :aria-current="p === pagina ? 'page' : undefined"
        @click="ir(p)"
      >
        {{ p }}
      </button>
      <button
        class="botao icone pequeno"
        :disabled="pagina >= totalPaginas"
        aria-label="Próxima página"
        @click="ir(pagina + 1)"
      >
        <Icone nome="direita" :tamanho="16" />
      </button>
    </div>
  </nav>
</template>

<style scoped>
.paginacao {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 10px;
  padding: 12px 16px;
  border-top: 1px solid var(--border);
}
.acoes {
  gap: 4px;
}
.botao.pequeno:not(.icone) {
  min-width: 32px;
  padding: 4px 8px;
}
</style>
