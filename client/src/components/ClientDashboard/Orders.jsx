const { VITE_CLIENT_URL } = import.meta.env;
import { useEffect, useState, useContext } from 'react';
import { fetchClientAllServicesServices } from '../../services/serviceServices.js';
import { AuthContext } from '../../../src/context/AuthContext.jsx';
import { NavLink } from 'react-router-dom';
import toast from 'react-hot-toast';

const Orders = () => {
    const { authToken } = useContext(AuthContext);

    const [data, setData] = useState([]);
    const [status, setStatus] = useState('');
    const [type, setType] = useState('');
    const [city, setCity] = useState('');

    const resetFilters = (e) => {
        e.preventDefault();
        setStatus('');
        setType('');
        setCity('');
    };

    useEffect(() => {
        const getListClientService = async () => {
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

        getListClientServiceController();
    }, [status, type, city, authToken]);

    const cityNoRepeated = [...new Set(data.map((item) => item.city))];
    const typeNoRepeated = [...new Set(data.map((item) => item.type))];

    return (
        <div>
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
                    <option value='confirmed'>Confirmado</option>
                    <option value='pending'>Pendiente</option>
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
                <select
                    name='cityOfService'
                    id='cityOfService'
                    value={city}
                    onChange={(e) => {
                        setCity(e.target.value);
                    }}
                >
                    <option value='' disabled>
                        Ciudad:
                    </option>
                    {cityNoRepeated.map((city) => {
                        return (
                            <option key={city} value={city}>
                                {city}
                            </option>
                        );
                    })}
                </select>
                <button onClick={resetFilters}>Limpiar Filtros</button>
            </form>
            <ul className='cards'>
                {data.map((item) => {
                    const time = new Date(item.dateTime).toLocaleTimeString();
                    const date = new Date(item.dateTime).toLocaleDateString();

                    return (
                        <li id={item.id} key={item.id}>
                            <h3>
                                {item.type} en {item.province}
                            </h3>
                            <p className='font-extrabold'>
                                Estado: {item.status}
                            </p>
                            <p>Precio Hora: {item.price}€</p>
                            <p>Horas Contratadas: {item.hours}</p>
                            <p className='font-extrabold'>
                                Total: {item.totalPrice}€
                            </p>
                            <p>
                                El {date} a las {time}
                            </p>
                            <p>
                                En {item.address}, {item.postCode}, {item.city}
                            </p>
                            <p>{item.comments}</p>

                            {item.status === 'pending' && (
                                <NavLink
                                // to={`${VITE_CLIENT_URL}/services/${serviceId}`}
                                >
                                    Editar
                                </NavLink>
                            )}
                        </li>
                    );
                })}
            </ul>
        </div>
    );
};

export default Orders;
