// Importamos las prop-types.
import PropTypes from 'prop-types';

// Importamos la función que crea un contexto y los hooks.
import { createContext, useState } from 'react';

// Creamos un contexto vacío.
export const AuthContext = createContext(null);

// Creamos el componente provider.
export const AuthProvider = ({ children }) => {
    // Creamos una variable en el State para almacenar el token.
    const [authToken, setAuthToken] = useState(
        localStorage.getItem('authToken') || null
    );

    // Función que almacena el token en el localStorage (login).
    const authLogin = (newToken) => {
        // Guardamos el token en el localStorage.
        localStorage.setItem('authToken', newToken);

        // Guardamos el token en el State.
        setAuthToken(newToken);
    };

    // Función que elimina el token del localStorage y del State (logout).
    const authLogout = () => {
        // Eliminamos el token en el localStorage.
        localStorage.removeItem('authToken');

        // Eliminamos el token del State.
        setAuthToken(null);
    };

    return (
        <AuthContext.Provider value={{ authToken, authLogin, authLogout }}>
            {children}
        </AuthContext.Provider>
    );
};

// Validamos las props.
AuthProvider.propTypes = {
    children: PropTypes.node.isRequired,
};
