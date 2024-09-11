const { VITE_API_URL } = import.meta.env;
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { fetchTypeOfServiceServices } from '../services/typeOfServiceServices';
import NewServiceFormComponent from '../components/NewServiceFormComponent';
import toast from 'react-hot-toast';

const NewServicePage = () => {
    const { typeOfServiceId } = useParams();

    const [data, setData] = useState({});

    useEffect(() => {
        const getTypeOfService = async () => {
            try {
                const data = await fetchTypeOfServiceServices(typeOfServiceId);
                setData(data);
            } catch (error) {
                toast.error(error.message, {
                    id: 'error',
                });
            }
        };

        getTypeOfService();
    }, [typeOfServiceId]);

    return (
        <section className='mx-auto flex-1024'>
            <form className='profile-form'>
                <h2 className='mb-4'>
                    {data?.type} en {data?.city}
                </h2>
                <fieldset>
                    <img
                        className='w-full h-full object-cover'
                        src={`${VITE_API_URL}/${data?.image}`}
                        alt={`${data?.description}`}
                    />
                    <h3>{data?.description}</h3>
                    <p>⭐️⭐️⭐️⭐️⭐️</p>
                    <p>{data?.price} €</p>
                </fieldset>
            </form>
            <NewServiceFormComponent typeOfServiceId={data?.id} />
        </section>
    );
};

export default NewServicePage;
