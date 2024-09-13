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
            {data.length === 0 ? (
                <ul className='cards'>
                    {data?.map((item) => {
                        const date = new Date(
                            item.dateTime
                        ).toLocaleDateString();
                        const time = new Date(item.dateTime).toLocaleTimeString(
                            [],
                            {
                                hour: '2-digit',
                                minute: '2-digit',
                            }
                        );

                        return (
                            <li id={item.id} key={item.id}>
                                <h3>
                                    El {date} a las {time}
                                </h3>
                                <p>
                                    En {item.address}, {item.postcode},{' '}
                                    {item.city}
                                </p>
                                <p>Horas: {item.hours}</p>
                                <p>Precio: {item.totalPrice}€</p>
                                <NavLink
                                    to={`/shiftRecords/${item.shiftRecordId}`}
                                >
                                    Fichar
                                </NavLink>
                            </li>
                        );
                    })}
                </ul>
            ) : (
                <h1></h1>
            )}
        </>
    );
};

export default MyServices;
