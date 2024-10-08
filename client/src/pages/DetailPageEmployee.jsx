import { useParams } from 'react-router-dom';
import { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { fetchDetailServiceServices } from '../services/serviceServices.js';

import toast from 'react-hot-toast';
import ShiftRecordComponent from '../components/EmployeeDashBoard/ShiftRecordComponent.jsx';

const DetailPageEmployee = () => {
    const { serviceId } = useParams();
    const { authToken } = useContext(AuthContext);

    const [data, setData] = useState([]);
    const [location, setLocation] = useState({});
    console.log(location);

    useEffect(() => {
        const DetailService = async () => {
            try {
                const data = await fetchDetailServiceServices(
                    serviceId,
                    authToken
                );

                setData(data);
                setLocation({
                    currentLocation: [data.latitudeIn, data.longitudeIn],
                });
            } catch (error) {
                toast.error(error.message, { id: 'error' });
            }
        };
        DetailService();
    }, [serviceId, authToken]);

    const time = new Date(data.dateTime).toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
    });
    const date = new Date(data.dateTime).toLocaleDateString();

    const clockIn = new Date(data.clockIn).toLocaleString();
    const clockOut = new Date(data.clockOut).toLocaleString();

    return (
        <section>
            <form className='form-filters mx-auto'>
                <fieldset>
                    <legend>Solicitud</legend>
                    <p className='mt-2'>{data.type}</p>
                    <p>{data.comments}</p>

                    <p className='font-extrabold'>
                        Solicitado para el {date} a las {time}
                    </p>
                    <p className='grow'>
                        En {data.address}, {data.city}, {data.postCode},{' '}
                        {data.province}
                    </p>
                    <p>Horas Contratadas: {data.hours}</p>
                    <p className='font-extrabold'>Total: {data.totalPrice}€</p>
                </fieldset>
            </form>
            <form className='form-filters mx-auto'>
                <fieldset>
                    <legend>Cliente</legend>
                    <p className='mt-2'>
                        {data.firstName} {data.lastName}
                    </p>
                    <p>{data.email}</p>
                    <p>{data.dni}</p>
                    <p>{data.phone}</p>
                </fieldset>
            </form>
            <ShiftRecordComponent
                saveLocation={location}
                shiftRecordId={data.id}
            />
        </section>
    );
};

export default DetailPageEmployee;
