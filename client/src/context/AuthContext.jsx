import { createContext, useState } from 'react';
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(null);

    const handleAuth = (jwt) => {
        console.log('AUTH');

        if (!token) {
            setToken(jwt);
            localStorage.setItem('userToken', jwt);
        }

        if (token) {
            setToken(null);
            localStorage.removeItem('userToken');
        }
    };

    const data = {
        token,
        handleAuth,
    };

    return <AuthContext.Provider value={data}>{children}</AuthContext.Provider>;
};

export default AuthContext;
