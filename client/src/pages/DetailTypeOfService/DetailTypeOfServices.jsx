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

  return (
    <section className='container'>
      <h1>{data?.type}</h1>

      <section className='editServiceLayoutWrapper'>
        <div>
          <div className='editServiceLayout'>
            <img
              id='imgService'
              src={`${VITE_API_URL}/${data?.image}`}
              alt={`${data?.description}`}
            />
            <h3>{data?.description}</h3>
            <h3>{data?.price}€</h3>
            <p></p>
          </div>
        </div>

        <NewServiceForm typeOfServiceId={data?.id} />
      </section>
    </section>
  );
};

export default DetailTypeOfService;
