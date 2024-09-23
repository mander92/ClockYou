import { useParams } from 'react-router-dom';
import { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { fetchDetailServiceServices } from '../services/serviceServices.js';
import ListEmployeeController from '../components/AdminDashboard/Services/ListEmployeeController.jsx';
import toast from 'react-hot-toast';
import Map from '../components/Map.jsx';

const DetailServicePage = () => {
    const { serviceId } = useParams();
    const { authToken } = useContext(AuthContext);

    const [data, setData] = useState([]);
    const [location, setLocation] = useState({});

    useEffect(() => {
        const DetailService = async () => {
            try {
                const data = await fetchDetailServiceServices(
                    serviceId,
                    authToken
                );

                setData(data);
                setLocation({
                    currentLocation: {
                        lat: data.latitude,
                        lng: data.longitude,
                    },
                });
            } catch (error) {
                toast.error(error.message);
            }
        };
        DetailService();
    }, [serviceId, authToken]);

    const time = new Date(data.dateTime).toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
    });
    const date = new Date(data.dateTime).toLocaleDateString();

    const clockIn = new Date(data.clockIn).toLocaleString();
    const clockOut = new Date(data.clockOut).toLocaleString();

    return (
        <section>
            <form className='form-filters mx-auto'>
                <fieldset>
                    <legend>Solicitud</legend>
                    <p className='mt-2'>{data.type}</p>
                    <p>{data.comments}</p>

                    <p className='font-extrabold'>
                        Solicitado para el {date} a las {time}
                    </p>
                    <p className='grow'>
                        En {data.address}, {data.city}, {data.postCode},{' '}
                        {data.province}
                    </p>
                    <p>Horas Contratadas: {data.hours}</p>
                    <p className='font-extrabold'>Total: {data.totalPrice}€</p>
                </fieldset>
            </form>
            <form className='form-filters mx-auto'>
                <fieldset>
                    <legend>Cliente</legend>
                    <p className='mt-2'>
                        {data.firstName} {data.lastName}
                    </p>
                    <p>{data.email}</p>
                    <p>{data.dni}</p>
                    <p>{data.phone}</p>
                </fieldset>
            </form>
            {data.status === 'pending' && (
                <ListEmployeeController serviceId={serviceId} />
            )}
            {data.status === 'completed' && (
                <form className='form-filters mx-auto'>
                    <fieldset>
                        <legend>Empleado</legend>
                        <p className='mt-2'>
                            {data.firstNameEmployee} {data.lastNameEmployee}
                        </p>
                        <p className='font-extrabold'>Entrada: {clockIn}</p>
                        <p className='font-extrabold'>Salida: {clockOut}</p>
                        {(data.hoursWorked || data.minutesWorked !== null) && (
                            <p>
                                Total: {data.hoursWorked} Horas{' '}
                                {data.minutesWorked} Minutos
                            </p>
                        )}
                        {location.currentLocation ? (
                            <div>
                                <Map location={location} />
                            </div>
                        ) : (
                            <span>Cargando el mapa</span>
                        )}
                    </fieldset>
                </form>
            )}
        </section>
    );
};

export default DetailServicePage;
