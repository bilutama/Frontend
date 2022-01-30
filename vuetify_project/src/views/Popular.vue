<template>
  <v-container>
    <v-row>
      <v-col
          v-for="movie in movies"
          :key="movie.id"
          cols="3"
      >
        <v-responsive :aspect-ratio="9/12">
          <v-card
          :href="'/movie/'+movie.id">
            <v-img
                :src="getImagePath(movie)"
            >
              <v-row
                  align="center"
                  class="mx-3 py-5"
              >
                <v-rating class="amber--text"
                          :value="movie.vote_average/2"
                          color="warning"
                          background-color="grey"
                          dense
                          length="5"
                          half-increments
                          readonly
                          size="16"
                ></v-rating>

                <div class="warning--text ms-2">
                  {{ movie.vote_average + "/10" }}
                </div>
              </v-row>
            </v-img>
          </v-card>
        </v-responsive>
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
