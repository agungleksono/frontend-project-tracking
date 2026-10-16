<script setup lang="ts">
defineProps<{ eyebrow?: string; title: string; description?: string }>()
</script>

<template>
  <div class="page-header">
    <div>
      <p v-if="eyebrow" class="page-header__eyebrow">{{ eyebrow }}</p>
      <h1>{{ title }}</h1>
      <p v-if="description" class="page-header__description">{{ description }}</p>
    </div>
    <div class="page-header__actions"><slot /></div>
  </div>
</template>

<style scoped>
.page-header { display: flex; align-items: flex-end; justify-content: space-between; gap: 24px; margin-bottom: 20px; }
.page-header__eyebrow { margin: 0 0 5px; color: #0878f9; font-size: 10px; font-weight: 800; letter-spacing: .12em; text-transform: uppercase; }
h1 { margin: 0; color: #07175f; font-size: clamp(26px, 3vw, 34px); font-weight: 750; line-height: 1.1; letter-spacing: -.035em; }
.page-header__description { max-width: 650px; margin: 6px 0 0; color: #4f63a0; font-size: 13px; line-height: 1.5; }
.page-header__actions { flex-shrink: 0; }
@media (max-width: 700px) { .page-header { align-items: stretch; flex-direction: column; } .page-header__actions :deep(.v-btn) { width: 100%; } }
</style>
