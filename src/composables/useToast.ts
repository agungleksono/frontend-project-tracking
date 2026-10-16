import { readonly, ref } from 'vue'

export type ToastType = 'success' | 'error'

const visible = ref(false)
const message = ref('')
const type = ref<ToastType>('success')
let timer: number | undefined

export function useToast() {
  function showToast(nextMessage: string, nextType: ToastType = 'success') {
    window.clearTimeout(timer)
    message.value = nextMessage
    type.value = nextType
    visible.value = true
    timer = window.setTimeout(() => {
      visible.value = false
    }, 4200)
  }

  function hideToast() {
    visible.value = false
  }

  return {
    visible: readonly(visible),
    message: readonly(message),
    type: readonly(type),
    showToast,
    hideToast,
  }
}
