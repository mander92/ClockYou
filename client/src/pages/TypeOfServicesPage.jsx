const { VITE_API_URL } = import.meta.env;
import { useEffect, useState } from 'react';
import { fetchAllTypeOfServicesServices } from '../services/typeOfServiceServices';
import { NavLink } from 'react-router-dom';
import { FaStar } from 'react-icons/fa';
import toast from 'react-hot-toast';

const TypeOfServicesPage = () => {
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
                const data =
                    await fetchAllTypeOfServicesServices(searchParamsToString);
                setData(data);
            } catch (error) {
                toast.error(error.message, {
                    id: 'error',
                });
            }
        };

        getTypeOfServices();
    }, [city, type, price]);

    const citiesNoRepeated = [...new Set(data.map((item) => item.city))].sort();
    const typeNoRepeated = [...new Set(data.map((item) => item.type))].sort();

    return (
        <>
            <form className='form-filters mx-auto'>
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
            <ul className='cards'>
                {data.map((item) => {
                    return (
                        <li key={item.id}>
                            <img
                                src={`${VITE_API_URL}/${item.image}`}
                                alt={item.description}
                            />
                            <h3>{item.type}</h3>
                            <div className='flex mt-2'>
                                {[...Array(5)].map((_, index) => (
                                    <FaStar
                                        key={index}
                                        size={30}
                                        color={
                                            index + 1 <=
                                            Math.ceil(item.averageRating)
                                                ? '#ffc107'
                                                : '#e4e5e9'
                                        }
                                    />
                                ))}
                            </div>
                            <p className='font-black'>{item.city}</p>
                            <p>{item.price}€</p>
                            <NavLink to={`/typeOfServices/${item.id}`}>
                                Infórmate
                            </NavLink>
                        </li>
                    );
                })}
            </ul>
        </>
    );
};

export default TypeOfServicesPage;
