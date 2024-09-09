import { useEffect, useState, useContext } from 'react';
const { VITE_CLIENT_URL } = import.meta.env;
import { NavLink } from 'react-router-dom';
import toast from 'react-hot-toast';
import { AuthContext } from '../../../context/AuthContext';
import { fecthAllServicesServices } from '../../../services/serviceServices.js';

const ListContracts = () => {
    const [data, setData] = useState([]);
    const [status, setStatus] = useState('');
    const [dateTime, setDateTime] = useState('');
    const { authToken } = useContext(AuthContext);

    const resetFilter = (e) => {
        e.preventDefault();
        setStatus('');
        setDateTime('');
    };

    useEffect(() => {
        const getServices = async () => {
            const searchParams = new URLSearchParams({
                status: status,
                order: dateTime,
            });
            const searchParamsToString = searchParams.toString();
            try {
                const data = await fecthAllServicesServices(
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
    }, [status, dateTime, authToken]);

    return (
        <>
            <div className='container'>
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
                            <option value='completed'>completado</option>
                            <option value='rejected'>rechazado</option>
                            <option value='confirmed'>confirmado</option>
                            <option value='canceled'>cancelado</option>
                        </select>
                        <select
                            name='precio'
                            id='precio'
                            value={dateTime}
                            onChange={(e) => {
                                setDateTime(e.target.value);
                            }}
                        >
                            <option value='' disabled>
                                Fecha:
                            </option>
                            <option value='ASC'>Ascendente</option>
                            <option value='DESC'>Descendente</option>
                        </select>
                        <button onClick={resetFilter}>Limpiar Filtros</button>
                    </form>
                </div>
                <div>
                    <ul className='gridClockYou'>
                        {data.map((item) => {
                            const time = new Date(
                                item.DíaYHora
                            ).toLocaleTimeString();

                            const date = new Date(
                                item.DíaYHora
                            ).toLocaleDateString();

                            return (
                                <li key={item.serviceId}>
                                    <h2>{item.TipoServicio}</h2>
                                    <h3>{item.Estado}</h3>
                                    <h3>{item.Provincia}</h3>
                                    <h3>{item.Ciudad}</h3>
                                    <h3>{time}</h3>
                                    <h3>{date}</h3>
                                    <NavLink
                                        to={`${VITE_CLIENT_URL}/services/${item.serviceId}`}
                                    >
                                        ver
                                    </NavLink>
                                </li>
                            );
                        })}
                    </ul>
                </div>
            </div>
        </>
    );
};

export default ListContracts;
