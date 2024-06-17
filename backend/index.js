require("dotenv").config();

const express = require("express");
const cors = require("cors");

const movieRouter = require("./src/modules/movies/movie.router");
const genreRouter = require("./src/modules/genres/genre.router");
const studioRouter = require("./src/modules/studios/studio.router");
const viewerRouter = require("./src/modules/viewers/viewer.router");
const cinemaRouter = require("./src/modules/cinemas/cinema.router");
const actorRouter = require("./src/modules/actors/actor.router");
const directorRouter = require("./src/modules/directors/director.router");
const countryRouter = require("./src/modules/countries/country.router");
const scenaristRouter = require("./src/modules/scenarists/scenarist.router");
const ageRatingRouter = require("./src/modules/age-ratings/age-rating.router");
const movieLicenseContractRouter = require("./src/modules/movie-license-contracts/movie-license-contract.router");
const distributorRouter = require("./src/modules/distributors/distributor.router");
const languageRouter = require("./src/modules/languages/language.router");
const screeningFormatRouter = require("./src/modules/screening-formats/screening-format.router");
const sessionRouter = require("./src/modules/session/session.router");
const orderRouter = require("./src/modules/orders/order.router");
const paymentTypeRouter = require("./src/modules/payment-types/payment-type.router");
const metadataRouter = require("./src/modules/metadata/metadata.router");
const analyticRouter = require("./src/modules/analytics/analytic.router");

const app = express();

app.use(cors());

app.use(express.json());

app.use("/movies", movieRouter);

app.use("/genres", genreRouter);

app.use("/studios", studioRouter);

app.use("/viewers", viewerRouter);

app.use("/cinemas", cinemaRouter);

app.use("/actors", actorRouter);

app.use("/directors", directorRouter);

app.use("/countries", countryRouter);

app.use("/scenarists", scenaristRouter);

app.use("/age-ratings", ageRatingRouter);

app.use("/movie-license-contracts", movieLicenseContractRouter);

app.use("/distributors", distributorRouter);

app.use("/languages", languageRouter);

app.use("/screening-formats", screeningFormatRouter);

app.use("/sessions", sessionRouter);

app.use("/orders", orderRouter);

app.use("/payment-types", paymentTypeRouter);

app.use("/metadata", metadataRouter);

app.use("/analytics", analyticRouter);

app.listen(process.env.PORT, () => {
  console.log("server started");
});
