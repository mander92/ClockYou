import { useContext, useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { AuthContext } from '../../../context/AuthContext';
import useUser from '../../../hooks/useUser';
import './Header.css';
import clockyouLogo from '/logo-test.png';

const Header = ({ currentPage }) => {
  const { authLogout } = useContext(AuthContext);
  const { user } = useUser();
  const [menuBurguer, setmenuBurguer] = useState(false);

  const handleBurguer = () => {
    setmenuBurguer(!menuBurguer);
  };

  // const navATags = Array.from(document.querySelectorAll('.linkmainnav'));
  // https://reactrouter.com/en/v6.3.0/api#navlink

  useEffect(() => {
    menuBurguer
      ? document.body.classList.add('overflow-hidden')
      : document.body.classList.remove('overflow-hidden');
  }, [menuBurguer]);

  return (
    <header>
      <div className='container'>
        <nav className='mainnav flex flex-wrap'>
          <NavLink className='flex items-center' to={'/'}>
            <img className='w-14' src={clockyouLogo} alt='clockYou' />

            <span className='text-4xl pl-1.5 serif-FONT-regular hidden sm:inline-flex'>
              ClockYou
            </span>
          </NavLink>

          <ul
            id='navdinamica'
            className={menuBurguer ? 'navdinamica show' : 'navdinamica'}
          >
            <li>
              <NavLink className='linkmainnav' to={'/typeOfServices'}>
                Servicios
              </NavLink>
            </li>
            {!user ? (
              <>
                <li>
                  <NavLink className='linkmainnav' to={'/register'}>
                    Registrarse
                  </NavLink>
                </li>
                <li>
                  <NavLink className='linkmainnav' to={'/login'}>
                    Iniciar Sesión
                  </NavLink>
                </li>
              </>
            ) : (
              <>
                <li>
                  <NavLink className='linkmainnav' to={'/user'}>
                    Mi Cuenta
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    onClick={authLogout}
                    className='linkmainnav noBgr'
                    to={'/'}
                  >
                    Cerrar Sesión
                  </NavLink>
                </li>
              </>
            )}
          </ul>
          <div
            onClick={handleBurguer}
            className={menuBurguer ? 'menuburguer open' : 'menuburguer'}
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
