const db = require("../../../db-metadata/db");
const olapDb = require("../../../db-olap/db");
const stagingDb = require("../../../db-staging/db");

class MetadataService {
  static async getOltpMetadata() {
    return await db
      .from("source_table")
      .join(
        "source_column",
        "source_table.source_table_id",
        "source_column.source_table_id"
      )
      .select(
        "source_table.*",
        db.raw("json_agg(source_column) as source_columns")
      )
      .groupBy("source_table.source_table_id");
  }

  static async getOlapMetadataFacts() {
    return await db
      .from("dw_table")
      .join("fact", "dw_table.dw_table_id", "fact.dw_table_id")
      .join("fact_metric", "fact.fact_id", "fact_metric.fact_id")
      .join(
        "dw_attribute_column",
        "fact_metric.dw_attribute_column_id",
        "dw_attribute_column.dw_attribute_column_id"
      )
      .select(
        "dw_table.*",
        "fact.*",
        db.raw("json_agg(dw_attribute_column) as dw_attribute_columns")
      )
      .groupBy("dw_table.dw_table_id", "fact.fact_id");
  }

  static async getOlapMetadataDimensions() {
    return await db
      .from("dw_table")
      .join("dimension", "dw_table.dw_table_id", "dimension.dw_table_id")
      .join(
        "dimension_attributes",
        "dimension_attributes.dimension_id",
        "dimension.dimension_id"
      )
      .join(
        "dw_attribute_column",
        "dimension_attributes.dw_attribute_column_id",
        "dw_attribute_column.dw_attribute_column_id"
      )
      .select(
        "dw_table.*",
        "dimension.*",
        db.raw("json_agg(dw_attribute_column) as dw_attribute_columns")
      )
      .groupBy("dw_table.dw_table_id", "dimension.dimension_id");
  }

  static async getDataLoadHistory() {
    return await db("data_load_history").orderBy("load_datetime", "desc");
  }

  static async primaryFill() {
    await stagingDb.raw("CALL oltp_to_staging_primary()");
    await olapDb.raw("CALL staging_to_olap_primary()");
  }

  static async incrementalFill() {
    await stagingDb.raw("CALL fill_staging_from_oltp_incremental()");
    await olapDb.raw("CALL staging_to_olap_inc()");
  }
}

module.exports = MetadataService;
