import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchActiveUserServices } from '../services/userServices';
import toast from 'react-hot-toast';

const ValidateUserPage = () => {
    const navigate = useNavigate();
    const { registrationCode } = useParams();

    useEffect(() => {
        const activateUser = async () => {
            try {
                const data = await fetchActiveUserServices(registrationCode);

                toast.success(data, {
                    id: 'ok',
                });

                navigate('/login');
            } catch (error) {
                toast.error(error.message, {
                    id: 'error',
                });

                navigate('/login');
            }
        };

        if (registrationCode) activateUser();
    }, []);
};

export default ValidateUserPage;
