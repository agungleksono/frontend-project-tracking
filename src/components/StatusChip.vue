<script setup lang="ts">
import type { CaseStatus } from '@/types/case'

defineProps<{ status: CaseStatus }>()

const colors: Record<CaseStatus, string> = {
  'New Instruction': 'slate',
  'Application Filed': 'blue',
  Publication: 'amber',
  Substantive: 'violet',
  Certificate: 'green',
}
</script>

<template>
  <span class="status-chip" :class="`status-chip--${colors[status]}`">
    <span class="status-chip__dot" />{{ status }}
  </span>
</template>

<style scoped>
.status-chip { display: inline-flex; align-items: center; gap: 7px; white-space: nowrap; padding: 5px 10px; border-radius: 999px; font-size: 12px; font-weight: 700; line-height: 1.2; }
.status-chip__dot { width: 6px; height: 6px; border-radius: 50%; background: currentColor; }
.status-chip--slate { color: #4f5c5a; background: #edf0ef; }
.status-chip--blue { color: #205b91; background: #e8f2fb; }
.status-chip--amber { color: #8a5a17; background: #fff1d8; }
.status-chip--violet { color: #6547a8; background: #f0ebfb; }
.status-chip--green { color: #24724b; background: #e5f4eb; }
</style>
