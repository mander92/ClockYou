import { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../../../context/AuthContext';
import { fetchAllShiftRecordsServices } from '../../../services/shiftRecordServices';
import EditShiftRecordModal from './EditShiftRecordComponent';
import toast from 'react-hot-toast';

const Shifts = () => {
    const { authToken } = useContext(AuthContext);

    const [data, setData] = useState([]);
    const [employeeId, setEmployeeId] = useState('');
    const [shiftRecordId, setShiftRecordId] = useState('');
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [selectedShiftRecordId, setSelectedShiftRecordId] = useState(null);

    const resetFilter = (e) => {
        e.preventDefault();
        setEmployeeId('');
        setShiftRecordId('');
    };

    useEffect(() => {
        const getShifts = async () => {
            const searchParams = new URLSearchParams({
                employeeId: employeeId,
                shiftRecordId: shiftRecordId,
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
    }, [employeeId, shiftRecordId, authToken]);

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
    const openModal = (shiftRecordId) => {
        setSelectedShiftRecordId(shiftRecordId);
        setModalIsOpen(true);
    };

    const closeModal = () => {
        setModalIsOpen(false);
        setSelectedShiftRecordId(null);
    };

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
                    <option
                        value=''
                        disabled
                    >
                        Empleado:
                    </option>
                    {employeeList.map((employee) => (
                        <option
                            key={employee.id}
                            value={employee.id}
                        >
                            {`${employee.firstName} ${employee.LastName}`}
                        </option>
                    ))}
                </select>
                <select
                    name='serviceId'
                    id='serviceId'
                    value={shiftRecordId}
                    onChange={(e) => {
                        setShiftRecordId(e.target.value);
                    }}
                >
                    <option
                        value=''
                        disabled
                    >
                        Servicio:
                    </option>
                    {serviceNotRepeated.map((service) => (
                        <option
                            key={service.id}
                            value={service.id}
                        >
                            {service.type}
                        </option>
                    ))}
                </select>
                <button onClick={resetFilter}>Limpiar Filtros</button>
            </form>
            <ul className='cards'>
                {data.map((item) => {
                    const clockIn = item.clockIn
                        ? new Date(item.clockIn).toLocaleString()
                        : null;
                    const clockOut = item.clockOut
                        ? new Date(item.clockOut).toLocaleString()
                        : null;

                    return (
                        <li key={item.id}>
                            <h3>{`${item.firstName} ${item.LastName}`}</h3>
                            <p>{item.type}</p>

                            {clockIn && <p>Entrada: {clockIn}</p>}
                            {clockOut && <p>Salida: {clockOut}</p>}

                            <button onClick={() => openModal(item.id)}>
                                Editar
                            </button>
                        </li>
                    );
                })}
            </ul>
            <EditShiftRecordModal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                shiftRecordId={selectedShiftRecordId}
            />
        </>
    );
};

export default Shifts;
