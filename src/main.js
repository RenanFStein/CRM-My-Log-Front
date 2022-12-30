import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { Bar, Line, Pie, Chart, Bubble, Radar } from 'vue-chartjs'
import './assets/main.css'

const app = createApp(App)

app.use(router)
    .use(store)
    .use({ Bar, Line, Pie, Chart, Bubble, Radar })


app.mount('#app')
