import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import Home from './pages/Home/Home';
import './App.css';

const App = () => {
  return (
    <>
      <Layout>
        <main className='flex-grow'>
          <Routes>
            <Route path='/' element={<Home />} />
          </Routes>
        </main>
      </Layout>
    </>
  );
};

export default App;
