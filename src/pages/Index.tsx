import React, { useState } from 'react';
import EmojiInput from '../components/EmojiInput';
import DishCard from '../components/DishCard';
import { searchRecipes, getTotalRecipeCount } from '../utils/spoonacularApi';
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
  const [totalCount, setTotalCount] = useState<number | null>(null);
  const [favorites, setFavorites] = useState<number[]>(
    JSON.parse(localStorage.getItem('moodmeal-favorites') || '[]')
  );

  const handleEmojiSearch = async (emojis: string) => {
    if (!emojis.trim()) {
      setRecipes([]);
      setTotalCount(null);
      return;
    }

    // Check if user typed "total+n" command
    if (emojis.toLowerCase().includes('total+n')) {
      setLoading(true);
      setSearchQuery(emojis);
      
      try {
        const total = await getTotalRecipeCount();
        setTotalCount(total);
        setRecipes([]);
      } catch (error) {
        console.error('Error getting total count:', error);
        setTotalCount(null);
      } finally {
        setLoading(false);
      }
      return;
    }

    setLoading(true);
    setSearchQuery(emojis);
    setTotalCount(null);
    
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
          <p className="text-sm text-gray-500 mb-6">
            Saskia u need to eat u have skinny arms, even jett is eating better than u 💪🍗😂
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

        {/* Total Count Display */}
        {totalCount !== null && (
          <div className="mb-6 text-center">
            <div className="bg-white rounded-2xl shadow-lg p-6 max-w-md mx-auto">
              <div className="text-4xl mb-2">📊</div>
              <h3 className="text-2xl font-bold text-gray-800 mb-2">Total Recipes Available</h3>
              <p className="text-3xl font-bold text-orange-500">{totalCount.toLocaleString()}</p>
              <p className="text-gray-600 mt-2">recipes in the Spoonacular database!</p>
            </div>
          </div>
        )}

        {/* Search Results */}
        {searchQuery && !searchQuery.toLowerCase().includes('total+n') && (
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
            <p className="text-gray-600">
              {searchQuery.toLowerCase().includes('total+n') 
                ? 'Counting all available recipes...' 
                : 'Finding the perfect dishes for your mood...'
              }
            </p>
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
        {!loading && searchQuery && !searchQuery.toLowerCase().includes('total+n') && recipes.length === 0 && (
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
