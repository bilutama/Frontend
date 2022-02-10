export default function () {
    // Retrieve favorite movies ids from local storage
    const favoriteMovies = localStorage.getItem("favoriteMovies");

    if (favoriteMovies === null) {
        return [];
    }

    try {
        return JSON.parse(favoriteMovies);
    } catch (err) {
        localStorage.removeItem("favoriteMovies");
        return [];
    }
}