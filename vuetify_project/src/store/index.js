import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({

  state: {
    currentPage: 1
  },

  getters: {
  },

  mutations: {
    changeState(state, newValue) {
      state.currentPage = newValue;
    }
  },

  actions: {
  },

  modules: {
  },
})
