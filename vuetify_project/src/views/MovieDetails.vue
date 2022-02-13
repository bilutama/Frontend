<template>
  <v-container class="py-3 ">
    <v-row>
      <v-col cols="5">
        <v-card
            elevation="10">
          <v-responsive :aspect-ratio="0.75">
            <v-img v-if="movie['poster_path'] !== null"
                   :src="imagesSource"
            >
            </v-img>
            <v-card-title
                class="text--secondary justify-center"
                v-else
            >
              [No poster in database]
            </v-card-title>
          </v-responsive>
        </v-card>
      </v-col>
      <v-col cols="7">
        <v-card elevation="5">
          <v-card-title
              class="text-h5"
          >
            {{ movie['title'] }}
          </v-card-title>
          <v-card-subtitle
              class="text-subtitle-1"
          >
            {{ genres }}
          </v-card-subtitle>

          <v-card-text class="text-subtitle-1 font-weight-light">
            Release date: {{ movie['release_date'] }}
          </v-card-text>

          <v-card-text class="text-subtitle-1 font-weight-light black--text">
            {{ movie['overview'] }}
          </v-card-text>

          <v-card-actions>
            <v-btn
                :color="isFavorite(movie) ? 'pink' : 'grey lighten-2'"
                text
                @click="toggleMovieFavorite(movie)"
            >
              <v-icon v-if="isFavorite(movie)">mdi-heart</v-icon>
              <span v-if="isFavorite(movie)">In favorites</span>
              <span v-else>Add to favorites</span>
            </v-btn>
          </v-card-actions>

          <v-card-text
              v-if="recommendedMovies.length > 0"
              class="text-subtitle-1"
          >
            YOU MAY ALSO LIKE:
          </v-card-text>

          <v-slide-group
              v-if="recommendedMovies.length > 0"
              class="pa-1"
              center-active
              show-arrows
          >
            <v-slide-item
                v-for="movie in recommendedMovies"
                :key="movie['id']"
            >
              <v-card
                  :href="'/movie/'+movie['id']"
                  class="ma-1"
                  width="100"
              >
                <v-img
                    :src="getPosterPath(movie)"
                    :aspect-ratio="posterRatio"
                ></v-img>
              </v-card>
            </v-slide-item>
          </v-slide-group>

        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import MovieDbService from "../movieDbService.js";
import retrieveFavoriteMovies from "@/getFavorites";

export default {
  name: "Movie",

  data() {
    return {
      service: new MovieDbService(),
      imagesSource: "",
      imagesSourceBaseUrl: "",
      posterRatio: 0.65,
      movie: {},
      favoriteMovies: retrieveFavoriteMovies(),
      recommendedMovies: [],
      genres: "",
      genreIds: []
    };
  },

  mounted() {
    this.imagesSourceBaseUrl = this.service.imagesSourceBaseUrl;
    this.fetchMovieDetails();
    this.fetchRecommendedMovies();
  },

  methods: {
    fetchMovieDetails() {
      const movieId = this.$route.params.movieid;

      this.service.getMovieDetails(movieId).then(result => {
        this.movie = result.data;
      }).catch(err => {
        console.log(err);
      });
    },

    getPosterPath(movie) {
      return (this.imagesSourceBaseUrl + movie["poster_path"]);
    },

    fetchRecommendedMovies() {
      const movieId = this.$route.params.movieid;

      this.service.getMovieRecommendations(movieId).then(result => {
        this.recommendedMovies = result.data['results'];
      }).catch(err => {
        console.log(err);
      });
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
          genre_ids: this.genreIds
        });

        localStorage.setItem("favoriteMovies", JSON.stringify(this.favoriteMovies));
        return;
      }

      // Remove movie id if exists
      this.favoriteMovies.splice(movieIndex, 1);
      localStorage.setItem("favoriteMovies", JSON.stringify(this.favoriteMovies));
    },

    isFavorite(movie) {
      return this.favoriteMovies.findIndex(item => item["id"] === movie["id"]) !== -1;
    },
  },

  watch: {
    movie: {
      immediate: false,

      handler() {
        this.imagesSource = this.service.imagesSourceFullUrl + this.movie['poster_path'];
        this.genres = this.movie['genres'].map(item => item['name']).join(', ');
        this.genreIds = this.movie['genres'].map(item => item['id']);
      }
    }
  }
}
</script>
