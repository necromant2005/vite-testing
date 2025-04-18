import { Cake } from './Cake';
import { Recipe } from './Recipe';

export type Item = Cake | Recipe;

export interface CakesData {
  cakes: Cake[];
}

export interface RecipesData {
  recipes: Recipe[];
}

export const isRecipesData = (data: CakesData | RecipesData): data is RecipesData => {
  return 'recipes' in data;
}; 