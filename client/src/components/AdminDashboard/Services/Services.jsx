import { useState } from 'react';
import ListServicesController from './ListServicesController.jsx';
import RegisterServicesController from './RegisterServicesController.jsx';
import tabSelected from '../../../../src/hooks/tabSelected';
import toTopFast from '../../../../src/hooks/toTopFast';

const Services = () => {
    const [activeSection, setActiveSection] = useState(
        'ListServicesController'
    );

    const handleChange = (section) => {
        setActiveSection(section);
    };

    const sectionComponents = {
        ListServicesController: <ListServicesController />,
        RegisterServicesController: <RegisterServicesController />,
    };

    return (
        <>
            <div className='manager-tabs' id='tabs2'>
                <button
                    to='#ListServicesController'
                    onClick={(e) => {
                        handleChange('ListServicesController');
                        toTopFast(e);
                        tabSelected(e, 'tabs2');
                    }}
                    className='activeSelectedLink'
                >
                    Ver Todos
                </button>
                <button
                    to='#RegisterServicesController'
                    onClick={(e) => {
                        handleChange('RegisterServicesController');
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

export default Services;
