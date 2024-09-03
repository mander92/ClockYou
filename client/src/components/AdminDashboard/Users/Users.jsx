import { useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import SearchUser from './SearchUser';
import RegisterEmployee from './RegisterEmployee';

const Users = () => {
    const [activeSection, setActiveSection] = useState('searchUser');
    const location = useLocation();

    useEffect(() => {
        const hash = location.hash.replace('#', '');
        if (hash) {
            setActiveSection(hash);
        }
    }, [location]);

    const handleChange = (section) => {
        setActiveSection(section);
    };

    const sectionComponents = {
        searchUser: <SearchUser />,
        registerEmployee: <RegisterEmployee />,
    };

    return (
        <>
            <div>
                <button
                    to='#searchUser'
                    onClick={() => handleChange('searchUser')}
                >
                    Listar
                </button>
                <button
                    to='#registerEmployee'
                    onClick={() => handleChange('registerEmployee')}
                >
                    Registrar
                </button>
            </div>
            {sectionComponents[activeSection]}
        </>
    );
};

export default Users;
