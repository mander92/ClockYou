import './Validate.css';
import { useParams, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
const {VITE_API_URL} = import.meta.env 
import toast from 'react-hot-toast';
import { Watch } from 'react-loader-spinner'

const Validate = () => {

    const navigate = useNavigate();

    const { registrationCode } = useParams();

    const fetchUpdateUserRegisterService = async (registrationCode) => {
	
        const res = await fetch(`${VITE_API_URL}/users/validate/${registrationCode}`, {
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

    return (
        <main>
            <h2>Está validando su email</h2>

            <Watch
                visible={true}
                height="80"
                width="80"
                radius="48"
                color="#006c84"
                ariaLabel="watch-loading"
                wrapperStyle={{}}
                wrapperClass=""
            />

        </main>);
};

export default Validate;
