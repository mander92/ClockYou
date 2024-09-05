import { useContext, useState } from 'react';
import { Navigate, useNavigate, NavLink } from 'react-router-dom';
import { fetchLoginUserService } from '../services/userServices';
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
            const authToken = await fetchLoginUserService(email, password);

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
        <section className='container formsWrapper'>
            <form className='form' onSubmit={handleLogin}>
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
                    <NavLink to='/recoverpassword'>
                        {' '}
                        ¿Has olvidado tu contraseña?
                    </NavLink>{' '}
                </fieldset>
            </form>
        </section>
    );
};

export default LoginPage;
