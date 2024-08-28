import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import Home from './pages/Home/Home';
import About from './pages/About/About';
import Login from './pages/Login/Login';
import Registro from './pages/Registro/Registro';
import Validate from './pages/Validate/Validate';
import EditService from './pages/EditService/EditService';
import NewService from './pages/NewService/NewService';
import NewTypeOfService from './pages/NewTypeOfService/NewTypeOfService';
import NotFound from './pages/NotFound/NotFound';
import RecoverPassword from './pages/RecoverPassword/RecoverPassword';
import './App.css';

const App = () => {
  return (
    <>
      <Layout>
        <main className='flex-grow'>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/about' element={<About />} />
            <Route path='/login' element={<Login />} />
            <Route path='/registro' element={<Registro />} />
            <Route path='/validation/:registrationCode' element={<Validate />} />
            <Route path='/editservice' element={<EditService />} />
            <Route path='/newservice' element={<NewService />} />
            <Route path='/newtypeofservice' element={<NewTypeOfService />} />
            <Route path='/notfound' element={<NotFound />} />
            <Route path='/recoverpassword' element={<RecoverPassword />} />
          </Routes>
        </main>
      </Layout>
    </>
  );
};

export default App;
