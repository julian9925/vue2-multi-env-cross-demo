import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'

Vue.config.productionTip = false

async function chooseOEMroute() {
  console.log(process.env);
  switch (process.env.VUE_APP_OEM) {
    case 'intel':
      return (await import('./intel/router')).default;
    case 'oem':
      return (await import('./oem/router')).default;
    default:
      return (await import('./router')).default;
  }
}

async function initializeApp() {
  new Vue({
    router: await chooseOEMroute(),
    store,
    render: h => h(App)
  }).$mount('#app')
}

initializeApp();