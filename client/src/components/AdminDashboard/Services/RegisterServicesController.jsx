import { useState, useContext } from 'react';
import { AuthContext } from '../../../context/AuthContext';
import { fecthRegisterNewTypeOfService } from '../../../services/typeOfServiceServices';
import toast from 'react-hot-toast';

const RegisterNewTypeOfServiceController = () => {
    const [type, setType] = useState('');
    const [description, setDescription] = useState('');
    const [city, setCity] = useState('');
    const [price, setPrice] = useState('');
    const [image, setImage] = useState(null);

    const { authToken } = useContext(AuthContext);

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
            <h1>Registra un nuevo tipo de servicio</h1>
            <fieldset>
                <legend>Registrar un servicio</legend>
                <input
                    id='type'
                    type='text'
                    value={type}
                    onChange={(e) => {
                        setType(e.target.value);
                    }}
                    placeholder={'Tipo de servicio'}
                    required
                />

                <input
                    id='description'
                    type='text'
                    value={description}
                    onChange={(e) => {
                        setDescription(e.target.value);
                    }}
                    placeholder={'Descripción'}
                    required
                />

                <input
                    id='city'
                    type='text'
                    value={city}
                    onChange={(e) => {
                        setCity(e.target.value);
                    }}
                    placeholder={'Ciudad'}
                    required
                />

                <input
                    id='price'
                    type='number'
                    value={price}
                    onChange={(e) => {
                        setPrice(e.target.value);
                    }}
                    placeholder={'Precio'}
                    required
                />
                <input
                    type='file'
                    accept='image/png, image/jpg, image/jpeg, image/tiff'
                    onChange={(e) => {
                        setImage(e.target.files[0]);
                    }}
                    required
                ></input>
                <div>
                    <button type='submit'>
                        Registrar nuevo tipo de servicio
                    </button>
                    <button onClick={resetInputs}>Limpiar</button>
                </div>
            </fieldset>
        </form>
    );
};

export default RegisterNewTypeOfServiceController;
