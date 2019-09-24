// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import BootstrapVue from 'bootstrap-vue'
import ElementUI from 'element-ui'
import { NavBar, Icon, Cell, CellGroup, List, Search, Tag, Badge, BadgeGroup, Row, Col, Field, Button, Uploader, NoticeBar, Panel } from 'vant'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import 'element-ui/lib/theme-chalk/index.css'
import 'vant/lib/index.css'
import CollapseTransition from 'element-ui/lib/transitions/collapse-transition'
import App from './App'
import router from './router'
import store from './store'
import axios from 'axios'
// const VueUploadComponent = require('vue-upload-component')
// Vue.component('file-upload', VueUploadComponent)
// axios.interceptors.request.use(function (config) {
//     if (localStorage.getItem("feedback_token")) {
//     	config.headers['Accept'] = 'application/json';
//       config.headers['Authorization'] = 'Bearer ' + localStorage.getItem('feedback_token');
//     }
//     return config;
// }, function (error) {
//     // Do something with request error
//     return Promise.reject(error);
//     }
// )
Vue.prototype.$axios = axios
Vue.component(CollapseTransition.name, CollapseTransition)
Vue.use(BootstrapVue)
Vue.use(ElementUI)
Vue.use(NavBar).use(Icon).use(Cell).use(CellGroup).use(List).use(Search).use(Tag).use(Badge).use(BadgeGroup).use(Row).use(Col).use(Field).use(Button).use(Uploader).use(NoticeBar).use(Panel)
Vue.config.productionTip = false
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
