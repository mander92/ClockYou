const { VITE_API_URL } = import.meta.env;
import { useState, useContext, useEffect } from "react";
import useUser from "../hooks/useUser";
import { AuthContext } from "../context/AuthContext";
import {
  fetchEditUserService,
  fetchEditPasswordService,
  fetchDeleteUserService,
  fetchEditAvatarService
} from "../services/userServices";
import toast from "react-hot-toast";
 import { useNavigate } from 'react-router-dom';

const DashboardPage = () => {
  const { user } = useUser();
  const userId = user?.id;
  const { authToken, authLogout } = useContext(AuthContext);

  const navigate = useNavigate();  
  const [firstName, setFirstName] = useState(user?.firstName);
  const [lastName, setLastName] = useState(user?.lastName);
  const [phone, setPhone] = useState(user?.phone);

  const [actualPassword, setActualPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [repeatNewPassword, setRepeatNewPassword] = useState("");


  const [ enableEditAvatar, setEnableEditAvatar ] = useState(false)  
  const [ avatar, setAvatar ] = useState(null);

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
        id: "ok",
      });
    } catch (error) {
      toast.error(error.message, {
        id: "error",
      });
    }
  };

  const handleEditPassword = async (e) => {
    e.preventDefault();
    try {
      const data = await fetchEditPasswordService(
        authToken,
        actualPassword,
        newPassword,
        repeatNewPassword,
        userId
      );
      toast.success(data.message, {
        id: "ok",
      });
      setActualPassword("");
      setNewPassword("");
      setRepeatNewPassword("");
    } catch (error) {
      toast.error(error.message, {
        id: "error",
      });
    }
  };

  const handleDeleteUser = async () => {
    try {
       const data = await fetchDeleteUserService(
        authToken,
        userId,
       );
       toast.success(data.message, {
        id: 'ok'
       }) 
       authLogout(); 
       navigate('/');

    } catch (error) {
        toast.error(error.message, {
            id: "error",
          });       
    }
  }

  useEffect(() => {
    if (user) {
      setFirstName(user.firstName);
      setLastName(user.lastName);
      setPhone(user.phone);
      
    }
  }, [user]);


console.log(avatar)

    const enableEditFile = async (e) => {
        try {
            e.preventDefault();
            enableEditAvatar?setEnableEditAvatar(false):setEnableEditAvatar(true)
    
            if(enableEditAvatar){
                const data = await fetchEditAvatarService(userId, authToken,avatar)
                toast.success(data.message,{
                    id: 'ok'
                })
                window.location.reload();
            }
            
        } catch (error) {
            toast.error(error.message,{id:'error'})
        }
            
      }





  // if (userId)
  // return <Navigate to='/' />;

  return (
    <section className="container">
      {!user ? (
        <div>Cargando...</div>
      ) : (
        <div>
          <form className="form" onSubmit={handleEditUser}>
            <fieldset>
              <legend>Avatar</legend>
              <img
                className="user-avatar"
                src={`${VITE_API_URL}/${user.avatar}`}
                alt={`${firstName}`}
              />
              {enableEditAvatar? <input type="file" accept="image/png,image/jpg,image/jpeg" onChange={(e)=>{setAvatar(e.target.files[0])}}/>: ''}
              <div>
                <button onClick={enableEditFile}>{!enableEditAvatar? 'Editar': 'Guardar'}</button>
              </div>
              
            </fieldset>
            <fieldset>
            <legend>Perfil</legend>
              <label htmlFor="email">Email</label>
              <input disabled value={user.email} />
              <label htmlFor="firstName">Nombre</label>
              <input
                type="text"
                id="firstName"
                onChange={(e) => {
                  setFirstName(e.target.value);
                }}
                value={firstName}
              />
              <label htmlFor="lastName">Apellidos</label>
              <input
                type="text"
                id="lastName"
                onChange={(e) => {
                  setLastName(e.target.value);
                }}
                value={lastName}
              />
              <label htmlFor="dni">DNI</label>
              <input disabled value={user.dni} />
              <label htmlFor="phone">Teléfono</label>
              <input
                type="tel"
                id="phone"
                onChange={(e) => {
                  setPhone(e.target.value);
                }}
                value={phone}
              />
              {user.role === "employee" && (
                <>
                  <label htmlFor="job">Trabajo</label>
                  <input disabled value={user.job} />
                  <label htmlFor="city">Ciudad</label>
                  <input disabled value={user.city} />
                </>
              )}
              <div>
                <button onClick={handleEditUser}>Guardar Cambios</button>
              </div>
            </fieldset>
            <fieldset>
              <legend>Contraseña</legend>
              <label htmlFor="actualPassword">Contraseña Actual</label>
              <input
                onChange={(e) => {
                  setActualPassword(e.target.value);
                }}
                placeholder="jobryp-kapDew-fetho6"
                value={actualPassword}
              />
              <label htmlFor="newPassword">Nueva Contraseña</label>
              <input
                onChange={(e) => {
                  setNewPassword(e.target.value);
                }}
                value={newPassword}
                placeholder="bemgon-1bizni-nuhXyd"
              />
              <label htmlFor="repeatNewPassword">Repetir Contraseña</label>
              <input
                onChange={(e) => {
                  setRepeatNewPassword(e.target.value);
                }}
                placeholder="bemgon-1bizni-nuhXyd"
                value={repeatNewPassword}
              />
              <div>
                <button onClick={handleEditPassword}>Editar</button>
              </div>
            </fieldset>
            <fieldset>
              <legend>Cuenta</legend>
              <div>
                <button onClick={handleDeleteUser}>Eliminar Usuario</button>
              </div>
            </fieldset>
          </form>
        </div>
      )}
    </section>
  );
};

export default DashboardPage;
