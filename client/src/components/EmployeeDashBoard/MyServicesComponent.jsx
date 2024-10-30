import { AuthContext } from '../../context/AuthContext.jsx';
import { useEffect, useState, useContext } from 'react';
import { fetchEmployeeAllServicesServices } from '../../services/serviceServices.js';
import ShiftRecordModal from './ShiftRecordComponent.jsx';
import toast from 'react-hot-toast';
import useUser from '../../hooks/useUser.js';

const MyServicesComponent = () => {
    const { authToken } = useContext(AuthContext);
    const [status, setStatus] = useState('');
    const [type, setType] = useState('');
    const [data, setData] = useState([]);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [initialLocation, setInitialLocation] = useState(null);
    const [selectedServiceId, setSelectedServiceId] = useState(null);
    const [selectedEmployeeId, setSelectedEmployeeId] = useState(null);
    const { user } = useUser();

    const resetFilter = (e) => {
        e.preventDefault();
        setStatus('');
        setType('');
    };

    useEffect(() => {
        const searchParams = new URLSearchParams({
            status: status,
            type: type,
        });
        const searchParamsToString = searchParams.toString();
        const getServices = async () => {
            try {
                const data = await fetchEmployeeAllServicesServices(
                    searchParamsToString,
                    authToken
                );
                const dataFiltered = data.filter((data) => {
                    return (
                        data.status === 'confirmed' ||
                        data.status === 'completed' ||
                        data.status === 'accepted'
                    );
                });

                setData(dataFiltered);
            } catch (error) {
                toast.error(error.message, {
                    id: 'error',
                });
            }
        };
        getServices();
    }, [status, type, authToken]);

    const typeNoRepeated = [...new Set(data.map((item) => item.type))].sort(
        (a, b) => a.localeCompare(b)
    );

    const openModal = (serviceId) => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const location = {
                        lat: position.coords.latitude,
                        lng: position.coords.longitude,
                    };
                    setInitialLocation(location);
                    setSelectedServiceId(serviceId);
                    setSelectedEmployeeId(user.id);
                    setModalIsOpen(true);
                },
                (error) => {
                    console.error('Error obteniendo la ubicación: ', error);
                    setInitialLocation(null);
                    setSelectedServiceId(serviceId);
                    setSelectedEmployeeId(user.id);
                    setModalIsOpen(true);
                }
            );
        } else {
            console.error(
                'Geolocalización no es soportada por este navegador.'
            );
            setInitialLocation(null);
            setSelectedServiceId(serviceId);
            setSelectedEmployeeId(user.id);
            setModalIsOpen(true);
        }
    };

    const closeModal = () => {
        setModalIsOpen(false);
        setSelectedServiceId(null);
        setSelectedEmployeeId(null);
    };

    return (
        <>
            <form className='mx-auto form-filters'>
                <select
                    name='status'
                    id='status'
                    value={status}
                    onChange={(e) => {
                        setStatus(e.target.value);
                    }}
                >
                    <option value='' disabled>
                        Estado:
                    </option>
                    <option value='accepted'>Aceptado</option>
                    <option value='completed'>Completado</option>
                    <option value='confirmed'>Confirmado</option>
                </select>
                <select
                    name='typeOfService'
                    id='typeOfService'
                    value={type}
                    onChange={(e) => {
                        setType(e.target.value);
                    }}
                >
                    <option value='' disabled>
                        Tipo de Servicio:
                    </option>
                    {typeNoRepeated.map((type) => {
                        return (
                            <option key={type} value={type}>
                                {type}
                            </option>
                        );
                    })}
                </select>
                <button onClick={resetFilter}>Limpiar Filtros</button>
            </form>
            <ul className='cards'>
                {data.map((item) => {
                    return (
                        <li key={item.id}>
                            <h3>{item.name}</h3>
                            <p>{item.type}</p>
                            <p>{item.address}</p>
                            <p> {item.phone}</p>
                            <p> {item.postcode}</p>
                            <p> {item.province}</p>

                            <button onClick={() => openModal(item.id)}>
                                fichar
                            </button>
                        </li>
                    );
                })}
            </ul>
            <ShiftRecordModal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                initialLocation={initialLocation}
                serviceId={selectedServiceId}
                employeeId={selectedEmployeeId}
            />
        </>
    );
};
export default MyServicesComponent;
