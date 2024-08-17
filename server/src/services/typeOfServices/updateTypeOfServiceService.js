import getPool from '../../db/getPool.js';
import generateErrorUtil from '../../utils/generateErrorUtil.js';

const updateTypeOfServiceService = async (typeId, type, city, description) => {
  const pool = await getPool();

  const [service] = await pool.query(
    `
        SELECT id FROM typeOfServices WHERE id = ?
            `,
    [typeId]
  );

  if (!service.length) {
    generateErrorUtil('El servicio que quieres editar no existe', 409);
  }

  const [typeCity] = await pool.query(
    `
        SELECT id FROM typeOfServices WHERE type = ? AND city = ?
            `,
    [type, city]
  );

  if (typeCity.length) {
    generateErrorUtil('El servicio que quieres editar ya existe', 409);
    // SI SE TIENE YA SELECCIONADO EL SERVICIO POR ---ID---, que es que sí porque si no te da error de que "el servicion no existe" (línea 15 en este archivo), no habría que hacer comprobaciones de 'type' y 'city'. Si quieres cambiar las 'description', pero además llegan type y city por body, no te va a dejar actualizar description por el error de línea 26 en este archivo
  }

  if (type && city && description) {
    await pool.query(
      'UPDATE typeOfServices SET type = ?, description = ?, city = ? WHERE id = ?',
      [type, description, city, typeId]
    );
  } else if (type && city) {
    await pool.query(
      'UPDATE typeOfServices SET type = ?, city = ? WHERE id = ?',
      [type, city, typeId]
    );
  } else if (type && description) {
    await pool.query(
      'UPDATE typeOfServices SET type = ?, description = ? WHERE id = ?',
      [type, description, typeId]
    );
  } else if (city && description) {
    await pool.query(
      'UPDATE typeOfServices SET city = ?, description = ? WHERE id = ?',
      [city, description, typeId]
    );
  } else if (city && !type && !description) {
    await pool.query('UPDATE typeOfServices SET city = WHERE id = ?', [
      city,
      typeId,
    ]);
  } else if (!city && type && !description) {
    await pool.query('UPDATE typeOfServices SET type = WHERE id = ?', [
      type,
      typeId,
    ]);
  } else if (!city && !type && description) {
    await pool.query('UPDATE typeOfServices SET description = WHERE id = ?', [
      description,
      typeId,
    ]);
  }
};

// let updateString, paramsString;
// await pool.query('${updateString}', paramsString);
// CONSULTAR CON STEFANO!!!!!!!!

export default updateTypeOfServiceService;
