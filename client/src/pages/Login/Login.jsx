import { useState } from 'react';

import '../Register/Register.css';
import toast from 'react-hot-toast';
const { VITE_API_URL } = import.meta.env;

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [token, setToken] = useState("localstorage.getItem('token') || NULL");

  const fetchLoginService = async (email, password) => {
    const res = await fetch(`${VITE_API_URL}/users/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });

    const body = await res.json();

    if (body.status === 'error') {
      throw new Error(body.message);
    }
    localStorage.setItem(token, body.token);
    setToken(body.token);

    toast.success('Inicio de sesión exitoso');
  };

  const handleFormClick = async (e) => {
    e.preventDefault();

    await fetchLoginService(email, password);

    setEmail('');
    setPassword('');
  };

  return (
    <section className='container'>
      <form id='registerForm' className='userForm' onSubmit={handleFormClick}>
        <fieldset>
          <legend>Inicia sesión</legend>

          <label htmlFor='email'>Email</label>
          <input
            type='text'
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
        </fieldset>
      </form>
    </section>
  );
};

export default Login;
