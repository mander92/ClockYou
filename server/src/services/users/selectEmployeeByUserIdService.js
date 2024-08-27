import getPool from '../../db/getPool.js';
import generateErrorUtil from '../../utils/generateErrorUtil.js';

const selectEmployeeByUserId = async (employeeId) => {
    const pool = await getPool();

    const [employee] = await pool.query(
        `
        SELECT * FROM users WHERE id = ? AND role = 'employee'
        `,
        [employeeId]
    );

    if (!employee.length)
        generateErrorUtil('No existen empleados asociados a ese ID', 404);

    return employee;
};

export default selectEmployeeByUserId;
