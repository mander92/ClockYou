import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { fetchChangePasswordService } from '../../services/userServices.js'
import toast  from 'react-hot-toast';

const ChangeRecoverPassword = () => {
    const [recoverCode, setRecoverCode] = useState('');
    const [password, setPassword] = useState('');
    const [repeatedPassword, setRepeatedPassword] = useState('');
    const navigate = useNavigate();

        const handleForm = async (e) => {
            
            try {
                e.preventDefault();

                console.log(password)

                if(password !== repeatedPassword){
                    toast.error('Las contraseñas no coinciden');
                    return
                };

                const message = await fetchChangePasswordService(recoverCode, password);

                toast.success(message);

                navigate('/login')

            } catch (error) {
                toast.error(error.message),{
                    id: 'fail in changing password'
                }
            }
        }
   

    return(
        <>
        <form className="userForm" onSubmit={handleForm}>

            <label htmlFor="recoverCode">Nueva contraseña</label>
            <input 
            type="text" 
            id='recoverCode'
            placeholder="Escribe el codigo de recuperación"
            value={recoverCode}
            onChange={(e)=>setRecoverCode(e.target.value)}
            required
            />

            <label htmlFor="password">Nueva contraseña</label>
            <input 
            type="password" 
            id='password'
            placeholder="Escribe la contraseña"
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
            required
            />

            <label htmlFor="repeatedPassword">Repite la contraseña</label>
            <input 
            type="password" 
            id='repeatedPassword'
            placeholder="Escribe la contraseña otra vez..."
            value={repeatedPassword}
            onChange={(e)=>setRepeatedPassword(e.target.value)}
            required
            />

            <button>Enviar</button>

        </form>
        </>
    )
}

export default ChangeRecoverPassword;