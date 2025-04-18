import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import categories from '../data/recipes/categories.json';
import recipes from '../data/recipes/recipes.json';
import { Recipe } from '../types/Recipe';

interface CategoriesData {
  categories: string[];
}

const RecipeCategory = () => {
  const { categoryName } = useParams();
  
  // Check if category exists
  const categoryExists = (categories as CategoriesData).categories.includes(categoryName || '');
  
  // Find recipes in this category
  const categoryRecipes = recipes.recipes.filter((recipe: Recipe) => recipe.category === categoryName);

  if (!categoryExists) {
    return (
      <div className="container py-5">
        <h2>Category not found</h2>
        <Link to="/" className="btn btn-primary">Back to Home</Link>
      </div>
    );
  }

  return (
    <div className="container py-5">
      <h2 className="mb-4">{categoryName}</h2>
      
      <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
        {categoryRecipes.map((recipe: Recipe) => (
          <div key={recipe.id} className="col">
            <Link to={`/recipes/${categoryName}/${recipe.id}`} className="text-decoration-none">
            <div className="card h-100">
              <div className="card-body">
                <h5 className="card-title">{recipe.title}</h5>
                <p className="card-text">{recipe.description}</p>
              </div>
            </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecipeCategory; 