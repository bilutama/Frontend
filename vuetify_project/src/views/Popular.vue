<template>
  <v-container class="py-6">
    <v-divider>

    </v-divider>
    <v-row class="py-6">
      <v-col
          v-for="movie in movies"
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
                  @click.native.prevent.stop.capture="isMovieFavoriteToggle(movie.id)"
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

export default {
  name: "Popular",

  data() {
    return {
      service: new MovieDbService(),
      moviesCountInDb: 0,
      pagesCountInDb: 0,
      movies: [],
      imagesSourceUrl: "",
      favoriteMoviesIds: []
    };
  },

  mounted() {
    this.imagesSourceUrl = this.service.imagesSourceBaseUrl;

    this.service.getPopularMovies().then(resultMovies => {
      this.moviesCountInDb = resultMovies.data["total_results"];
      this.pagesCountInDb = resultMovies.data["total_pages"];
      this.movies = resultMovies.data["results"];
    }).catch(err => {
      console.log(err);
    });

    // Get favorite movies ids from local storage
    const favoriteMovies = localStorage.getItem("favoriteMovies");

    if (favoriteMovies === null) {
      this.favoriteMoviesIds = [];
    }

    try {
      this.favoriteMoviesIds = JSON.parse(favoriteMovies);
    } catch (err) {
      localStorage.removeItem("favoriteMovies");
      this.favoriteMoviesIds = [];
    }
  },

  methods: {
    getImagePath(movie) {
      return (this.imagesSourceUrl + movie["poster_path"]);
    },

    isFavorite(id) {
      return this.favoriteMoviesIds.indexOf(id) !== -1;
    },

    isMovieFavoriteToggle(id) {
      const movieIdIndex = this.favoriteMoviesIds.indexOf(id);

      // Add movie id if doesn't exist
      if (movieIdIndex === -1) {
        this.favoriteMoviesIds.push(id);
        localStorage.setItem("favoriteMovies", JSON.stringify(this.favoriteMoviesIds));
        return;
      }

      // Remove movie id if exists
      this.favoriteMoviesIds.splice(movieIdIndex, 1);
      localStorage.setItem("favoriteMovies", JSON.stringify(this.favoriteMoviesIds));
    }
  },

  computed: {
    moviesCount: {
      get() {
        return this.value;
      },

      set() {
        this.value = this.movies.length;
      }
    },
  }
}
</script>
