


const RatingServiceClientPage = () => {

    return (
        <form >
        <div>
            <label htmlFor="rating">Valoración:</label>
            <input
                id='rating'
                type='text'
                
                

            />
        </div>
        <div>
            <label htmlFor="comment">Commentarios:</label>
            <textarea

            />
        </div>
        <button
            className='mr-4 mt-4' 
            type="submit">Enviar</button>
    </form> 
    )
}

export default RatingServiceClientPage;