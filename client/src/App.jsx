import './App.css';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage.jsx';
import RegisterPage from './pages/RegisterPage.jsx';
import ValidateUserPage from './pages/ValidateUserPage.jsx';
import NotFoundPage from './pages/NotFoundPage.jsx';
import SendRecoverPasswordPage from './pages/SendRecoverPasswordPage.jsx';
import TypeOfServicesPage from './pages/TypeOfServicesPage.jsx';
import ChangeRecoverPasswordPage from './pages/ChangeRecoverPasswordPage.jsx';
import DashboardPage from './pages/DashboardPage.jsx';
import EditServicePage from './pages/EditServicePage.jsx';
import DetailTypeOfServicePage from './pages/DetailTypeOfServicePage.jsx';
import DetailServicePage from './pages/DetailServicePage.jsx';
import ConfirmedService from './pages/ConfirmedService.jsx';
import Clock from './pages/Clock.jsx';
import EditServiceClientPage from './pages/EditServiceClientPage.jsx';

const App = () => {
    return (
        <Layout>
            <main className='container mx-auto'>
                <Routes>
                    <Route path='/' element={<HomePage />} />
                    <Route path='/register' element={<RegisterPage />} />
                    <Route
                        path='/users/validate/:registrationCode'
                        element={<ValidateUserPage />}
                    />
                    <Route path='/login' element={<LoginPage />} />
                    <Route path='/user' element={<DashboardPage />} />

                    <Route
                        path='/typeOfServices'
                        element={<TypeOfServicesPage />}
                    />
                    <Route
                        path='/typeOfServices/:typeOfServiceId'
                        element={<DetailTypeOfServicePage />}
                    />
                    <Route
                        path='/typeOfServices/edit/:typeOfServiceId'
                        element={<EditServicePage />}
                    />

                    <Route
                        path='/services/:serviceId'
                        element={<DetailServicePage />}
                    />

                    <Route
                        path='/services/edit/:serviceId' //Thanh
                        element={<EditServiceClientPage />}
                    />

                    <Route
                        path='/recoverpassword'
                        element={<SendRecoverPasswordPage />}
                    />
                    <Route
                        path='/password'
                        element={<ChangeRecoverPasswordPage />}
                    />

                    <Route
                        path='/services/validate/:validationCode'
                        element={<ConfirmedService />}
                    />

                    <Route
                        path='/shiftRecords/:shiftRecordId'
                        element={<Clock />}
                    />
                    <Route path='*' element={<NotFoundPage />} />
                </Routes>
            </main>
        </Layout>
    );
};

export default App;
