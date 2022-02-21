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
    <Layout
        :movies="movies"
    >
    </Layout>
  </v-container>
</template>

<script>
import MovieDbService from "../movieDbService.js";
import Layout from "@/views/Layout";

export default {
  name: "Popular",

  components: {
    Layout
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
      pagesCountInDb: 500, // Specified in API description
      service: new MovieDbService(),
      movies: [],
      currentPage: this.getResolvedPage()
    };
  },

  mounted() {
    this.navigate();
  },

  methods: {
    getResolvedPage() {
      if (this.page !== 1) {
        this.$store.commit("updatePopularMoviesCurrentPage", this.page);
        return this.page;
      }

      return this.$store.state.popularMoviesCurrentPage;
    },

    navigate() {
      if (this.currentPage !== Number(this.$route.params.page)) {
        this.$router.push({params: {page: String(this.currentPage)}});
      }
    }
  },

  watch: {
    currentPage: {
      immediate: true,

      // Fetch movies from database
      handler() {
        this.service.getPopularMovies(this.currentPage).then(resultMovies => {
          this.movies = resultMovies.data.results;
        }).catch(err => {
          console.log(err);
        });
      }
    },

    // Update current page in store
    $route(to, from) {
      if (to.params.page !== from.params.page) {
        this.currentPage = Number(to.params.page);
        this.$store.commit("updatePopularMoviesCurrentPage", this.currentPage);
      }
    }
  }
};
</script>