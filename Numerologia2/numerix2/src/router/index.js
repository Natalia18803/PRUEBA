import { createRouter, createWebHistory } from 'vue-router'
import Identidad from '../views/Identidad.vue'
import Login from '../views/Login.vue'

const routes = [
  {
    path: '/',
    name: 'identidad',
    component: Identidad
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: () => import('../views/Dashboard.vue')
  },
  {
    path: '/lecturas',
    name: 'lecturas',
    component: () => import('../views/MisLecturas.vue')
  },
  {
    path: '/predicciones',
    name: 'predicciones',
    component: () => import('../views/Predicciones.vue')
  },
  {
    path: '/biblioteca',
    name: 'biblioteca',
    component: () => import('../views/Biblioteca.vue')
  },
  {
    path: '/planes',
    name: 'planes',
    component: () => import('../views/Planes.vue')
  },
  {
    path: '/pago',
    name: 'pago',
    component: () => import('../views/Pago.vue')
  },
  {
    path: '/admin',
    name: 'admin',
    component: () => import('../views/Admin.vue')
  },
  {
    path: '/forgot-password',
    name: 'forgot-password',
    component: () => import('../views/ForgotPassword.vue')
  },
  {
    path: '/reset-password',
    name: 'reset-password',
    component: () => import('../views/ResetPassword.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
