import { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
    fetchTypeOfService,
    fetchDeleteTypeOfServices,
    fetchEditTypeOfServices,
} from '../services/typeOfServiceServices';
import { AuthContext } from '../context/AuthContext';
import toast from 'react-hot-toast';
const { VITE_API_URL } = import.meta.env;
import './editPagesForms.css';

const EditService = () => {
    const { typeOfServiceId } = useParams();
    const [data, setData] = useState(null);
    const [description, setDescription] = useState(data?.description || '');
    const [price, setPrice] = useState(data?.price || '');

    const { authToken } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        const getTypeOfService = async () => {
            try {
                const data = await fetchTypeOfService(typeOfServiceId);
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
            const body = await fetchEditTypeOfServices(
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
            const body = await fetchDeleteTypeOfServices(
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
        <section className='container editServiceLayoutWrapper'>
            <article className='editServiceLayout'>
                <img
                    src={`${VITE_API_URL}/${data?.image}`}
                    alt={`${data?.description}`}
                />
                <h3 className='container'>
                    {data?.type} En {data?.city}
                </h3>
            </article>

            <form className='form' onSubmit={handleEditService}>
                <fieldset>
                    <legend>Modificar Servicio</legend>

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
                        placeholder={data?.price}
                        required
                    />

                    <button>Guardar Cambios</button>
                    <button onClick={handleDeleteService}>
                        Eliminar Servicio
                    </button>
                </fieldset>
            </form>
        </section>
    );
};

export default EditService;
