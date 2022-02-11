<template>
  <v-container>
    <v-row class="d-flex justify-center" justify="center">
      <v-col cols="6">
        <v-text-field
            v-model="searchTerm"

            append-outer-icon="mdi-magnify"
            clear-icon="mdi-close-circle"
            clearable
            label="Type to search..."
            type="text"
            @click:append-outer="search"
            @click:clear="clearTerm"
        ></v-text-field>
      </v-col>
    </v-row>

    <v-divider>
    </v-divider>

    <v-row class="py-6">
      <v-col
          v-for="movie in movies"
          :key="movie.id"
          cols="3">
        <v-card
            elevation="10"
            :href="'/movie/'+movie['id']">
          <v-img v-if="movie['poster_path']!==null"
              :src="getImagePath(movie)"
          >
            <div
                class="d-flex justify-space-between mb-6"
            >
              <v-btn
                  @click.stop.prevent="toggleMovieFavorite(movie)"
                  fab
                  x-small
                  class="ma-1"
              >
                <v-icon :color="isFavorite(movie) ? 'pink' : 'grey lighten-2'">
                  mdi-heart
                </v-icon>
              </v-btn>
              <span class="warning--text font-weight-bold ma-3">
                {{ movie["vote_average"] + "/10" }}
              </span>
            </div>
          </v-img>
            <v-card-title v-else>{{ movie["title"] }}</v-card-title>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import MovieDbService from "../movieDbService.js";
import retrieveFavoriteMovies from "../getFavorites.js";

export default {
  data() {
    return {
      service: new MovieDbService(),
      movies: [],
      imagesSourceUrl: "",
      favoriteMovies: retrieveFavoriteMovies(),
      searchTerm: "",
    }
  },

  mounted() {
    this.imagesSourceUrl = this.service.imagesSourceBaseUrl;
  },

  methods: {
    search() {
      // TODO SEARCH
      this.service.getMoviesBySearch(this.searchTerm, 1).then(resultMovies => {
        this.movies = resultMovies.data["results"];
        this.clearTerm();
      }).catch(err => {
        console.log(err);
      });
    },

    clearTerm() {
      this.searchTerm = "";
    },

    getImagePath(movie) {
      return this.imagesSourceUrl + movie["poster_path"];
    },

    isFavorite(movie) {
      return this.favoriteMovies.findIndex(item => item["id"] === movie["id"]) !== -1;
    },

    toggleMovieFavorite(movie) {
      const movieIndex = this.favoriteMovies.findIndex(item => item["id"] === movie["id"]);

      // Add movie id if doesn't exist
      if (movieIndex === -1) {
        this.favoriteMovies.push({
          id: movie["id"],
          poster_path: movie["poster_path"],
          vote_average: movie["vote_average"]
        });

        localStorage.setItem("favoriteMovies", JSON.stringify(this.favoriteMovies));
        return;
      }

      // Remove movie id if exists
      this.favoriteMovies.splice(movieIndex, 1);
      localStorage.setItem("favoriteMovies", JSON.stringify(this.favoriteMovies));
    }
  },
}
</script>