import { AuthContext } from '../context/AuthContext';
import { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
    fetchDetailServiceServices,
    fetchEditServiceServices,
    fetchDeleteServiceService
} from '../services/serviceServices';
import toast from 'react-hot-toast';

const EditServicePage = () => {
    const { serviceId } = useParams();
    const { authToken } = useContext(AuthContext);

    const navigate = useNavigate();

    const [data, setData] = useState([]);
    const [hours, setHours] = useState(0);
    const [dateTime, setDateTime] = useState('');
    const [address, setAddress] = useState('');
    const [postCode, setPostCode] = useState('');
    const [city, setCity] = useState('');
    const [comments, setComments] = useState('');

    useEffect(() => {
        const getService = async () => {
            try {
                const data = await fetchDetailServiceServices(
                    serviceId,
                    authToken
                );
                setData(data);
                setHours(data.hours);
                setDateTime(data.dateTime);
                setAddress(data.address);
                setPostCode(data.postCode);
                setCity(data.city);
                setComments(data.comments);
            } catch (error) {
                toast.error(error.message, {
                    id: 'error',
                });
            }
        };

        getService();
    }, [serviceId, authToken]);

    const time = new Date(dateTime).toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
    });

    const getTomorrowDate = () => {
        const today = new Date();
        const tomorrow = new Date(today);
        tomorrow.setDate(today.getDate() + 1);
        return tomorrow.toISOString().split('T')[0];
    };

    const timeIntervals = () => {
        const options = [];
        const startHour = 8;
        const endHour = 16;
        for (let i = startHour * 60; i <= endHour * 60; i += 30) {
            const hours = Math.floor(i / 60);
            const minutes = i % 60;
            const time = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
            options.push(time);
        }
        return options;
    };

    const valuesTimeInterval = timeIntervals();

    const handleEditService = async (e) => {
        e.preventDefault();

        try {
            const formattedDateTime = new Date(dateTime)
                .toISOString()
                .slice(0, 19)
                .replace('T', ' ');

            const data = await fetchEditServiceServices(
                serviceId,
                comments,
                address,
                hours,
                city,
                formattedDateTime,
                postCode,
                authToken
            );
            toast.success(data.message, {
                id: 'ok',
            });
            navigate('/user');
        } catch (error) {
            toast.error(error.message, {
                id: 'error',
            });
        }
    };

    const handleDeleteService = async () => {
        
        try {
            const data = await fetchDeleteServiceService(serviceId, authToken); 
                toast.success(data.message, {
                    id: 'ok',
                });
                navigate('/user');
            
        } catch (error) {
            toast.error(error.message, {
                id: 'error',
            });    
        }
    };

    return (
        <form className='profile-form mx-auto'>
            <fieldset>
                <legend>
                    {data.type} en {data.province}
                </legend>
                <label htmlFor='date'>Fecha</label>
                <input
                    required
                    type='date'
                    id='date'
                    value={dateTime.split('T')[0]}
                    min={getTomorrowDate()}
                    onChange={(e) =>
                        setDateTime(
                            e.target.value + 'T' + dateTime.split('T')[1]
                        )
                    }
                />
                <label htmlFor='time'>Hora</label>
                <select
                    required
                    id='time'
                    value={time}
                    onChange={(e) =>
                        setDateTime(
                            dateTime.split('T')[0] + 'T' + e.target.value
                        )
                    }
                >
                    {valuesTimeInterval.map((opcion) => (
                        <option key={opcion} value={opcion}>
                            {opcion}
                        </option>
                    ))}
                </select>
                <label htmlFor='hours'>Horas</label>
                <select
                    id='hours'
                    value={hours}
                    onChange={(e) => setHours(e.target.value)}
                    required
                >
                    <option value='' disabled>
                        A contratar:
                    </option>
                    <option value='1'>1</option>
                    <option value='2'>2</option>
                    <option value='3'>3</option>
                    <option value='4'>4</option>
                    <option value='5'>5</option>
                    <option value='6'>6</option>
                    <option value='7'>7</option>
                    <option value='8'>8</option>
                </select>
                <label htmlFor='address'>Dirección</label>
                <input
                    type='text'
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    required
                />
                <label htmlFor='postCode'>Código Postal</label>
                <input
                    type='number'
                    minLength='5'
                    maxLength='5'
                    value={postCode}
                    onChange={(e) => setPostCode(e.target.value)}
                    required
                />
                <label htmlFor='city'>Ciudad</label>
                <input
                    type='text'
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    required
                />
                <label htmlFor='comments'>Comentarios</label>
                <textarea
                    value={comments}
                    minLength='10'
                    maxLength='500'
                    rows='5'
                    style={{ resize: 'none' }}
                    required
                    onChange={(e) => setComments(e.target.value)}
                />
                <div className='mx-auto'>
                    <button
                        className='mr-4'
                        type='submit'
                        onClick={handleEditService}
                    >
                        Guardar Cambios
                    </button>
                    <button
                        className='ml-4 bg-red-500 text-white'
                        type='button'
                        onClick={handleDeleteService}
                    >
                        Eliminar Servicio
                    </button>
                </div>
            </fieldset>
        </form>
    );
};

export default EditServicePage;
