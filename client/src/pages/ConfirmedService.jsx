import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchConfirmServiceServices } from '../services/serviceServices.js';
import toast from 'react-hot-toast';

const ConfirmedService = () => {
    const navigate = useNavigate();
    const { validationCode } = useParams();

    useEffect(() => {
        const confirmService = async () => {
            try {
                const data = await fetchConfirmServiceServices(validationCode);

                toast.success(data, {
                    id: 'ok',
                });

                navigate('/');
            } catch (error) {
                toast.error(error.message, {
                    id: 'error',
                });

                navigate('/');
            }
        };

        confirmService();
    }, [validationCode]);
};

export default ConfirmedService;
