import AsyncStorage from '@react-native-async-storage/async-storage';

const HOBBY_STORAGE_KEY = '@hobbies_list';

/**
 * Storage service for managing hobbies using AsyncStorage
 * Implements CRUD operations for local data persistence
 */

// Get all hobbies
export const getAllHobbies = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem(HOBBY_STORAGE_KEY);
    return jsonValue != null ? JSON.parse(jsonValue) : [];
  } catch (error) {
    console.error('Error getting hobbies:', error);
    return [];
  }
};

// Save a new hobby
export const saveHobby = async (hobby) => {
  try {
    // Generate unique ID
    const hobbies = await getAllHobbies();
    const newHobby = {
      id: Date.now().toString(),
      title: hobby.title,
      description: hobby.description || '',
      category: hobby.category || 'Other',
      priority: hobby.priority || 'Medium',
      completed: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    
    hobbies.push(newHobby);
    await AsyncStorage.setItem(HOBBY_STORAGE_KEY, JSON.stringify(hobbies));
    return newHobby;
  } catch (error) {
    console.error('Error saving hobby:', error);
    throw error;
  }
};

// Update an existing hobby
export const updateHobby = async (updatedHobby) => {
  try {
    const hobbies = await getAllHobbies();
    const index = hobbies.findIndex(h => h.id === updatedHobby.id);
    
    if (index === -1) {
      throw new Error('Hobby not found');
    }
    
    hobbies[index] = {
      ...updatedHobby,
      updatedAt: new Date().toISOString(),
    };
    
    await AsyncStorage.setItem(HOBBY_STORAGE_KEY, JSON.stringify(hobbies));
    return hobbies[index];
  } catch (error) {
    console.error('Error updating hobby:', error);
    throw error;
  }
};

// Delete a hobby
export const deleteHobby = async (hobbyId) => {
  try {
    const hobbies = await getAllHobbies();
    const filtered = hobbies.filter(h => h.id !== hobbyId);
    await AsyncStorage.setItem(HOBBY_STORAGE_KEY, JSON.stringify(filtered));
    return true;
  } catch (error) {
    console.error('Error deleting hobby:', error);
    throw error;
  }
};

// Get a single hobby by ID
export const getHobbyById = async (hobbyId) => {
  try {
    const hobbies = await getAllHobbies();
    return hobbies.find(h => h.id === hobbyId);
  } catch (error) {
    console.error('Error getting hobby:', error);
    return null;
  }
};

// Toggle completion status
export const toggleHobbyCompletion = async (hobbyId) => {
  try {
    const hobby = await getHobbyById(hobbyId);
    if (!hobby) {
      throw new Error('Hobby not found');
    }
    
    return await updateHobby({
      ...hobby,
      completed: !hobby.completed,
    });
  } catch (error) {
    console.error('Error toggling hobby:', error);
    throw error;
  }
};

