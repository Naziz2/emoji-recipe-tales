
import React, { useState } from 'react';
import { Heart, Clock, Users, Eye } from 'lucide-react';
import RecipeModal from './RecipeModal';

interface Recipe {
  id: number;
  title: string;
  image: string;
  readyInMinutes?: number;
  servings?: number;
}

interface DishCardProps {
  recipe: Recipe;
  isFavorite: boolean;
  onToggleFavorite: () => void;
  animationDelay?: number;
}

const DishCard: React.FC<DishCardProps> = ({ 
  recipe, 
  isFavorite, 
  onToggleFavorite, 
  animationDelay = 0 
}) => {
  const [showModal, setShowModal] = useState(false);

  const handleViewRecipe = () => {
    setShowModal(true);
  };

  return (
    <>
      <div 
        className="bg-white rounded-2xl shadow-lg overflow-hidden transform hover:scale-105 transition-all duration-300 hover:shadow-xl animate-fade-in"
        style={{ 
          animationDelay: `${animationDelay}ms`,
          animation: `fadeInUp 0.6s ease-out ${animationDelay}ms both`
        }}
      >
        {/* Recipe Image */}
        <div className="relative h-48 bg-gray-200 overflow-hidden">
          <img
            src={recipe.image}
            alt={recipe.title}
            className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = 'https://via.placeholder.com/400x300?text=🍽️';
            }}
          />
          {/* Favorite Button */}
          <button
            onClick={onToggleFavorite}
            className={`absolute top-3 right-3 p-2 rounded-full transition-all duration-200 ${
              isFavorite 
                ? 'bg-red-500 text-white shadow-lg' 
                : 'bg-white text-gray-400 hover:text-red-500 shadow-md'
            }`}
          >
            <Heart className={`w-5 h-5 ${isFavorite ? 'fill-current' : ''}`} />
          </button>
        </div>

        {/* Recipe Info */}
        <div className="p-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-3 line-clamp-2 leading-tight">
            {recipe.title}
          </h3>
          
          {/* Recipe Details */}
          <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
            {recipe.readyInMinutes && (
              <div className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                <span>{recipe.readyInMinutes} min</span>
              </div>
            )}
            {recipe.servings && (
              <div className="flex items-center gap-1">
                <Users className="w-4 h-4" />
                <span>{recipe.servings} servings</span>
              </div>
            )}
          </div>

          {/* View Recipe Button */}
          <button
            onClick={handleViewRecipe}
            className="w-full bg-gradient-to-r from-orange-500 to-red-500 text-white py-3 px-4 rounded-xl font-semibold flex items-center justify-center gap-2 hover:from-orange-600 hover:to-red-600 transition-all duration-200 transform hover:scale-105"
          >
            <span>View Recipe</span>
            <Eye className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Recipe Modal */}
      <RecipeModal
        recipeId={recipe.id}
        isOpen={showModal}
        onClose={() => setShowModal(false)}
      />
    </>
  );
};

export default DishCard;
