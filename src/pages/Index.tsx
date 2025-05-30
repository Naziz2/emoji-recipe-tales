
import React, { useState } from 'react';
import EmojiInput from '../components/EmojiInput';
import DishCard from '../components/DishCard';
import { searchRecipes } from '../utils/spoonacularApi';
import { interpretEmojis } from '../utils/emojiMap';
import { Utensils, Heart, Sparkles } from 'lucide-react';

interface Recipe {
  id: number;
  title: string;
  image: string;
  readyInMinutes?: number;
  servings?: number;
}

const Index = () => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [favorites, setFavorites] = useState<number[]>(
    JSON.parse(localStorage.getItem('moodmeal-favorites') || '[]')
  );

  const handleEmojiSearch = async (emojis: string) => {
    if (!emojis.trim()) {
      setRecipes([]);
      return;
    }

    setLoading(true);
    setSearchQuery(emojis);
    
    try {
      const tags = interpretEmojis(emojis);
      const query = tags.join(' ');
      const results = await searchRecipes(query);
      setRecipes(results);
    } catch (error) {
      console.error('Error searching recipes:', error);
      setRecipes([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSurpriseMe = () => {
    const surpriseEmojis = ['😋🍕', '🔥🌶️', '😍🍫', '😴🍜', '🎉🍰', '💪🥗'];
    const randomEmoji = surpriseEmojis[Math.floor(Math.random() * surpriseEmojis.length)];
    handleEmojiSearch(randomEmoji);
  };

  const toggleFavorite = (recipeId: number) => {
    const newFavorites = favorites.includes(recipeId)
      ? favorites.filter(id => id !== recipeId)
      : [...favorites, recipeId];
    
    setFavorites(newFavorites);
    localStorage.setItem('moodmeal-favorites', JSON.stringify(newFavorites));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-red-50 to-yellow-50">
      {/* Header */}
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Utensils className="w-8 h-8 text-orange-500" />
            <h1 className="text-4xl font-bold bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
              MoodMeal
            </h1>
            <Sparkles className="w-8 h-8 text-yellow-500" />
          </div>
          <p className="text-lg text-gray-600 mb-6">
            Tell us how you feel with emojis, and we'll find the perfect dish! 🍽️✨
          </p>
          
          {/* Emoji Input */}
          <div className="max-w-2xl mx-auto mb-6">
            <EmojiInput onSearch={handleEmojiSearch} />
          </div>

          {/* Surprise Me Button */}
          <button
            onClick={handleSurpriseMe}
            className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-3 rounded-full font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 flex items-center gap-2 mx-auto"
          >
            <Sparkles className="w-5 h-5" />
            Surprise Me!
          </button>
        </div>

        {/* Search Results */}
        {searchQuery && (
          <div className="mb-6 text-center">
            <p className="text-lg text-gray-700">
              You're feeling <span className="text-2xl">{searchQuery}</span>? 
              {recipes.length > 0 && <span className="ml-2">Here are some perfect matches!</span>}
            </p>
          </div>
        )}

        {/* Loading State */}
        {loading && (
          <div className="flex flex-col items-center justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mb-4"></div>
            <p className="text-gray-600">Finding the perfect dishes for your mood...</p>
          </div>
        )}

        {/* Results Grid */}
        {!loading && recipes.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {recipes.map((recipe, index) => (
              <DishCard
                key={recipe.id}
                recipe={recipe}
                isFavorite={favorites.includes(recipe.id)}
                onToggleFavorite={() => toggleFavorite(recipe.id)}
                animationDelay={index * 100}
              />
            ))}
          </div>
        )}

        {/* No Results */}
        {!loading && searchQuery && recipes.length === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🤔</div>
            <p className="text-lg text-gray-600">
              Hmm, we couldn't find dishes matching your mood. Try different emojis!
            </p>
          </div>
        )}

        {/* How It Works */}
        {!searchQuery && (
          <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
            <div className="text-center p-6 bg-white rounded-2xl shadow-lg">
              <div className="text-4xl mb-4">😍🍕🔥</div>
              <h3 className="text-xl font-semibold mb-2 text-gray-800">Express Your Mood</h3>
              <p className="text-gray-600">Use emojis to tell us how you're feeling or what you're craving</p>
            </div>
            <div className="text-center p-6 bg-white rounded-2xl shadow-lg">
              <div className="text-4xl mb-4">🤖✨</div>
              <h3 className="text-xl font-semibold mb-2 text-gray-800">Smart Matching</h3>
              <p className="text-gray-600">Our AI interprets your emojis and finds perfect food matches</p>
            </div>
            <div className="text-center p-6 bg-white rounded-2xl shadow-lg">
              <div className="text-4xl mb-4">🍽️❤️</div>
              <h3 className="text-xl font-semibold mb-2 text-gray-800">Discover & Save</h3>
              <p className="text-gray-600">Explore amazing recipes and save your favorites</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;
