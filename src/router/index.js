import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    component: (resolve) => require(['./../pages/index/index.vue'], resolve),
  }
]

const router = new VueRouter({
  mode: 'hash',
  routes
})

export default router;