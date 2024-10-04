import { useEffect, useState } from 'react';
import arrowTopIcon from '/icon-top-arrow-32.png';

const ScrollTop = () => {
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
        <div
            id='scroll'
            onClick={scrollToTop}
            className={show ? 'show cursor-pointer' : 'hide cursor-pointer'}
        >
            <img
                className='arrowTopIcon'
                src={arrowTopIcon}
                alt='vuelve arriba'
            />
        </div>
    );
};

export default ScrollTop;
