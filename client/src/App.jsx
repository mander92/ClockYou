import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import Home from './pages/Home/Home';
import About from './pages/About/About';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import Validate from './pages/Validate/Validate.jsx';
import EditService from './pages/EditService/EditService';
import NewService from './pages/NewService/NewService';
import NewTypeOfService from './pages/NewTypeOfService/NewTypeOfService';
import NotFound from './pages/NotFound/NotFound';
import RecoverPassword from './pages/RecoverPassword/RecoverPassword';
import TypeOfServices from './pages/TypeOfServices/TypeOfServices.jsx'
import './App.css';


const App = () => {
    return (
        <Layout>
            <main className='flex-grow'>
                <Routes>
                    <Route path='/' element={<Home />} />
                    <Route path='/about' element={<About />} />
                    <Route path='/login' element={<Login />} />
                    <Route path='/register' element={<Register />} />
                    <Route path='/typeOfServices' element={<TypeOfServices />} />
                    <Route
                        path='/users/validate/:registrationCode'
                        element={<Validate />}
                    />
                    <Route path='/editservice' element={<EditService />} />
                    <Route path='/newservice' element={<NewService />} />
                    <Route
                        path='/newtypeofservice'
                        element={<NewTypeOfService />}
                    />
                    <Route
                        path='/recoverpassword'
                        element={<RecoverPassword />}
                    />
                    <Route path='*' element={<NotFound />} />
                </Routes>
            </main>
        </Layout>
    );
};

export default App;
