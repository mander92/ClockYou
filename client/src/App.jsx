import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import Home from './pages/Home';
import './App.css';

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
