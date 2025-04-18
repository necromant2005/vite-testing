import { useState } from 'react'
import { Link } from 'react-router-dom'
import recipesData from '../data/recipes/recipes.json'

interface Recipe {
  id: string;
  title: string;
  description: string;
  category: string;
  ingredients: string[];
  instructions: string[];
}

const Recipes = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

  // Get unique categories
  const categories = Array.from(new Set(recipesData.recipes.map(recipe => recipe.category)))

  // Filter recipes by selected category
  const filteredRecipes = selectedCategory
    ? recipesData.recipes.filter(recipe => recipe.category === selectedCategory)
    : recipesData.recipes

  return (
    <div className="container py-5">
      <h1 className="mb-4">Recipes</h1>
      
      {/* Category Filter */}
      <div className="mb-4">
        <div className="btn-group" role="group">
          <button
            type="button"
            className={`btn ${!selectedCategory ? 'btn-primary' : 'btn-outline-primary'}`}
            onClick={() => setSelectedCategory(null)}
          >
            All
          </button>
          {categories.map(category => (
            <button
              key={category}
              type="button"
              className={`btn ${selectedCategory === category ? 'btn-primary' : 'btn-outline-primary'}`}
              onClick={() => setSelectedCategory(category)}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Recipes Grid */}
      <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
        {filteredRecipes.map((recipe: Recipe) => (
          <div key={recipe.id} className="col">
            <div className="card h-100 shadow-sm">
              <div className="card-body">
                <h5 className="card-title">{recipe.title}</h5>
                <p className="card-text text-muted">{recipe.description}</p>
                <div className="mt-2">
                  <span className="badge bg-secondary">{recipe.category}</span>
                </div>
              </div>
              <div className="card-footer bg-transparent">
                <Link to={`/recipe/${recipe.id}`} className="btn btn-primary">
                  View Recipe
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Recipes 