
import React, { useState, useEffect } from 'react';
import { Search } from 'lucide-react';

interface EmojiInputProps {
  onSearch: (emojis: string) => void;
}

const EmojiInput: React.FC<EmojiInputProps> = ({ onSearch }) => {
  const [input, setInput] = useState('');
  const [placeholder, setPlaceholder] = useState('How do you feel? 😋🍫🔥');

  const placeholders = [
    'How do you feel? 😋🍫🔥',
    'Express your mood! 😍🍕💕',
    'What are you craving? 🌶️🍜😴',
    'Show us your vibe! 🎉🍰✨',
    'Feeling hungry? 😋🥗💪'
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setPlaceholder(placeholders[Math.floor(Math.random() * placeholders.length)]);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      onSearch(input.trim());
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInput(value);
    
    // Auto-search when user stops typing for 500ms
    const timeoutId = setTimeout(() => {
      if (value.trim()) {
        onSearch(value.trim());
      }
    }, 500);

    return () => clearTimeout(timeoutId);
  };

  const quickEmojis = ['😋', '🔥', '😍', '😭', '😴', '🎉', '💔', '💪'];

  return (
    <div className="w-full">
      <form onSubmit={handleSubmit} className="relative mb-4">
        <div className="relative">
          <input
            type="text"
            value={input}
            onChange={handleInputChange}
            placeholder={placeholder}
            className="w-full px-6 py-4 text-xl border-2 border-orange-200 rounded-2xl focus:border-orange-400 focus:outline-none bg-white shadow-lg placeholder-gray-400 transition-all duration-200"
            style={{ fontSize: '1.25rem' }}
          />
          <button
            type="submit"
            className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-orange-500 text-white p-2 rounded-xl hover:bg-orange-600 transition-colors duration-200"
          >
            <Search className="w-5 h-5" />
          </button>
        </div>
      </form>

      {/* Quick Emoji Buttons */}
      <div className="flex flex-wrap justify-center gap-2">
        <span className="text-sm text-gray-500 mr-2 self-center">Quick picks:</span>
        {quickEmojis.map((emoji, index) => (
          <button
            key={index}
            onClick={() => {
              const newInput = input + emoji;
              setInput(newInput);
              onSearch(newInput);
            }}
            className="text-2xl p-2 hover:bg-orange-100 rounded-lg transition-colors duration-200 transform hover:scale-110"
          >
            {emoji}
          </button>
        ))}
        <button
          onClick={() => {
            setInput('');
            onSearch('');
          }}
          className="text-sm text-gray-500 hover:text-gray-700 px-3 py-1 hover:bg-gray-100 rounded-lg transition-colors duration-200"
        >
          Clear
        </button>
      </div>
    </div>
  );
};

export default EmojiInput;
