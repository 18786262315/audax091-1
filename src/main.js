import Vue from 'vue'
import App from './App.vue'
import router from './router'
import datas from './api/data.js'
import Navigation from 'vue-navigation'


import './style/css/communal.css'



// import VueDraggableResizable from 'vue-draggable-resizable'

// optionally import default styles
// import 'vue-draggable-resizable/dist/VueDraggableResizable.css'

// Vue.component('vue-draggable-resizable', VueDraggableResizable)



Vue.config.productionTip = false
Vue.prototype.Datas = datas

Vue.use(Navigation, { router })

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
