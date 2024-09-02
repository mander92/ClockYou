import Footer from './Footer/Footer';
import Header from './Header/Header';

const Layout = ({ children }) => {
  let currentPage; // no matéis esa prop aún
  return (
    <>
      <Header currentPage={currentPage} />
      {children}
      <Footer />
    </>
  );
};

export default Layout;
