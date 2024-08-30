import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { fetchSendRecoverService } from '../../services/userServices.js';

const RecoverPassword = () => {
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const resetInputs = () => {
    setEmail('');
  };

  const handleRecover = async (e) => {
    try {
      e.preventDefault();

      if (!email) {
        throw new Error('¡Debes ingresar un correo!');
      } else {
        const message = await fetchSendRecoverService(email);
        toast.success(message);
        resetInputs();

        navigate('/password');
      }
    } catch (error) {
      toast.error(error.message, {
        id: 'recoverError',
      });
    }
  };
  return (
    <section className='container'>
      <form id='recoverForm' className='userForm' onSubmit={handleRecover}>
        <fieldset>
          <legend>Recupera tu contraseña</legend>
          <label htmlFor='email'>Email</label>
          <input
            type='email'
            id='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder='user@clockYou.com'
            required
          />
        </fieldset>
        <button type='submit'>Enviar</button>
      </form>
    </section>
  );
};
export default RecoverPassword;
