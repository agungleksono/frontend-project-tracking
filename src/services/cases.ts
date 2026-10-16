import { apiRequest } from './api'
import type { CaseFilters, CreateCasePayload, MilestonePayload, TrademarkCase } from '@/types/case'

export function getCases(filters: CaseFilters = {}): Promise<TrademarkCase[]> {
  const params = new URLSearchParams()
  if (filters.trademark?.trim()) params.set('trademark', filters.trademark.trim())
  if (filters.status) params.set('status', filters.status)
  const query = params.toString()
  return apiRequest<TrademarkCase[]>(`/cases${query ? `?${query}` : ''}`)
}

export function getCase(ourRef: string): Promise<TrademarkCase> {
  return apiRequest<TrademarkCase>(`/cases/${encodeURIComponent(ourRef)}`)
}

export function createCase(payload: CreateCasePayload): Promise<TrademarkCase> {
  return apiRequest<TrademarkCase>('/cases', {
    method: 'POST',
    body: JSON.stringify(payload),
  })
}

export function updateCaseMilestones(ourRef: string, payload: MilestonePayload): Promise<TrademarkCase> {
  return apiRequest<TrademarkCase>(`/cases/${encodeURIComponent(ourRef)}`, {
    method: 'PATCH',
    body: JSON.stringify(payload),
  })
}
