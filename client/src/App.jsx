import './Fonts.css';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage.jsx';
import RegisterPage from './pages/RegisterPage.jsx';
import ValidateUserPage from './pages/ValidateUserPage.jsx';
import NotFound from './pages/NotFound/NotFound';
import SendRecoverPasswordPage from './pages/SendRecoverPasswordPage.jsx';
import TypeOfServices from '../src/components/TypeOfServices/TypeOfServices.jsx';
import ChangeRecoverPasswordPage from './pages/ChangeRecoverPasswordPage.jsx';
import DetailTypeOfService from './pages/DetailTypeOfService/DetailTypeOfServices.jsx';
import DashboardPage from './pages/DashboardPage.jsx';

const App = () => {
  return (
    <Layout>
      <main className='pb-6 overflow-x-clip'>
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/register' element={<RegisterPage />} />
          <Route
            path='/users/validate/:registrationCode'
            element={<ValidateUserPage />}
          />
          <Route path='/login' element={<LoginPage />} />
          <Route path='/user' element={<DashboardPage />} />

          <Route path='/typeOfServices' element={<TypeOfServices />} />
          <Route
            path='/typeOfServices/:typeOfServiceId'
            element={<DetailTypeOfService />}
          />

          <Route
            path='/recoverpassword'
            element={<SendRecoverPasswordPage />}
          />
          <Route path='/password' element={<ChangeRecoverPasswordPage />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </main>
    </Layout>
  );
};

export default App;
