import getPool from '../../db/getPool.js';

const selectTypeOfServiceService = async (type, city, price) => {
    const pool = await getPool();

    let sqlQuery = ` SELECT 
      t.id, 
      t.image, 
      t.type, 
      t.description, 
      t.city, 
      t.price,
      (SELECT AVG(rating) FROM services s WHERE s.typeOfServicesId = t.id) AS averageRating
    FROM 
      typeOfServices t
    WHERE 
      t.deletedAt IS NULL`;

    let sqlValues = [];

    if (type) {
        sqlQuery += ' AND type = ?';
        sqlValues.push(type);
    }

    if (city) {
        sqlQuery += ' AND city = ?';
        sqlValues.push(city);
    }

    if (price) {
        sqlQuery += ` ORDER BY price ${price.toUpperCase()}`;
    }

    const [service] = await pool.query(sqlQuery, sqlValues);

    return service;
};

export default selectTypeOfServiceService;
