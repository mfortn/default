// src/router.js
import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from './stores/auth'

const Login = () => import('./views/LoginView.vue')
const Register = () => import('./views/RegisterView.vue')
const Profile = () => import('./views/ProfileView.vue')
const Home = () => import('./views/HomeView.vue')

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', name: 'home', component: Home },
    { path: '/login', name: 'login', component: Login, meta: { guestOnly: true } },
    { path: '/register', name: 'register', component: Register, meta: { guestOnly: true } },
    { path: '/profile', name: 'profile', component: Profile, meta: { requiresAuth: true } },
  ],
})

// حارس عام
router.beforeEach(async (to) => {
  const auth = useAuthStore()
  // أول زيارة بعد refresh: انتظر initSession
  if (!auth.ready) {
    await auth.initSession()
  }

  if (to.meta.requiresAuth && !auth.isAuthenticated) {
    return { name: 'login', query: { redirect: to.fullPath } }
  }
  if (to.meta.guestOnly && auth.isAuthenticated) {
    return { name: 'profile' }
  }
})

export default router
