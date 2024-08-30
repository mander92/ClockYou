import '../Register/Register.css';

import { useContext, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import useUser from '../../hooks/useUser';

import { fetchLoginService } from '../../services/userServices';

import { AuthContext } from '../../context/AuthContext';

import toast from 'react-hot-toast';

const Login = () => {
    const { authLogin } = useContext(AuthContext);

    const { user } = useUser();

    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleFormClick = async (e) => {
        try {
            e.preventDefault();

            const authToken = await fetchLoginService(email, password);

            authLogin(authToken);

            setEmail('');
            setPassword('');

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
            <form
                id='registerForm'
                className='userForm'
                onSubmit={handleFormClick}
            >
                <fieldset>
                    <legend>Inicia sesión</legend>

                    <label htmlFor='email'>Email</label>
                    <input
                        type='email'
                        id='email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder='email'
                        required
                    />
                    <label htmlFor='password'>Contraseña</label>
                    <input
                        type='password'
                        id='password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder='password'
                        required
                    />
                    <div>
                        <button type='submit'>Iniciar sesión</button>
                    </div>
                    <a href='/recoverpassword'> ¿Has olvidado tu contraseña?</a>
                </fieldset>
            </form>
        </section>
    );
};

export default Login;
