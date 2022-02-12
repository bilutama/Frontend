<template>
  <v-container>
    <div class="text-h5 d-flex justify-center my-2">
      <span v-if="movies.length > 0">Search results</span>
      <span v-else>No results for your query</span>
    </div>
    <v-pagination
        v-if="movies.length > 0"
        class="my-2"
        v-model="searchPage"
        :length="totalPages"
        :total-visible="7"
        @input="nextRoute"
    ></v-pagination>
    <v-divider>
    </v-divider>

    <v-row class="py-6">
      <v-col
          v-for="movie in movies"
          :key="movie.id"
          cols="3">
        <v-card
            v-if="movie['poster_path'] !== null"
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
          <v-responsive :aspect-ratio="0.65">
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
  name: "Search",

  props: {
    term: {
      type: String,
      required: true
    }
  },

  data() {
    return {
      service: new MovieDbService(),
      movies: [],
      totalPages: 1,
      searchPage: 1,
      imagesSourceUrl: "",
      favoriteMovies: retrieveFavoriteMovies(),
      searchTerm: this.term
    }
  },

  mounted() {
    this.imagesSourceUrl = this.service.imagesSourceBaseUrl;
    this.nextRoute();
  },

  methods: {
    nextRoute() {
      if (this.searchTerm !== this.$route.params.term) {
        this.$router.push({params: {term: this.searchTerm}}, () => {});
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

  watch: {
    searchTerm: {
      immediate: true,

      handler() {
        this.service.getMoviesBySearch(this.searchTerm, this.searchPage).then(resultMovies => {
          this.movies = resultMovies.data["results"];
          this.totalPages = resultMovies.data["total_pages"];
        }).catch(err => {
          console.log(err);
        });
      }
    },

    $route(to, from) {
      if (to.params.term !== from.params.term) {
        this.searchTerm = to.params.term;
        this.searchPage = 1;
        this.nextRoute();
      }
    }
  }
}
</script>