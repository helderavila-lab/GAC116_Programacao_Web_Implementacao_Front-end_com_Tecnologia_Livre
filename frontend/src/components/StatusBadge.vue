<script setup>
import { computed } from 'vue'
import { statusPorValor } from '../config/constantes'

const props = defineProps({ status: { type: [String, Number], required: true } })
const info = computed(() => statusPorValor(props.status))
</script>

<template>
  <span class="status" :class="info?.classe" :title="info?.descricao">{{ info?.rotulo ?? status }}</span>
</template>
