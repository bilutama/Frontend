export default class {
    constructor() {
        this.movies = this.fetchFavorites();
    }

    fetchFavorites() {
        const favorites = localStorage.getItem("favoriteMovies");

        if (favorites === null) {
            return [];
        }

        try {
            return JSON.parse(favorites);
        } catch (err) {
            console.log(err);
            localStorage.removeItem("favoriteMovies");
            return [];
        }
    }

    toggleFavorites(movie) {
        const movieIndex = this.movies.findIndex(item => item["id"] === movie["id"]);

        // Add movie id if it doesn't exist
        if (movieIndex === -1) {
            let genre_ids = [];

            // If movie is being added from Popular or Search results,
            // genre ids are represented with an array like [10, 25, 34].
            // From a movie card ids are represented with array of objects [{id: 10, name: '...'}, ...]
            if (typeof movie["genre_ids"] !== "undefined") {
                genre_ids = movie["genre_ids"];
            } else {
                try {
                    genre_ids = movie["genres"].map(item => item["id"]);
                } catch (err) {
                    console.log(err);
                }
            }

            this.movies.push({
                id: movie["id"],
                title: movie["title"],
                poster_path: movie["poster_path"],
                vote_average: movie["vote_average"],
                genre_ids
            });
        } else {
            // Remove movie id if exists
            this.movies.splice(movieIndex, 1);
        }

        localStorage.setItem("favoriteMovies", JSON.stringify(this.movies));
    }

    isFavorite(movie) {
        return this.movies.findIndex(item => item["id"] === movie["id"]) !== -1;
    }
}