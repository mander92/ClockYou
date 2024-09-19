import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchConfirmServiceServices } from '../services/serviceServices.js';
import toast from 'react-hot-toast';

const ConfirmedServicePage = () => {
    const { validationCode } = useParams();

    useEffect(() => {
        const confirmService = async () => {
            try {
                const data = await fetchConfirmServiceServices(validationCode);

                toast.success(data, {
                    id: 'ok',
                });
            } catch (error) {
                toast.error(error.message, {
                    id: 'error',
                });
            }
        };

        confirmService();
    }, []);
};

export default ConfirmedServicePage;
