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

    console.log(data);

    const employeeNotRepeated = [
        ...new Set(
            data
                .map(
                    (shiftRecord) =>
                        `${shiftRecord.firstName} ${shiftRecord.LastName}`
                )
                .filter((employeeId) => employeeId && employeeId.trim())
        ),
    ];

    const serviceNotRepeated = [
        ...new Set(
            data
                .map((shiftRecord) => shiftRecord.type)
                .filter((serviceId) => serviceId && serviceId.trim())
        ),
    ];

    return (
        <>
            <form className='mx-auto'>
                <select
                    name='employeeId'
                    id='employeeId'
                    value={employeeId}
                    onChange={(e) => {
                        setEmployeeId(e.target.value);
                    }}
                >
                    <option value='' disabled>
                        Empleado:
                    </option>
                    {employeeNotRepeated.map((employeeId) => (
                        <option key={employeeId} value={employeeId}>
                            {employeeId}
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
                    <option value='' disabled>
                        Servicio:
                    </option>
                    {serviceNotRepeated.map((serviceId) => (
                        <option key={serviceId} value={serviceId}>
                            {serviceId}
                        </option>
                    ))}
                </select>

                <button type='button' onClick={resetFilter}>
                    Limpiar Filtros
                </button>
            </form>
            <ul className='cards'>
                {data.map((shiftRecord) => {
                    const entrada = new Date(
                        shiftRecord.clockIn
                    ).toLocaleString();
                    const salida = new Date(
                        shiftRecord.clockOut
                    ).toLocaleString();
                    return (
                        <li key={shiftRecord.id}>
                            <h3>{`${shiftRecord.firstName} ${shiftRecord.LastName}`}</h3>
                            <p>{shiftRecord.type}</p>
                            <p>Entrada: {entrada}</p>
                            <p>Salida: {salida}</p>
                            <p>{shiftRecord.address}</p>
                            <p>{shiftRecord.totalPrice}</p>

                            <NavLink
                                className='mb-4'
                                to={`/shiftrecords/edit/${shiftRecord.id}`}
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
