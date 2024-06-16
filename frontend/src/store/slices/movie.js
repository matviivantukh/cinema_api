import { createSlice } from "@reduxjs/toolkit";

const movieSlice = createSlice({
  name: "movie",
  initialState: {
    movies: [],
    cinemaMovies: [],
    pagesCount: null,
    movie: null,
  },
  reducers: {
    getAllMovies(state, action) {
      state.movies = action.payload.movies;
      state.pagesCount = action.payload.pagesCount;
    },
    getOneMovie(state, action) {
      state.movie = action.payload;
    },
    getCinemaMovies(state, action) {
      state.cinemaMovies = action.payload.movies;
    },
    createMovie(state, action) {
      state.movies = [action.payload, ...state.movies];
    },
    deleteMovie(state, action) {
      state.movie =
        action.payload.movieId === state.movie?.movie_id ? null : state.movie;
      state.movies = state.movies.filter(
        (movie) => movie.movie_id !== action.payload.movieId
      );
    },
    addMovieLicense(state, action) {
      state.movie.movie_license_contract = action.payload.movieLicenseContract;
    },
  },
});

export const movieActions = movieSlice.actions;
export const movieReducer = movieSlice.reducer;
