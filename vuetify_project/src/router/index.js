import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Popular from "../views/Popular";
import Search from "../views/Search";
import Movie from "../views/Movie";
import Favorites from "../views/Favorites";

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/popular',
        name: 'Popular',
        component: Popular
    },
    {
        path: '/search',
        name: 'Search',
        component: Search
    },
    {
        path: '/favorites',
        name: 'Favorites',
        component: Favorites
    },
    {
        path: '/movie/:movieid',
        name: 'Movie',
        component: Movie
    },
    {
        path: '/about',
        name: 'About',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes,

    scrollBehavior(to, from, savedPosition) {
        if (savedPosition) {
            return savedPosition
        } else {
            return { x: 0, y: 0 }
        }
    }
})

export default router
