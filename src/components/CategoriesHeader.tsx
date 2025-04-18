import { Link, useLocation } from 'react-router-dom';
import cakeCategories from '../data/cakes/categories.json';
import recipeCategories from '../data/recipes/categories.json';

type Category = string | { name: string; title: string; description: string };
type CategoriesData = {
  categories: Category[];
};

const CategoriesHeader = () => {
  const location = useLocation();
  const isRecipesRoute = location.pathname.startsWith('/recipes');
  const isCakesRoute = location.pathname.startsWith('/cakes');
  const isHomePage = location.pathname === '/';
  
  if (isHomePage) {
    return null;
  }

  let basePath = '/';
  let categoriesData: CategoriesData = { categories: [] };

  if (isRecipesRoute) {
    basePath = '/recipes';
    categoriesData = recipeCategories;
  }
  if (isCakesRoute) {
    basePath = '/cakes';
    categoriesData = cakeCategories;
  }

  // Return null if there are no categories
  if (!categoriesData.categories || categoriesData.categories.length === 0) {
    return null;
  }

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
          {categoriesData.categories.map((category) => (
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