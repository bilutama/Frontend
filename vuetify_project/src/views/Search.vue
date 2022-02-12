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

          <v-responsive
              :aspect-ratio="posterRatio"
          >
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
      visiblePages: 7,
      posterRatio: 0.65,
      service: new MovieDbService(),
      movies: [],
      genres: [],
      totalPages: 1,
      searchPage: 1,
      imagesSourceUrl: "",
      favoriteMovies: retrieveFavoriteMovies(),
      searchTerm: this.term
    }
  },

  beforeMount() {
    this.service.getGenres().then(result => this.genres = result['data']['genres']).catch(err => console.log(err));
    this.imagesSourceUrl = this.service.imagesSourceBaseUrl;
  },

  mounted() {
    this.nextRoute();
  },

  methods: {
    nextRoute() {
      if (this.searchTerm !== this.$route.params.term) {
        this.$router.push({params: {term: this.searchTerm}}, () => {
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

    fetchMovies() {
      this.service.getMoviesBySearch(this.searchTerm, this.searchPage).then(resultMovies => {
        this.movies = resultMovies.data["results"];
        this.totalPages = resultMovies.data["total_pages"];
      }).catch(err => {
        console.log(err);
      });
    },

    toggleMovieFavorite(movie) {
      const movieIndex = this.favoriteMovies.findIndex(item => item["id"] === movie["id"]);

      // Add movie id if doesn't exist
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
    }
  },

  watch: {
    searchTerm: {
      immediate: true,

      handler() {
        this.fetchMovies();
      }
    },

    searchPage: {
      immediate: true,

      handler() {
        this.fetchMovies();
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