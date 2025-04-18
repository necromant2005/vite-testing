import { ReactNode } from 'react';
import { Link, useLocation } from 'react-router-dom';
import CategoriesHeader from './CategoriesHeader';

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path ? 'fw-bold bg-light text-dark-emphasis' : '';
  };

  return (
    <div className="">
      <header className="navbar navbar-expand-lg bd-navbar sticky-top bg-dark">
        <div className="container">
          <div className="d-flex justify-content-between align-items-center py-3">
            <h1 className="h4 mb-0">Dashboard</h1>
            <nav className="nav">
              <Link to="/" className={`nav-link text-white ${isActive('/')}`}>Home</Link>
              <Link to="/cakes" className={`nav-link text-white ${isActive('/cakes')}`}>Cakes</Link>
              <Link to="/recipes" className={`nav-link text-white ${isActive('/recipes')}`}>Recipes</Link>
            </nav>
          </div>
        </div>
      </header>
      <CategoriesHeader />
      <main className="flex-grow-1">
        {children}
      </main>
      <footer className="bg-dark text-white py-3">
        <div className="container text-center">
          <p className="mb-0">&copy; {new Date().getFullYear()} Dashboard. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Layout; 