<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import PageHeader from '@/components/PageHeader.vue'
import StatusChip from '@/components/StatusChip.vue'
import { getCases } from '@/services/cases'
import { CASE_STATUSES, type CaseStatus, type TrademarkCase } from '@/types/case'

const router = useRouter()
const cases = ref<TrademarkCase[]>([])
const trademark = ref('')
const status = ref<CaseStatus | null>(null)
const loading = ref(false)
const error = ref('')

async function loadCases() {
  loading.value = true
  error.value = ''
  try {
    cases.value = await getCases({ trademark: trademark.value, status: status.value })
  } catch (caught) {
    error.value = caught instanceof Error ? caught.message : 'Unable to load cases.'
  } finally {
    loading.value = false
  }
}

function clearFilters() {
  trademark.value = ''
  status.value = null
  loadCases()
}

function openCase(ourRef: string) {
  router.push({ name: 'case-detail', params: { ourRef } })
}

onMounted(loadCases)
</script>

<template>
  <PageHeader
    eyebrow="Trademark portfolio"
    title="Case Register"
    description="Track every trademark project from initial instruction through certificate issuance."
  >
    <v-btn color="primary" size="large" prepend-icon="mdi-plus" to="/cases/new">New Case</v-btn>
  </PageHeader>

  <v-card class="surface-card search-card">
    <div class="search-card__heading">
      <div class="search-icon"><v-icon icon="mdi-tune-variant" size="20" /></div>
      <div><h2>Advance Search</h2><p>Refine the register using one or more criteria.</p></div>
    </div>
    <v-form @submit.prevent="loadCases">
      <div class="search-grid">
        <div>
          <label class="field-label" for="trademark-filter">Trademark</label>
          <v-text-field id="trademark-filter" v-model="trademark" placeholder="Enter trademark name" hide-details clearable @keyup.enter="loadCases" />
        </div>
        <div>
          <label class="field-label" for="status-filter">Status</label>
          <v-select id="status-filter" v-model="status" :items="CASE_STATUSES" placeholder="All statuses" hide-details clearable />
        </div>
        <div class="search-actions">
          <v-btn variant="text" color="primary" @click="clearFilters">Clear</v-btn>
          <v-btn type="submit" color="primary" prepend-icon="mdi-magnify" :loading="loading">Search</v-btn>
        </div>
      </div>
    </v-form>
  </v-card>

  <div v-if="error" class="error-banner"><v-icon icon="mdi-alert-circle-outline" />{{ error }}</div>

  <v-card class="surface-card register-card">
    <div class="register-card__header">
      <div><h2>Trademark Cases</h2><p>{{ loading ? 'Loading cases…' : `${cases.length} ${cases.length === 1 ? 'case' : 'cases'} found` }}</p></div>
      <v-btn icon="mdi-refresh" variant="text" color="primary" aria-label="Refresh cases" :loading="loading" @click="loadCases" />
    </div>
    <div class="table-wrap">
      <v-table class="case-table">
        <thead><tr><th>Our Ref</th><th>Trademark</th><th>Applicant</th><th>Status</th><th>Client Ref</th></tr></thead>
        <tbody>
          <tr v-if="loading && !cases.length" v-for="row in 4" :key="row" class="skeleton-row">
            <td v-for="cell in 5" :key="cell"><span /></td>
          </tr>
          <tr v-else-if="!cases.length"><td colspan="5"><div class="empty-state"><v-icon icon="mdi-folder-search-outline" size="42" /><h3>No cases found</h3><p>Try adjusting your search criteria or create a new case.</p></div></td></tr>
          <tr v-for="item in cases" :key="item.our_ref">
            <td><button class="case-link" type="button" @click="openCase(item.our_ref)">{{ item.our_ref }}<v-icon icon="mdi-arrow-top-right" size="14" /></button></td>
            <td class="strong-cell">{{ item.trademark || '—' }}</td>
            <td>{{ item.applicant || '—' }}</td>
            <td><StatusChip :status="item.status" /></td>
            <td>{{ item.client_ref || '—' }}</td>
          </tr>
        </tbody>
      </v-table>
    </div>
  </v-card>
</template>

<style scoped>
.search-card { margin-bottom: 14px; padding: 18px 20px 20px; }
.search-card__heading { display: flex; align-items: center; gap: 13px; margin-bottom: 22px; }
.search-icon { display: grid; width: 38px; height: 38px; place-items: center; color: #0878f9; border-radius: 8px; background: #e8f3ff; }
h2, h3, p { margin: 0; }
h2 { color: #07175f; font-size: 16px; }
.search-card__heading p, .register-card__header p { margin-top: 3px; color: #7181ae; font-size: 11px; }
.search-grid { display: grid; grid-template-columns: 1.2fr 1fr auto; align-items: end; gap: 18px; }
.search-actions { display: flex; gap: 8px; padding-bottom: 1px; }
.register-card { overflow: hidden; }
.register-card__header { display: flex; align-items: center; justify-content: space-between; padding: 17px 20px 14px; border-bottom: 1px solid #e6eef8; }
.table-wrap { overflow-x: auto; }
.case-table { min-width: 840px; }
.case-table th { height: 42px !important; color: #6074ac !important; background: #f2f7fd; font-size: 10px !important; font-weight: 800 !important; letter-spacing: .07em; text-transform: uppercase; }
.case-table td { height: 58px !important; color: #42558e; border-color: #e8eff8 !important; font-size: 12px; }
.case-table tbody tr:hover { background: #f7fbff; }
.strong-cell { color: #07175f !important; font-weight: 700; }
.case-link { display: inline-flex; align-items: center; gap: 4px; padding: 0; color: #0878f9; border: 0; background: none; font: inherit; font-weight: 750; cursor: pointer; }
.case-link:hover { text-decoration: underline; }
.empty-state h3 { margin-top: 12px; color: #12266d; }
.empty-state p { margin-top: 5px; font-size: 13px; }
.skeleton-row span { display: block; width: 75%; height: 12px; border-radius: 6px; background: linear-gradient(90deg,#eef1f0 25%,#f7f8f8 50%,#eef1f0 75%); background-size: 200% 100%; animation: shimmer 1.4s infinite; }
@keyframes shimmer { to { background-position: -200% 0; } }
@media (max-width: 800px) { .search-grid { grid-template-columns: 1fr; } .search-actions { justify-content: flex-end; } }
</style>
