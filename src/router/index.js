import { createRouter, createWebHistory } from 'vue-router'
// Import your other views here

const routes = [
  // Define your SPA routes here, excluding /login
]

export default createRouter({
  history: createWebHistory(),
  routes,
})
