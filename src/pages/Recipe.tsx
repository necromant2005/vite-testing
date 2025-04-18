import { useParams } from 'react-router-dom'
import recipesData from '../data/recipes/recipes.json'
import type { Recipe } from '../types/Recipe'

const Recipe = () => {
  const { id } = useParams()
  const recipe = recipesData.recipes.find((recipe: Recipe) => recipe.id === id)

  if (!recipe) {
    return (
      <div className="container py-5">
        <div className="alert alert-warning">
          <h2 className="h4">Recipe not found</h2>
          <p className="mb-0">Sorry, we couldn't find the recipe you're looking for.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="container py-5">
      <div className="card shadow-sm">
        <div className="card-body">
          <h2 className="card-title h3 mb-4">{recipe.title}</h2>
          <p className="card-text text-muted">{recipe.description}</p>
          {recipe.ingredients && (
            <div className="mt-4">
              <h3 className="h5">Ingredients</h3>
              <ul className="list-group list-group-flush">
                {recipe.ingredients.map((ingredient: string, index: number) => (
                  <li key={index} className="list-group-item">{ingredient}</li>
                ))}
              </ul>
            </div>
          )}
          {recipe.instructions && (
            <div className="mt-4">
              <h3 className="h5">Instructions</h3>
              <ol className="list-group list-group-numbered">
                {recipe.instructions.map((instruction: string, index: number) => (
                  <li key={index} className="list-group-item">{instruction}</li>
                ))}
              </ol>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Recipe 