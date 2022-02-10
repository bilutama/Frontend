<template>
  <v-container>
    <span>Here are your favorite movies</span>
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
            :href="'/movie/'+movie.id">
          <v-img
              :src="getImagePath(movie)"
          >
            <div
                class="d-flex justify-space-between mb-6"
            >
              <span class="warning--text font-weight-bold ma-3">
                {{ movie["vote_average"] + "/10" }}
              </span>

              <v-btn
                  @click.stop.prevent="toggleMovieFavorite(movie.id)"
                  fab
                  small
                  class="ma-1"
              >
                <v-icon :color="isFavorite(movie.id) ? 'pink' : 'grey lighten-2'">
                  mdi-heart
                </v-icon>
              </v-btn>
            </div>
          </v-img>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import MovieDbService from "../movieDbService.js";
import retrieveFavoriteMoviesIds from "../getFavorites.js";

export default {
  name: "Favorites",

  data() {
    return {
      service: new MovieDbService(),
      favoriteMoviesIds: retrieveFavoriteMoviesIds(),
      favoriteMovies: [],
      imagesSourceUrl: "",
    };
  },

  methods: {
    getImagePath(movie) {
      return (this.imagesSourceUrl + movie["poster_path"]);
    },

    isFavorite(id) {
      return this.favoriteMoviesIds.indexOf(id) !== -1;
    },

    toggleMovieFavorite(id) {
      const movieIdIndex = this.favoriteMoviesIds.indexOf(id);

      if (movieIdIndex !== -1) {
        this.favoriteMoviesIds.splice(movieIdIndex, 1);
        localStorage.setItem("favoriteMovies", JSON.stringify(this.favoriteMoviesIds));
      }
    }
  },

  mounted() {
    this.imagesSourceUrl = this.service.imagesSourceBaseUrl;

    this.service.getPopularMovies().then(resultMovies => {
      // TODO: test append_to_request
      this.favoriteMovies = resultMovies.data["results"].filter(movie => this.favoriteMoviesIds.indexOf(movie.id) > -1);
    }).catch(err => {
      console.log(err);
    });

  }
}
</script>
