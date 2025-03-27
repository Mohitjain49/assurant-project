import { createRouter, createWebHistory } from 'vue-router'
import Start from './pages/Start.vue';

/**
 * @type {import('vue-router').RouteRecordRaw[]} These are the routes for the application.
 */
const appRoutes = [
    { path: '/', name: 'home', component: Start },
    { path: "/:catchAll(.*)", redirect: "/" }
]

const router = createRouter({
    history: createWebHistory(),
    routes: appRoutes
});

export default router
