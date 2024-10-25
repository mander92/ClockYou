import { AuthContext } from '../../../context/AuthContext.jsx';
import { useNavigate } from 'react-router-dom';
import { fetchAllServicesServices } from '../../../services/serviceServices.js';
import { useEffect, useState, useContext } from 'react';
import CalendarComponent from '../../../components/CalendarComponent.jsx';
import toast from 'react-hot-toast';

const ContractsComponent = () => {
    const { authToken } = useContext(AuthContext);
    const navigate = useNavigate();

    const [data, setData] = useState([]);
    const [status, setStatus] = useState('');
    const [type, setType] = useState('');
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
        const getServices = async () => {
            const searchParams = new URLSearchParams({
                status: status,
                type: type,
            });
            const searchParamsToString = searchParams.toString();
            try {
                const data = await fetchAllServicesServices(
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
        getServices();
    }, [status, type, authToken]);

    const typeNoRepeated = [...new Set(data.map((item) => item.type))].sort(
        (a, b) => a.localeCompare(b)
    );

    const calendarEvents = data.map((event) => ({
        title: event.name,
        start: new Date(event.startDateTime),
        end: new Date(event.startDateTime),
        allDay: false,
        serviceId: event.serviceId,
        status: event.status,
    }));

    const handleSelectEvent = (event) => {
        navigate(`/services/${event.serviceId}`);
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
                    <option value='canceled'>Cancelado</option>
                    <option value='completed'>Completado</option>
                    <option value='confirmed'>Confirmado</option>
                    <option value='pending'>Pendiente</option>
                    <option value='rejected'>Rechazado</option>
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
                        <span style={{ backgroundColor: 'lightsalmon' }}>
                            Pendiente
                        </span>
                        <span style={{ backgroundColor: 'orange' }}>
                            Aceptado
                        </span>
                        <span style={{ backgroundColor: 'lightgreen' }}>
                            Confirmado
                        </span>
                        <span style={{ backgroundColor: 'green' }}>
                            Completado
                        </span>
                        <span style={{ backgroundColor: 'lightcoral' }}>
                            Rechazado
                        </span>
                        <span style={{ backgroundColor: 'red' }}>
                            Cancelado
                        </span>
                    </div>
                )}
            </div>
            <CalendarComponent
                events={calendarEvents}
                onSelectEvent={handleSelectEvent}
            />
        </>
    );
};

export default ContractsComponent;
