import { useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';

import ListServicesController from './ListServicesController.jsx';
import RegisterServicesController from './RegisterServicesController.jsx';

const Services = () => {
    const [activeSection, setActiveSection] = useState(
        'ListServicesController'
    );
    const location = useLocation();

    useEffect(() => {}, [location]);

    const handleChange = (section) => {
        setActiveSection(section);
    };

    const sectionComponents = {
        ListServicesController: <ListServicesController />,
        RegisterServicesController: <RegisterServicesController />,
    };

    return (
        <>
            <div className='managerTabs'>
                <button
                    to='#ListServicesController'
                    onClick={() => {
                        handleChange('ListServicesController');
                        window.scrollTo(0, 0);
                    }}
                >
                    Ver Todos
                </button>
                <button
                    to='#RegisterServicesController'
                    onClick={() => {
                        handleChange('RegisterServicesController');
                        window.scrollTo(0, 0);
                    }}
                >
                    Registrar
                </button>
            </div>
            {sectionComponents[activeSection]}
        </>
    );
};

export default Services;
