// Importamos los hooks.
import { useContext, useEffect, useState } from 'react';

// Importamos el contexto.
import { AuthContext } from '../context/AuthContext';

// Obtenemos los servicios.
import { fetchProfileService } from '../services/userServices';

// Importamos la funcion toast.
import toast from 'react-hot-toast';

// Inicializamos el hook.
const useUser = () => {
    // Obtenemos el token.
    const { authToken } = useContext(AuthContext);

    // Almacenamos los datos del usuario en el State.
    const [user, setUser] = useState(null);

    // Obtenemos los datos del usuario.
    useEffect(() => {
        const getUser = async () => {
            try {
                const user = await fetchProfileService(authToken);

                // Almacenamos los datos del usuario en el State.
                setUser(user);
            } catch (err) {
                toast.error(err.message, {
                    id: 'useUser',
                });
            }
        };

        if (authToken) {
            // Llamamos a la función anterior si existe el token.
            getUser();
        } else {
            // Si no hay token vaciamos los datos del usuario.
            setUser(null);
        }
    }, [authToken]);

    // Retornamos los datos que nos interesan.
    return { user };
};

export default useUser;
