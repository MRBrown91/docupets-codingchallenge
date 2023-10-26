import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'vue-select/dist/vue-select.css';
import vSelect from 'vue-select'

import 'bootstrap/dist/css/bootstrap.css'
import 'vue-select/dist/vue-select.css';
import './assets/main.css'

const app = createApp(App)
app.use(router)
app.use(store)
app.component('v-select', vSelect)
app.mount('#app')
