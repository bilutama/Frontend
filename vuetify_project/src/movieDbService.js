import axios from "axios";
import apiKey from "./apiConfig.js";
import qs from "qs";

export default class {
    constructor() {
        this.apiKeyValue = apiKey.apiKey;
        this.hostApi = "https://api.themoviedb.org/3";
        this.getPopularUrl = this.hostApi + "/movie/popular";
        this.searchUrl = this.hostApi + "/search/movie";
        this.movieUrl = this.hostApi + "/movie";
        this.imagesSourceBaseUrl = "https://image.tmdb.org/t/p/w500";
        this.imagesSourceFullUrl = "https://image.tmdb.org/t/p/original";
    }

    get(url, query) {
        return axios.get(url, {
                params: query
            }
        );
    }

    post(url, query) {
        return axios.post(url, qs.stringify(query));
    }

    getGenres(language) {
        return this.get(this.hostApi + "/genre/movie/list", {
            api_key: this.apiKeyValue,
            // optional
            language
        });
    }

    getPopularMovies(page, language) {
        return this.get(this.getPopularUrl, {
            api_key: this.apiKeyValue,
            page: typeof page === "undefined" ? 1 : page,
            // optional
            language
        });
    }

    getMoviesBySearch(query, page, language, include_adult, region, year, primary_release_year) {
        return this.get(this.searchUrl, {
            api_key: this.apiKeyValue,
            language, // optional
            query,
            page,
            // optional:
            include_adult,
            region,
            year,
            primary_release_year
        });
    }

    getMovieDetails(movieId, language) {
        return this.get(`${this.movieUrl}/${movieId}`, {
            api_key: this.apiKeyValue,
            language
        });
    }

    getMovieRecommendations(movieId, page, language) {
        return this.get(`${this.movieUrl}/${movieId}/recommendations`, {
            api_key: this.apiKeyValue,
            // optional:
            page, // max = 1000
            language
        });
    }

    getSimilarMovies(movieId, page, language) {
        return this.get(`${this.movieUrl}/${movieId}/similar`, {
            api_key: this.apiKeyValue,
            // optional:
            page, // max = 1000
            language
        });
    }
}