import { useContext, useState } from 'react';
import useUser from '../hooks/useUser';

import { Navigate, useNavigate } from 'react-router-dom';

import { fetchLoginService } from '../services/userServices';

import { AuthContext } from '../context/AuthContext';

import toast from 'react-hot-toast';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const { authLogin } = useContext(AuthContext);

    const { user } = useUser();

    const navigate = useNavigate();

    const resetInputs = () => {
        setEmail('');
        setPassword('');
    };

    const handleLogin = async (e) => {
        try {
            e.preventDefault();

            const authToken = await fetchLoginService(email, password);

            authLogin(authToken);

            navigate('/');
        } catch (error) {
            toast.error(error.message, {
                id: 'loginError',
            });
        }
    };

    if (user) return <Navigate to='/' />;

    return (
        <section className='container'>
            <form className='userForm' onSubmit={handleLogin}>
                <fieldset>
                    <legend>Inicia sesión</legend>

                    <label htmlFor='email'>Email</label>
                    <input
                        type='email'
                        id='email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder='user@clockYou.com'
                        required
                    />
                    <label htmlFor='password'>Contraseña</label>
                    <input
                        type='password'
                        id='password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder='jobryp-kapDew-fetho6'
                        required
                    />
                    <div>
                        <button type='submit'>Iniciar sesión</button>
                        <button onClick={resetInputs}>Limpiar</button>
                    </div>
                    <a href='/recoverpassword'> ¿Has olvidado tu contraseña?</a>
                </fieldset>
            </form>
        </section>
    );
};

export default LoginPage;
