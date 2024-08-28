import { useState } from 'react';
import './Header.css';
import clockyouLogo from '/logo-test.png';

const Header = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [menuBurguer, setmenuBurguer] = useState(false);

  const handleBurguer = () => {};

  return (
    <header>
      <nav className='mainnav flex flex-wrap'>
        <a href='/' className='flex items-center pb-3 sm:pb-0'>
          <img className='w-14' src={clockyouLogo} alt='clockYou' />

          <span className='text-4xl pl-1.5 dm-serif-text-regular hidden sm:inline-flex'>
            ClockYou
          </span>
        </a>

        <ul className='navdinamica flex flex-wrap items-center gap-3'>
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
            <a className='linkmainnav' href={!showMenu ? '/login' : '/'}>
              {!showMenu ? 'Iniciar Sesión' : 'Cerrar Sesión'}
            </a>
          </li>
        </ul>

        <div onClick={handleBurguer} className='menuburguer'>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </nav>
    </header>
  );
};

export default Header;
