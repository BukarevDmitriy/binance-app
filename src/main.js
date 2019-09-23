let _ = require('lodash');
import Vue from 'vue';
import App from './App';

import {router} from './routes';
import VueResource from 'vue-resource';
import addPlugin from './plugins/addPlugin';

Vue.use(VueResource);
Vue.use(addPlugin);

new Vue({
  el: '#app',
  router,
  render: h => h(App)
});
