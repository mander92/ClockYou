import { useEffect, useState } from 'react';
const { VITE_API_URL, VITE_CLIENT_URL } = import.meta.env;
import './typeOfServices.css';

const Services = () => {
    const [data, setData] = useState([]);

    console.log(data);

    useEffect(() => {
        const fectData = async () => {
            try {
                const res = await fetch(`${VITE_API_URL}/typeOfServices`);

                if (!res.ok) {
                    throw new Error('ERRRROROOROROORORORR');
                }

                const body = await res.json();

                setData(body.data);
            } catch (error) {
                console.log(error);
            }
        };

        fectData();
    }, []);

    const filterCities = data.map((item) => item.city);
    const citiesNoRepeated = [];
    for (let i = 0; i < filterCities.length; i++) {
        if (!citiesNoRepeated.includes(filterCities[i])) {
            citiesNoRepeated.push(filterCities[i]);
        }
    }

    const filterTypeOfService = data.map((item) => item.type);
    const typeNoRepeated = [];
    for (let i = 0; i < filterTypeOfService.length; i++) {
        if (!typeNoRepeated.includes(filterTypeOfService[i])) {
            typeNoRepeated.push(filterTypeOfService[i]);
        }
    }

    return (
        <div className='container'>
            <h2>Todos los Servicios</h2>

            <div>
                <div>
                    <form
                        id='filterServicesForm'
                        className='userForm filterServicesForm'
                    >
                        {/* <label htmlFor='Ciudad'>Ciudad</label> */}
                        <select name='Ciudad' id='Ciudad'>
                            <option selected>Ciudad</option>
                            {citiesNoRepeated.map((city) => {
                                return (
                                    <option key={city} value={city}>
                                        {city}
                                    </option>
                                );
                            })}
                        </select>

                        {/* <label htmlFor='TipoDeServicio'>Tipo de Servicio</label> */}
                        <select name='TipoDeServicio' id='TipoDeServicio'>
                            <option selected>Tipo de Servicio</option>
                            {typeNoRepeated.map((type) => {
                                return (
                                    <option key={type} value={type}>
                                        {type}
                                    </option>
                                );
                            })}
                        </select>

                        {/* <label htmlFor='Ordenar por'>Ordenar por</label> */}
                        <select name='radio' id='Precio'>
                            <option selected>Ordenar por:</option>
                            <option value='ASC'>Ascendente</option>
                            <option value='DES'>Descendente</option>
                        </select>

                        <button>Buscar</button>
                    </form>
                </div>

                <div>
                    <ul className='gridClockYou'>
                        {data.map((item) => {
                            return (
                                <li
                                    key={item.id}
                                    className='flex flex-col place-content-between'
                                >
                                    <img
                                        src={`${VITE_API_URL}/${item.image}`}
                                        alt={item.description}
                                    />
                                    <h3 className='text-2xl'>{item.type}</h3>

                                    <p className='grow'>{item.description}</p>
                                    <p className='text-1xl font-black pt-3 pb-1'>
                                        {item.city}
                                    </p>

                                    <p>{item.price}</p>
                                    <a
                                        href={`${VITE_CLIENT_URL}/typeOfServices/${item.id}`}
                                    >
                                        Ver
                                    </a>
                                </li>
                            );
                        })}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Services;
