/**
 * plugins/vuetify.ts
 *
 * Framework documentation: https://vuetifyjs.com`
 */

// Styles
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'
import { VSpeedDial } from 'vuetify/labs/VSpeedDial'
import { VFab } from 'vuetify/labs/VFab'


// Composables
import { createVuetify } from 'vuetify'

// https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides
export default createVuetify({
  components: {
    VSpeedDial,
    VFab,
  },
  theme: {
    //defaultTheme: 'dark',
  },
})
