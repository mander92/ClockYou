import { AuthContext } from '../../context/AuthContext.jsx';
import { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchEmployeeAllServicesServices } from '../../services/serviceServices.js';
import toast from 'react-hot-toast';
import CalendarComponent from '../CalendarComponent.jsx';

const MyServicesComponent = () => {
    const { authToken } = useContext(AuthContext);
    const navigate = useNavigate();
    const [status, setStatus] = useState('');
    const [type, setType] = useState('');
    const [data, setData] = useState([]);
    const [isVisible, setIsVisible] = useState(false);

    const handleHideClick = (e) => {
        e.preventDefault();
        setIsVisible(!isVisible);
    };

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

    const handleSelectEvent = (event) => {
        navigate(`/services/employee/${event.serviceId}`);
    };

    const typeNoRepeated = [...new Set(data.map((item) => item.type))].sort(
        (a, b) => a.localeCompare(b)
    );

    const calendarEvents = data.map((event) => ({
        title: event.type,
        start: new Date(event.startDateTime),
        end: new Date(event.startDateTime),
        allDay: false,
        serviceId: event.serviceId,
        status: event.status,
    }));

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
                <button onClick={handleHideClick}>
                    {isVisible ? 'Ocultar colores' : 'Mostrar colores'}
                </button>
            </form>
            <div>
                {isVisible && (
                    <div className='manager-tabs colors'>
                        <span style={{ backgroundColor: 'orange' }}>
                            Aceptado
                        </span>
                        <span style={{ backgroundColor: 'lightgreen' }}>
                            Confirmado
                        </span>
                        <span style={{ backgroundColor: 'green' }}>
                            Completado
                        </span>
                    </div>
                )}
            </div>
            <CalendarComponent
                events={calendarEvents}
                onSelectEvent={handleSelectEvent}
                defaultView='day'
            />
        </>
    );
};

export default MyServicesComponent;
