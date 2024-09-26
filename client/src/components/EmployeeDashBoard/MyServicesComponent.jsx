import { AuthContext } from '../../context/AuthContext.jsx';
import { useEffect, useState, useContext } from 'react';
import { FaStar, FaCheckCircle, FaExclamationCircle } from 'react-icons/fa';
import { fetchEmployeeAllServicesServices } from '../../services/serviceServices.js';
import ShiftRecordModal from './ShiftRecordComponent.jsx';
import toast from 'react-hot-toast';

const MyServicesComponent = () => {
    const { authToken } = useContext(AuthContext);

    const [data, setData] = useState([]);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [selectedShiftRecordId, setSelectedShiftRecordId] = useState(null);
    const [initialLocation, setInitialLocation] = useState(null);

    useEffect(() => {
        const getServices = async () => {
            try {
                const data = await fetchEmployeeAllServicesServices(authToken);
                setData(data);
            } catch (error) {
                toast.error(error.message, {
                    id: 'error',
                });
            }
        };

        getServices();
    }, [authToken]);

    const openModal = (shiftRecordId) => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const location = {
                        lat: position.coords.latitude,
                        lng: position.coords.longitude,
                    };
                    setInitialLocation(location);
                    setSelectedShiftRecordId(shiftRecordId);
                    setModalIsOpen(true);
                },
                (error) => {
                    console.error('Error obteniendo la ubicación: ', error);
                    setInitialLocation(null);
                    setSelectedShiftRecordId(shiftRecordId);
                    setModalIsOpen(true);
                }
            );
        } else {
            console.error(
                'Geolocalización no es soportada por este navegador.'
            );
            setInitialLocation(null);
            setSelectedShiftRecordId(shiftRecordId);
            setModalIsOpen(true);
        }
    };

    const closeModal = () => {
        setModalIsOpen(false);
        setSelectedShiftRecordId(null);
        setInitialLocation(null);
    };

    return (
        <>
            {
                <ul className='cards'>
                    {data.map((item) => {
                        const clockIn = item.clockIn
                            ? new Date(item.clockIn).toLocaleString()
                            : null;
                        const clockOut = item.clockOut
                            ? new Date(item.clockOut).toLocaleString()
                            : null;
                        const date = new Date(
                            item.dateTime
                        ).toLocaleDateString();
                        const time = new Date(item.dateTime).toLocaleTimeString(
                            [],
                            {
                                hour: '2-digit',
                                minute: '2-digit',
                            }
                        );

                        return (
                            <li key={item.id} className='relative'>
                                <div className='icon-container'>
                                    {item.status === 'completed' ? (
                                        <FaCheckCircle className='text-green-500' />
                                    ) : (
                                        <FaExclamationCircle className='text-yellow-500' />
                                    )}
                                </div>
                                <h3>
                                    El {date} a las {time}
                                </h3>
                                <p className='grow'>{item.comments}</p>
                                <p className='grow'>
                                    En {item.address}, {item.city},{' '}
                                    {item.postCode}, {item.province}
                                </p>
                                <p>Horas: {item.hours}</p>
                                <p className='font-extrabold'>
                                    Precio: {item.totalPrice}€
                                </p>
                                <p>
                                    {item.firstName} {item.lastName}, ☎
                                    {item.phone}
                                </p>
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
                                {(item.hoursWorked ||
                                    item.minutesWorked !== null) && (
                                    <p className='font-extrabold'>
                                        Total: {item.hoursWorked} Horas{' '}
                                        {item.minutesWorked} Minutos
                                    </p>
                                )}
                                {item.status === 'completed' ? (
                                    <div className='flex mt-2 mb-4'>
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
                                ) : (
                                    item.status === 'confirmed' && (
                                        <button
                                            onClick={() => openModal(item.id)}
                                        >
                                            Fichar
                                        </button>
                                    )
                                )}
                            </li>
                        );
                    })}
                </ul>
            }
            <ShiftRecordModal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                shiftRecordId={selectedShiftRecordId}
                initialLocation={initialLocation}
            />
        </>
    );
};

export default MyServicesComponent;
