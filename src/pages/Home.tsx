import { Link } from 'react-router-dom'
import './pages.css'
import cakesData from '../data/cakes/cakes.json'
import recipesData from '../data/recipes/recipes.json'

const Home = () => {
  return (
    <div className="container py-5" role="main">
      <h2 className="text-center mb-4">Our Delicious Cakes</h2>
      <p className="text-center text-muted mb-5">Discover our handcrafted selection of premium cakes</p>
      
      <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4 mb-5">
        {cakesData.cakes.map((cake) => (
          <div key={cake.id} className="col">
            <Link to={`/cakes/${cake.category}/${cake.id}`} className="text-decoration-none">
              <div className="card h-100 shadow-sm" data-testid="card">
                <div className="card-body">
                  <h3 className="card-title h5">{cake.title}</h3>
                  <p className="card-text text-muted">{cake.description}</p>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>

      <h2 className="text-center mb-4">Our Tasty Recipes</h2>
      <p className="text-center text-muted mb-5">Explore our collection of delicious recipes</p>
      
      <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
        {recipesData.recipes.map((recipe) => (
          <div key={recipe.id} className="col">
            <Link to={`/recipes/${recipe.category}/${recipe.id}`} className="text-decoration-none">
              <div className="card h-100 shadow-sm" data-testid="card">
                <div className="card-body">
                  <h3 className="card-title h5">{recipe.title}</h3>
                  <p className="card-text text-muted">{recipe.description}</p>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home; 