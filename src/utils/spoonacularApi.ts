
const API_KEY = 'adf706e92f4a4aaabf889816b648a8e3';
const BASE_URL = 'https://api.spoonacular.com';

interface Recipe {
  id: number;
  title: string;
  image: string;
  readyInMinutes?: number;
  servings?: number;
}

export const searchRecipes = async (query: string, number: number = 9): Promise<Recipe[]> => {
  try {
    const url = `${BASE_URL}/recipes/complexSearch?query=${encodeURIComponent(query)}&number=${number}&addRecipeInformation=true&apiKey=${API_KEY}`;
    
    console.log('Searching recipes with query:', query);
    
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`API request failed: ${response.status} ${response.statusText}`);
    }
    
    const data = await response.json();
    
    console.log('API Response:', data);
    
    return data.results.map((recipe: any) => ({
      id: recipe.id,
      title: recipe.title,
      image: recipe.image || 'https://via.placeholder.com/400x300?text=🍽️',
      readyInMinutes: recipe.readyInMinutes,
      servings: recipe.servings,
    }));
  } catch (error) {
    console.error('Error fetching recipes:', error);
    throw error;
  }
};

export const getRandomRecipes = async (number: number = 6): Promise<Recipe[]> => {
  try {
    const url = `${BASE_URL}/recipes/random?number=${number}&apiKey=${API_KEY}`;
    
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`API request failed: ${response.status} ${response.statusText}`);
    }
    
    const data = await response.json();
    
    return data.recipes.map((recipe: any) => ({
      id: recipe.id,
      title: recipe.title,
      image: recipe.image || 'https://via.placeholder.com/400x300?text=🍽️',
      readyInMinutes: recipe.readyInMinutes,
      servings: recipe.servings,
    }));
  } catch (error) {
    console.error('Error fetching random recipes:', error);
    throw error;
  }
};
