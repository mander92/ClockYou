const { VITE_APP_TITLE } = import.meta.env;
import ContactFormComponent from '../components/ContactFormComponent.jsx';

const HomePage = () => {
    return (
        <>
            <section className='mx-auto isolate relative hero-css bgr-img'>
                <article className='initial-content'>
                    <h1 className='my-4'>{`Bienvenido a ${VITE_APP_TITLE}`}</h1>
                    <h2>
                        Encuentra cualquier servicio que necesites, con la
                        comodidad de no moverte
                    </h2>
                </article>
            </section>
            <section className='hero-css-2'>
                <div>
                    <h2 className='pt-8 mb-8'>¿Cómo funciona?</h2>
                    <div className='articles-container'>
                        <article>
                            <img src='./step-1-pShop.webp' alt='' />
                            <h3>Busca lo que necesitas</h3>
                            <p className='text-center'>
                                Tenemos casi de todo: limpieza, clases
                                particulares, cuidado de mascotas...
                            </p>
                        </article>
                        <article className='mt-6'>
                            <img src='./step-2.webp' alt='' />
                            <h3>El profesional ideal</h3>
                            <p className='text-center'>
                                De nuestra amplia variedad, seleccionaremos al
                                más adecuado en base a tu solicitud
                            </p>
                        </article>
                    </div>
                </div>
            </section>
            <section className='hero-css-3'>
                <ContactFormComponent />
            </section>
        </>
    );
};

export default HomePage;
