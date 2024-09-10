import { Link } from 'react-router-dom';

const NotFoundPage = () => {
    return (
        <>
            <img
                className='mx-auto mt-4'
                src='./404.png'
                alt='404 página no encontrada'
            />
            <div className='mx-auto text-center py-10'>
                <Link className='text-4xl ' to={'/'}>
                    Vuelve a la página principal
                </Link>
            </div>
        </>
    );
};

export default NotFoundPage;
