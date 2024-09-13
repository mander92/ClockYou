const { VITE_API_URL } = import.meta.env;
import { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
    fetchTypeOfServiceServices,
    fetchDeleteTypeOfServiceServices,
    fetchEditTypeOfServiceServices,
} from '../services/typeOfServiceServices';
import { AuthContext } from '../context/AuthContext';
import toast from 'react-hot-toast';

const EditTypeOfServicePage = () => {
    const { typeOfServiceId } = useParams();
    const { authToken } = useContext(AuthContext);
    const navigate = useNavigate();

    const [data, setData] = useState([]);
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');

    useEffect(() => {
        const getTypeOfService = async () => {
            try {
                const data = await fetchTypeOfServiceServices(typeOfServiceId);
                setData(data);
                setDescription(data.description);
                setPrice(data.price);
            } catch (error) {
                toast.error(error.message, {
                    id: 'error',
                });
            }
        };

        getTypeOfService();
    }, [typeOfServiceId]);

    const handleEditService = async (e) => {
        e.preventDefault();

        try {
            const data = await fetchEditTypeOfServiceServices(
                typeOfServiceId,
                description,
                price,
                authToken
            );
            toast.success(data.message, {
                id: 'ok',
            });
            navigate('/user#services');
        } catch (error) {
            toast.error(error.message, {
                id: 'error',
            });
        }
    };

    const handleDeleteService = async () => {
        if (
            window.confirm(
                '¿Estás seguro de querer eliminar el servicio? ¡¡¡Esta acción no se puede deshacer!!!'
            )
        ) {
            try {
                const data = await fetchDeleteTypeOfServiceServices(
                    typeOfServiceId,
                    authToken
                );
                toast.success(data.message, {
                    id: 'ok',
                });
                navigate('/user#services');
            } catch (error) {
                toast.error(error.message, {
                    id: 'error',
                });
            }
        }
    };

    return (
        <>
            <h2 className='mt-4'>
                {data.type} en {data.city}
            </h2>
            <section className='flex-1024'>
                <form className='profile-form mx-auto'>
                    <fieldset>
                        <img
                            className='w-full h-full object-cover'
                            src={`${VITE_API_URL}/${data.image}`}
                            alt={`${data.description}`}
                        />
                    </fieldset>
                </form>
                <form
                    className='profile-form mx-auto'
                    onSubmit={handleEditService}
                >
                    <fieldset>
                        <legend>Editar</legend>
                        <label htmlFor='description'>Descripción</label>
                        <input
                            required
                            id='description'
                            type='text'
                            value={description}
                            onChange={(e) => {
                                setDescription(e.target.value);
                            }}
                        />

                        <label htmlFor='price'>Precio</label>
                        <input
                            required
                            id='price'
                            type='number'
                            min='1'
                            max='100'
                            step='0.01'
                            value={price}
                            onChange={(e) => {
                                setPrice(e.target.value);
                            }}
                        />
                        <div className='mx-auto'>
                            <button className='mr-4' type='submit'>
                                Guardar
                            </button>
                            <button type='button' onClick={handleDeleteService}>
                                Eliminar
                            </button>
                        </div>
                    </fieldset>
                </form>
            </section>
        </>
    );
};

export default EditTypeOfServicePage;
