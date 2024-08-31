import { useState, useContext } from 'react';
import toast from 'react-hot-toast'
import { AuthContext } from '../../context/AuthContext';
import PropTypes from 'prop-types';
const { VITE_API_URL } = import.meta.env;

const NewServiceForm = ({ typeOfServiceId }) => {
    const [dateTime, setDateTime] = useState('');
    const [hours, setHours] = useState(1);
    const [address, setAddress] = useState('');
    const [postCode, setPostCode] = useState('');
    const [city, setCity] = useState('');
    const [comments, setComments] = useState('');

    const { authToken } = useContext(AuthContext);

    const resetInputs = () => {
        setDateTime('');
        setHours(1);
        setAddress('');
        setCity('');
        setComments('');
    };

    const handleNewService = (e) => {
        e.preventDefault();

        const fetchSendData = async () => {
            try {

                
                const res = await fetch(`${VITE_API_URL}/services/${typeOfServiceId}`,{
                    method: 'POST',
                    headers: authToken
                    ? {
                          Authorization: authToken,
                          'Content-Type': 'application/json'
                      }
                    : {},
                    body: JSON.stringify({ 
                        hours,
                        address,
                        postCode,
                        city,
                        comments,
                        dateTime,
                    })
            });

                const body = await res.json()

                if(body.status === 'ok'){
                    toast.success(body.message)
                }else{
                    toast.error(body.message)
                }

            } catch (error) {
                toast.error(error.message)
            }
        }

        fetchSendData()
        
    };

   

    return (
        <section className='container'>
            <form
                className='userForm'
                onSubmit={handleNewService}
            >
                <fieldset>
                    <legend>Solicítalo</legend>
                    <label htmlFor='datetime'>Fecha y Hora</label>
                    <input
                        type='datetime-local'
                        id='datetime'
                        value={dateTime}
                        onChange={(e) => setDateTime(e.target.value)}
                        required
                    />
                    <label htmlFor='hours'>Horas</label>
                    <select
                        id='hours'
                        value={hours}
                        onChange={(e) => setHours(e.target.value)}
                        required
                    >
                        <option value='' disabled>
                            Selecciona las horas necesarias
                        </option>
                        <option value='1'>1</option>
                        <option value='2'>2</option>
                        <option value='3'>3</option>
                        <option value='4'>4</option>
                        <option value='5'>5</option>
                        <option value='6'>6</option>
                        <option value='7'>7</option>
                        <option value='8'>8</option>
                    </select>
                    <label htmlFor='address'>Dirección</label>
                    <input
                        type='text'
                        id='address'
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        placeholder='Gran Vía, 1, 5B'
                        required
                    />
                    <label htmlFor='postCode'>Código Postal</label>
                    <input
                        type='number'
                        id='c'
                        value={postCode}
                        onChange={(e) => setPostCode(e.target.value)}
                        placeholder='28013'
                        minLength='5'
                        maxLength='5'
                        required
                    />
                    <label htmlFor='city'>Localidad</label>
                    <input
                        type='text'
                        id='city'
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        placeholder='Madrid'
                        required
                    />
                    <label htmlFor='comments'>Comentarios</label>
                    <textarea
                        id='comments'
                        value={comments}
                        onChange={(e) => setComments(e.target.value)}
                        placeholder='Añada comentarios adicionales para describir sus necesidades sobre el servicio solicitado para poder brindarle nuestro mejor servicio'
                        minLength='25'
                        maxLength='500'
                        rows='5'
                        cols='50'
                        style={{ resize: 'none' }}
                        required
                    ></textarea>
                </fieldset>
                <div>
                    <button>Solicitar</button>
                    <button onClick={resetInputs}>Limpiar</button>
                </div>
            </form>
        </section>
    );
};

NewServiceForm.propTypes = {
    typeOfServiceId: PropTypes.string.isRequired
}

export default NewServiceForm;
