import { AuthContext } from '../context/AuthContext';
import { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
    fetchClientEditServiceServices,
    fetchEditServiceServices,
} from '../services/serviceServices';
import toast from 'react-hot-toast';

const EditServicePage = () => {
    const { serviceId } = useParams();
    const { authToken } = useContext(AuthContext);

    const navigate = useNavigate();

    const [data, setData] = useState(null);
    const [hours, setHours] = useState(data?.hours || 0);
    const [dateTime, setDateTime] = useState(data?.dateTime || '');
    const [address, setAddress] = useState(data?.address || '');
    const [postCode, setPostCode] = useState(data?.postCode || '');
    const [city, setCity] = useState(data?.city || '');
    const [comments, setComments] = useState(data?.comments || '');

    useEffect(() => {
        const getService = async () => {
            try {
                const data = await fetchClientEditServiceServices(serviceId);
                setData(data);
                setHours(data?.hours);
                setDateTime(data?.dateTime);
                setAddress(data?.address);
                setPostCode(data?.postCode);
                setCity(data?.city);
                setComments(data?.comments);
            } catch (error) {
                toast.error(error.message, {
                    id: 'error',
                });
            }
        };

        getService();
    }, [serviceId]);

    const handleEditService = async (e) => {
        e.preventDefault();

        try {
            const formattedDateTime = new Date(dateTime)
                .toISOString()
                .slice(0, 19)
                .replace('T', ' ');

            const body = await fetchEditServiceServices(
                serviceId,
                comments,
                address,
                hours,
                city,
                formattedDateTime,
                postCode,
                authToken
            );
            toast.success(body.message, {
                id: 'ok',
            });
            navigate('/user');
        } catch (error) {
            toast.error(error.message, {
                id: 'error',
            });
        }
    };

    const time = new Date(dateTime).toLocaleTimeString();
    const date = new Date(dateTime).toLocaleDateString();
    // 2024-09-30T10:30:00.000Z ---> 2024-09-24T10:56
    // const dateLocal = new Date(data?.dateTime).toLocaleString();
    // console.log(dateLocal);

    return (
        <form className='profile-form mx-auto'>
            <fieldset>
                <legend>{data?.type}</legend>
                <h3>{data?.status}</h3>
                <p className='text-left py-4'>
                    La fecha y hora actuales para el comienzo del servicio son:
                    <strong>
                        {} {date} a las {time}
                    </strong>
                    . <strong>Si quiere cambiarlas</strong>, hágalo en el campo
                    fecha y hora bajo estas líneas.
                </p>
                <label htmlFor='datetime'>Fecha y Hora</label>
                <input
                    type='datetime-local'
                    id='datetime'
                    value={dateTime}
                    onChange={(e) => setDateTime(e.target.value)}
                ></input>
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
                </div>
            </fieldset>
        </form>
    );
};

export default EditServicePage;
