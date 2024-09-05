import { useState, useContext } from 'react';
import { AuthContext } from '../../../context/AuthContext';
import { fecthRegisterNewTypeOfService } from '../../../services/typeOfServiceServices';
import toast from 'react-hot-toast';

const RegisterNewTypeOfServiceController = () => {
    const { authToken } = useContext(AuthContext);

    const [type, setType] = useState('');
    const [description, setDescription] = useState('');
    const [city, setCity] = useState('');
    const [price, setPrice] = useState('');
    const [image, setImage] = useState(null);

    const resetInputs = (e) => {
        e.preventDefault();
        setType('');
        setDescription('');
        setCity('');
        setPrice('');
    };

    const handleRegisterNewTypeOfService = async (e) => {
        e.preventDefault();
        try {
            const data = await fecthRegisterNewTypeOfService(
                type,
                description,
                city,
                price,
                image,
                authToken
            );

            toast.success(data.message, {
                id: 'ok',
            });
        } catch (error) {
            toast.error(error.message, {
                id: 'error',
            });
        }
    };

    return (
        <form className='form' onSubmit={handleRegisterNewTypeOfService}>
            <fieldset>
                <legend>Registrar Servicio</legend>
                <label htmlFor='type'>Tipo</label>
                <input
                    id='type'
                    type='text'
                    value={type}
                    onChange={(e) => {
                        setType(e.target.value);
                    }}
                    placeholder={'Masajes'}
                    required
                />
                <label htmlFor='description'>Descripción</label>
                <input
                    id='description'
                    type='text'
                    value={description}
                    onChange={(e) => {
                        setDescription(e.target.value);
                    }}
                    placeholder={
                        'Sesiones de relajación y bienestar a domicilio.'
                    }
                    required
                />
                <label htmlFor='city'>Ciudad</label>
                <input
                    id='city'
                    type='text'
                    value={city}
                    onChange={(e) => {
                        setCity(e.target.value);
                    }}
                    placeholder={'Madrid'}
                    required
                />
                <label htmlFor='price'>Precio</label>
                <input
                    id='price'
                    type='number'
                    value={price}
                    onChange={(e) => {
                        setPrice(e.target.value);
                    }}
                    min={1}
                    max={100}
                    placeholder={'Precio'}
                    required
                />
                <label htmlFor='file'>Imágen</label>
                <input
                    type='file'
                    accept='image/png, image/jpg, image/jpeg, image/tiff'
                    onChange={(e) => {
                        setImage(e.target.files[0]);
                    }}
                    required
                ></input>
                <div>
                    <button type='submit'>Registrar</button>
                    <button onClick={resetInputs}>Limpiar</button>
                </div>
            </fieldset>
        </form>
    );
};

export default RegisterNewTypeOfServiceController;
