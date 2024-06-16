const db = require("../../../db/db");
const { v4: uuidv4 } = require("uuid");

const MovieLicenseContractScreeningFormatService = require("../movie-license-contract-screening-formats/movie-license-contract-screening-format.service");

class MovieLicenseContractService {
  static async getMovieLicenseContract(movieLicenseContractId) {
    const [movieLicenseContract] = await db("movie_license_contract")
      .where("movie_license_contract_id", "=", movieLicenseContractId)
      .leftJoin(
        "distributor",
        "distributor.distributor_id",
        "=",
        "movie_license_contract.distributor_id"
      )
      .select(
        "movie_license_contract.*",
        db.raw("row_to_json(distributor) as distributor")
      );
    return movieLicenseContract;
  }

  static async createMovieLicenseContract(licenseContract) {
    const [newLicenseContract] = await db("movie_license_contract")
      .insert({
        movie_id: licenseContract.movieId,
        language_id: licenseContract.languageId,
        distributor_id: licenseContract.distributorId,
        percentage_of_sales: licenseContract.percentageOfSales,
        minimum_price: licenseContract.minimumPrice,
        start_of_screening_date: licenseContract.startOfScreeningDate,
        end_of_screening_date: licenseContract.endOfScreeningDate,
        contract_date: new Date().toISOString().slice(0, 10),
        contract_number: uuidv4(),
      })
      .returning("*");
    await db("movie_license_contract_accrual").insert({
      movie_license_contract_id: newLicenseContract.movie_license_contract_id,
      total_sum: 0,
      ticket_count: 0,
      last_ticket_datetime: null,
    });
    await Promise.all(
      licenseContract.screeningFormatIds.map((screeningFormatId) =>
        MovieLicenseContractScreeningFormatService.createMovieLicenseContractScreeningFormat(
          newLicenseContract.movie_license_contract_id,
          screeningFormatId
        )
      )
    );
    return await MovieLicenseContractService.getMovieLicenseContract(
      newLicenseContract.movie_license_contract_id
    );
  }
}

module.exports = MovieLicenseContractService;
