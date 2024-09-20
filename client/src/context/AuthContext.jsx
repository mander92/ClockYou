import PropTypes from 'prop-types';

import { createContext, useState } from 'react';

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [authToken, setAuthToken] = useState(
        localStorage.getItem('authToken') || null
    );

    const authLogin = (newToken) => {
        localStorage.setItem('authToken', newToken);

        setAuthToken(newToken);
    };

    const authLogout = () => {
        localStorage.removeItem('authToken');

        setAuthToken(null);
    };

    return (
        <AuthContext.Provider value={{ authToken, authLogin, authLogout }}>
            {children}
        </AuthContext.Provider>
    );
};

AuthProvider.propTypes = {
    children: PropTypes.node.isRequired,
};
