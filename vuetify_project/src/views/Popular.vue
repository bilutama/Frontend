<template>
  <v-container>
    <div class="text-h5 d-flex justify-center my-2">
      Movies that are popular today
    </div>
    <v-pagination
        class="my-2"
        v-model="currentPage"
        :length="pagesCountInDb"
        :total-visible="visiblePages"
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
            :href="'/movie/'+movie['id']"
        >
          <v-app-bar
              color="#F0"
          >
            <v-toolbar-title>{{ movie['title'] }}</v-toolbar-title>
            <v-spacer></v-spacer>
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
          </v-app-bar>

          <v-responsive :aspect-ratio="posterRatio">
            <v-img
                v-if="movie['poster_path'] !== null"
                :src="getImagePath(movie)"
                :aspect-ratio="posterRatio"
            ></v-img>
            <v-card-title
                v-else
                class="text--secondary justify-center"
            >
              [No poster in database]
            </v-card-title>
          </v-responsive>

          <v-card-text class="text--secondary">
            <div>{{ getMovieGenres(movie) }}</div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import MovieDbService from "../movieDbService.js";
import retrieveFavoriteMovies from "../getFavorites.js";
//import FastAverageColor from "fast-average-color";

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
      visiblePages: 7,
      posterRatio: 0.65,
      service: new MovieDbService(),
      pagesCountInDb: 500, // Specified by API
      movies: [],
      genres: [],
      imagesSourceUrl: "",
      favoriteMovies: retrieveFavoriteMovies(),
      currentPage: this.resolveCurrentPage(),
    };
  },

  beforeMount() {
    this.service.getGenres().then(result => this.genres = result['data']['genres']).catch(err => console.log(err));
    this.imagesSourceUrl = this.service.imagesSourceBaseUrl;
  },

  mounted() {
    this.nextRoute();
  },

  methods: {
    resolveCurrentPage() {
      if (this.page !== 1) {
        this.$store.commit('updatePopularMoviesCurrentPage', this.page);
        return this.page;
      }

      return this.$store.state.popularMoviesCurrentPage;
    },

    nextRoute() {
      if (this.currentPage !== parseInt(this.$route.params.page)) {
        this.$router.push({params: {page: String(this.currentPage)}}, () => {
        });
      }
    },

    getMovieGenres(movie) {
      if (this.genres.length === 0) {
        return "[Failed to load genres]";
      }

      if (movie['genre_ids'].length === 0) {
        return "[No specific genre]"
      }

      return movie['genre_ids'].map(genreId => this.genres.find(genre => genre['id'] === genreId)['name'])
          .join(" · ")
          .toLowerCase();
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
          title: movie["title"],
          poster_path: movie["poster_path"],
          vote_average: movie["vote_average"]
        });

        localStorage.setItem("favoriteMovies", JSON.stringify(this.favoriteMovies));
        return;
      }

      // Remove movie id if exists
      this.favoriteMovies.splice(movieIndex, 1);
      localStorage.setItem("favoriteMovies", JSON.stringify(this.favoriteMovies));
    },
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