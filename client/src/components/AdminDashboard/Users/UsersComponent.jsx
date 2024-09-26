import { useState } from 'react';
import ListUserComponent from './ListUserComponent';
import RegisterAdminUserComponent from './RegisterAdminUserComponent';
import tabSelected from '../../../hooks/tabSelected';
import toTopFast from '../../../hooks/toTopFast';

const UsersComponent = () => {
    const [activeSection, setActiveSection] = useState('ListUserComponent');

    const handleChange = (section) => {
        setActiveSection(section);
    };

    const sectionComponents = {
        ListUserComponent: <ListUserComponent />,
        RegisterAdminUserComponent: <RegisterAdminUserComponent />,
    };

    return (
        <>
            <div className='manager-tabs' id='tabs2'>
                <button
                    to='#ListUserComponent'
                    onClick={(e) => {
                        handleChange('ListUserComponent');
                        toTopFast(e);
                        tabSelected(e, 'tabs2');
                    }}
                    className='activeSelectedLink'
                >
                    Ver Todos
                </button>
                <button
                    to='#RegisterAdminUserComponent'
                    onClick={(e) => {
                        handleChange('RegisterAdminUserComponent');
                        toTopFast(e);
                        tabSelected(e, 'tabs2');
                    }}
                >
                    Registrar
                </button>
            </div>
            {sectionComponents[activeSection]}
        </>
    );
};

export default UsersComponent;
