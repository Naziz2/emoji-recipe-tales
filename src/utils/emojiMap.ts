
// Emoji to mood/food tag mapping
const emojiMap: Record<string, string[]> = {
  // Emotional states
  '😭': ['comfort', 'sweet', 'chocolate', 'ice cream'],
  '💔': ['chocolate', 'dessert', 'comfort', 'sweet'],
  '😍': ['romantic', 'pasta', 'wine', 'elegant'],
  '😴': ['cozy', 'warm', 'soup', 'tea'],
  '😋': ['delicious', 'tasty', 'favorite'],
  '🤤': ['savory', 'mouth-watering', 'delicious'],
  '😊': ['happy', 'light', 'fresh', 'healthy'],
  '🎉': ['celebration', 'cake', 'party', 'festive'],
  '💪': ['protein', 'healthy', 'energy', 'fitness'],
  '🤒': ['healing', 'soup', 'warm', 'comfort'],
  '😤': ['spicy', 'hot', 'intense', 'chili'],
  '🥰': ['comfort', 'sweet', 'cozy'],
  '😁': ['fun', 'easy', 'quick'],
  '😌': ['relaxing', 'simple', 'light'],
  '🤗': ['warm', 'comforting', 'hearty'],
  '😎': ['cool', 'fresh', 'summer'],
  '🥳': ['party', 'colorful', 'fun'],
  '😇': ['pure', 'simple', 'clean'],

  // Food emojis
  '🍕': ['pizza', 'italian', 'cheese'],
  '🍔': ['burger', 'american', 'fast food'],
  '🍟': ['fries', 'potato', 'fast food'],
  '🌮': ['mexican', 'tacos', 'spicy'],
  '🍜': ['noodles', 'asian', 'soup'],
  '🍝': ['pasta', 'italian', 'spaghetti'],
  '🍙': ['rice', 'japanese', 'asian'],
  '🍣': ['sushi', 'japanese', 'fish'],
  '🥗': ['salad', 'healthy', 'vegetables'],
  '🍰': ['cake', 'dessert', 'sweet'],
  '🍫': ['chocolate', 'sweet', 'dessert'],
  '🍪': ['cookies', 'sweet', 'baked'],
  '🥘': ['stew', 'comfort', 'warm'],
  '🍖': ['meat', 'protein', 'grilled'],
  '🍗': ['chicken', 'protein', 'fried'],
  '🥞': ['pancakes', 'breakfast', 'sweet'],
  '🧀': ['cheese', 'dairy', 'rich'],
  '🥩': ['steak', 'meat', 'protein'],
  '🦐': ['shrimp', 'seafood', 'protein'],
  '🐟': ['fish', 'seafood', 'healthy'],
  '🥚': ['eggs', 'breakfast', 'protein'],
  '🥓': ['bacon', 'breakfast', 'meat'],
  '🌭': ['hot dog', 'american', 'casual'],
  '🥪': ['sandwich', 'lunch', 'easy'],
  '🌯': ['wrap', 'healthy', 'fresh'],
  '🥙': ['pita', 'mediterranean', 'healthy'],

  // Spice and temperature
  '🔥': ['spicy', 'hot sauce', 'chili', 'jalapeño', 'cayenne'],
  '🌶️': ['spicy', 'hot pepper', 'chili', 'jalapeño', 'habanero', 'serrano'],
  '🧊': ['cold', 'refreshing', 'ice cream'],
  '☕': ['coffee', 'warm', 'breakfast'],
  '🍵': ['tea', 'warm', 'comforting'],
  '🥛': ['milk', 'dairy', 'smooth'],
  '🧋': ['bubble tea', 'sweet', 'refreshing'],

  // Fruits and vegetables
  '🍎': ['apple', 'fruit', 'healthy'],
  '🍌': ['banana', 'fruit', 'smoothie'],
  '🍓': ['strawberry', 'fruit', 'sweet'],
  '🥕': ['carrot', 'vegetable', 'healthy'],
  '🥬': ['lettuce', 'vegetable', 'salad'],
  '🍅': ['tomato', 'vegetable', 'fresh'],
  '🥒': ['cucumber', 'fresh', 'light'],
  '🌽': ['corn', 'vegetable', 'sweet'],
  '🥑': ['avocado', 'healthy', 'creamy'],
  '🍊': ['orange', 'citrus', 'fresh'],
  '🍇': ['grapes', 'fruit', 'sweet'],
  '🥝': ['kiwi', 'fruit', 'tangy'],

  // Time-based
  '🌅': ['breakfast', 'morning', 'eggs'],
  '🌞': ['lunch', 'light', 'fresh'],
  '🌙': ['dinner', 'hearty', 'comfort'],

  // Weather/seasons
  '❄️': ['winter', 'warm', 'soup', 'hot'],
  '☀️': ['summer', 'fresh', 'light', 'cold'],
  '🌧️': ['rainy', 'comfort', 'warm', 'soup'],
  '🌈': ['colorful', 'fun', 'vibrant'],
};

export const interpretEmojis = (input: string): string[] => {
  const tags = new Set<string>();
  
  // Extract emojis from input
  const emojiRegex = /[\u{1F600}-\u{1F64F}]|[\u{1F300}-\u{1F5FF}]|[\u{1F680}-\u{1F6FF}]|[\u{1F1E0}-\u{1F1FF}]|[\u{2600}-\u{26FF}]|[\u{2700}-\u{27BF}]/gu;
  const emojis = input.match(emojiRegex) || [];
  
  console.log('Found emojis:', emojis);
  
  // Map each emoji to tags
  emojis.forEach(emoji => {
    const mappedTags = emojiMap[emoji];
    if (mappedTags) {
      console.log(`Mapping ${emoji} to:`, mappedTags);
      mappedTags.forEach(tag => tags.add(tag));
    } else {
      console.log(`No mapping found for emoji: ${emoji}`);
    }
  });

  // If no emojis found or mapped, try to extract words
  if (tags.size === 0) {
    const words = input.toLowerCase().split(/\s+/);
    words.forEach(word => {
      if (word.length > 2) {
        tags.add(word);
      }
    });
  }

  console.log('Final tags:', Array.from(tags));
  // Return as array, increase limit for better results
  return Array.from(tags).slice(0, 5);
};

export default emojiMap;
