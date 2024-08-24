const { VITE_APP_TITLE } = import.meta.env;
import PropTypes from 'prop-types';
// import products from './components/data/products.json';

const Home = ({ products }) => {
  const productsLi = products.map((product, index) => {
    return (
      <li key={product.id}>
        {product.name} ({product.price}€)
      </li>
    );
  });

  return (
    <main>
      <h1>Hola desde el Front de {VITE_APP_TITLE}</h1>
      <h2>Empezando a darle estructura al Front de {VITE_APP_TITLE}</h2>

      <ul>{productsLi}</ul>

      <ul>
        {products.map((product, index) => {
          return (
            <li key={product.id}>
              {product.name} ({product.price}€)
            </li>
          );
        })}
      </ul>
    </main>
  );
};

// Validación de PROPS
Home.propTypes = {
  products: PropTypes.array.isRequired,
};

export default Home;
