const db = require("../../../db-olap/db");

const dimensionToPrimaryKeyMap = {
  movie_dim: "movie_id",
  cinema_dim: "cinema_id",
  gender_dim: "gender_id",
  movie_license_contract_dim: "movie_license_contract_id",
};

class AnalyticService {
  static async getAllByFilters(filters) {
    if (filters.cube === "movie_license_contract_accrual_fact") {
      return await db
        .from(filters.cube)
        .join(
          "movie_license_contract_dim",
          `${filters.cube}.contract_id`,
          "=",
          "movie_license_contract_dim.movie_license_contract_id"
        )
        .select(
          ...filters.measurments.map((measurment) =>
            db.raw(`sum(${filters.cube}.${measurment}) as ${measurment}`)
          ),
          ...filters.dimensions.map((dimension) =>
            db.raw(`row_to_json(${dimension}) as ${dimension}`)
          )
        )
        .groupBy(
          ...filters.dimensions.map(
            (dimension) => `${dimension}.${dimensionToPrimaryKeyMap[dimension]}`
          )
        );
    }
    return await db
      .from(filters.cube)
      .join("movie_dim", `${filters.cube}.movie_id`, "=", "movie_dim.movie_id")
      .join(
        "cinema_dim",
        `${filters.cube}.cinema_id`,
        "=",
        "cinema_dim.cinema_id"
      )
      .join(
        "gender_dim",
        `${filters.cube}.gender_id`,
        "=",
        "gender_dim.gender_id"
      )
      .select(
        ...filters.measurments.map((measurment) =>
          db.raw(`sum(${filters.cube}.${measurment}) as ${measurment}`)
        ),
        ...filters.dimensions.map((dimension) =>
          db.raw(`row_to_json(${dimension}) as ${dimension}`)
        )
      )
      .groupBy(
        ...filters.dimensions.map(
          (dimension) => `${dimension}.${dimensionToPrimaryKeyMap[dimension]}`
        )
      );
  }
}

module.exports = AnalyticService;
