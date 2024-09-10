import { AuthContext } from '../../context/AuthContext';
import { useEffect, useState, useContext } from 'react';
import toast from 'react-hot-toast';
import { fetchAllMyServices } from '../../services/serviceServices';

const MyServices = () => {
    const [data, setData] = useState([]);
    const { authToken } = useContext(AuthContext);

    useEffect(() => {
        const getTypeOfServices = async () => {
            try {
                const data = await fetchAllMyServices(authToken);
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
                {data.map((item) => {
                    console.log(item);
                    // return (
                    //     <li id={item.id} key={item.id}>
                    //         <h3>{item.type}</h3>

                    //         <p className='grow'>{item.description}</p>

                    //         <p className='font-extrabold'>{item.city}</p>

                    //         <p>{item.price}</p>
                    //     </li>
                    // );
                })}
            </ul>
        </>
    );
};

export default MyServices;
