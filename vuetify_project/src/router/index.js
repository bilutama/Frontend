import Vue from "vue";
import VueRouter from "vue-router";
//import Home from "../views/Home.vue";
import Popular from "../views/Popular";
import Search from "../views/Search";
import Movie from "../views/Movie";
import Favorites from "../views/Favorites";
import NotFound from "../views/NotFound";

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        redirect: {
            name: 'Popular',
            params: {
                page: 1
            }
        }
        // name: 'Home',
        // component: Home
    },
    {
        path: '/:page',
        name: 'Popular',
        props: (route) => ({page: Number(route.params.page)}),
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
