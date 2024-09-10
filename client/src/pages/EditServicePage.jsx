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

const EditServicePage = () => {
    const { typeOfServiceId } = useParams();

    const { authToken } = useContext(AuthContext);

    const navigate = useNavigate();

    const [data, setData] = useState(null);
    const [description, setDescription] = useState(data?.description || '');
    const [price, setPrice] = useState(data?.price || '');

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
            const body = await fetchEditTypeOfServiceServices(
                typeOfServiceId,
                description,
                price,
                authToken
            );
            toast.success(body.message, {
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
        try {
            const body = await fetchDeleteTypeOfServiceServices(
                typeOfServiceId,
                authToken
            );
            toast.success(body.message, {
                id: 'ok',
            });
            navigate('/user#services');
        } catch (error) {
            toast.error(error.message, {
                id: 'error',
            });
        }
    };

    return (
        <>
            <h2 className='mt-4'>
                {data?.type} en {data?.city}
            </h2>
            <section className='flex-1024'>
                <form className='profile-form mx-auto'>
                    <fieldset>
                        <img
                            className='w-full h-full object-cover'
                            src={`${VITE_API_URL}/${data?.image}`}
                            alt={`${data?.description}`}
                        />
                    </fieldset>
                </form>
                <form className='profile-form mx-auto'>
                    <fieldset>
                        <legend>Editar</legend>
                        <label htmlFor='description'>Descripción</label>
                        <input
                            id='description'
                            type='text'
                            value={description}
                            onChange={(e) => {
                                setDescription(e.target.value);
                            }}
                            placeholder={data?.description}
                            required
                        />

                        <label htmlFor='description'>Precio</label>
                        <input
                            type='number'
                            value={price}
                            onChange={(e) => {
                                setPrice(e.target.value);
                            }}
                            min={1}
                            max={100}
                            placeholder={data?.price}
                            required
                        />
                        <div className='mx-auto'>
                            <button
                                className='mr-4 mt-4'
                                type='submit'
                                onClick={handleEditService}
                            >
                                Guardar
                            </button>
                            <button onClick={handleDeleteService}>
                                Eliminar
                            </button>
                        </div>
                    </fieldset>
                </form>
            </section>
        </>
    );
};

export default EditServicePage;
