import { Link, useLocation } from 'react-router-dom';
import cakeCategories from '../data/cakes/categories.json';
import recipeCategories from '../data/recipes/categories.json';

type Category = string | { name: string; title: string; description: string };

const CategoriesHeader = () => {
  const location = useLocation();
  const isRecipesRoute = location.pathname.startsWith('/recipes');
  const isHomePage = location.pathname === '/';
  
  if (isHomePage) {
    return null;
  }

  const categories = isRecipesRoute ? recipeCategories : cakeCategories;
  const basePath = isRecipesRoute ? '/recipes' : '/cakes';

  const getCategoryPath = (category: Category) => {
    return typeof category === 'string' ? category : category.name;
  };

  const getCategoryTitle = (category: Category) => {
    return typeof category === 'string' ? category : category.title;
  };

  return (
    <div className="bg-light py-2">
      <div className="container">
        <nav className="nav justify-content-center">
          {categories.categories.map((category) => (
            <Link
              key={getCategoryPath(category)}
              to={`${basePath}/${getCategoryPath(category)}`}
              className="nav-link text-dark"
            >
              {getCategoryTitle(category)}
            </Link>
          ))}
        </nav>
      </div>
    </div>
  );
};

export default CategoriesHeader; 