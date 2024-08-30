import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import Validate from './pages/Validate/Validate.jsx';
import NotFound from './pages/NotFound/NotFound';
import RecoverPassword from './pages/RecoverPassword/SendRecoverPassword.jsx';
import TypeOfServices from '../src/components/TypeOfServices/TypeOfServices.jsx';
import ChangeRecoverPassword from './pages/RecoverPassword/ChangeRecoverPassword.jsx';
import DetailTypeOfService from './pages/DetailTypeOfService/DetailTypeOfServices.jsx';
import './Fonts.css';
import './App.css';

const App = () => {
  return (
    <Layout>
      <main className='flex-grow'>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />

          <Route path='/typeOfServices/:typeOfServiceId' element={<DetailTypeOfService />} />
          <Route path='/typeOfServices' element={<TypeOfServices />} />
          
          <Route
            path='/users/validate/:registrationCode'element={<Validate />}/>

          <Route path='/recoverpassword' element={<RecoverPassword />} />
          <Route path='/password' element={<ChangeRecoverPassword />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </main>
    </Layout>
  );
};

export default App;
