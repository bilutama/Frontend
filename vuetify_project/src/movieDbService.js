const axios = require('axios').default;
import apiKey from "./apiConfig.js";
import qs from "qs";

export default class {
    constructor() {
        this.apiUrl = "https://api.themoviedb.org/3";
        this.getPopularUrl = "/movie/popular";
        this.searchUrl = "/search/movie";
        this.genresUrl = "/genre/movie/list";
        this.movieDetailsUrl = "/movie";
        this.movieRecommendationsUrl = "/recommendations"; // Full url example: /movie/{movie_id}/recommendations
        this.apiKeyValue = apiKey.apiKey;
    }

    get(url, data) {
        return axios.get(url, {
                params: data
            }
        )
    };

    post(url, data) {
        return axios.post(url, this.qs.stringify(data));
    }

    getContacts(term) {
        return this.get(this.apiUrl + "getContacts", {term});
    }

    addContact(contact) {
        return this.post(this.apiUrl + "addContact", contact);
    }

    deleteContact(ids) {
        return this.post(this.apiUrl + "deleteContact", {ids});
    }
}