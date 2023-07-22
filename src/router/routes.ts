import type {RouteRecordRaw} from "vue-router";
import {AuthGuard} from "@/core/guards/auth";

import AuthLayout from '@/layouts/authLayout.vue'
import d_homepage from '@/views/dashboard/index.vue'


type layouts = 'dashboard' | 'auth'

const auth_routes: RouteRecordRaw[] = [
    {
        path: 'login',
        name: getRouteName('auth', 'login'),
        component: () => import('@/views/auth/loginPage.vue')
    },
    {
        path: '*',
        redirect: getRoutePath('auth', 'login'),
    },
]


const dashboard_routes: RouteRecordRaw[] = [
    {
        path: '',
        name: getRouteName('dashboard', 'home'),
        component: d_homepage
    },
    {
        path: 'about',
        name: getRouteName('dashboard', 'about'),
        component: () => import('@/views/dashboard/AboutView.vue')
    }
]


const routes: RouteRecordRaw[] = [
    {
        path: '/auth',
        name: getRouteName('auth'),
        redirect: 'login',
        component: AuthLayout,
        beforeEnter: async (to, from, next) => {
            const token = true
            if (token) next({name: getRouteName('dashboard', 'home')})
            else next()
        },
        children: auth_routes
    },


    {
        path: '/',
        name: getRouteName('dashboard'),
        meta: {roles: [1, 2]},
        beforeEnter: async (to, from, next) => {
            await AuthGuard(to, from, next);
        },
        component: () => import('@/layouts/dashboardLayout.vue'),
        children: dashboard_routes
    },


    {
        path: '/:catchAll(.*)',
        redirect: {
            name: getRouteName('dashboard', 'home'),
        },
    }
]

function getRouteName(layout: layouts, routeName?: string): string {
    if (!routeName) {
        return `${layout}-layout`
    }
    const name = routeName.trim()
    return `${layout}-${name}`
}

function getRoutePath(layout: layouts, routePath: string): string {
    return `${layout}/${routePath}`
}

export default routes