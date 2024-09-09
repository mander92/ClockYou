import { useEffect, useState, useContext } from 'react';

import toast from 'react-hot-toast';
import { AuthContext } from '../../../context/AuthContext';
import { fecthAllServicesServices } from '../../../services/serviceServices.js';
const ListContracts = () => {
    const [data, setData] = useState([]);
    const [status, setStatus] = useState('');
    const [price, setPrice] = useState('');
    const { authToken } = useContext(AuthContext);

    const resetFilter = (e) => {
        e.preventDefault();
        setStatus('');
    };

    useEffect(() => {
        const getServices = async () => {
            const searchParams = new URLSearchParams({
                status: status,
                price: price,
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
    }, [status, price, authToken]);

    console.log(data);

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
                            value={price}
                            onChange={(e) => {
                                setPrice(e.target.value);
                            }}
                        >
                            <option value='' disabled>
                                Precio:
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
                                    <h2>{item.serviceId}</h2>
                                    <h2>
                                        tipo de servicio: {item.TipoServicio}
                                    </h2>
                                    <h3>{item.Estado}</h3>
                                    <h3>{item.Provincia}</h3>
                                    <h3>{item.Ciudad}</h3>
                                    <h3>{item.Creación}</h3>
                                    <h3>{item.DNI}</h3>
                                    <h3>{item.Dirección}</h3>
                                    <h3>{item.precio}</h3>
                                    <h3>{item.PrecioTotal}</h3>
                                    <h3>{time}</h3>
                                    <h3>{date}</h3>
                                    <h4>{item.Nombre}</h4>
                                    <h4>{item.Apellidos}</h4>
                                    <h4>{item.Teléfono}</h4>
                                    <h4>{item.Horas}</h4>
                                    <h4>{item.Comentarios}</h4>
                                    <button>ver</button>
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
