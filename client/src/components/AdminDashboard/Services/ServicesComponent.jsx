import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import ListServicesComponent from './ListServicesComponent.jsx';
import RegisterServicesComponent from './RegisterServicesComponent.jsx';
import toTopFast from '../../../hooks/toTopFast.js';

const ServicesComponent = () => {
    const [activeSection, setActiveSection] = useState('ListServicesComponent');

    const handleChange = (section, e) => {
        e.preventDefault();
        setActiveSection(section);
    };

    const sectionComponents = {
        ListServicesComponent: <ListServicesComponent />,
        RegisterServicesComponent: <RegisterServicesComponent />,
    };

    return (
        <>
            <div className='manager-tabs'>
                <NavLink
                    className={
                        activeSection === 'ListServicesComponent' &&
                        'activeSelectedLink'
                    }
                    onClick={(e) => {
                        handleChange('ListServicesComponent', e);
                        toTopFast(e);
                    }}
                >
                    Ver Todos
                </NavLink>
                <NavLink
                    className={
                        activeSection === 'RegisterServicesComponent' &&
                        'activeSelectedLink'
                    }
                    onClick={(e) => {
                        handleChange('RegisterServicesComponent', e);
                        toTopFast(e);
                    }}
                >
                    Registrar
                </NavLink>
            </div>
            {sectionComponents[activeSection]}
        </>
    );
};

export default ServicesComponent;
