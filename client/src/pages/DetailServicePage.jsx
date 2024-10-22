import { useParams } from 'react-router-dom';
import { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { fetchDetailServiceServices } from '../services/serviceServices.js';
import ListEmployeeComponent from '../components/AdminDashboard/Services/ListEmployeeComponent.jsx';
import toast from 'react-hot-toast';
import MapComponent from '../components/MapComponent.jsx';

const DetailServicePage = () => {
    const { serviceId } = useParams();
    const { authToken } = useContext(AuthContext);
    const [employeeData, setEmployeeData] = useState([]);
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
                        lat: data.latitudeIn,
                        lng: data.longitudeIn,
                    },
                });
            } catch (error) {
                toast.error(error.message, { id: 'error' });
            }
        };
        DetailService();
    }, [serviceId, authToken]);

    const time = new Date(data.startDateTime).toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
    });
    const date = new Date(data.startDateTime).toLocaleDateString();

    const clockIn = new Date(data.clockIn).toLocaleString();
    const clockOut = new Date(data.clockOut).toLocaleString();

    const handleQuita = (id) => {
        const newAarray = employeeData.filter((employee) => {
            return employee.id !== id;
        });
        setEmployeeData(newAarray);
    };

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
                    <p>Número de personas solicitadas: {data.numberOfPeople}</p>
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
            <form className='form-filters mx-auto'>
                <fieldset>
                    <legend>Empleados Asignados al Servicio</legend>
                    <ul className='cards'>
                        {employeeData.map((employee) => {
                            return (
                                <li
                                    key={employee.id}
                                    className='border-2 rounded '
                                >
                                    <h3>
                                        👤 {employee.firstName}{' '}
                                        {employee.lastName}
                                    </h3>
                                    <p>✉️ {employee.email}</p>
                                    <p>📞 {employee.phone}</p>
                                    <p>🪪 {employee.dni}</p>
                                    <p>👨‍💻 {employee.job}</p>
                                    <p>🏠 {employee.city}</p>
                                    <button
                                        className='mx-auto'
                                        onClick={() => {
                                            handleQuita(employee.id);
                                        }}
                                    >
                                        Quitar empleado
                                    </button>
                                </li>
                            );
                        })}
                    </ul>
                </fieldset>
            </form>
            {data.status === 'pending' && (
                <ListEmployeeComponent
                    serviceId={serviceId}
                    setEmployeeData={setEmployeeData}
                />
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
                                <MapComponent location={location} />
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
