import { useEffect, useState } from 'react';

const ScrollTopComponent = () => {
    const [show, setShow] = useState(false);

    const toggleShow = () => {
        if (window.scrollY > 200) {
            setShow(true);
        } else {
            setShow(false);
        }
    };

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };

    useEffect(() => {
        window.addEventListener('scroll', toggleShow);
        return () => {
            window.removeEventListener('scroll', toggleShow);
        };
    }, []);

    return (
        <button
            id='scroll'
            onClick={scrollToTop}
            className={show ? 'show cursor-pointer' : 'hide cursor-pointer'}
        >
            <img
                className='arrowTopIcon'
                src='/icon-top-arrow-32.png'
                alt='vuelve arriba'
            />
        </button>
    );
};

export default ScrollTopComponent;
