
import 'babel-polyfill'

import Vue from 'vue'

import 'normalize.css/normalize.css'// A modern alternative to CSS resets

import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import '@/styles/index.scss' // global css

import App from './App'
import router from './router'
import store from './store'
import api_zbb from './api/zhibobao'
import './icons' // icon
import './errorLog'// error log
import './permission' // permission control
import './mock' // simulation data generator

import * as filters from './filters' // global filteri18n
import { Message } from 'element-ui'
Vue.use(Element, {
  size: 'medium'
});

// register global utility filters.
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
});

Vue.config.productionTip = false;
Vue.prototype.$api_zbb = api_zbb;

Vue.prototype.isExperience = function (type) {
  if(store.getters.userInfo.uid === store.getters.experience.uid){
    if(!type)Message("当前为演示账号，请注册登录后使用");
    return true
  }
  return false
};
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
