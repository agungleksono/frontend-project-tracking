const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000').replace(/\/$/, '')
const API_BEARER_TOKEN = import.meta.env.VITE_API_BEARER_TOKEN || ''

export class ApiError extends Error {
  status: number

  constructor(message: string, status: number) {
    super(message)
    this.name = 'ApiError'
    this.status = status
  }
}

function validationMessage(detail: unknown): string {
  if (typeof detail === 'string') return detail
  if (Array.isArray(detail)) {
    return detail
      .map((item) => (typeof item?.msg === 'string' ? item.msg.replace(/^Value error, /, '') : 'Invalid value.'))
      .join(' ')
  }
  return 'Something went wrong. Please try again.'
}

export async function apiRequest<T>(path: string, init?: RequestInit): Promise<T> {
  let response: Response
  try {
    response = await fetch(`${API_BASE_URL}${path}`, {
      ...init,
      headers: {
        'Content-Type': 'application/json',
        ...(API_BEARER_TOKEN ? { Authorization: `Bearer ${API_BEARER_TOKEN}` } : {}),
        ...init?.headers,
      },
    })
  } catch {
    throw new ApiError('Unable to connect to the server. Please try again.', 0)
  }

  if (!response.ok) {
    let message = 'Something went wrong. Please try again.'
    try {
      const body = await response.json()
      message = validationMessage(body.detail)
    } catch {
      // Keep the safe fallback when the server does not return JSON.
    }
    throw new ApiError(message, response.status)
  }

  return response.json() as Promise<T>
}
