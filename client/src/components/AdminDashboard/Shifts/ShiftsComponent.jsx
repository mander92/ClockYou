import { AuthContext } from '../../../context/AuthContext';
import { useEffect, useState, useContext } from 'react';
import { FaStar, FaCheckCircle, FaExclamationCircle } from 'react-icons/fa';
import { fetchAllShiftRecordsServices } from '../../../services/shiftRecordServices';
import EditShiftRecordModal from './EditShiftRecordComponent';
import toast from 'react-hot-toast';

const ShiftsComponent = () => {
    const { authToken } = useContext(AuthContext);

    const [details, setDetails] = useState([]);
    const [totals, setTotals] = useState([]);
    const [employeeId, setEmployeeId] = useState('');
    const [typeOfService, setTypeOfService] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [selectedShiftRecordId, setSelectedShiftRecordId] = useState(null);

    const resetFilter = (e) => {
        e.preventDefault();
        setEmployeeId('');
        setTypeOfService('');
        setStartDate('');
        setEndDate('');
    };

    const getShifts = async () => {
        const searchParams = new URLSearchParams({
            startDate: startDate,
            endDate: endDate,
            employeeId: employeeId,
            typeOfService: typeOfService,
        });
        const searchParamsToString = searchParams.toString();
        try {
            const response = await fetchAllShiftRecordsServices(
                searchParamsToString,
                authToken
            );

            const data = response.data;
            setDetails(data.details);
            setTotals(data.totals);
        } catch (error) {
            toast.error(error.message, {
                id: 'error',
            });
        }
    };

    useEffect(() => {
        getShifts();
    }, [employeeId, typeOfService, startDate, endDate]);

    const combinedData = details.map((detail) => {
        const total =
            totals.find((total) => total.employeeId === detail.employeeId) ||
            {};
        return { ...detail, ...total };
    });

    const employeeList = totals
        .map((shiftRecord) => {
            return {
                id: shiftRecord.employeeId,
                firstName: shiftRecord.firstName,
                lastName: shiftRecord.lastName,
            };
        })
        .filter(
            (employee, index, self) =>
                index ===
                self.findIndex(
                    (o) =>
                        o.id === employee.id &&
                        o.firstName === employee.firstName
                )
        )
        .sort((a, b) => a.firstName.localeCompare(b.firstName));

    const typeNoRepeated = [...new Set(details.map((item) => item.type))].sort(
        (a, b) => a.localeCompare(b)
    );

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
                    <option value='' disabled>
                        Empleado:
                    </option>
                    {employeeList.map((employee, index) => (
                        <option key={index} value={employee.id}>
                            {`${employee.firstName} ${employee.lastName}`}
                        </option>
                    ))}
                </select>
                <select
                    name='typeOfService'
                    id='typeOfService'
                    value={typeOfService}
                    onChange={(e) => setTypeOfService(e.target.value)}
                >
                    <option value='' disabled>
                        Servicio:
                    </option>
                    {typeNoRepeated.map((type, index) => (
                        <option key={index} value={type}>
                            {type}
                        </option>
                    ))}
                </select>
                <input
                    id='startDate'
                    type='datetime-local'
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                />

                <input
                    id='endDate'
                    type='datetime-local'
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                />
                <button onClick={resetFilter}>Limpiar Filtros</button>
            </form>
            <ul className='cards'>
                {combinedData.map((item) => {
                    const clockIn = item.clockIn
                        ? new Date(item.clockIn).toLocaleString()
                        : null;
                    const clockOut = item.clockOut
                        ? new Date(item.clockOut).toLocaleString()
                        : null;
                    const dateTime = item.clockIn
                        ? new Date(item.dateTime).toLocaleString()
                        : null;

                    return (
                        <li key={item.id} className='relative'>
                            <div className='icon-container'>
                                {item.status === 'completed' ? (
                                    <FaCheckCircle className='text-green-500' />
                                ) : (
                                    <FaExclamationCircle className='text-yellow-500' />
                                )}
                            </div>
                            <h3>{`${item.firstName} ${item.lastName}`}</h3>
                            <p className='font-extrabold'>
                                Horas Totales: {item.totalHoursWorked} Horas{' '}
                                {item.totalMinutesWorked} Minutos
                            </p>
                            <p>{item.province}</p>
                            <p>{item.type}</p>
                            <p className='grow'>
                                En {item.address}, {item.city}
                            </p>
                            <p>Horas: {item.hours}</p>
                            {dateTime && (
                                <p className='font-extrabold'>
                                    Previsto: {dateTime}
                                </p>
                            )}
                            {clockIn && (
                                <p className='font-extrabold'>
                                    Entrada: {clockIn}
                                </p>
                            )}
                            {clockOut && (
                                <p className='font-extrabold'>
                                    Salida: {clockOut}
                                </p>
                            )}
                            {item.totalHoursWorked !== null ||
                            item.totalMinutesWorked !== null ? (
                                <p className='font-extrabold'>
                                    Total: {item.hoursWorked} Horas{' '}
                                    {item.minutesWorked} Minutos
                                </p>
                            ) : null}

                            {item.status === 'completed' && (
                                <div className='flex my-2'>
                                    {[...Array(5)].map((_, index) => (
                                        <FaStar
                                            key={item.id}
                                            size={30}
                                            color={
                                                index + 1 <= item.rating
                                                    ? '#ffc107'
                                                    : '#e4e5e9'
                                            }
                                        />
                                    ))}
                                </div>
                            )}
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
                onEditSuccess={getShifts}
            />
        </>
    );
};

export default ShiftsComponent;
