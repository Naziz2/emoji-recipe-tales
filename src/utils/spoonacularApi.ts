const API_KEY = 'adf706e92f4a4aaabf889816b648a8e3';
const BASE_URL = 'https://api.spoonacular.com';

interface Recipe {
  id: number;
  title: string;
  image: string;
  readyInMinutes?: number;
  servings?: number;
}

export const searchRecipes = async (query: string, number: number = 12): Promise<Recipe[]> => {
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

export const getRecipeInformation = async (id: number): Promise<any> => {
  try {
    const url = `${BASE_URL}/recipes/${id}/information?apiKey=${API_KEY}`;
    
    console.log('Getting recipe information for ID:', id);
    
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`API request failed: ${response.status} ${response.statusText}`);
    }
    
    const data = await response.json();
    
    console.log('Recipe information:', data);
    
    return data;
  } catch (error) {
    console.error('Error fetching recipe information:', error);
    throw error;
  }
};

export const getTotalRecipeCount = async (query: string = ''): Promise<number> => {
  try {
    const url = `${BASE_URL}/recipes/complexSearch?query=${encodeURIComponent(query)}&number=1&apiKey=${API_KEY}`;
    
    console.log('Getting total count for query:', query);
    
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`API request failed: ${response.status} ${response.statusText}`);
    }
    
    const data = await response.json();
    
    console.log('Total recipes available:', data.totalResults);
    
    return data.totalResults || 0;
  } catch (error) {
    console.error('Error fetching total recipe count:', error);
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
