import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchActiveUserService } from '../services/userServices';
import toast from 'react-hot-toast';

const ValidateUserPage = () => {
    const navigate = useNavigate();
    const { registrationCode } = useParams();

    useEffect(() => {
        const activateUser = async () => {
            try {
                const data = await fetchActiveUserService(registrationCode);

                toast.success(data, {
                    id: 'ok',
                });

                navigate('/login');
            } catch (error) {
                toast.error(error.message, {
                    id: 'error',
                });

                navigate('/');
            }
        };

        if (registrationCode) activateUser();
    }, [registrationCode, navigate]);
};

export default ValidateUserPage;
