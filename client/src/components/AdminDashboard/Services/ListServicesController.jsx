const { VITE_API_URL, VITE_CLIENT_URL } = import.meta.env;
import { useEffect, useState } from 'react';
import { fetchAllTypeOfServices } from '../../../services/typeOfServiceServices';
import toast from 'react-hot-toast';
import { NavLink } from 'react-router-dom';

const ListServicesController = () => {
    const [data, setData] = useState([]);
    const [city, setCity] = useState('');
    const [type, setType] = useState('');
    const [price, setPrice] = useState('');

    const resetFilters = (e) => {
        e.preventDefault();
        setCity('');
        setType('');
        setPrice('');
    };

    useEffect(() => {
        const getTypeOfServices = async () => {
            const searchParams = new URLSearchParams({
                city: city,
                type: type,
                price: price,
            });
            const searchParamsToString = searchParams.toString();
            try {
                const data = await fetchAllTypeOfServices(searchParamsToString);
                setData(data);
            } catch (error) {
                toast.error(error.message, {
                    id: 'error',
                });
            }
        };

        getTypeOfServices();
    }, [city, type, price]);

    const citiesNoRepeated = [...new Set(data.map((item) => item.city))];
    const typeNoRepeated = [...new Set(data.map((item) => item.type))];

    return (
        <div>
            <form className='form filterServicesForm'>
                <select
                    name='city'
                    id='city'
                    value={city}
                    onChange={(e) => {
                        setCity(e.target.value);
                    }}
                >
                    <option value='' disabled>
                        Ciudad:
                    </option>
                    {citiesNoRepeated.map((city) => {
                        return (
                            <option key={city} value={city}>
                                {city}
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
                            <img
                                src={`${VITE_API_URL}/${item.image}`}
                                alt={item.description}
                            />
                            <h3 className='text-2xl grow'>{item.type}</h3>

                            <p>{item.description}</p>

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

export default ListServicesController;
