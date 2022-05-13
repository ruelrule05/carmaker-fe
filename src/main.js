import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import axios from 'axios'

import VueSwal from 'vue-swal'

Vue.use(VueSwal)

import './main.css'

axios.defaults.withCredentials = true
axios.defaults.baseURL = 'http://127.0.0.1:8000/api/'
axios.defaults.headers.common['Accept'] = 'application/json'

const UNAUTHORIZED = 401;
axios.interceptors.response.use(
  response => response,
  error => {
    const {status} = error.response;
    if (status === UNAUTHORIZED) {
      store.dispatch('logout');
      return router.push('/login')
    }
    return Promise.reject(error);
 }
);

axios.interceptors.request.use(
  async config => {
    const value = store.getters.stateToken
    config.headers = { 
      'Authorization': `Bearer ${value}`,
      'Accept': 'application/json',
      'Content-Type': 'application/x-www-form-urlencoded'
    }
    return config;
  },
  error => {
    Promise.reject(error)
});

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
