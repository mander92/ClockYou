import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { fetchChangePasswordUserServices } from '../services/userServices.js';
import toast from 'react-hot-toast';

const ChangeRecoverPasswordPage = () => {
    const navigate = useNavigate();

    const [recoverPasswordCode, setRecoverPasswordCode] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [repeatedPassword, setRepeatedPassword] = useState('');

    const resetInputs = (e) => {
        e.preventDefault();
        setRecoverPasswordCode('');
        setNewPassword('');
        setRepeatedPassword('');
    };

    const handleChangeRecoverPassword = async (e) => {
        e.preventDefault();
        try {
            if (newPassword !== repeatedPassword) {
                throw new Error('¡Las contraseñas no coinciden!');
            } else {
                const data = await fetchChangePasswordUserServices(
                    recoverPasswordCode,
                    newPassword
                );

                toast.success(data, { id: 'ok' });

                navigate('/login');
            }
        } catch (error) {
            toast.error(error.message, {
                id: 'error',
            });
        }
    };

    return (
        <form className='mx-auto' onSubmit={handleChangeRecoverPassword}>
            <fieldset>
                <legend>Nueva Contraseña</legend>
                <label htmlFor='recoverCode'>Código recuperación</label>
                <input
                    type='text'
                    id='recoverPasswordCode'
                    value={recoverPasswordCode}
                    onChange={(e) => setRecoverPasswordCode(e.target.value)}
                    placeholder='Escribe aquí el código recibido'
                    required
                />

                <label htmlFor='password'>Contraseña</label>
                <input
                    type='password'
                    id='newPassword'
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder='Escribe aquí tu contraseña'
                    minLength='8'
                    maxLength='25'
                    required
                />

                <label htmlFor='repeatedPassword'>Repetir contraseña</label>
                <input
                    type='password'
                    id='repeatedPassword'
                    value={repeatedPassword}
                    onChange={(e) => setRepeatedPassword(e.target.value)}
                    placeholder='Repite aquí tu contraseña'
                    minLength='8'
                    maxLength='25'
                    required
                />
                <div className='mx-auto'>
                    <button className='mr-4' type='submit'>
                        Cambiar
                    </button>
                    <button onClick={resetInputs}>Limpiar</button>
                </div>
            </fieldset>
        </form>
    );
};

export default ChangeRecoverPasswordPage;
