const { VITE_CLIENT_URL } = import.meta.env;

import { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../../../context/AuthContext';
import { fetchAllShiftRecordServices } from '../../../services/shiftRecordServices';
import toast from 'react-hot-toast';
import { NavLink } from 'react-router-dom';

const Shifts = () => {
    const { authToken } = useContext(AuthContext);
    const [data, setData] = useState([]);
    const [employeeId, setEmployeeId] = useState('');
    const [serviceId, setServiceId] = useState('');

    const resetFilter = (e) => {
        e.preventDefault();
        setEmployeeId('');
        setServiceId('');
    };

    useEffect(() => {
        const getShifts = async () => {
            const searchParams = new URLSearchParams({
                employeeId: employeeId,
                serviceId: serviceId,
            });
            const searchParamsToString = searchParams.toString();
            try {
                const data = await fetchAllShiftRecordServices(
                    searchParamsToString,
                    authToken
                );
                setData(data.data);
            } catch (error) {
                toast.error(error.message, {
                    id: 'error',
                });
            }
        };
        getShifts();
    }, [employeeId, serviceId, authToken]);

    const employeeNotRepeated = [
        ...new Set(
            data
                .map((shiftRecord) => shiftRecord.employeeId)
                .filter((employeeId) => employeeId && employeeId.trim())
        ),
    ];

    const serviceNotRepeated = [
        ...new Set(
            data
                .map((shiftRecord) => shiftRecord.serviceId)
                .filter((serviceId) => serviceId && serviceId.trim())
        ),
    ];
    return (
        <>
            <form>
                <select
                    name='employeeId'
                    id='employeeId'
                    value={employeeId}
                    onChange={(e) => {
                        setEmployeeId(e.target.value);
                    }}
                >
                    <option
                        value=''
                        disabled
                    >
                        Empleado:
                    </option>
                    {employeeNotRepeated.map((employeeId) => (
                        <option
                            key={employeeId}
                            value={employeeId}
                        >
                            {employeeId.employeeName}
                        </option>
                    ))}
                </select>

                <select
                    name='serviceId'
                    id='serviceId'
                    value={serviceId}
                    onChange={(e) => {
                        setServiceId(e.target.value);
                    }}
                >
                    <option
                        value=''
                        disabled
                    >
                        Servicio:
                    </option>
                    {serviceNotRepeated.map((serviceId) => (
                        <option
                            key={serviceId}
                            value={serviceId}
                        >
                            {serviceId}
                        </option>
                    ))}
                </select>

                <button
                    type='button'
                    onClick={resetFilter}
                >
                    Limpiar Filtros
                </button>
            </form>
            <ul className='cards'>
                {data.map((shiftRecord) => {
                    return (
                        <li key={shiftRecord.id}>
                            <h3>{shiftRecord.employeeId}</h3>
                            <p>{shiftRecord.serviceId}</p>
                            <p>Entrada: {shiftRecord.clockIn}</p>
                            <p>Salida: {shiftRecord.clockOut}</p>

                            <NavLink
                                className='mb-4'
                                to={`${VITE_CLIENT_URL}/shiftrecords/${shiftRecord.serviceId}`}
                            >
                                Editar
                            </NavLink>
                        </li>
                    );
                })}
            </ul>
        </>
    );
};

export default Shifts;
