const { VITE_API_URL, VITE_CLIENT_URL } = import.meta.env;
import { useEffect, useState } from 'react';
import { fetchListClientServiceServices } from '../../services/serviceServices';
import toast from 'react-hot-toast';
import { NavLink } from 'react-router-dom';

const Orders = () => {
    const [data, setData] = useState([]);
    console.log(data);

    const [status, setStatus] = useState('');
    const [type, setType] = useState('');

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
                    searchParamsToString
                );
                setData(data);
            } catch (error) {
                toast.error(error.message, {
                    id: 'error',
                });
            }
        };

        getListClientServiceController();
    }, []);
    //  }, [status, type);

    const statusNoRepeated = [...new Set(data.map((item) => item.status))];
    console.log(statusNoRepeated);

    const typeNoRepeated = [...new Set(data.map((item) => item.type))];
    console.log(typeNoRepeated);

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
                    {statusNoRepeated.map((status) => {
                        return (
                            <option key={status} value={status}>
                                {status}
                            </option>
                        );
                    })}
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

                <button onClick={resetFilters}>Limpiar Filtros</button>
            </form>

            <ul className='gridClockYou'>
                {data.map((item) => {
                    return (
                        <li
                            id={item.id}
                            key={item.id}
                            className='flex flex-col items-center text-center'
                        >
                            {/* <img
                                src={`${VITE_API_URL}/${item.image}`}
                                alt={item.description}
                            /> */}
                            <h3 className='text-2xl'>{item.type}</h3>

                            <p className='grow'>{item.description}</p>

                            <p className='text-1xl font-black pt-3 pb-1'>
                                {item.city}
                            </p>

                            <h3>{item.price}</h3>

                            <NavLink
                                to={`${VITE_CLIENT_URL}/typeOfServices/edit/${item.id}`}
                            >
                                Editar
                            </NavLink>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
};

export default Orders;
