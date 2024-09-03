import '../../../components/TypeOfServices/TypeOfServices.css';
const { VITE_API_URL } = import.meta.env;
import { useContext, useEffect, useState } from 'react';
import { fetchAllUsersService } from '../../../services/userServices';
import toast from 'react-hot-toast';
import { AuthContext } from '../../../context/AuthContext';

const ListUserController = () => {
    const { authToken } = useContext(AuthContext);

    const [data, setData] = useState([]);
    const [city, setCity] = useState('');
    const [job, setJob] = useState('');
    const [role, setRole] = useState('');
    const [active, setActive] = useState(true);

    useEffect(() => {
        const getTypeOfServices = async () => {
            const searchParams = new URLSearchParams({
                city: city,
                job: job,
                active: active,
                role: role,
            });
            const searchParamsToString = searchParams.toString();
            try {
                const data = await fetchAllUsersService(
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

        getTypeOfServices();
    }, [city, job, active, role]);

    const citiesNoRepeated = [...new Set(data.map((item) => item.city))];
    const jobNoRepeated = [...new Set(data.map((item) => item.job))];
    const roleNoRepeated = [...new Set(data.map((item) => item.role))];

    return (
        <div className='container'>
            <h2>Todos los Usuarios</h2>
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
                        name='job'
                        id='job'
                        value={job}
                        onChange={(e) => {
                            setJob(e.target.value);
                        }}
                    >
                        <option value='' disabled>
                            Trabajo:
                        </option>
                        {jobNoRepeated.map((job) => {
                            return (
                                <option key={job} value={job}>
                                    {job}
                                </option>
                            );
                        })}
                    </select>

                    <select
                        name='role'
                        id='role'
                        value={role}
                        onChange={(e) => {
                            setRole(e.target.value);
                        }}
                    >
                        <option value='' disabled>
                            Role:
                        </option>
                        {roleNoRepeated.map((role) => {
                            return (
                                <option key={role} value={role}>
                                    {role}
                                </option>
                            );
                        })}
                    </select>

                    <select
                        name='active'
                        id='active'
                        value={active}
                        onChange={(e) => {
                            setActive(e.target.value);
                        }}
                    >
                        <option value='' disabled>
                            Activo:
                        </option>
                        <option value='1'>Activo</option>
                        <option value='0'>Desactivado</option>
                    </select>
                    <button>Limpiar Filtros</button>
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
                                    src={`${VITE_API_URL}/${item.avatar}`}
                                    alt='Avatar'
                                />
                                <h3 className='text-2xl'>{item.email}</h3>

                                <p className='grow'>{item.firstName}</p>
                                <p className='text-1xl font-black pt-3 pb-1'>
                                    {item.job}
                                </p>

                                <p>{item.city}€</p>
                                {/* <a
                                    href={`${VITE_CLIENT_URL}/typeOfServices/${item.id}`}
                                >
                                    Ver
                                </a> */}
                            </li>
                        );
                    })}
                </ul>
            </div>
        </div>
    );
};

export default ListUserController;
