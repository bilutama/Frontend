import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Popular from "../views/Popular";
import Search from "../views/Search";
import Movie from "../views/Movie";
import Favorites from "../views/Favorites";
import NotFound from "../views/NotFound";

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        //redirect: '/popular/1',
        name: 'Home',
        component: Home
    },
    {
        path: '/popular/:page',
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
    },
    {
        path: '/*',
        name: 'NotFound',
        component: NotFound
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router
