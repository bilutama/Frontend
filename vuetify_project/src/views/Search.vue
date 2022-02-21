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
      <Layout
          :movies="movies"
      >
      </Layout>
    </v-row>
  </v-container>
</template>

<script>
import MovieDbService from "../movieDbService.js";
import Layout from "@/views/Layout";

export default {
  name: "Search",

  components: {
    Layout
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
      service: new MovieDbService(),
      movies: [],
      genres: [],
      totalPages: 1,
      searchPage: 1,
      searchTerm: this.term
    };
  },

  mounted() {
    this.navigate();
  },

  methods: {
    navigate() {
      if (this.searchTerm !== this.$route.params.term) {
        this.$router.push({params: {term: this.searchTerm}});
      }
    },

    fetchMovies() {
      this.service.getMoviesBySearch(this.searchTerm, this.searchPage)
          .then(resultMovies => {
            this.movies = resultMovies.data.results;
            this.totalPages = resultMovies.data.total_pages;
          })
          .catch(err => {
            console.log(err);
          });
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
};
</script>