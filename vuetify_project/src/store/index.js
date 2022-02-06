import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({

  state: {
    favoriteMoviesIds: []
  },

  getters: {
    favoriteMoviesIds: () => this.state.favoriteMoviesIds,
    favoriteMoviesCount: () => this.state.favoriteMoviesIds.length,
  },

  mutations: {
    toggleMovieId (state, movieId) {
      const movieIdIndex = state.favoriteMoviesIds.indexOf(movieId);

      // Add movie id if doesn't exist
      if (movieIdIndex === -1) {
        state.favoriteMoviesIds.push(movieId);
        return;
      }

      // Remove movie id if exists
      state.favoriteMoviesIds.splice(movieIdIndex, 1);
    }
  },

  actions: {
  },

  modules: {
  },

  strict: process.env.NODE_ENV !== 'production'
})
