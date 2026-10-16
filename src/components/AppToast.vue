<script setup lang="ts">
import { useToast } from '@/composables/useToast'

const { visible, message, type, hideToast } = useToast()
</script>

<template>
  <Transition name="toast">
    <div v-if="visible" class="app-toast" :class="`app-toast--${type}`" role="status" aria-live="polite">
      <v-icon :icon="type === 'success' ? 'mdi-check-circle' : 'mdi-alert-circle'" size="20" />
      <span>{{ message }}</span>
      <button type="button" aria-label="Close notification" @click="hideToast">
        <v-icon icon="mdi-close" size="18" />
      </button>
    </div>
  </Transition>
</template>

<style scoped>
.app-toast { position: fixed; z-index: 3000; right: 28px; bottom: 28px; display: flex; align-items: center; gap: 12px; min-width: 300px; max-width: 440px; padding: 16px 18px; color: white; border-radius: 14px; box-shadow: 0 16px 40px rgba(20, 33, 30, .22); }
.app-toast--success { background: #226847; }
.app-toast--error { background: #a7352d; }
.app-toast span { flex: 1; font-size: 14px; font-weight: 600; }
.app-toast button { display: grid; place-items: center; color: inherit; border: 0; background: transparent; cursor: pointer; }
.toast-enter-active, .toast-leave-active { transition: opacity .22s ease, transform .22s ease; }
.toast-enter-from, .toast-leave-to { opacity: 0; transform: translateY(12px); }
@media (max-width: 600px) { .app-toast { right: 16px; bottom: 16px; left: 16px; min-width: 0; } }
</style>
