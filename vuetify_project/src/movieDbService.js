const axios = require('axios').default;
import apiKey from "./apiConfig.js";
import qs from "qs";

export default class {
    constructor() {
        this.hostApi = "https://api.themoviedb.org/3";
        this.getPopularUrl = "/movie/popular";
        this.searchUrl = "/search/movie";
        this.genresUrl = "/genre/movie/list";
        this.movieDetailsUrl = "/movie";
        this.movieRecommendationsUrl = "/recommendations"; // Full url example: /movie/{movie_id}/recommendations
        this.imageSourceBaseUrl = "https://image.tmdb.org/t/p/";
        this.apiKeyValue = apiKey.apiKey;
    }

    get(url, query) {
        return axios.get(url, {
                params: query
            }
        )
    }

    post(url, query) {
        return axios.post(url, qs.stringify(query));
    }

    getPopularMovies(page) {
        return this.get(this.hostApi + this.getPopularUrl, {
            api_key: this.apiKeyValue,
            language: "en-US",
            page: page
        });
    }

    /* getPopularMovies() - response object structure:
    adult: false
    backdrop_path: "/backdrop_image_name.jpg"
    genre_ids: [28, 12, 878]
    id: 634649
    original_language: "en"
    original_title: "Original movie title text"
    overview: "some text"
    popularity: 9425.322
    poster_path: "/image_name.jpg"
    release_date: "2021-12-15"
    title: "Movie title"
    video: false
    vote_average: 8.5
    vote_count: 5898
    */

    getMoviesBySearch(term, page) {
        return this.get(this.hostApi + this.genresUrl, {
            api_key: this.apiKeyValue,
            language: "en-US",
            query: term,
            page: page
            /* optional:
            include_adult
            region
            year
            primary_release_year
            */
        });
    }

    getMovieGenres(movieId) {
        return this.get(this.hostApi + this.searchUrl, {
            api_key: this.apiKeyValue,
            language: "en-US",
            query: term,
            page: page
            /* optional:
            language:
            */
        });
    }
    //
    // getMovieDetails(movieId) {
    //     return null;
    // }
}