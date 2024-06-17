//import vue router
import { createRouter, createWebHistory } from 'vue-router'

//import js cookies
import Cookie from 'js-cookie'

// Utility to get the token
const getToken = () => Cookie.get('token')

//define a routes
const routes = [
    {
        path: '/',
        name: 'home',
        component: () => import( /* webpackChunkName: "home" */ '../views/home/index.vue')
    },
    {
        path: '/register',
        name: 'register',
        component: () => import( /* webpackChunkName: "index" */ '../views/auth/register.vue')
    },
    {
        path: '/login',
        name: 'login',
        component: () => import( /* webpackChunkName: "create" */ '../views/auth/login.vue')
    },
    {
        path: '/dashboard',
        name: 'dashboard',
        component: () => import( /* webpackChunkName: "home" */ '../views/dashboard/index.vue'),
        meta: { requiresAuth: true } // <-- Add meta field
    },
    {
        path: '/users',
        name: 'users.index',
        component: () => import( /* webpackChunkName: "home" */ '../views/users/index.vue'),
        meta: { requiresAuth: true } // <-- Add meta field
    },
    {
        path: '/users/create',
        name: 'users.create',
        component: () => import( /* webpackChunkName: "home" */ '../views/users/create.vue'),
        meta: { requiresAuth: true } // <-- Add meta field
    },
    {
        path: '/users/:id',
        name: 'users.edit',
        component: () => import( /* webpackChunkName: "home" */ '../views/users/edit.vue'),
        meta: { requiresAuth: true } // <-- Add meta field
    },
    {
        path: '/orders',
        name: 'orders.index',
        component: () => import( /* webpackChunkName: "home" */ '../views/orders/index.vue'),
        meta: { requiresAuth: true } // <-- Add meta field
    },
    {
        path: '/orders/create',
        name: 'orders.create',
        component: () => import( /* webpackChunkName: "home" */ '../views/orders/create.vue'),
        meta: { requiresAuth: true } // <-- Add meta field
    },
    {
        path: '/orders/:id',
        name: 'orders.edit',
        component: () => import( /* webpackChunkName: "home" */ '../views/orders/edit.vue'),
        meta: { requiresAuth: true } // <-- Add meta field
    }
]

//create router
const router = createRouter({
    history: createWebHistory(),
    routes // <-- routes,
})

// Global navigation guard
router.beforeEach((to, from, next) => {
    // Ambil token otentikasi pengguna
    const token = getToken();

    // Jika rute tujuan membutuhkan otentikasi dan pengguna tidak memiliki token
    if (to.matched.some(record => record.meta.requiresAuth) && !token) {
        // Alihkan pengguna ke halaman login
        next({ name: 'login' });
    } 
    // Jika rute tujuan adalah halaman login atau register dan pengguna sudah login
    else if ((to.name === 'login' || to.name === 'register') && token) {
        // Alihkan pengguna ke halaman dashboard
        next({ name: 'dashboard' });
    } 
    // Jika tidak ada kondisi khusus, izinkan navigasi ke rute tujuan
    else {
        next();
    }
});

export default router