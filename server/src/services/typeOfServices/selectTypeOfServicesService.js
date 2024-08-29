import getPool from "../../db/getPool.js";

const selectTypeOfServiceService = async (type, city, price) => {
  const pool = await getPool();

  let sqlQuery =
    "SELECT id, image, type, description, city, price from typeOfServices WHERE deletedAt IS NULL";

  let sqlValues = [];

  if (type) {
    sqlQuery += " AND type = ?";
    sqlValues.push(type);
  }

  if (city) {
    sqlQuery += " AND city = ?";
    sqlValues.push(city);
  }

  if (price) {
    sqlQuery += ` ORDER BY price ${price.toUpperCase()}`;
  }

  const [service] = await pool.query(sqlQuery, sqlValues);

  return service;
};

export default selectTypeOfServiceService;
