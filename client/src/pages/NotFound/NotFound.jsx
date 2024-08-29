import './NotFound.css';
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div>
      <h1>Error 404 - Page not found</h1>
      <Link to={"/"}>Vuelve a la página principal</Link>
    </div>
  );
};

export default NotFound;
