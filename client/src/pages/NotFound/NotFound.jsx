import './NotFound.css';
import { Link } from 'react-router-dom';
import notFound from '/404.png';

const NotFound = () => {
  return (
    <div className='notFound'>
      <img
        className='notfoundimg'
        src={notFound}
        alt='404 página no encontrada'
      />
      <h1>Page not found</h1>
      <Link to={'/'}>Vuelve a la página principal</Link>
    </div>
  );
};

export default NotFound;
