import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import Home from './pages/Home/Home';
import About from './pages/About/About';
import Login from './pages/Login/Login';
import Registro from './pages/Registro/Registro';
import Validate from './pages/Validate'
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
            <Route
					    path='/users/validate/:regCode'
					    element={<Validate />}
				    />
          </Routes>
        </main>
      </Layout>
    </>
  );
};

export default App;
