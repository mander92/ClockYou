import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import { AuthContext } from '../../../context/AuthContext';
import { fetchNewTypeOfServiceServices } from '../../../services/typeOfServiceServices';
import toast from 'react-hot-toast';

const RegisterNewTypeOfServiceController = () => {
    const { authToken } = useContext(AuthContext);
    const navigate = useNavigate();

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
            const data = await fetchNewTypeOfServiceServices(
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
            navigate('/user#services');
            resetInputs(e);
        } catch (error) {
            toast.error(error.message, {
                id: 'error',
            });
        }
    };

    return (
        <form className='mx-auto'>
            <fieldset>
                <legend>Servicio</legend>
                <label htmlFor='type'>Tipo</label>
                <input
                    required
                    id='type'
                    type='text'
                    placeholder='Masajes'
                    value={type}
                    onChange={(e) => {
                        setType(e.target.value);
                    }}
                />
                <label htmlFor='city'>Ciudad</label>
                <input
                    required
                    id='city'
                    type='text'
                    value={city}
                    onChange={(e) => {
                        setCity(e.target.value);
                    }}
                    placeholder={'Madrid'}
                />
                <label htmlFor='price'>Precio</label>
                <input
                    required
                    id='price'
                    type='number'
                    min='1'
                    max='100'
                    step='0.01'
                    placeholder='15'
                    value={price}
                    onChange={(e) => {
                        setPrice(e.target.value);
                    }}
                />
                <label htmlFor='description'>Descripción</label>
                <textarea
                    required
                    id='description'
                    type='text'
                    minLength='10'
                    maxLength='500'
                    rows='2'
                    style={{ resize: 'none' }}
                    value={description}
                    onChange={(e) => {
                        setDescription(e.target.value);
                    }}
                    placeholder={
                        'Sesiones de relajación y bienestar a domicilio.'
                    }
                />
                <label className='input-file text-center mt-2' htmlFor='file'>
                    Selecciona Imágen
                </label>
                <input
                    required
                    id='file'
                    type='file'
                    className='hidden'
                    accept='image/png, image/jpg, image/jpeg, image/tiff'
                    onChange={(e) => {
                        setImage(e.target.files[0]);
                    }}
                ></input>
                <div className='mx-auto'>
                    <button
                        className='mr-4'
                        onClick={handleRegisterNewTypeOfService}
                    >
                        Registrar
                    </button>
                    <button onClick={resetInputs}>Limpiar</button>
                </div>
            </fieldset>
        </form>
    );
};

export default RegisterNewTypeOfServiceController;
