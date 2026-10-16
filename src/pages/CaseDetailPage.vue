<script setup lang="ts">
import { computed, onMounted, reactive, ref, watch } from 'vue'
import PageHeader from '@/components/PageHeader.vue'
import StatusChip from '@/components/StatusChip.vue'
import { useToast } from '@/composables/useToast'
import { getCase, updateCaseMilestones } from '@/services/cases'
import type { MilestonePayload, TrademarkCase } from '@/types/case'

const props = defineProps<{ ourRef: string }>()
const { showToast } = useToast()
const caseData = ref<TrademarkCase | null>(null)
const loading = ref(true)
const saving = ref(false)
const error = ref('')
const dates = reactive<Record<keyof MilestonePayload, string>>({ application_filed_date: '', publication_date: '', substantive_date: '', certificate_date: '' })

const milestones = computed(() => [
  { key: 'application_filed_date' as const, title: 'Application Filed', description: 'Application submitted to the trademark office.' },
  { key: 'publication_date' as const, title: 'Publication', description: 'Mark published for third-party review.' },
  { key: 'substantive_date' as const, title: 'Substantive', description: 'Substantive examination stage reached.' },
  { key: 'certificate_date' as const, title: 'Certificate', description: 'Registration certificate issued.' },
])

function syncDates(item: TrademarkCase) {
  for (const milestone of milestones.value) dates[milestone.key] = item[milestone.key] || ''
}

async function loadCase() {
  loading.value = true
  error.value = ''
  try {
    caseData.value = await getCase(props.ourRef)
    syncDates(caseData.value)
  } catch (caught) {
    error.value = caught instanceof Error ? caught.message : 'Unable to load this case.'
  } finally {
    loading.value = false
  }
}

async function saveMilestones() {
  if (!caseData.value) return
  saving.value = true
  error.value = ''
  try {
    const payload = Object.fromEntries(Object.entries(dates).map(([key, value]) => [key, value || null])) as MilestonePayload
    caseData.value = await updateCaseMilestones(caseData.value.our_ref, payload)
    syncDates(caseData.value)
    showToast('Milestone dates updated successfully.')
  } catch (caught) {
    error.value = caught instanceof Error ? caught.message : 'Unable to update milestone dates.'
    showToast(error.value, 'error')
  } finally {
    saving.value = false
  }
}

onMounted(loadCase)
watch(() => props.ourRef, loadCase)
</script>

<template>
  <div v-if="loading" class="detail-loading"><v-progress-circular indeterminate color="primary" /><span>Loading case details…</span></div>
  <template v-else-if="caseData">
    <PageHeader eyebrow="Case details" :title="caseData.trademark" :description="caseData.our_ref">
      <v-btn variant="outlined" color="primary" prepend-icon="mdi-arrow-left" to="/cases">Back to Register</v-btn>
    </PageHeader>
    <div v-if="error" class="error-banner"><v-icon icon="mdi-alert-circle-outline" />{{ error }}</div>
    <div class="detail-grid">
      <v-card class="surface-card summary-card">
        <div class="summary-card__top"><span>Current status</span><StatusChip :status="caseData.status" /></div>
        <dl>
          <div><dt>Our Ref</dt><dd>{{ caseData.our_ref }}</dd></div>
          <div><dt>Trademark</dt><dd>{{ caseData.trademark }}</dd></div>
          <div><dt>Applicant</dt><dd>{{ caseData.applicant }}</dd></div>
          <div><dt>Client Ref</dt><dd>{{ caseData.client_ref || '—' }}</dd></div>
        </dl>
      </v-card>
      <v-card class="surface-card milestones-card">
        <div class="milestones-card__header"><div><h2>Project Milestones</h2><p>Adding a date moves the case to that stage immediately.</p></div><v-icon icon="mdi-calendar-check-outline" color="secondary" size="28" /></div>
        <div class="timeline">
          <div v-for="(milestone, index) in milestones" :key="milestone.key" class="timeline-row" :class="{ completed: Boolean(dates[milestone.key]) }">
            <div class="timeline-track"><span>{{ index + 1 }}</span><i v-if="index < milestones.length - 1" /></div>
            <div class="timeline-content"><div><h3>{{ milestone.title }}</h3><p>{{ milestone.description }}</p></div><v-text-field v-model="dates[milestone.key]" type="date" hide-details class="date-field" /></div>
          </div>
        </div>
        <div class="milestone-actions"><span>Status is determined by the furthest completed milestone.</span><v-btn color="primary" prepend-icon="mdi-content-save-outline" :loading="saving" @click="saveMilestones">Save Dates</v-btn></div>
      </v-card>
    </div>
  </template>
  <v-card v-else class="surface-card not-found"><v-icon icon="mdi-file-question-outline" size="48" /><h2>Case not found</h2><p>{{ error || 'The requested case could not be found.' }}</p><v-btn color="primary" to="/cases">Back to Register</v-btn></v-card>
