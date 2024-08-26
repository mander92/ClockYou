const { VITE_APP_TITLE } = import.meta.env;
import products from '../components/data/products.json';

const Home = () => {
  const productsLi = products.map((product, index) => {
    return (
      <li key={product.id}>
        {product.name} ({product.price}€)
      </li>
    );
  });

  return (
    <>
      <h1>Front de {VITE_APP_TITLE}</h1>
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
    </>
  );
};

// Validación de PROPS
// Home.propTypes = {
//   products: PropTypes.array.isRequired,
// };

export default Home;
