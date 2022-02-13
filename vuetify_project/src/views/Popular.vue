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
        @input="navigate"
    ></v-pagination>
    <v-divider>
    </v-divider>
    <v-row class="py-6">
      <v-col
          v-for="movie in movies"
          :key="movie['id']"
          :cols="adaptiveCols"
      >
        <MovieCard
            :key="movie['id']"
            :movie="movie"
            :is-favorite="isFavorite(movie)"
            @toggleFavorite="toggleMovieFavorite(movie)"
            :movie-genres="getMovieGenres(movie)"
            :poster-path="getPosterPath(movie)"
        >
        </MovieCard>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import MovieDbService from "../movieDbService.js";
import retrieveFavoriteMovies from "../getFavorites.js";
//import FastAverageColor from "fast-average-color";
import MovieCard from "@/views/MovieCard";

export default {
  name: "Popular",

  components: {
    MovieCard
  },

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
      genreIds: [],
      imagesSourceBaseUrl: "",
      favoriteMovies: retrieveFavoriteMovies(),
      currentPage: this.getResolvedPage(),
    };
  },

  mounted() {
    this.service.getGenres().then(result => this.genreIds = result['data']['genres'])
        .catch(err => console.log(err));

    this.imagesSourceBaseUrl = this.service.imagesSourceBaseUrl;
    this.navigate();
  },

  methods: {
    getResolvedPage() {
      if (this.page !== 1) {
        this.$store.commit('updatePopularMoviesCurrentPage', this.page);
        return this.page;
      }

      return this.$store.state.popularMoviesCurrentPage;
    },

    navigate() {
      if (this.currentPage !== Number(this.$route.params.page)) {
        this.$router.push({params: {page: String(this.currentPage)}}, () => {
        });
      }
    },

    getMovieGenres(movie) {
      if (this.genreIds.length === 0) {
        return "[Failed to load genres]";
      }

      if (movie['genre_ids'].length === 0) {
        return "[Genre is not specified]"
      }

      return movie['genre_ids'].map(genreId => this.genreIds.find(genre => genre['id'] === genreId)['name'])
          .join(" · ")
          .toLowerCase();
    },

    getPosterPath(movie) {
      return this.imagesSourceBaseUrl + movie["poster_path"];
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
          vote_average: movie["vote_average"],
          genre_ids: movie["genre_ids"]
        });

        localStorage.setItem("favoriteMovies", JSON.stringify(this.favoriteMovies));
        return;
      }

      // Remove movie id if exists
      this.favoriteMovies.splice(movieIndex, 1);
      localStorage.setItem("favoriteMovies", JSON.stringify(this.favoriteMovies));
    },
  },

  computed: {
    adaptiveCols: {
      get() {
        if (this.$vuetify.breakpoint.lgAndUp) {
          return 3;
        } else if (this.$vuetify.breakpoint.smAndUp) {
          return 6;
        } else {
          return 12
        }
      }
    }
  },

  watch: {
    currentPage: {
      immediate: true,

      // Fetch movies from database
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