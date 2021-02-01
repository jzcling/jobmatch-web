import Vue from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify';
import Axios from 'axios'

Vue.prototype.$axios = Axios;
Vue.prototype.$apiBase = process.env.VUE_APP_API_BASE_URL;

Vue.config.productionTip = false

new Vue({
  router,
  vuetify,
  render: h => h(App),
}).$mount('#app')
