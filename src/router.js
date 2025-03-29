import { createRouter, createWebHistory } from 'vue-router'

import Start from './pages/Start.vue';
import Contact from './pages/Contact.vue';

import SignIn from './pages/SignIn.vue';
import SignUp from './pages/SignUp.vue';
import SignOut from './pages/SignOut.vue';

/**
 * @type {import('vue-router').RouteRecordRaw[]} These are the routes for the application.
 */
const appRoutes = [
    { path: '/', name: 'home', component: Start },
    { path: '/contact', name: 'contact', component: Contact },
    { path: "/:catchAll(.*)", redirect: "/" },

    { path: '/signin', name: 'sign in', component: SignIn },
    { path: '/signup', name: 'sign up', component: SignUp },
    { path: '/signout', name: 'sign out', component: SignOut }
]

const router = createRouter({
    history: createWebHistory(),
    routes: appRoutes
});

export default router
