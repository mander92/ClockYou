import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';

import ListContracts from './ListContracts';

const Contracts = () => {
    const [activeSection, setActiveSection] = useState('ListContracts');
    const location = useLocation();

    useEffect(() => {}, [location]);

    const handleChange = (section) => {
        setActiveSection(section);
    };

    const sectionComponents = {
        ListContracts: <ListContracts />,
    };

    return (
        <>
            <div className='managerTabs'>
                <button
                    to='#ListContracts'
                    onClick={() => {
                        handleChange('ListContracts');
                        window.scrollTo(0, 0);
                    }}
                >
                    Ver Todos
                </button>
            </div>
            {sectionComponents[activeSection]}
        </>
    );
};
export default Contracts;
