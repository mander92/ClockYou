import { useState } from 'react';
import './App.css';

import Header from './components/Layout/Header/Header';
import Home from './components/Layout/Home/Home';
import Footer from './components/Layout/Footer/Footer';
import products from './components/data/products.json';

// importamos products aquí para practicar con las PROPS pero, si solo lo va usar 1 componente de los que se despliegan en este archivo, App.jsx, lo suyo sería importar products en el componente que vaya a usar products (Home, en este caso)

const App = () => {
  const [count, setCount] = useState(0);
  console.log('XXXXXXXX --- ', products);

  return (
    <>
      <Header />
      <Home products={products} />
      <Footer />

      <div className='card'>
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
      </div>
    </>
  );
};

export default App;
