
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
  '😤': ['spicy', 'hot', 'intense'],
  '🥰': ['comfort', 'sweet', 'cozy'],

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

  // Spice and temperature
  '🔥': ['spicy', 'hot', 'chili'],
  '🌶️': ['spicy', 'hot', 'chili', 'pepper'],
  '🧊': ['cold', 'refreshing', 'ice cream'],
  '☕': ['coffee', 'warm', 'breakfast'],
  '🍵': ['tea', 'warm', 'comforting'],

  // Fruits and vegetables
  '🍎': ['apple', 'fruit', 'healthy'],
  '🍌': ['banana', 'fruit', 'smoothie'],
  '🍓': ['strawberry', 'fruit', 'sweet'],
  '🥕': ['carrot', 'vegetable', 'healthy'],
  '🥬': ['lettuce', 'vegetable', 'salad'],
  '🍅': ['tomato', 'vegetable', 'fresh'],

  // Time-based
  '🌅': ['breakfast', 'morning', 'eggs'],
  '🌞': ['lunch', 'light', 'fresh'],
  '🌙': ['dinner', 'hearty', 'comfort'],

  // Weather/seasons
  '❄️': ['winter', 'warm', 'soup', 'hot'],
  '☀️': ['summer', 'fresh', 'light', 'cold'],
  '🌧️': ['rainy', 'comfort', 'warm', 'soup'],
};

export const interpretEmojis = (input: string): string[] => {
  const tags = new Set<string>();
  
  // Extract emojis from input
  const emojiRegex = /[\u{1F600}-\u{1F64F}]|[\u{1F300}-\u{1F5FF}]|[\u{1F680}-\u{1F6FF}]|[\u{1F1E0}-\u{1F1FF}]|[\u{2600}-\u{26FF}]|[\u{2700}-\u{27BF}]/gu;
  const emojis = input.match(emojiRegex) || [];
  
  // Map each emoji to tags
  emojis.forEach(emoji => {
    const mappedTags = emojiMap[emoji];
    if (mappedTags) {
      mappedTags.forEach(tag => tags.add(tag));
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

  // Return as array, limit to avoid overly complex queries
  return Array.from(tags).slice(0, 3);
};

export default emojiMap;
