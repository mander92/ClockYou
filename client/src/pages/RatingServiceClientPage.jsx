import { AuthContext } from '../context/AuthContext';
import { useState, useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchRatingServiceServices } from '../services/serviceServices';
import { FaStar } from 'react-icons/fa';
import toast from 'react-hot-toast';

const RatingServiceClientPage = () => {
    const { serviceId } = useParams();
    const { authToken } = useContext(AuthContext);

    const navigate = useNavigate();

    const [rating, setRating] = useState(null);
    const [hover, setHover] = useState(null);

    const handleRatingService = async (e) => {
        e.preventDefault();

        try {
            const body = await fetchRatingServiceServices(
                serviceId,
                rating,
                authToken
            );
            toast.success(body.message, {
                id: 'ok',
            });
            navigate('/user');
        } catch (error) {
            toast.error(error.message, {
                id: 'error',
            });
        }
    };

    return (
        <form className='mx-auto'>
            <fieldset>
                <legend>¿Cómo valorarías nuestro servicio?</legend>
                <section className='flex justify-center mt-2'>
                    {[...Array(5)].map((_, index) => {
                        const currentRating = index + 1;
                        return (
                            <>
                                <label key={currentRating}></label>
                                <input
                                    className='hidden'
                                    type='radio'
                                    name='rating'
                                    value={currentRating}
                                    checked={rating === currentRating}
                                    onChange={() => setRating(currentRating)}
                                />
                                <FaStar
                                    className='cursor-pointer'
                                    size={30}
                                    color={
                                        currentRating <= (hover || rating)
                                            ? '#ffc107'
                                            : '#e4e5e9'
                                    }
                                    onMouseEnter={() => setHover(currentRating)}
                                    onMouseLeave={() => setHover(null)}
                                    onClick={() => setRating(currentRating)}
                                />
                            </>
                        );
                    })}
                </section>
                <div className='mx-auto'>
                    <button onClick={handleRatingService}>Valorar</button>
                </div>
            </fieldset>
        </form>
    );
};

export default RatingServiceClientPage;
