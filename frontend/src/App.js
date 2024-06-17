import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";

import store from "./store/store";

import RootLayout from "./layouts/RootLayout/RootLayout";
import Movies from "./pages/movies/Movies";
import MovieDetails from "./pages/movie-details/MovieDetails";
import Viewers from "./pages/viewers/Viewers";
import Cinemas from "./pages/cinemas/Cinemas";
import Cinema from "./pages/cinema/Cinema";
import CinemaMovieSessions from "./pages/cinema-movie-sessions/CinemaMovieSessions";
import Metadata from "./pages/metadata/Metadata";
import Analytics from "./pages/analytics/Analytics";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { path: "", element: <Movies /> },
      { path: "movies/:movieId", element: <MovieDetails /> },
      { path: "viewers", element: <Viewers /> },
      { path: "cinemas", element: <Cinemas /> },
      { path: "cinemas/:cinemaId", element: <Cinema /> },
      {
        path: "cinemas/:cinemaId/movies/:movieId/sessions",
        element: <CinemaMovieSessions />,
      },
      { path: "metadata", element: <Metadata /> },
      { path: "analytics", element: <Analytics /> },
    ],
  },
]);

function App() {
  return (
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  );
}

export default App;
