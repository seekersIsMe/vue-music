import 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import router from './router'
import fastclcik from 'fastclick'
import 'common/less/index.less'
import imgLazyload from 'vue-lazyload';

Vue.use(imgLazyload,{
  error:require('common/image/default.png'),
  // loading:'./static/img/default.png',
  loading:require('common/image/default.png')//用require请求图片资源，webpack会将图片资源打包成base64
})
// Vue.config.productionTip = false
fastclcik.attach(document.body);
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
