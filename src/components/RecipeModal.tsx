
import React, { useState, useEffect } from 'react';
import { X, Clock, Users, ChefHat } from 'lucide-react';
import { getRecipeInformation } from '../utils/spoonacularApi';

interface RecipeModalProps {
  recipeId: number;
  isOpen: boolean;
  onClose: () => void;
}

const RecipeModal: React.FC<RecipeModalProps> = ({ recipeId, isOpen, onClose }) => {
  const [recipe, setRecipe] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isOpen && recipeId) {
      fetchRecipeDetails();
    }
  }, [isOpen, recipeId]);

  const fetchRecipeDetails = async () => {
    setLoading(true);
    try {
      const data = await getRecipeInformation(recipeId);
      setRecipe(data);
    } catch (error) {
      console.error('Error fetching recipe details:', error);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-4xl max-h-[90vh] overflow-y-auto relative w-full">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 bg-gray-100 hover:bg-gray-200 rounded-full p-2 transition-colors z-10"
        >
          <X className="w-6 h-6" />
        </button>

        {loading ? (
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
          </div>
        ) : recipe ? (
          <div>
            {/* Recipe Image */}
            <div className="relative h-64 bg-gray-200 rounded-t-2xl overflow-hidden">
              <img
                src={recipe.image}
                alt={recipe.title}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="p-6">
              {/* Recipe Title */}
              <h2 className="text-3xl font-bold text-gray-800 mb-4">{recipe.title}</h2>

              {/* Recipe Info */}
              <div className="flex flex-wrap gap-4 mb-6">
                {recipe.readyInMinutes && (
                  <div className="flex items-center gap-2 bg-orange-100 px-3 py-2 rounded-lg">
                    <Clock className="w-5 h-5 text-orange-600" />
                    <span className="text-orange-800 font-medium">{recipe.readyInMinutes} min</span>
                  </div>
                )}
                {recipe.servings && (
                  <div className="flex items-center gap-2 bg-blue-100 px-3 py-2 rounded-lg">
                    <Users className="w-5 h-5 text-blue-600" />
                    <span className="text-blue-800 font-medium">{recipe.servings} servings</span>
                  </div>
                )}
                <div className="flex items-center gap-2 bg-green-100 px-3 py-2 rounded-lg">
                  <ChefHat className="w-5 h-5 text-green-600" />
                  <span className="text-green-800 font-medium">Score: {Math.round(recipe.spoonacularScore || 0)}</span>
                </div>
              </div>

              {/* Summary */}
              {recipe.summary && (
                <div className="mb-6">
                  <h3 className="text-xl font-semibold mb-3">About this recipe</h3>
                  <div 
                    className="text-gray-700 leading-relaxed"
                    dangerouslySetInnerHTML={{ __html: recipe.summary }}
                  />
                </div>
              )}

              {/* Ingredients */}
              {recipe.extendedIngredients && (
                <div className="mb-6">
                  <h3 className="text-xl font-semibold mb-3">Ingredients</h3>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {recipe.extendedIngredients.map((ingredient: any, index: number) => (
                      <li key={index} className="flex items-center gap-2 bg-gray-50 p-2 rounded">
                        <span className="text-orange-500">•</span>
                        <span className="text-gray-700">{ingredient.original}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Instructions */}
              {recipe.instructions && (
                <div className="mb-6">
                  <h3 className="text-xl font-semibold mb-3">Instructions</h3>
                  <div 
                    className="text-gray-700 leading-relaxed space-y-2"
                    dangerouslySetInnerHTML={{ __html: recipe.instructions }}
                  />
                </div>
              )}

              {/* External Link */}
              <div className="border-t pt-4">
                <a
                  href={recipe.sourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition-colors"
                >
                  View Original Recipe
                </a>
              </div>
            </div>
          </div>
        ) : (
          <div className="p-6 text-center">
            <p className="text-gray-600">Failed to load recipe details.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default RecipeModal;
