import { useState } from 'react';
import {FaStar} from 'react-icons/fa'


const RatingServiceClientPage = () => {
    const [rating, setRating] = useState(null);
    const [hover, setHover] = useState(null);

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
                        type="submit">Enviar
                    </button>
                </div>
            </fieldset>
    </form> 
    )
}

export default RatingServiceClientPage;