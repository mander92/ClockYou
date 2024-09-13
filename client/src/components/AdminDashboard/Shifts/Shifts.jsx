import { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../../../context/AuthContext';
import { fetchAllShiftRecordsServices } from '../../../services/shiftRecordServices';
import { NavLink } from 'react-router-dom';
import toast from 'react-hot-toast';

const Shifts = () => {
    const { authToken } = useContext(AuthContext);

    const [data, setData] = useState([]);
    const [employeeId, setEmployeeId] = useState('');
    const [shiftRecorId, setServiceId] = useState('');

    const resetFilter = (e) => {
        e.preventDefault();
        setEmployeeId('');
        setServiceId('');
    };

    useEffect(() => {
        const getShifts = async () => {
            const searchParams = new URLSearchParams({
                employeeId: employeeId,
                shiftRecorId: shiftRecorId,
            });
            const searchParamsToString = searchParams.toString();
            try {
                const data = await fetchAllShiftRecordsServices(
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
    }, [employeeId, shiftRecorId, authToken]);

    const employeeList = data
        .map((shiftRecord) => {
            return {
                id: shiftRecord.employeeId,
                firstName: shiftRecord.firstName,
                LastName: shiftRecord.LastName,
            };
        })
        .filter(
            (employee, index, self) =>
                index ===
                self.findIndex(
                    (o) => o.id === employee.id && o.nombre === employee.nombre
                )
        );

    const serviceNotRepeated = [
        ...new Set(
            data.map((shiftRecord) => {
                return {
                    id: shiftRecord.id,
                    type: shiftRecord.type,
                };
            })
        ),
    ];

    return (
        <>
            <form className='mx-auto form-filters'>
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
                    {employeeList.map((employee) => (
                        <option key={employee.id} value={employee.id}>
                            {`${employee.firstName} ${employee.LastName}`}
                        </option>
                    ))}
                </select>
                <select
                    name='serviceId'
                    id='serviceId'
                    value={shiftRecorId}
                    onChange={(e) => {
                        setServiceId(e.target.value);
                    }}
                >
                    <option value='' disabled>
                        Servicio:
                    </option>
                    {serviceNotRepeated.map((service) => (
                        <option key={service.id} value={service.id}>
                            {service.type}
                        </option>
                    ))}
                </select>
                <button onClick={resetFilter}>Limpiar Filtros</button>
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
