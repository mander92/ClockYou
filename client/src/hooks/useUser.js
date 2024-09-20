import { useContext, useEffect, useState } from 'react';

import { AuthContext } from '../context/AuthContext';

import { fetchProfileUserServices } from '../services/userServices';

import toast from 'react-hot-toast';

const useUser = () => {
    const { authToken } = useContext(AuthContext);

    const [user, setUser] = useState(null);

    useEffect(() => {
        const getUser = async () => {
            try {
                const user = await fetchProfileUserServices(authToken);

                setUser(user);
            } catch (err) {
                toast.error(err.message, {
                    id: 'useUser',
                });
            }
        };

        if (authToken) {
            getUser();
        } else {
            setUser(null);
        }
    }, [authToken]);

    return { user };
};

export default useUser;
