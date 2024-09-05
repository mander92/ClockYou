const { VITE_API_URL } = import.meta.env;
import useUser from '../../hooks/useUser.js';
import { useState, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext.jsx';
import { fetchEditAvatarUserService } from '../../services/userServices.js';
import toast from 'react-hot-toast';

const Avatar = () => {
    const { user } = useUser();
    const { authToken } = useContext(AuthContext);
    const userId = user?.id;

    const [avatar, setAvatar] = useState(null);
    const [enableEditAvatar, setEnableEditAvatar] = useState(false);

    const handleEditAvatar = async (e) => {
        e.preventDefault();
        try {
            if (enableEditAvatar) {
                const data = await fetchEditAvatarUserService(
                    userId,
                    authToken,
                    avatar
                );
                setAvatar(null);
                toast.success(data.message, {
                    id: 'ok',
                });
                window.location.reload();
            }
            setEnableEditAvatar(!enableEditAvatar);
        } catch (error) {
            toast.error(error.message, {
                id: 'error',
            });
        }
    };

    return (
        <form onSubmit={handleEditAvatar}>
            <img
                className='user-avatar'
                src={`${
                    user?.avatar
                        ? `${VITE_API_URL}/${user.avatar}`
                        : '/default-avatar.png'
                }`}
                alt='Avatar'
            />
            {enableEditAvatar ? (
                <div className='text-center'>
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
            <div className='text-center pb-8'>
                <button className='m-0' type='submit'>
                    {!enableEditAvatar ? 'Editar' : 'Guardar'}
                </button>
            </div>
        </form>
    );
};

export default Avatar;
