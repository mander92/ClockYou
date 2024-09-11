import { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import {
    fetchClientServiceServices,
    fetchEditServiceService,
} from '../services/serviceServices';
import toast from 'react-hot-toast';

const EditServiceClientPage = () => {
    const { serviceId } = useParams();
    const { authToken } = useContext(AuthContext);
    const navigate = useNavigate();

    const [data, setData] = useState(null);
    console.log(data);

    const [hours, setHours] = useState(data?.hours || 0);
    const [dateTime, setDateTime] = useState(data?.dateTime || '');
    const [address, setAddress] = useState(data?.address || '');
    const [postCode, setPostCode] = useState(data?.postCode || '');
    const [city, setCity] = useState(data?.city || '');
    const [comments, setComments] = useState(data?.comments || '');

    console.log(
        hours +
            ' -- ' +
            dateTime +
            ' -- ' +
            address +
            ' -- ' +
            postCode +
            ' -- ' +
            city +
            ' -- ' +
            comments
    );

    useEffect(() => {
        const getService = async () => {
            try {
                const data = await fetchClientServiceServices(serviceId);
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
    }, [serviceId]);

    const handleEditService = async (e) => {
        e.preventDefault();
        try {
            const body = await fetchEditServiceService(
                serviceId,
                comments,
                address,
                hours,
                city,
                dateTime,
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

    return (
        <form className='profile-form mx-auto'>
            <fieldset>
                <legend>Editar</legend>

                <h2>{data?.type}</h2>
                <h3>{data?.status}</h3>

                <p>
                    La fecha y hora actuales del servicio son:
                    <strong>
                        {date}, {time}
                    </strong>
                </p>
                <p>
                    <strong>Si quiere cambiarlas</strong>, hágalo en el campo
                    fecha bajo estas líneas
                </p>
                <label htmlFor='datetime'>Fecha y hora</label>
                <input
                    type='datetime-local'
                    id='datetime'
                    value={dateTime}
                    onChange={(e) => setDateTime(e.target.value)}
                ></input>
                <label htmlFor='hours'>Horas Contratadas:</label>
                <input
                    type='number'
                    value={hours}
                    onChange={(e) => setHours(e.target.value)}
                />
                <label htmlFor='address'>Dirección:</label>
                <input
                    type='text'
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                />
                <label htmlFor='postCode'>Código Postal:</label>
                <input
                    type='number'
                    maxLength='5'
                    minLength='5'
                    value={postCode}
                    onChange={(e) => setPostCode(e.target.value)}
                />
                <label htmlFor='city'>Ciudad:</label>
                <input
                    type='text'
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                />
                <label htmlFor='comments'>Comentarios:</label>
                <textarea
                    value={comments}
                    onChange={(e) => setComments(e.target.value)}
                />
                <div className='mx-auto'>
                    <button
                        className='mr-4 mt-4'
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

export default EditServiceClientPage;
