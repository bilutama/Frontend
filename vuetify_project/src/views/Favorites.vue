<template>
  <v-container>
    <div v-if="favoritesExist" class="text-h5 d-flex justify-center my-2">
      Your favorite movies
    </div>
    <div v-else class="text-h5 d-flex justify-center my-2">
      No favorites yet
    </div>
    <v-divider>
    </v-divider>
    <v-row class="py-6">
      <v-col
          v-for="movie in favoriteMovies"
          :key="movie['id']"
          :cols="adaptiveCols"
      >
        <MovieCard
            :key="movie['id']"
            :movie="movie"
            :is-favorite="isFavorite(movie)"
            @toggleFavorite="removeFromFavorite(movie)"
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
import MovieCard from "@/views/MovieCard";

export default {
  name: "Favorites",

  components: {
    MovieCard
  },

  data() {
    return {
      posterRatio: 0.65,
      service: new MovieDbService(),
      genresIds: [],
      favoriteMovies: retrieveFavoriteMovies(),
      favoritesExist: false,
      imagesSourceBaseUrl: "",
    };
  },

  mounted() {
    this.service.getGenres().then(result => this.genresIds = result['data']['genres'])
        .catch(err => console.log(err));
    this.imagesSourceBaseUrl = this.service.imagesSourceBaseUrl;
  },

  methods: {
    getMovieGenres(movie) {
      if (this.genresIds.length === 0) {
        return "[Failed to load genres]";
      }

      if (movie['genre_ids'].length === 0) {
        return "[Genre is not specified]"
      }

      return movie['genre_ids'].map(genreId => this.genresIds.find(genre => genre['id'] === genreId)['name'])
          .join(" · ")
          .toLowerCase();
    },

    getPosterPath(movie) {
      return (this.imagesSourceBaseUrl + movie["poster_path"]);
    },

    isFavorite(movie) {
      return this.favoriteMovies.findIndex(item => item["id"] === movie["id"]) !== -1;
    },

    removeFromFavorite(movie) {
      const movieIndex = this.favoriteMovies.findIndex(item => item["id"] === movie["id"]);

      if (movieIndex !== -1) {
        this.favoriteMovies.splice(movieIndex, 1);
        localStorage.setItem("favoriteMovies", JSON.stringify(this.favoriteMovies));
      }
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
    favoriteMovies: {
      immediate: true,
      deep: true,

      handler() {
        this.favoritesExist = this.favoriteMovies.length > 0;
      }
    }
  }
}
</script>
