import { useParams, useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
import cakesData from '../data/cakes/cakes.json';
import recipesData from '../data/recipes/recipes.json';
import type { Item } from '../types/DataTypes';
import { CakesData, RecipesData, isRecipesData } from '../types/DataTypes';

const CakeCategory = () => {
  const { categoryName } = useParams();
  const location = useLocation();
  const isRecipesRoute = location.pathname.startsWith('/recipes');

  // Get the appropriate data based on the route
  const data = isRecipesRoute ? recipesData as RecipesData : cakesData as CakesData;
  const items = isRecipesData(data) ? data.recipes : data.cakes;
  
  // Filter items in this category
  const categoryItems = items.filter((item: Item) => item.category === categoryName);

  return (
    <div className="container py-5">
      <h1 className="text-center mb-4">
        {isRecipesRoute ? 'Recipes' : 'Cakes'} in {categoryName}
      </h1>
      <div className="row">
        {categoryItems.map((item: Item) => (
          <div key={item.id} className="col-md-4 mb-4">
            <div className="card h-100">
              <div className="card-body">
                <h5 className="card-title">{item.title}</h5>
                <p className="card-text">{item.description}</p>
                <Link 
                  to={`${isRecipesRoute ? '/recipes' : '/cakes'}/${categoryName}/${item.id}`} 
                  className="btn btn-primary"
                >
                  View Details
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CakeCategory; 