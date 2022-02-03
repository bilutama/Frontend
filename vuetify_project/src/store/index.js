import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    favouriteMoviesIds: []
  },

  getters: {
    favoriteMoviesIds: () => this.state.favouriteMoviesIds,
    favoriteMoviesCount: () => this.state.favouriteMoviesIds.length,
  },

  mutations: {
    toggleMovieId (state, movieId) {
      const movieIdIndex = state.favouriteMoviesIds.indexOf(movieId);

      // Add movie id if doesn't exist
      if (movieIdIndex === -1) {
        state.favouriteMoviesIds.push(movieId);
        return;
      }

      // Remove movie id if exists
      state.favouriteMoviesIds.splice(movieIdIndex, 1);
    }
  },

  actions: {
  },

  modules: {
  }
})
