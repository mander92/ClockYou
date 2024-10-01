import { useContext, useState } from 'react';
import { Navigate, useNavigate, NavLink } from 'react-router-dom';
import { fetchLoginUserServices } from '../services/userServices';
import { AuthContext } from '../context/AuthContext';
import useUser from '../hooks/useUser';
import toast from 'react-hot-toast';

const LoginPage = () => {
    const { authLogin } = useContext(AuthContext);
    const { user } = useUser();

    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const resetInputs = (e) => {
        e.preventDefault();
        setEmail('');
        setPassword('');
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const authToken = await fetchLoginUserServices(email, password);

            authLogin(authToken.data);

            navigate('/');
        } catch (error) {
            toast.error(error.message, {
                id: 'error',
            });
        }
    };

    if (user) return <Navigate to='/' />;

    return (
        <form className='mx-auto' onSubmit={handleLogin}>
            <fieldset>
                <legend>Inicio</legend>
                <label htmlFor='email'>Email</label>
                <input
                    type='email'
                    id='email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder='Escribe aquí tu email'
                    required
                />
                <label htmlFor='password'>Contraseña</label>
                <input
                    type='password'
                    id='password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder='Escribe aquí tu contraseña'
                    minLength='8'
                    required
                />
                <div className='mx-auto'>
                    <button className='mr-4' type='submit'>
                        Iniciar
                    </button>
                    <button onClick={resetInputs}>Limpiar</button>
                </div>
                <NavLink className='text-center' to='/recoverpassword'>
                    ¿Has olvidado tu contraseña?
                </NavLink>
            </fieldset>
        </form>
    );
};

export default LoginPage;
