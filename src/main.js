import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { Slider } from 'vant';
import 'vant/lib/slider/style';
Vue.use(Slider);


Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
