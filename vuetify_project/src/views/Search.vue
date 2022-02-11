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
        @input="next"
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
  name: "Search",

  props: {
    term: {
      type: String,
      required: true
    },
    page: {
      type: Number,
      required: true
    }
  },

  data() {
    return {
      service: new MovieDbService(),
      movies: [],
      totalPages: 1,
      searchPage: this.resolveSearchPage(),
      imagesSourceUrl: "",
      favoriteMovies: retrieveFavoriteMovies(),
      searchTerm: this.term
    }
  },

  mounted() {
    this.imagesSourceUrl = this.service.imagesSourceBaseUrl;
    this.next();
  },

  methods: {
    resolveSearchPage() {
      if (this.page !== 1) {
        this.$store.commit('updateSearchResultsPage', this.page);
        return this.page;
      }

      return this.$store.state.currentSearchResultsPage;
    },

    next() {
      const updateRequired = (this.searchPage !== Number(this.$route.params.page)) || (this.searchTerm !== this.$route.params.term);

      console.log("UPDATE REQUIRED = " + updateRequired);

      if (updateRequired) {
        console.log("TERM = " + this.$route.params.term);
        console.log("PAGE = " + Number(this.$route.params.page));

        this.$router.push({
          params: {
            term: this.searchTerm,
            page: this.searchPage
          }
        }, () => {});
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
    searchPage: {
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
      }

      if (to.params.page !== from.params.page) {
        this.searchPage = Number(to.params.page);
        this.$store.commit('updateSearchResultsPage', this.searchPage);
      } else {
        this.searchPage = 1;
      }

      this.next();
    },

    // Validate route before update
    beforeRouteUpdate() {
      if (this.searchPage > this.totalPages) {
        console.log("BEFORE R UPDATE");
        this.$router.push({name: 'NotFound'});
      }
    }
  }
}
</script>