import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import toast from 'react-hot-toast';
const { VITE_API_URL } = import.meta.env;
import NewServiceForm from '../../components/NewServiceForm/NewServiceForm';
import { fetchTypeOfService } from '../../services/typeOfServiceServices';

const DetailTypeOfService = () => {
    const { typeOfServiceId } = useParams();
    const [data, setData] = useState(null);

    useEffect(() => {
        const getTypeOfService = async () => {
            try {
                const data = await fetchTypeOfService(typeOfServiceId);
                setData(data);
            } catch (error) {
                toast.error(error.message, {
                    id: 'error',
                });
            }
        };

        getTypeOfService();
    }, [typeOfServiceId]);

    if (!data) {
        return <div>Cargando...</div>;
    }

    return (
        <div className='container'>
            <h1>{data.type}</h1>
            <img
                src={`${VITE_API_URL}/${data.image}`}
                alt={`${data.description}`}
            />
            <h3>{data.description}</h3>
            <h4>{data.price}</h4>
            <NewServiceForm typeOfServiceId={data.id} />
        </div>
    );
};

export default DetailTypeOfService;
