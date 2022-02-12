import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        currentPopularMoviesPage: 1,
    },

    getters: {},

    mutations: {
        updatePopularMoviesCurrentPage(state, newValue) {
            state.currentPopularMoviesPage = newValue;
        },
    },

    actions: {},

    modules: {},
})
