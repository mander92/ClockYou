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
                const data = await fetchClientServiceServices(
                    serviceId
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
    }, [serviceId]);

    const handleEditService = async (e) => {
        e.preventDefault();
        try {
            const body = await fetchEditServiceService(
                serviceId,
                comments,
                address,
                hours,
                authToken
            );
            toast.success(body.message, {
                id: 'ok',
            });
            navigate('/orders');
        } catch (error) {
            toast.error(error.message, {
                id: 'error',
            });
        }
    };

    return (
        <form className='profile-form mx-auto'>
            <fieldset>
            <legend>Editar</legend>
                <div>
                    <label htmlFor='comments'>Comentarios:</label>
                    <textarea
                        value={comments}
                        onChange={(e) => setComments(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor='address'>Dirección:</label>
                    <input
                        type="text"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor='hours'>Horas Contratadas:</label>
                    <input
                        type="number"
                        value={hours}
                        onChange={(e) => setHours(e.target.value)}
                    />
                </div>
                <div className='mx-auto'>
                    <button
                        className='mr-4 mt-4'
                        type='submit'
                        onClick={handleEditService}>Guardar Cambios
                    </button>
                </div>
            </fieldset>
        </form>
    );
};

export default EditServiceClientPage;
