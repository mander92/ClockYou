const { VITE_API_URL } = import.meta.env;
import { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext.jsx';
import { fetchEditAvatarUserServices } from '../services/userServices.js';
import useUser from '../hooks/useUser.js';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const AvatarComponent = () => {
    const { user } = useUser();
    const { authToken } = useContext(AuthContext);

    const userId = user?.id;

    const navigate = useNavigate();

    const [avatar, setAvatar] = useState(null);
    const [enableEditAvatar, setEnableEditAvatar] = useState(false);

    const handleEditAvatar = async (e) => {
        e.preventDefault();
        try {
            if (enableEditAvatar) {
                const data = await fetchEditAvatarUserServices(
                    userId,
                    authToken,
                    avatar
                );
                setAvatar(null);
                toast.success(data.message, {
                    id: 'ok',
                });

                navigate('/');
            }
            setEnableEditAvatar(!enableEditAvatar);
        } catch (error) {
            toast.error(error.message, {
                id: 'error',
            });
        }
    };

    return (
        <form className='mx-auto' onSubmit={handleEditAvatar}>
            <img
                className='user-avatar mx-auto'
                src={`${
                    user?.avatar
                        ? `${VITE_API_URL}/${user.avatar}`
                        : '/default-avatar.png'
                }`}
                alt='Avatar'
            />
            {enableEditAvatar ? (
                <div className='text-center mt-4'>
                    <input
                        type='file'
                        accept='image/png, image/jpg, image/jpeg, image/tiff'
                        required
                        onChange={(e) => {
                            setAvatar(e.target.files[0]);
                        }}
                    />
                </div>
            ) : (
                ''
            )}
            <div className='text-center mt-4'>
                <button type='submit'>
                    {!enableEditAvatar ? 'Cambiar' : 'Guardar'}
                </button>
                <h2 className='mt-4'>Hola {user?.firstName}</h2>
            </div>
        </form>
    );
};

export default AvatarComponent;
