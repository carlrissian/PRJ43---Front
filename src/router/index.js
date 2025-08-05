import { createRouter, createWebHistory } from 'vue-router';
import LoginView from '../views/Login.vue';

const routes = [
  { path: '/', redirect: '/login' },
  { path: '/login', name: 'Login', component: LoginView },
];

export default createRouter({
  history: createWebHistory(),
  routes,
});
