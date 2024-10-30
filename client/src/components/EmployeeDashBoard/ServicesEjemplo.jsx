
Original file line number	Diff line number	Diff line change
@@ -1,71 +1,104 @@
import { AuthContext } from '../../context/AuthContext.jsx';
import { useEffect, useState, useContext } from 'react';
import { FaStar, FaCheckCircle, FaExclamationCircle } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { FaStar, FaCheckCircle, FaExclamationCircle } from 'react-icons/fa';
import { fetchEmployeeAllServicesServices } from '../../services/serviceServices.js';
import ShiftRecordModal from './ShiftRecordComponent.jsx';
import ShiftRecordModal from './ShiftRecordComponent.jsx';
import toast from 'react-hot-toast';
import CalendarComponent from '../CalendarComponent.jsx';

const MyServicesComponent = () => {
    const { authToken } = useContext(AuthContext);
    const navigate = useNavigate();

    const [data, setData] = useState([]);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [selectedShiftRecordId, setSelectedShiftRecordId] = useState(null);
    const [initialLocation, setInitialLocation] = useState(null);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [selectedShiftRecordId, setSelectedShiftRecordId] = useState(null);
    const [initialLocation, setInitialLocation] = useState(null);
    const [isVisible, setIsVisible] = useState(false);

    const getServices = async () => {
        try {
            const data = await fetchEmployeeAllServicesServices(authToken);
            setData(data);
            const dataFiltered = data.filter((data) => {
                return (
                    data.status === 'confirmed' ||
                    data.status === 'completed' ||
                    data.status === 'accepted'
                );
            });
            console.log(dataFiltered);
            setData(dataFiltered);
        } catch (error) {
            toast.error(error.message, {
                id: 'error',
            });
        }
    };

    const handleHideClick = (e) => {
        e.preventDefault();
        setIsVisible(!isVisible);
    };
    useEffect(() => {
        getServices();
    }, []);

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
    const handleSelectEvent = (event) => {
        navigate(`/services/${event.serviceId}`);
    };

    const closeModal = () => {
        setModalIsOpen(false);
        setSelectedShiftRecordId(null);
        setInitialLocation(null);
    };
    const calendarEvents = data.map((event) => ({
        title: event.type,
        start: new Date(event.dateTime),
        end: new Date(event.dateTime),
        allDay: false,
        serviceId: event.serviceId,
        status: event.status,
    }));
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

    return (
        <>
            
            <button onClick={handleHideClick}>
                {isVisible ? 'Ocultar colores' : 'Mostrar colores'}
            </button>

                <ul className='cards'>
                   
               </ul>
        
             <ShiftRecordModal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                shiftRecordId={selectedShiftRecordId}
                initialLocation={initialLocation}
                onShiftRecordSuccess={getServices}
            />
            </>);


}}
