const axios = require('axios').default;
import apiKey from "./apiConfig.js";
import qs from "qs";

export default class {
    constructor() {
        this.host = "https://api.themoviedb.org/3";
        this.getPopularUrl = "/movie/popular";
        this.searchUrl = "/search/movie";
        this.genresUrl = "/genre/movie/list";
        this.movieDetailsUrl = "/movie";
        this.movieRecommendationsUrl = "/recommendations"; // Full url example: /movie/{movie_id}/recommendations
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
        return this.get(this.host + this.getPopularUrl, {
            api_key: this.apiKeyValue,
            language: "en-US",
            page: page
        });
    }

    /* getPopularMovies() - response object structure:
    adult: false
    backdrop_path: "/1Rr5SrvHxMXHu5RjKpaMba8VTzi.jpg"
    genre_ids: [28, 12, 878]
    id: 634649
    original_language: "en"
    original_title: "Spider-Man: No Way Home"
    overview: "Peter Parker is unmasked and ..."
    popularity: 9425.322
    poster_path: "/1g0dhYtq4irTY1GPXvft6k4YLjm.jpg"
    release_date: "2021-12-15"
    title: "Spider-Man: No Way Home"
    video: false
    vote_average: 8.5
    vote_count: 5898
    */

    getMoviesBySearch(term, page) {
        return this.get(this.host + this.searchUrl, {
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

    //
    // getMovieGenres(movieId) {
    //     // TODO
    //     return null;
    // }
    //
    // getMovieDetails(movieId) {
    //     return null;
    // }
}