</template>

<style scoped>
.detail-loading { display: flex; align-items: center; justify-content: center; gap: 14px; min-height: 420px; color: #687773; }
.detail-grid { display: grid; grid-template-columns: minmax(260px, .72fr) minmax(520px, 1.6fr); align-items: start; gap: 22px; }
.summary-card { overflow: hidden; }
.summary-card__top { display: flex; align-items: center; justify-content: space-between; padding: 20px 22px; border-bottom: 1px solid #e8ecea; background: #f8faf9; }
.summary-card__top > span { color: #6477ad; font-size: 11px; font-weight: 800; letter-spacing: .06em; text-transform: uppercase; }
dl { margin: 0; padding: 8px 22px 14px; } dl div { padding: 16px 0; border-bottom: 1px solid #edf0ef; } dl div:last-child { border-bottom: 0; }
dt { margin-bottom: 6px; color: #7181ae; font-size: 10px; font-weight: 800; letter-spacing: .07em; text-transform: uppercase; } dd { margin: 0; color: #07175f; font-size: 13px; font-weight: 650; overflow-wrap: anywhere; }
.milestones-card { padding: 26px; }
.milestones-card__header { display: flex; align-items: flex-start; justify-content: space-between; margin-bottom: 27px; padding-bottom: 20px; border-bottom: 1px solid #e8ecea; }
h2,h3,p { margin: 0; } h2 { color: #07175f; font-size: 18px; } .milestones-card__header p { margin-top: 5px; color: #7181ae; font-size: 12px; }
.timeline-row { display: grid; grid-template-columns: 38px 1fr; min-height: 94px; }
.timeline-track { display: flex; align-items: center; flex-direction: column; }
.timeline-track span { z-index: 1; display: grid; width: 30px; height: 30px; place-items: center; color: #7a8884; border: 2px solid #dce2df; border-radius: 50%; background: white; font-size: 11px; font-weight: 800; }
.timeline-track i { width: 2px; flex: 1; background: #e1e6e4; }
.completed .timeline-track span { color: white; border-color: #0878f9; background: #0878f9; }
.completed .timeline-track i { background: #86bfff; }
.timeline-content { display: grid; grid-template-columns: 1fr 170px; gap: 18px; padding: 2px 0 20px 13px; }
.timeline-content h3 { color: #10256e; font-size: 13px; }.timeline-content p { margin-top: 5px; color: #7b89b2; font-size: 11px; line-height: 1.45; }
.date-field { max-width: 170px; }
.milestone-actions { display: flex; align-items: center; justify-content: space-between; gap: 20px; margin-top: 2px; padding-top: 21px; border-top: 1px solid #e8ecea; }.milestone-actions span { color: #7b8885; font-size: 12px; }
.not-found { padding: 60px 24px; text-align: center; }.not-found h2 { margin-top: 13px; }.not-found p { margin: 7px 0 22px; color: #788580; }
@media (max-width: 900px) { .detail-grid { grid-template-columns: 1fr; } }
@media (max-width: 620px) { .milestones-card { padding: 20px 17px; } .timeline-content { grid-template-columns: 1fr; }.date-field { max-width: none; }.milestone-actions { align-items: stretch; flex-direction: column; }.milestone-actions :deep(.v-btn) { width: 100%; } }
</style>
