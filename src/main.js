import Vue from 'vue'
import App from './App.vue'
import VueFilesDropper from './components/'

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  components: {VueFilesDropper}
}).$mount('#app')
