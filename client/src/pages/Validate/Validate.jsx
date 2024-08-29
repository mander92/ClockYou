import './Validate.css';
import { useParams, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

import { fetchUpdateUserRegisterService } from '../services/userServices';
import toast from 'react-hot-toast';

const Validate = () => {
  const navigate = useNavigate();

  const { registrationCode } = useParams();

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

  return <main></main>;
};

export default Validate;
