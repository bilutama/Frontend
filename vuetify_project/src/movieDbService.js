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

        this.genres = this.get(this.hostApi + "/genre/movie/list", {
            api_key: this.apiKeyValue,
            language: "en-US"
        });
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

    /* getPopularMovies() - response object example:
    {
    "page": 1,
    "results": [
        {
            "poster_path": "/poster.jpg",
            "adult": false,
            "overview": "overview text",
            "release_date": "2016-08-03",
            "genre_ids": [14, 28, 80],
            "id": 297761,
            "original_title": "Title",
            "original_language": "en",
            "title": "Title",
            "backdrop_path": "/backdrop.jpg",
            "popularity": 48.261451,
            "vote_count": 1466,
            "video": false,
            "vote_average": 5.91
        },
        {...}
    ],
    "total_results": 19629,
    "total_pages": 982
    }*/
    getPopularMovies(page) {
        return this.get(this.getPopularUrl, {
            api_key: this.apiKeyValue,
            language: "en-US",
            page: typeof page === "undefined" ? 1 : page
        });
    }

    getMoviesBySearch(query, page) {
        return this.get(this.searchUrl, {
            api_key: this.apiKeyValue,
            language: "en-US",
            query,
            page
            /* optional:
            include_adult
            region
            year
            primary_release_year
            */
        });
    }

    /*
    getMovieDetails() - Response object example:
    {
      "adult": false,
      "backdrop_path": "/backdrop.jpg",
      "belongs_to_collection": null,
      "budget": 10000000,
      "genres": [{"id": 18, "name": "Drama"}, {...}],
      "homepage": "",
      "id": 550,
      "imdb_id": "tt0137523",
      "original_language": "en",
      "original_title": "Fight Club",
      "overview": "some text",
      "popularity": 0.5,
      "poster_path": null,
      "production_companies": [{"id": 508, "logo_path": "logo.png", "name": "Company", "origin_country": "US"}, {...}],
      "production_countries": [{"iso_3166_1": "US", "name": "United States of America"}, {...}],
      "release_date": "1999-10-12",
      "revenue": 100853753,
      "runtime": 139,
      "spoken_languages": [{"iso_639_1": "en", "name": "English"}, {...}],
      "status": "Released",
      "tagline": "Some text",
      "title": "Fight Club",
      "video": false,
      "vote_average": 7.8,
      "vote_count": 3439
    }
    */
    getMovieDetails(movieId) {
        return this.get(`${this.movieUrl}/${movieId}`, {
            api_key: this.apiKeyValue,
            language: "en-US",
        });
    }

    /*
    getMovieRecommendations() - Response object example
     {
      "page": 1,
      "results": [
            {
              "adult": false,
              "backdrop_path": null,
              "genre_ids": [28, ...],
              "id": 106912,
              "original_language": "en",
              "original_title": "Movie Original Title",
              "overview": "Some text",
              "release_date": "1994-05-09",
              "poster_path": null,
              "popularity": 1.012564,
              "title": "Movie Title",
              "video": false,
              "vote_average": 0,
              "vote_count": 0
            },
            { ...
            }
      ],
      "total_pages": 9,
      "total_results": 168
    }
    * */
    getMovieRecommendations(movieId, page) {
        return this.get(`${this.movieUrl}/${movieId}/recommendations`, {
            api_key: this.apiKeyValue,
            // optional:
            language: "en-US",
            page // max = 1000
        });
    }

    getSimilarMovies(movieId, page) {
        return this.get(`${this.movieUrl}/${movieId}/similar`, {
            api_key: this.apiKeyValue,
            // optional:
            language: "en-US",
            page // max = 1000
        });
    }
}