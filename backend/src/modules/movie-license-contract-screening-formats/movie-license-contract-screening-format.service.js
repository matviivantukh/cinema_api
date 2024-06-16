const db = require("../../../db/db");

class MovieLicenseContractScreeningFormatService {
  static async createMovieLicenseContractScreeningFormat(
    movieLicenseContractId,
    screeningFormatId
  ) {
    return await db("movie_license_contract_screening_format").insert({
      movie_license_contract_id: movieLicenseContractId,
      screening_format_id: screeningFormatId,
    });
  }
}

module.exports = MovieLicenseContractScreeningFormatService;
