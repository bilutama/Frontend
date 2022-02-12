<template>
  <v-container>
    <div class="text-h5 d-flex justify-center my-2">
      Movies that are popular today
    </div>
    <v-pagination
        class="my-2"
        v-model="currentPage"
        :length="pagesCountInDb"
        :total-visible="7"
        @input="nextRoute"
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
            v-if="movie['poster_path'] !== null"
            :href="'/movie/'+movie.id">
          <v-img
              :src="getImagePath(movie)"
              aspect-ratio="0.65"
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
        </v-card>
        <v-card v-else
                elevation="10"
                :href="'/movie/'+movie['id']"
        >
          <v-responsive :aspect-ratio="18/27">
            <v-card-title class="text-subtitle-1 font-weight-bold">
              <v-responsive>
                {{ movie["title"] }}
              </v-responsive>
            </v-card-title>
            <v-card-text>
              [No poster in database]
            </v-card-text>
          </v-responsive>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import MovieDbService from "../movieDbService.js";
import retrieveFavoriteMovies from "../getFavorites.js";

export default {
  name: "Popular",

  props: {
    page: {
      type: Number,
      required: true
    }
  },

  data() {
    return {
      service: new MovieDbService(),
      pagesCountInDb: 500, // Specified by API
      movies: [],
      imagesSourceUrl: "",
      favoriteMovies: retrieveFavoriteMovies(),
      currentPage: this.resolveCurrentPage()
    };
  },

  mounted() {
    this.imagesSourceUrl = this.service.imagesSourceBaseUrl;
    this.nextRoute();
  },

  methods: {
    resolveCurrentPage() {
      if (this.page !== 1) {
        this.$store.commit('updatePopularMoviesPage', this.page);
        return this.page;
      }

      return this.$store.state.currentPopularMoviesPage;
    },

    nextRoute() {
      if (this.currentPage !== parseInt(this.$route.params.page)) {
        this.$router.push({params: {page: String(this.currentPage)}}, () => {
        });
      }
    },

    getImagePath(movie) {
      return this.imagesSourceUrl + movie["poster_path"];
    },

    isFavorite(movie) {
      return this.favoriteMovies.findIndex(item => item["id"] === movie["id"]) !== -1;
    },

    toggleMovieFavorite(movie) {
      const movieIndex = this.favoriteMovies.findIndex(item => item["id"] === movie["id"]);

      // Add movie id if it doesn't exist
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

  computed: {},

  watch: {
    currentPage: {
      immediate: true,

      // Retrieve movies from database
      handler() {
        this.service.getPopularMovies(this.currentPage).then(resultMovies => {
          this.movies = resultMovies.data["results"];
        }).catch(err => {
          console.log(err);
        });
      }
    },

    // Update current page in store
    $route(to, from) {
      if (to.params.page !== from.params.page) {
        this.currentPage = Number(to.params.page);
        this.$store.commit('updatePopularMoviesCurrentPage', this.currentPage);
      }
    }
  }
}
</script>