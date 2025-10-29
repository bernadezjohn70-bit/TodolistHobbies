import { saveHobby, getAllHobbies } from './storage';

/**
 * Sample hobbies data for populating the AsyncStorage
 * This provides a variety of hobbies across different categories
 * to demonstrate the app's functionality
 */

export const sampleHobbies = [
  {
    title: 'Learn to Play Guitar',
    description: 'Master basic chords and learn to play 10 popular songs',
    category: 'Music',
    priority: 'High',
    completed: false,
  },
  {
    title: 'Morning Running',
    description: 'Run 3 miles every morning before work',
    category: 'Sports',
    priority: 'High',
    completed: true,
  },
  {
    title: 'Watercolor Painting',
    description: 'Create a series of landscape paintings',
    category: 'Art & Creative',
    priority: 'Medium',
    completed: false,
  },
  {
    title: 'Read "The Great Gatsby"',
    description: 'Finish reading this classic American novel',
    category: 'Reading',
    priority: 'Low',
    completed: false,
  },
  {
    title: 'Build a Mobile App',
    description: 'Learn React Native and build a hobby tracking app',
    category: 'Technology',
    priority: 'High',
    completed: false,
  },
  {
    title: 'Master French Baking',
    description: 'Learn to make croissants, éclairs, and macarons',
    category: 'Cooking',
    priority: 'Medium',
    completed: false,
  },
  {
    title: 'Plan Japan Trip',
    description: 'Research destinations, book hotels, and create itinerary',
    category: 'Travel',
    priority: 'Low',
    completed: true,
  },
  {
    title: 'Pottery Classes',
    description: 'Take a 6-week pottery course at the local studio',
    category: 'Art & Creative',
    priority: 'Medium',
    completed: false,
  },
  {
    title: 'Write a Short Story',
    description: 'Write a 5000-word science fiction short story',
    category: 'Art & Creative',
    priority: 'Low',
    completed: false,
  },
  {
    title: 'Learn Spanish',
    description: 'Complete an online Spanish course and practice daily',
    category: 'Other',
    priority: 'Medium',
    completed: false,
  },
  {
    title: 'Swimming',
    description: 'Join a local swimming club and improve endurance',
    category: 'Sports',
    priority: 'Medium',
    completed: true,
  },
  {
    title: 'Photography Portfolio',
    description: 'Build a professional photography portfolio with 50 photos',
    category: 'Art & Creative',
    priority: 'High',
    completed: false,
  },
  {
    title: 'Subscribe to Technology Blogs',
    description: 'Stay updated with latest tech trends and innovations',
    category: 'Technology',
    priority: 'Low',
    completed: true,
  },
  {
    title: 'Meditation Practice',
    description: 'Meditate for 20 minutes every day for 30 days',
    category: 'Other',
    priority: 'High',
    completed: false,
  },
];

/**
 * Populate the storage with sample hobbies
 * Adds sample data only if the storage is empty
 * @returns {Promise<number>} Number of hobbies added
 */
export const populateHobbies = async () => {
  try {
    // Check if hobbies already exist
    const existingHobbies = await getAllHobbies();
    
    if (existingHobbies.length > 0) {
      console.log(`Hobbies already exist (${existingHobbies.length}). Skipping population.`);
      return 0;
    }

    // Add all sample hobbies with a small delay to avoid AsyncStorage issues
    let count = 0;
    for (const hobby of sampleHobbies) {
      try {
        await saveHobby(hobby);
        count++;
        // Small delay to ensure proper sequential writes
        await new Promise(resolve => setTimeout(resolve, 10));
      } catch (error) {
        console.error(`Error adding hobby "${hobby.title}":`, error);
      }
    }

    console.log(`Successfully added ${count} sample hobbies`);
    return count;
  } catch (error) {
    console.error('Error populating hobbies:', error);
    throw error;
  }
};

/**
 * Clear all hobbies from storage (use with caution)
 * @returns {Promise<boolean>} Success status
 */
export const clearAllHobbies = async () => {
  try {
    const AsyncStorage = require('@react-native-async-storage/async-storage').default;
    await AsyncStorage.removeItem('@hobbies_list');
    console.log('All hobbies cleared');
    return true;
  } catch (error) {
    console.error('Error clearing hobbies:', error);
    throw error;
  }
};

/**
 * Get a random sample hobby
 * Useful for testing or demonstrations
 */
export const getRandomHobby = () => {
  return sampleHobbies[Math.floor(Math.random() * sampleHobbies.length)];
};

export default {
  populateHobbies,
  clearAllHobbies,
  getRandomHobby,
  sampleHobbies,
};
