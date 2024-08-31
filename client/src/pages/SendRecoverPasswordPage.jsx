import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { fetchSendRecoverService } from '../services/userServices.js';

const SendRecoverPasswordPage = () => {
    const [email, setEmail] = useState('');

    const navigate = useNavigate();

    const resetInputs = () => {
        setEmail('');
    };

    const handleRecover = async (e) => {
        try {
            e.preventDefault();

            const message = await fetchSendRecoverService(email);
            toast.success(message, {
                id: 'ok',
            });
            resetInputs();

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
                    <button>Recuperar</button>
                    <button onClick={resetInputs}>Limpiar</button>
                </div>
            </form>
        </section>
    );
};
export default SendRecoverPasswordPage;
