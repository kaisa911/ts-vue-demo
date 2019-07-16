import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import axios from '../utils/request';
import api from '../utils/api';
import './assets/init.css';

Vue.config.productionTip = false;
// 封装axios
Vue.prototype.request = axios;
// 封装api
Vue.prototype.api = api;

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
