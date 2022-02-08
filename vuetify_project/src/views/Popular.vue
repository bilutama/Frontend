<template>
  <v-container class="py-6">
    <v-pagination
        class="my-4"
        v-model="currentPage"
        :length="pagesCountInDb"
        :total-visible="7"
        @input="nextPage"
    ></v-pagination>
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
                  @click.stop.prevent="isMovieFavoriteToggle(movie.id)"
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

  props: {
        startPage: Number
  },

  data() {
    return {
      service: new MovieDbService(),
      pagesCountInDb: 500, // Specified by API
      movies: [],
      imagesSourceUrl: "",
      favoriteMoviesIds: [],
      currentPage: this.startPage || 1
    };
  },

  mounted() {
    this.imagesSourceUrl = this.service.imagesSourceBaseUrl;

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
    nextPage() {
      if (this.currentPage !== this.$route.params.page) {
        this.$router.push({params: {page: this.currentPage}});
      }
    },

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

  computed: {},

  watch: {
    currentPage: {
      immediate: true,

      handler() {
        this.service.getPopularMovies(this.currentPage).then(resultMovies => {
          this.movies = resultMovies.data["results"];
        }).catch(err => {
          console.log(err);
        });
      }
    },

    $route(to, from) {
      if (to.params.page !== from.params.page) {
        this.currentPage = parseInt(to.params.page);
      }
    }
  }
}
</script>
