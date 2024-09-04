const { VITE_API_URL } = import.meta.env;
import useUser from '../../hooks/useUser.js';
import { useState, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext.jsx';
import { fetchEditAvatarService } from '../../services/userServices.js';
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
        const data = await fetchEditAvatarService(userId, authToken, avatar);
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
    <form className='form avatarBox' onSubmit={handleEditAvatar}>
      <fieldset>
        <legend>Avatar</legend>
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
          <div>
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
        <div>
          <button type='submit'>
            {!enableEditAvatar ? 'Editar' : 'Guardar'}
          </button>
        </div>
      </fieldset>
    </form>
  );
};

export default Avatar;
