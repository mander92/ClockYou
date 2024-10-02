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

    const resetFilter = (e) => {
        e.preventDefault();
        setStatus('');
    };

    useEffect(() => {
        const getServices = async () => {
            const searchParams = new URLSearchParams({
                status: status,
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
    }, [status, authToken]);

    const calendarEvents = data.map((event) => ({
        title: event.type,
        start: new Date(event.dateTime),
        end: new Date(event.dateTime),
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
                <button onClick={resetFilter}>Limpiar Filtros</button>
            </form>
            <div className='calendar'>
                <CalendarComponent
                    events={calendarEvents}
                    onSelectEvent={handleSelectEvent}
                />
            </div>
        </>
    );
};

export default ContractsComponent;
