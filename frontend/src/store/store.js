import { configureStore } from "@reduxjs/toolkit";

import { movieReducer } from "./slices/movie";
import { genreReducer } from "./slices/genre";
import { studioReducer } from "./slices/studio";
import { viewerReducer } from "./slices/viewer";
import { cinemaReducer } from "./slices/cinema";
import { actorReducer } from "./slices/actor";
import { directorReducer } from "./slices/director";
import { countryReducer } from "./slices/country";
import { scenaristReducer } from "./slices/scenarist";
import { ageRatingReducer } from "./slices/age-rating";
import { distributorReducer } from "./slices/distributor";
import { languageReducer } from "./slices/language";
import { screeningFormatReducer } from "./slices/screening-format";
import { sessionReducer } from "./slices/sessions";
import { sessionSeatReducer } from "./slices/session-seat";
import { paymentTypeReducer } from "./slices/payment-type";

const store = configureStore({
  reducer: {
    movies: movieReducer,
    genres: genreReducer,
    studios: studioReducer,
    viewers: viewerReducer,
    cinemas: cinemaReducer,
    actors: actorReducer,
    directors: directorReducer,
    countries: countryReducer,
    scenarists: scenaristReducer,
    ageRatings: ageRatingReducer,
    languages: languageReducer,
    distributors: distributorReducer,
    screeningFormats: screeningFormatReducer,
    session: sessionReducer,
    sessionSeats: sessionSeatReducer,
    paymentTypes: paymentTypeReducer,
  },
});

export default store;
