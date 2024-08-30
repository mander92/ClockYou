const { VITE_APP_TITLE } = import.meta.env;
import TypeOfServicies from '../../components/TypeOfServices/TypeOfServices';
import './Home.css';


const Home = () => {

  return (
    <>
      <div className='container'>
        <h1>{`Bienvenido a ${VITE_APP_TITLE}`}</h1>
        <h2>El sitio web donde encontrarás todo lo que buscas...</h2>
        <TypeOfServicies />
      </div>
    </>
  );
};

export default Home;
