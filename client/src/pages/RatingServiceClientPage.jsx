import { AuthContext } from '../context/AuthContext';
import { useEffect, useState, useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
    fetchClientRatingServiceServices,
    fetchRatingServiceServices,
} from '../services/serviceServices';
import {FaStar} from 'react-icons/fa'
import toast from 'react-hot-toast';


const RatingServiceClientPage = () => {
    const { serviceId } = useParams();
    const { authToken } = useContext(AuthContext);

    const navigate = useNavigate();

    const [data, setData] = useState(null);  
    const [rating, setRating] = useState(null);
    const [hover, setHover] = useState(null);

    useEffect(() => {
        const getRating = async () => {
            try {
                const data = await fetchClientRatingServiceServices(serviceId);
                setData(data);
                setRating(data?.rating);
            } catch (error) {
                toast.error(error.message, {
                    id: 'error',
                });                
            }
        };
        getRating();
    }, [serviceId]);

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
                <legend>Valorar el servicio</legend>

                
                <div className='flex'>
                    {[...Array(5)].map((_, index) => {
                            const currentRating = index + 1;
                            return (
                                <label key={currentRating}>
                                    <input
                                        className='hidden'
                                        type="radio"
                                        name="rating"
                                        value={currentRating}
                                        checked={rating === currentRating}
                                        onChange={() => setRating(currentRating)}
                                    />
                                    <FaStar
                                        className='cursor-pointer'
                                        size={50}
                                        color={currentRating <= (hover || rating) ? "#ffc107" : "#e4e5e9"}
                                        onMouseEnter={() => setHover(currentRating)}
                                        onMouseLeave={() => setHover(null)}
                                    />
                                </label>
                            );
                        })}               
                </div>
                
                    <label htmlFor="comment">Commentarios:</label>
                    <textarea/>
                
                <div className='mx-auto'>
                    <button
                        className='mr-4 mt-4'
                        type="submit"
                        onClick={handleRatingService}>Enviar
                    </button>
                </div>
            </fieldset>
    </form> 
    )
}

export default RatingServiceClientPage;