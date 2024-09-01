import './typeOfServices.css';
const { VITE_API_URL, VITE_CLIENT_URL } = import.meta.env;
import { useEffect, useState } from 'react';
import { fetchAllTypeOfServices } from '../../services/typeOfServiceServices';
import toast from 'react-hot-toast';

const TypeOfServices = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const getAllTypeOfServices = async () => {
      try {
        const data = await fetchAllTypeOfServices();
        setData(data);
      } catch (error) {
        toast.error(error.message, {
          id: 'error',
        });
      }
    };

    getAllTypeOfServices();
  }, []);

  const citiesNoRepeated = [...new Set(data.map((item) => item.city))];
  const typeNoRepeated = [...new Set(data.map((item) => item.type))];

  return (
    <div className='container'>
      <h2>Todos los Servicios</h2>
      <div>
        <form className='form filterServicesForm'>
          <select name='city' id='city' defaultValue='Ciudad:'>
            <option>Ciudad:</option>
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
            defaultValue='Tipo de Servicio:'
          >
            <option>Tipo de Servicio:</option>
            {typeNoRepeated.map((type) => {
              return (
                <option key={type} value={type}>
                  {type}
                </option>
              );
            })}
          </select>

          <select name='Precio' id='precio' defaultValue='Precio'>
            <option>Precio:</option>
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
              <li key={item.id} className='flex flex-col place-content-between'>
                <img
                  src={`${VITE_API_URL}/${item.image}`}
                  alt={item.description}
                />
                <h3 className='text-2xl'>{item.type}</h3>

                <p className='grow'>{item.description}</p>
                <p className='text-1xl font-black pt-3 pb-1'>{item.city}</p>

                <p>{item.price}€</p>
                <a href={`${VITE_CLIENT_URL}/typeOfServices/${item.id}`}>Ver</a>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default TypeOfServices;
