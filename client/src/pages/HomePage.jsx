const { VITE_APP_TITLE } = import.meta.env;
import TypeOfServicesPage from './TypeOfServicesPage';

const HomePage = () => {
    return (
        <>
            <section className='mx-auto isolate relative'>
                <article className='initial-content'>
                    <h1 className='my-4'>{`Bienvenido a ${VITE_APP_TITLE}`}</h1>
                    <h2>
                        El sitio web donde encontrarás todo lo que buscas ;)...
                    </h2>
                </article>
                <img src='./landing.webp' alt='Servicios múltiples' />
            </section>
            <TypeOfServicesPage />
        </>
    );
};

export default HomePage;
