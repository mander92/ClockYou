import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import Home from './pages/Home';
import './App.css';

// importamos products aquí para practicar con las PROPS pero, si solo lo va usar 1 componente de los que se despliegan en este archivo, App.jsx, lo suyo sería importar products en el componente que vaya a usar products (Home, en este caso)

const App = () => {
  return (
    <>
      <Layout>
        <main className='flex-grow'>
          <Home />
        </main>
      </Layout>
    </>
  );
};

export default App;
