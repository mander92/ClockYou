import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
const { VITE_API_URL } = import.meta.env;

import NewServiceForm from '../../components/NewServiceForm/NewServiceForm';

const DetailTypeOfService = () => {
    const [data, setData] = useState({});
    const { typeOfServiceId } = useParams();

    useEffect(() => {
        const fecthTypeOfSevice = async () => {
            try {
                const res = await fetch(
                    `${VITE_API_URL}/typeOfServices/${typeOfServiceId}`
                );

                const body = await res.json();

                if (!body.status === 'ok') {
                    throw new Error('Ha habido un error');
                }

                setData(body.data);
            } catch (error) {
                toast.error(error.message);
            }
        };

        fecthTypeOfSevice();
    }, [typeOfServiceId]);

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
