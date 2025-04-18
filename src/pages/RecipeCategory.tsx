import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import categories from '../data/recipes/categories.json';
import recipes from '../data/recipes/recipes.json';

interface Category {
  name: string;
  title: string;
  description: string;
}

interface Recipe {
  id: string;
  title: string;
  description: string;
  category: string;
}

const RecipeCategory = () => {
  const { categoryName } = useParams();
  
  // Find the category
  const category = categories.categories.find((cat: Category) => cat.name === categoryName);
  
  // Find recipes in this category
  const categoryRecipes = recipes.recipes.filter((recipe: Recipe) => recipe.category === categoryName);

  if (!category) {
    return (
      <div className="container py-5">
        <h2>Category not found</h2>
        <Link to="/" className="btn btn-primary">Back to Home</Link>
      </div>
    );
  }

  return (
    <div className="container py-5">
      <h2 className="mb-4">{category.title}</h2>
      <p className="text-muted mb-4">{category.description}</p>
      
      <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
        {categoryRecipes.map((recipe: Recipe) => (
          <div key={recipe.id} className="col">
            <div className="card h-100">
              <div className="card-body">
                <h5 className="card-title">{recipe.title}</h5>
                <p className="card-text">{recipe.description}</p>
                <Link to={`/recipes/${categoryName}/${recipe.id}`} className="btn btn-primary">
                  View Recipe
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecipeCategory; 