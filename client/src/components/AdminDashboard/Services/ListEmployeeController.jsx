const { VITE_API_URL } = import.meta.env;
import { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../../../context/AuthContext';
import { fetchAllEmployeeService } from '../../../services/userServices.js';
import toast from 'react-hot-toast';

const ListEmployeeController = ({ serviceId }) => {
    const [data, setData] = useState([]);
    const [active, setActive] = useState('');
    const [job, setJob] = useState('');
    const [city, setCity] = useState('');
    const { authToken } = useContext(AuthContext);
    const role = 'employee';

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
                const data = await fetchAllEmployeeService(
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
    }, [city, job, active]);

    const resetFilters = () => {
        setActive('');
        setCity('');
        setJob('');
    };

    const handleNewShiftRecord = async () => {
        try {
            const data = await fetchAllEmployeeService(
                id,
                serviceId,
                authToken
            );

            toast.success(data.message);
        } catch (error) {
            toast.error(error.message);
        }
    };

    const citiesNoRepeated = [...new Set(data.map((item) => item.city))];
    const jobNoRepeated = [...new Set(data.map((item) => item.job))];

    console.log(citiesNoRepeated);

    return (
        <>
            <div className='container'>
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
                <ul className='gridClockYou'>
                    {data.map((item) => {
                        const id = item.id;
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

                                <button
                                    onClick={() =>
                                        handleNewShiftRecord(
                                            id,
                                            serviceId,
                                            authToken
                                        )
                                    }
                                >
                                    Asignar Empleado
                                </button>
                            </li>
                        );
                    })}
                </ul>
            </div>
        </>
    );
};

export default ListEmployeeController;
