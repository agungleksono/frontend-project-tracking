import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'
import { createVuetify } from 'vuetify'

export default createVuetify({
  theme: {
    defaultTheme: 'affaLight',
    themes: {
      affaLight: {
        dark: false,
        colors: {
          background: '#F3F8FD',
          surface: '#FFFFFF',
          primary: '#0878F9',
          secondary: '#0B2C7A',
          error: '#B42318',
          info: '#2761A8',
          success: '#277A52',
        },
      },
    },
  },
  defaults: {
    VBtn: { rounded: 'lg', elevation: 0 },
    VCard: { rounded: 'lg', elevation: 0 },
    VTextField: { variant: 'outlined', density: 'comfortable', color: 'primary' },
    VSelect: { variant: 'outlined', density: 'comfortable', color: 'primary' },
  },
})
