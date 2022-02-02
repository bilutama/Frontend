<template>
  <v-container class="py-3 ">
    <v-row>
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
            <v-card-text class="warning--text font-weight-bold ms-1">
              {{ movie.vote_average + "/10" }}
            </v-card-text>
          </v-img>
        </v-card>

      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import MovieDbService from "../movieDbService.js";

export default {
  name: "Popular",

  data() {
    return {
      service: new MovieDbService(),
      moviesCountInDb: 0,
      pagesCountInDb: 0,
      movies: [],
      imagesSourceUrl: ""
    };
  },

  mounted() {
    this.imagesSourceUrl = this.service.imagesSourceBaseUrl;

    this.service.getPopularMovies().then(resultMovies => {
      this.moviesCountInDb = resultMovies.data.total_results;
      this.pagesCountInDb = resultMovies.data.total_pages;
      this.movies = resultMovies.data.results;
    }).catch(err => {
      console.log(err);
    });
  },

  methods: {
    getImagePath(movie) {
      return (this.imagesSourceUrl + movie.poster_path);
    }
  },

  computed: {
    moviesCount: {
      get() {
        return this.value;
      },

      set() {
        this.value = this.movies.length;
      }
    },
  }
}
</script>
