import { createRouter, createWebHistory } from 'vue-router';

const routes = [
    {
        path: '/',
        redirect: '/dashboard', // Redirige a Dashboard inicialmente
    },
    {
        path: '/login',
        name: 'Login',
        component: () => import('@/components/Login.vue'),
    },
    {
        path: '/dashboard',
        name: 'Dashboard',
        component: () => import('@/components/Dashboard.vue'),
        children: [
            {
                path: 'check_health',
                name: 'HealthCheck',
                component: () => import('@/components/HealthCheck.vue'),
            },
            {
                path: 'aena_xml',
                name: 'AenaXML',
                component: () => import('@/components/AenaXML.vue'),
            },
            {
                path: 'aena_csv',
                name: 'AenaCSV',
                component: () => import('@/components/AenaCSV.vue'),
            },
            {
                path: 'invoices',
                name: 'Facturas',
                component: () => import('@/components/Invoice.vue'),
            },
        ],
        meta: { requiresAuth: true }, // Protegemos Dashboard y sus hijos
    },
];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
});

// Protege rutas que necesitan autenticación
router.beforeEach((to, from, next) => {
    const isAuthenticated = !!localStorage.getItem('token');
    if (to.meta.requiresAuth && !isAuthenticated) {
        next('/login'); // Si no está autenticado, redirige al login
    } else {
        next(); // Permite la navegación
    }
});

export default router;
