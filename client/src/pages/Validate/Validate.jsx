import './Validate.css';
import { useParams, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
const {VITE_API_URL} = import.meta.env 
import toast from 'react-hot-toast';

const Validate = () => {
  const navigate = useNavigate();

  const { registrationCode } = useParams();

  useEffect(() => {
    const activateUser = async () => {
      try {
        const message = await fetchUpdateUserRegisterService(registrationCode);

<<<<<<< HEAD
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
=======
        toast.success(message, {
          id: 'validateUserSuccess',
        });

        navigate('/');
      } catch (err) {
        toast.error(err.message, {
          id: 'validateUserError',
        });
>>>>>>> 54c07a0049973ed01e77310ac730f070844a5895

        navigate('/');
      }
    };

    if (registrationCode) activateUser();
  }, [registrationCode, navigate]);

  return <main></main>;
};

export default Validate;
