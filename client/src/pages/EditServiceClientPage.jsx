import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from '../context/AuthContext';
import {fetchServiceServices, fetchEditServiceService} from '../services/serviceServices';
import toast from 'react-hot-toast';

const EditServiceClientPage = () => {
    const { serviceId } = useParams();
    const { authToken } = useContext(AuthContext);
    const navigate = useNavigate();

    const [data, setData] = useState(null);
    const [comments, setComments] = useState(data?.comments || '');
    const [address, setAddress] = useState(data?.address || '');
    const [hours, setHours] = useState(data.hours || 0);


    useEffect(() => {
        const getService = async () => {
            try {
                const data = await fetchServiceServices(serviceId, authToken);
                setData(data);
                setComments(data.comments);
                setAddress(data.address);
                setHours(data.hours);
            } catch (error) {
                toast.error(error.message, {
                    id: 'error',
                });
            }
        };

        getService();
    }, [serviceId, authToken]);

    const handleEditService =  async (e) => {
        e.preventDefault();
        try {
            const body = await fetchEditServiceService(
                serviceId,
                comments,
                address,
                hours
                
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
        <form >
            <fieldset>
                <legend>Editar</legend>
                <div>
                    <label>Comentarios:</label>
                    <textarea
                        value={comments}
                        onChange={(e) => setComments(e.target.value)}
                    />
                </div>
                <div>
                    <label>Dirección:</label>
                    <input
                        type="text"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                    />
                </div>
                <div>
                    <label>Horas Contratadas:</label>
                    <input
                        type="number"
                        value={hours}
                        onChange={(e) => setHours(e.target.value)}
                    />
                </div>
                <button                                 
                    className='mr-4 mt-4'
                    type='submit'
                    onClick={handleEditService}>Guardar Cambios</button>
            </fieldset>
        </form>
    );
};
      
    

export default EditServiceClientPage;    