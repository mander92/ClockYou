import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { fetchSendRecoverPasswordUserService } from '../services/userServices.js';

const SendRecoverPasswordPage = () => {
    const navigate = useNavigate();

    const [email, setEmail] = useState('');

    const resetInputs = (e) => {
        e.preventDefault();
        setEmail('');
    };

    const handleRecover = async (e) => {
        try {
            e.preventDefault();

            const data = await fetchSendRecoverPasswordUserService(email);
            toast.success(data, {
                id: 'ok',
            });

            navigate('/password');
        } catch (error) {
            toast.error(error.message, {
                id: 'error',
            });
        }
    };
    return (
        <section className='container'>
            <form id='recoverForm' className='form' onSubmit={handleRecover}>
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
                <div>
                    <button type='submit'>Recuperar</button>
                    <button onClick={resetInputs}>Limpiar</button>
                </div>
            </form>
        </section>
    );
};
export default SendRecoverPasswordPage;
