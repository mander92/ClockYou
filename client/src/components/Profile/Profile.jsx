import { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import {
  fetchEditUserService,
  fetchEditPasswordService,
  fetchDeleteUserService,
} from '../../services/userServices';
import useUser from '../../hooks/useUser';
import toast from 'react-hot-toast';

const Profile = () => {
  const { user } = useUser();
  const { authToken, authLogout } = useContext(AuthContext);
  const userId = user?.id;
  const navigate = useNavigate();

  const [firstName, setFirstName] = useState(user?.firstName || '');
  const [lastName, setLastName] = useState(user?.lastName || '');
  const [phone, setPhone] = useState(user?.phone || '');
  const [actualPassword, setActualPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [repeatedNewPassword, setRepeatedNewPassword] = useState('');

  const handleEditUser = async (e) => {
    e.preventDefault();
    try {
      const data = await fetchEditUserService(
        authToken,
        firstName,
        lastName,
        phone,
        userId
      );
      toast.success(data.message, {
        id: 'ok',
      });
    } catch (error) {
      toast.error(error.message, {
        id: 'error',
      });
    }
  };

  const handleEditPassword = async (e) => {
    e.preventDefault();
    try {
      if (newPassword !== repeatedNewPassword) {
        throw new Error('¡Las nuevas contraseñas no coinciden!');
      } else {
        const data = await fetchEditPasswordService(
          authToken,
          actualPassword,
          newPassword,
          userId
        );
        toast.success(data.message, {
          id: 'ok',
        });
        setActualPassword('');
        setNewPassword('');
        setRepeatedNewPassword('');
      }
    } catch (error) {
      toast.error(error.message, {
        id: 'error',
      });
    }
  };

  const handleDeleteUser = async () => {
    if (
      window.confirm(
        '¿Estás seguro de querer eliminar tu cuenta? ¡¡¡Esta acción no se puede deshacer!!!'
      )
    ) {
      try {
        const data = await fetchDeleteUserService(authToken, userId);
        toast.success(data.message, {
          id: 'ok',
        });
        authLogout();
        navigate('/');
      } catch (error) {
        toast.error(error.message, {
          id: 'error',
        });
      }
    }
  };

  useEffect(() => {
    if (user) {
      setFirstName(user?.firstName);
      setLastName(user?.lastName);
      setPhone(user?.phone);
    }
  }, [user]);

  return (
    <div className='editServiceLayoutWrapper'>
      <form className='form' id='perfilUsuario' onSubmit={handleEditUser}>
        <fieldset>
          <legend>Perfil</legend>
          <label htmlFor='email'>Email</label>
          <input disabled value={user?.email || ''} />
          <label htmlFor='firstName'>Nombre</label>
          <input
            type='text'
            id='firstName'
            value={firstName || ''}
            onChange={(e) => {
              setFirstName(e.target.value);
            }}
            required
          />
          <label htmlFor='lastName'>Apellidos</label>
          <input
            type='text'
            id='lastName'
            value={lastName}
            onChange={(e) => {
              setLastName(e.target.value);
            }}
            required
          />
          <label htmlFor='dni'>DNI</label>
          <input disabled value={user?.dni || ''} />
          <label htmlFor='phone'>Teléfono</label>
          <input
            type='tel'
            id='phone'
            value={phone}
            onChange={(e) => {
              setPhone(e.target.value);
            }}
            required
          />
          {user?.role === 'employee' && (
            <>
              <label htmlFor='job'>Trabajo</label>
              <input disabled value={user?.job || ''} />
              <label htmlFor='city'>Ciudad</label>
              <input disabled value={user?.city || ''} />
            </>
          )}
          <div>
            <button type='submit'>Guardar Cambios</button>
          </div>
        </fieldset>
      </form>
      <section>
        <form className='form' onSubmit={handleEditPassword}>
          <fieldset>
            <legend>Contraseña</legend>
            <label htmlFor='actualPassword'>Contraseña Actual</label>
            <input
              type='password'
              id='actualPassword'
              value={actualPassword}
              placeholder='jobryp-kapDew-fetho6'
              required
              onChange={(e) => {
                setActualPassword(e.target.value);
              }}
            />
            <label htmlFor='newPassword'>Nueva Contraseña</label>
            <input
              type='password'
              id='newPassword'
              value={newPassword}
              placeholder='bemgon-1bizni-nuhXyd'
              required
              onChange={(e) => {
                setNewPassword(e.target.value);
              }}
            />
            <label htmlFor='repeatNewPassword'>Repetir Contraseña</label>
            <input
              type='password'
              id='repeatNewPassword'
              placeholder='bemgon-1bizni-nuhXyd'
              required
              value={repeatedNewPassword}
              onChange={(e) => {
                setRepeatedNewPassword(e.target.value);
              }}
            />
            <div>
              <button type='submit'>Cambiar Contraseña</button>
            </div>
          </fieldset>
        </form>
        <form className='form' onSubmit={handleDeleteUser}>
          <fieldset>
            <legend>Cuenta</legend>
            <div>
              <button type='submit'>Eliminar Usuario</button>
            </div>
          </fieldset>
        </form>
      </section>
    </div>
  );
};

export default Profile;
