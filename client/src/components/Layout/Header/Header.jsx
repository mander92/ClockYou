import { useContext, useState, useEffect } from 'react';

import { AuthContext } from '../../../context/AuthContext';

import useUser from '../../../hooks/useUser';

import './Header.css';
import clockyouLogo from '/logo-test.png';

const Header = () => {
    const { authLogout } = useContext(AuthContext);

    const { user } = useUser();

    console.log(user);

    const [menuBurguer, setmenuBurguer] = useState(false);

    const handleBurguer = () => {
        setmenuBurguer(!menuBurguer);
    };

    useEffect(() => {
        menuBurguer
            ? document.body.classList.add('overflow-hidden')
            : document.body.classList.remove('overflow-hidden');
    }, [menuBurguer]);

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

                        <span className='text-4xl pl-1.5 serif-FONT-regular hidden sm:inline-flex'>
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
                            <a className='linkmainnav' href='/typeOfServices'>
                                Servicios
                            </a>
                        </li>
                        <li>
                            <a className='linkmainnav' href='#'>
                                Contacto
                            </a>
                        </li>
                        {!user ? (
                            <>
                                <li>
                                    <a className='linkmainnav' href='/register'>
                                        Registrarse
                                    </a>
                                </li>
                                <li>
                                    <a className='linkmainnav' href='/login'>
                                        Iniciar Sesión
                                    </a>
                                </li>
                            </>
                        ) : (
                            <>
                            
                            <li>
                                <a
                                    className='linkmainnav'
                                    href='/micuenta'
                                >
                                    Mi Cuenta
                                </a>
                            </li>
                            <li>
                                <a
                                    onClick={authLogout}
                                    className='linkmainnav'
                                    href='/'
                                >
                                    Cerrar Sesión
                                </a>
                            </li>
                            </>
                        )}
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
