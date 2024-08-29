import './Validate.css';
import { useParams, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
const {VITE_API_URL} = import.meta.env 
import toast from 'react-hot-toast';

const Validate = () => {

    const navigate = useNavigate();

    const { registrationCode } = useParams();

    const fetchUpdateUserRegisterService = async (registrationCode) => {
	
        const res = await fetch(`${VITE_API_URL}/api/users/validate/${registrationCode}`, {
            method: 'get',
        });
    
        const body = await res.json();
    
        if (body.status === 'error') {
            throw new Error(body.message);
        }
    
        return body.message;
    };

    useEffect(() => {

        const activateUser = async () => {
            try {

                const message = await fetchUpdateUserRegisterService(registrationCode);

                toast.success(message, {
                    id: 'validateUserSuccess',
                });

 
                navigate('/');

            } catch (err) {

                toast.error(err.message, {
                    id: 'validateUserError',
                });

                navigate('/');
            }
        };

        if (registrationCode) activateUser();
    }, [registrationCode, navigate]);

    return <main>

            </main>;
};

export default Validate;
