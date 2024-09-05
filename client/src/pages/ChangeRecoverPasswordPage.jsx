import { useState } from 'react';

import { useNavigate } from 'react-router-dom';

import { fetchChangePasswordUserService } from '../services/userServices.js';

import toast from 'react-hot-toast';

const ChangeRecoverPasswordPage = () => {
    const [recoverPasswordCode, setRecoverPasswordCode] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [repeatedPassword, setRepeatedPassword] = useState('');

    const navigate = useNavigate();

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
                const data = await fetchChangePasswordUserService(
                    recoverPasswordCode,
                    newPassword
                );

                toast.success(data);

                navigate('/login');
            }
        } catch (error) {
            toast.error(error.message, {
                id: 'error',
            });
        }
    };

    return (
        <section className='container'>
            <form className='form' onSubmit={handleChangeRecoverPassword}>
                <fieldset>
                    <legend>Recupera Contraseña</legend>
                    <label htmlFor='recoverCode'>Código recuperación</label>
                    <input
                        type='text'
                        id='recoverPasswordCode'
                        value={recoverPasswordCode}
                        onChange={(e) => setRecoverPasswordCode(e.target.value)}
                        placeholder='fDCFJL4trt'
                        required
                    />

                    <label htmlFor='password'>Nueva contraseña</label>
                    <input
                        type='password'
                        id='newPassword'
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        placeholder='jobryp-kapDew-fetho6'
                        required
                    />

                    <label htmlFor='repeatedPassword'>Repite contraseña</label>
                    <input
                        type='password'
                        id='repeatedPassword'
                        value={repeatedPassword}
                        onChange={(e) => setRepeatedPassword(e.target.value)}
                        placeholder='jobryp-kapDew-fetho6'
                        required
                    />
                    <div>
                        <button type='submit'>Cambiar Contraseña</button>
                        <button onClick={resetInputs}>Limpiar</button>
                    </div>
                </fieldset>
            </form>
        </section>
    );
};

export default ChangeRecoverPasswordPage;
