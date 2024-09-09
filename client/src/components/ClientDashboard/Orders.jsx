const { VITE_API_URL, VITE_CLIENT_URL } = import.meta.env;
import { useEffect, useState, useContext } from 'react';
import { fetchListClientServiceServices } from '../../services/userServices.js';
import { AuthContext } from '../../../src/context/AuthContext.jsx';
import { NavLink } from 'react-router-dom';
import toast from 'react-hot-toast';

const Orders = () => {
    const [data, setData] = useState([]);

    const [status, setStatus] = useState('');
    const [type, setType] = useState('');
    const [city, setCity] = useState('');
    const { authToken } = useContext(AuthContext);

    const resetFilters = (e) => {
        e.preventDefault();
        setStatus('');
        setType('');
    };

    useEffect(() => {
        const getListClientServiceController = async () => {
            const searchParams = new URLSearchParams({
                status: status,
                type: type,
            });
            const searchParamsToString = searchParams.toString();
            try {
                const data = await fetchListClientServiceServices(
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

    const cityNoRepeated = [...new Set(data.map((item) => item.Ciudad))];
    const typeNoRepeated = [...new Set(data.map((item) => item.TipoServicio))];

    return (
        <div>
            <form className='form filterServicesForm'>
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
                    <option value='pending'>pendiente</option>
                    <option value='accepted'>aceptado</option>
                    <option value='confirmed'>confirmado</option>
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

            <ul className='gridClockYou'>
                {data.map((item) => {
                    const time = new Date(item.DíaYHora).toLocaleTimeString();
                    const date = new Date(item.DíaYHora).toLocaleDateString();

                    return (
                        <li
                            id={item.id}
                            key={item.id}
                            className='flex flex-col items-center text-center'
                        >
                            <h3 className='text-2xl'>{item.TipoServicio}</h3>

                            <p className='grow'>
                                {date} - {time}
                            </p>

                            <p className='text-1xl font-black pt-3 pb-1'>
                                {item.city}
                            </p>

                            <h3>
                                {item.Ciudad} - {item.CP}
                            </h3>

                            <h3>Precio Total: {item.PrecioTotal} €</h3>
                            <h3>{item.Estado}</h3>

                            {item.status === 'pending' && (
                                <NavLink
                                    to={`${VITE_CLIENT_URL}/typeOfServices/edit/${item.id}`}
                                >
                                    Editar
                                </NavLink>
                            )}

                            {item.status === 'completed' && (
                                <NavLink
                                    to={`${VITE_CLIENT_URL}/typeOfServices/edit/${item.id}`}
                                >
                                    Valorar
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
