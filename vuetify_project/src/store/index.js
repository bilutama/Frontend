import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        popularMoviesCurrentPage: 1
    },

    getters: {},

    mutations: {
        updatePopularMoviesCurrentPage(state, newValue) {
            state.popularMoviesCurrentPage = newValue;
        }
    },

    actions: {},

    modules: {}
});
