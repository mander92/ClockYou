import { AuthContext } from '../../context/AuthContext';
import { NavLink } from 'react-router-dom';
import { useEffect, useState, useContext } from 'react';
import { fetchEmployeeAllServicesServices } from '../../services/serviceServices';
import toast from 'react-hot-toast';

const MyServices = () => {
    const { authToken } = useContext(AuthContext);

    const [data, setData] = useState(null);

    useEffect(() => {
        const getTypeOfServices = async () => {
            try {
                const data = await fetchEmployeeAllServicesServices(authToken);

                setData(data);
            } catch (error) {
                toast.error(error.message, {
                    id: 'error',
                });
            }
        };

        getTypeOfServices();
    }, [authToken]);

    return (
        <>
            <ul className='cards'>
                {data?.map((item) => {
                    const date = new Date(item.dateTime).toLocaleDateString();
                    const time = new Date(item.dateTime).toLocaleTimeString();

                    return (
                        <li id={item.id} key={item.id}>
                            <h3>{item.type}</h3>
                            <p>{item.address}</p>
                            <p className='font-extrabold'>{item.city}</p>
                            <p>{item.postcode}</p>

                            <span className='font-bold'>{date}</span>
                            <span className='font-bold'>{time}</span>

                            <p className='grow'>{item.hours}</p>

                            <p>{item.totalPrice}</p>

                            <NavLink to={`/shiftRecords/${item.shiftRecordId}`}>
                                Fichar
                            </NavLink>
                        </li>
                    );
                })}
            </ul>
        </>
    );
};

export default MyServices;
