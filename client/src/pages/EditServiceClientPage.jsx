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
    console.log('+++++++++++++++ ', serviceId);

    const { authToken } = useContext(AuthContext);
    const navigate = useNavigate();

    const [data, setData] = useState(null);
    console.log(data);

    // const [comments, setComments] = useState(data?.comments || '');
    // const [address, setAddress] = useState(data?.address || '');
    // const [hours, setHours] = useState(data.hours || 0);

    useEffect(() => {
        const getService = async () => {
            try {
                const data = await fetchClientServiceServices(
                    serviceId,
                    authToken
                );
                setData(data);
                // setComments(data.comments);
                // setAddress(data.address);
                // setHours(data.hours);
            } catch (error) {
                toast.error(error.message, {
                    id: 'error',
                });
            }
        };

        getService();
    }, [serviceId, authToken]);

    // const handleEditService = async (e) => {
    //     e.preventDefault();
    //     try {
    //         const body = await fetchEditServiceService(
    //             serviceId,
    //             comments,
    //             address,
    //             hours
    //         );
    //         toast.success(body.message, {
    //             id: 'ok',
    //         });
    //         navigate('/orders');
    //     } catch (error) {
    //         toast.error(error.message, {
    //             id: 'error',
    //         });
    //     }
    // };

    return (
        <div>
            <h1>Hola</h1>
        </div>
    );
};

export default EditServiceClientPage;
