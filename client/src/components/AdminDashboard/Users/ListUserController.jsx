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
    const [active, setActive] = useState('');

    const resetFilters = (e) => {
        e.preventDefault();
        setCity('');
        setJob('');
        setRole('');
        setActive('');
    };

    useEffect(() => {
        const getAllUserList = async () => {
            const searchParams = new URLSearchParams({
                city: city,
                job: job,
                role: role,
                active: active,
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

        getAllUserList();
    }, [city, job, active, role, authToken]);

    const citiesNoRepeated = [...new Set(data.map((item) => item.city))];
    const jobNoRepeated = [...new Set(data.map((item) => item.job))];
    const roleNoRepeated = [...new Set(data.map((item) => item.role))];

    return (
        <div className='form'>
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
                    <button onClick={resetFilters}>Limpiar Filtros</button>
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
                                    src={`${
                                        item.avatar
                                            ? `${VITE_API_URL}/${item.avatar}`
                                            : '/default-avatar.png'
                                    }`}
                                    alt='Avatar'
                                />
                                <h3 className='text-2xl'>
                                    👤 {item.firstName} {item.lastName}
                                </h3>
                                <p className='grow'>✉️ {item.email}</p>
                                <p className='grow'>📞 {item.phone}</p>
                                <p className='grow'>🪪 {item.dni}</p>
                                <p className='grow'>👨‍💻 {item.job}</p>
                                <p className='grow'>🏠 {item.city}</p>
                            </li>
                        );
                    })}
                </ul>
            </div>
        </div>
    );
};

export default ListUserController;
