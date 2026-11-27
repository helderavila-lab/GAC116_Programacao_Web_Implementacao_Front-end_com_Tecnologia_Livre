<script setup>
// "Esqueleto" mostrado enquanto os dados chegam da API.
defineProps({ linhas: { type: Number, default: 6 } })
</script>

<template>
  <div class="bloco" aria-busy="true" aria-label="Carregando">
    <div v-for="i in linhas" :key="i" class="linha">
      <div class="esqueleto" :style="{ width: 30 + ((i * 37) % 45) + '%' }"></div>
      <div class="esqueleto curta"></div>
    </div>
  </div>
</template>

<style scoped>
.bloco {
  padding: 8px 16px;
}
.linha {
  display: flex;
  justify-content: space-between;
  gap: 16px;
  padding: 14px 0;
  border-bottom: 1px solid var(--border);
}
.linha:last-child {
  border-bottom: 0;
}
.esqueleto {
  height: 14px;
}
.curta {
  width: 90px;
}
</style>
