const { VITE_API_URL } = import.meta.env;
import { useContext, useEffect, useState } from 'react';
import { fetchAllUsersService } from '../../../services/userServices.js';
import toast from 'react-hot-toast';
import { AuthContext } from '../../../context/AuthContext.jsx';
import { newShiftRecordService } from '../../../services/shiftRecordsService.js';

const ListEmployeeController = ({ serviceId }) => {
    const { authToken } = useContext(AuthContext);
    const [data, setData] = useState([]);
    const [city, setCity] = useState('');
    const [job, setJob] = useState('');
    const [active, setActive] = useState('');
    const [employeeId, setEmployeeId] = useState('');

    const resetFilters = (e) => {
        e.preventDefault();
        setCity('');
        setJob('');
        setActive('');
    };

    useEffect(() => {
        const getAllEmployeeList = async () => {
            const searchParams = new URLSearchParams({
                city: city,
                job: job,
                role: 'employee',
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

        getAllEmployeeList();
    }, [city, job, active, authToken]);

    const citiesNoRepeated = [...new Set(data.map((item) => item.city))];
    const jobNoRepeated = [...new Set(data.map((item) => item.job))];

    const handleShiftRecord = async () => {
        try {
            // const data = await newShiftRecordService(
            //     authToken,
            //     serviceId,
            //     employeeId
            // );

            if (data.status === 'ok') {
                toast.success(data.message);
            }
        } catch (error) {
            toast.error(error.message);
        }
    };

    return (
        <>
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
                        setEmployeeId(item.id);
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

                                <button onClick={handleShiftRecord}>
                                    Asignar empleado
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
