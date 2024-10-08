import { AuthContext } from '../../context/AuthContext.jsx';

import { fetchClientAllServicesServices } from '../../services/serviceServices.js';
import { useEffect, useState, useContext } from 'react';
import CalendarComponent from '../../components/CalendarComponent.jsx';
import toast from 'react-hot-toast';

const OrdersCalendarComponent = () => {
    const { authToken } = useContext(AuthContext);

    const [data, setData] = useState([]);
    const [status, setStatus] = useState('');
    const [type, setType] = useState('');
    const [city, setCity] = useState('');
    const [isVisible, setIsVisible] = useState(false);

    const handleHideClick = (e) => {
        e.preventDefault();
        setIsVisible(!isVisible);
    };

    const resetFilters = (e) => {
        e.preventDefault();
        setStatus('');
        setType('');
        setCity('');
    };

    useEffect(() => {
        const getList = async () => {
            const searchParams = new URLSearchParams({
                status: status,
                type: type,
                city: city,
            });
            const searchParamsToString = searchParams.toString();
            try {
                const data = await fetchClientAllServicesServices(
                    searchParamsToString,
                    authToken
                );
                setData(data);
            } catch (error) {
                toast.error(error.message, {
                    id: 'error',
                });
            }
        };
        getList();
    }, [status, type, city, authToken]);

    const cityNoRepeated = [...new Set(data.map((item) => item.city))].sort();
    const typeNoRepeated = [...new Set(data.map((item) => item.type))].sort();

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
                    <option
                        value=''
                        disabled
                    >
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
                    <option
                        value=''
                        disabled
                    >
                        Tipo de Servicio:
                    </option>
                    {typeNoRepeated.map((type) => {
                        return (
                            <option
                                key={type}
                                value={type}
                            >
                                {type}
                            </option>
                        );
                    })}
                    {cityNoRepeated.map((type) => {
                        return (
                            <option
                                key={type}
                                value={type}
                            >
                                {type}
                            </option>
                        );
                    })}
                </select>
                <button onClick={resetFilters}>Limpiar Filtros</button>
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
            <CalendarComponent events={calendarEvents} />
        </>
    );
};

export default OrdersCalendarComponent;
