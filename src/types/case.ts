export const CASE_STATUSES = [
  'New Instruction',
  'Application Filed',
  'Publication',
  'Substantive',
  'Certificate',
] as const

export type CaseStatus = (typeof CASE_STATUSES)[number]

export interface TrademarkCase {
  our_ref: string
  trademark: string
  applicant: string
  status: CaseStatus
  client_ref: string | null
  application_filed_date: string | null
  publication_date: string | null
  substantive_date: string | null
  certificate_date: string | null
}

export interface CaseFilters {
  trademark?: string
  status?: CaseStatus | null
}

export interface CreateCasePayload {
  our_ref: string
  trademark: string
  applicant: string
  status: CaseStatus
  client_ref?: string | null
}

export interface MilestonePayload {
  application_filed_date?: string | null
  publication_date?: string | null
  substantive_date?: string | null
  certificate_date?: string | null
}
