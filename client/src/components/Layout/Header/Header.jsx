import { useState } from 'react';

import './Header.css';
import clockyouLogo from '/logo-test.png';

const Header = () => {
    const [showMenu, setShowMenu] = useState(false);
    const [menuBurguer, setmenuBurguer] = useState(false);

    const handleBurguer = () => {
        setmenuBurguer(!menuBurguer);
    };

    return (
        <header>
            <div className='container'>
                <nav className='mainnav flex flex-wrap'>
                    <a href='/' className='flex items-center'>
                        <img
                            className='w-14'
                            src={clockyouLogo}
                            alt='clockYou'
                        />

                        <span className='text-4xl pl-1.5 dm-serif-text-regular hidden sm:inline-flex'>
                            ClockYou
                        </span>
                    </a>

                    <ul
                        id='navdinamica'
                        className={
                            menuBurguer ? 'navdinamica show' : 'navdinamica'
                        }
                    >
                        <li>
                            <a className='linkmainnav' href='/about'>
                                Sobre Nosotros
                            </a>
                        </li>
                        <li>
                            <a className='linkmainnav' href='#'>
                                Servicios
                            </a>
                        </li>
                        <li>
                            <a className='linkmainnav' href='#'>
                                Contacto
                            </a>
                        </li>
                        <li>
                            <a
                                className='linkmainnav'
                                href={!showMenu ? '/login' : '/'}
                            >
                                {!showMenu ? 'Iniciar Sesión' : 'Cerrar Sesión'}
                            </a>
                        </li>
                        <li>
                            <a className='linkmainnav' href='/register'>
                                Registrarse
                            </a>
                        </li>
                    </ul>

                    <div
                        onClick={handleBurguer}
                        className={
                            menuBurguer ? 'menuburguer open' : 'menuburguer'
                        }
                    >
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                </nav>
            </div>
        </header>
    );
};

export default Header;
