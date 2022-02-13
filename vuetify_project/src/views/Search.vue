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
import favoritesService from "@/favoritesService";
import MovieCard from "@/views/MovieCard";

export default {
  name: "Search",

  components: {
    MovieCard
  },

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
      favoritesService: new favoritesService(),
      movies: [],
      genres: [],
      totalPages: 1,
      searchPage: 1,
      imagesSourceBaseUrl: "",
      searchTerm: this.term
    }
  },

  mounted() {
    this.imagesSourceBaseUrl = this.service.imagesSourceBaseUrl;
    this.service.getGenres().then(result => this.genres = result["data"]["genres"])
        .catch(err => console.log(err));

    this.navigate();
  },

  methods: {
    navigate() {
      if (this.searchTerm !== this.$route.params.term) {
        this.$router.push({params: {term: this.searchTerm}}, () => {
        });
      }
    },

    getMovieGenres(movie) {
      if (this.genres.length === 0) {
        return "[Failed to load genres]";
      }

      if (movie["genre_ids"].length === 0) {
        return "[No specific genre]"
      }

      return movie["genre_ids"].map(genreId => this.genres.find(genre => genre["id"] === genreId)["name"])
          .join(" · ")
          .toLowerCase();
    },

    fetchMovies() {
      this.service.getMoviesBySearch(this.searchTerm, this.searchPage).then(resultMovies => {
        this.movies = resultMovies.data["results"];
        this.totalPages = resultMovies.data["total_pages"];
      }).catch(err => {
        console.log(err);
      });
    },

    getPosterPath(movie) {
      return this.imagesSourceBaseUrl + movie["poster_path"];
    },

    isFavorite(movie) {
      return this.favoritesService.isFavorite(movie);
    },

    toggleMovieFavorite(movie) {
      this.favoritesService.toggleFavorites(movie);
    }
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
        this.navigate();
      }
    }
  }
}
</script>