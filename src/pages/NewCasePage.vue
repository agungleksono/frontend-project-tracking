<script setup lang="ts">
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import PageHeader from '@/components/PageHeader.vue'
import { useToast } from '@/composables/useToast'
import { createCase } from '@/services/cases'
import { CASE_STATUSES, type CreateCasePayload } from '@/types/case'

const router = useRouter()
const { showToast } = useToast()
const formRef = ref()
const submitting = ref(false)
const serverError = ref('')
const form = reactive<CreateCasePayload>({ our_ref: '', trademark: '', applicant: '', status: 'New Instruction', client_ref: '' })

const required = (value: string) => Boolean(value?.trim()) || 'This field is required.'

async function submit() {
  const result = await formRef.value?.validate()
  if (!result?.valid) return
  submitting.value = true
  serverError.value = ''
  try {
    const created = await createCase({ ...form, our_ref: form.our_ref.trim(), trademark: form.trademark.trim(), applicant: form.applicant.trim(), client_ref: form.client_ref?.trim() || null })
    showToast('Case created successfully.')
    await router.push({ name: 'case-detail', params: { ourRef: created.our_ref } })
  } catch (caught) {
    serverError.value = caught instanceof Error ? caught.message : 'Unable to create the case.'
  } finally {
    submitting.value = false
  }
}
</script>

<template>
  <PageHeader eyebrow="Case intake" title="Create New Case" description="Add a trademark project to the register. Required fields are marked with an asterisk." />
  <div v-if="serverError" class="error-banner"><v-icon icon="mdi-alert-circle-outline" />{{ serverError }}</div>
  <v-card class="surface-card form-card">
    <div class="form-card__intro"><div class="form-card__number">01</div><div><h2>Case Information</h2><p>Enter the core references and ownership details.</p></div></div>
    <v-form ref="formRef" @submit.prevent="submit">
      <div class="form-grid">
        <div><label class="field-label">Our Ref <span class="required">*</span></label><v-text-field v-model="form.our_ref" placeholder="e.g. TM/26098/LN/26" :rules="[required]" maxlength="100" /></div>
        <div><label class="field-label">Client Ref</label><v-text-field v-model="form.client_ref" placeholder="Optional client reference" maxlength="100" /></div>
        <div><label class="field-label">Trademark <span class="required">*</span></label><v-text-field v-model="form.trademark" placeholder="Enter trademark name" :rules="[required]" maxlength="255" /></div>
        <div><label class="field-label">Applicant <span class="required">*</span></label><v-text-field v-model="form.applicant" placeholder="Enter applicant name" :rules="[required]" maxlength="255" /></div>
        <div class="full-width"><label class="field-label">Status <span class="required">*</span></label><v-select v-model="form.status" :items="[...CASE_STATUSES]" :rules="[(value: unknown) => Boolean(value) || 'This field is required.']" /></div>
      </div>
      <div class="form-actions"><v-btn variant="text" color="primary" to="/cases">Cancel</v-btn><v-btn type="submit" color="primary" size="large" prepend-icon="mdi-content-save-outline" :loading="submitting">Create Case</v-btn></div>
    </v-form>
  </v-card>
</template>

<style scoped>
.form-card { max-width: 920px; padding: 26px; }
.form-card__intro { display: flex; align-items: center; gap: 14px; margin-bottom: 30px; padding-bottom: 22px; border-bottom: 1px solid #e9edeb; }
.form-card__number { display: grid; width: 42px; height: 42px; place-items: center; color: #0878f9; border-radius: 9px; background: #e8f3ff; font-size: 15px; font-weight: 800; }
h2, p { margin: 0; } h2 { color: #07175f; font-size: 17px; } p { margin-top: 4px; color: #7181ae; font-size: 12px; }
.form-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 8px 22px; }
.full-width { grid-column: 1 / -1; }
.form-actions { display: flex; justify-content: flex-end; gap: 10px; margin-top: 18px; padding-top: 24px; border-top: 1px solid #e9edeb; }
@media (max-width: 700px) { .form-card { padding: 22px 18px; } .form-grid { grid-template-columns: 1fr; } .full-width { grid-column: auto; } .form-actions { flex-direction: column-reverse; } }
</style>
