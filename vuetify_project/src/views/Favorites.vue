<template>
  <v-container>
    <div v-if="favoritesExist" class="text-h5 d-flex justify-center my-2">
      Your favorite movies
    </div>
    <div v-else class="text-h5 d-flex justify-center my-2">
      No favorites yet
    </div>
    <v-divider>
    </v-divider>
    <v-row class="py-6">
      <v-col
          v-for="movie in favoriteMovies"
          :key="movie.id"
          cols="3"
      >
        <v-card
            elevation="10"
            :href="'/movie/'+movie['id']">
          <v-img
              :src="getImagePath(movie)"
              aspect-ratio="0.65"
          >
            <div
                class="d-flex justify-space-between mb-6"
            >
              <v-btn
                  @click.stop.prevent="removeFromFavorite(movie)"
                  fab
                  x-small
                  class="ma-1"
              >
                <v-icon :color="'pink'">
                  mdi-heart
                </v-icon>
              </v-btn>
              <span class="warning--text font-weight-bold ma-3">
                {{ movie["vote_average"] + "/10" }}
              </span>
            </div>
          </v-img>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import MovieDbService from "../movieDbService.js";
import retrieveFavoriteMovies from "../getFavorites.js";

export default {
  name: "Favorites",

  data() {
    return {
      service: new MovieDbService(),
      favoriteMovies: retrieveFavoriteMovies(),
      favoritesExist: false,
      imagesSourceUrl: "",
    };
  },

  methods: {
    getImagePath(movie) {
      return (this.imagesSourceUrl + movie["poster_path"]);
    },

    isFavorite(movie) {
      return this.favoriteMovies.findIndex(item => item["id"] === movie["id"]) !== -1;
    },

    removeFromFavorite(movie) {
      const movieIndex = this.favoriteMovies.findIndex(item => item["id"] === movie["id"]);

      if (movieIndex !== -1) {
        this.favoriteMovies.splice(movieIndex, 1);
        localStorage.setItem("favoriteMovies", JSON.stringify(this.favoriteMovies));
      }
    }
  },

  mounted() {
    this.imagesSourceUrl = this.service.imagesSourceBaseUrl;
  },

  watch: {
    favoriteMovies: {
      immediate: true,
      deep: true,

      handler() {
        this.favoritesExist = this.favoriteMovies.length > 0;
      }
    }
  }
}
</script>
