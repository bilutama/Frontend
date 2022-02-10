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
        @input="next"
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
  name: "Popular",

  data() {
    return {
      service: new MovieDbService(),
      pagesCountInDb: 500, // Specified by API
      movies: [],
      imagesSourceUrl: "",
      favoriteMoviesIds: retrieveFavoriteMoviesIds(),
      currentPage: this.$store.state.currentPage
    };
  },

  mounted() {
    this.next();
    this.imagesSourceUrl = this.service.imagesSourceBaseUrl;
  },

  methods: {
    next() {
      if (this.currentPage !== parseInt(this.$route.params.page)) {
        this.$router.push({params: {page: String(this.currentPage)}}, () => {
        });
      }
    },

    getImagePath(movie) {
      return (this.imagesSourceUrl + movie["poster_path"]);
    },

    isFavorite(id) {
      return this.favoriteMoviesIds.indexOf(id) !== -1;
    },

    toggleMovieFavorite(id) {
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

    // Update current page in store
    $route(to, from) {
      if (to.params.page !== from.params.page) {
        this.currentPage = Number(to.params.page);
        this.$store.commit('changeState', this.currentPage);
      }
    }
  }
}
</script>
