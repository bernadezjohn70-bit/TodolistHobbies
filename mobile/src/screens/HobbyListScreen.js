import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  TextInput,
  ScrollView,
  Alert,
} from 'react-native';
import { getAllHobbies, toggleHobbyCompletion } from '../services/storage';
import { populateHobbies } from '../services/seedData';

export default function HobbyListScreen({ navigation }) {
  const [hobbies, setHobbies] = useState([]);
  const [filteredHobbies, setFilteredHobbies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCompleted, setFilterCompleted] = useState('all'); // 'all', 'active', 'completed'
  const [filterCategory, setFilterCategory] = useState('all');

  useEffect(() => {
    fetchHobbies();
    
    // Reload when screen is focused
    const unsubscribe = navigation.addListener('focus', () => {
      fetchHobbies();
    });

    return unsubscribe;
  }, [navigation]);

  // Apply filters when hobbies, search query, or filters change
  useEffect(() => {
    applyFilters();
  }, [hobbies, searchQuery, filterCompleted, filterCategory]);

  const fetchHobbies = async () => {
    try {
      setLoading(true);
      const data = await getAllHobbies();
      // Sort by created date (newest first)
      const sorted = data.sort((a, b) => 
        new Date(b.createdAt) - new Date(a.createdAt)
      );
      setHobbies(sorted);
    } catch (error) {
      console.error('Error loading hobbies:', error);
    } finally {
      setLoading(false);
    }
  };

  const applyFilters = () => {
    let filtered = [...hobbies];

    // Search filter
    if (searchQuery.trim()) {
      filtered = filtered.filter(hobby =>
        hobby.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (hobby.description || '').toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Completion status filter
    if (filterCompleted === 'active') {
      filtered = filtered.filter(hobby => !hobby.completed);
    } else if (filterCompleted === 'completed') {
      filtered = filtered.filter(hobby => hobby.completed);
    }

    // Category filter
    if (filterCategory !== 'all') {
      filtered = filtered.filter(hobby => hobby.category === filterCategory);
    }

    setFilteredHobbies(filtered);
  };

  const handleToggleCompletion = async (hobbyId) => {
    try {
      await toggleHobbyCompletion(hobbyId);
      fetchHobbies(); // Reload the list
    } catch (error) {
      console.error('Error toggling hobby:', error);
    }
  };

  const handlePopulateSampleData = async () => {
    try {
      Alert.alert(
        'Load Sample Data',
        'Would you like to add 14 sample hobbies to get started?',
        [
          { text: 'Cancel', style: 'cancel' },
          {
            text: 'Load Samples',
            onPress: async () => {
              try {
                await populateHobbies();
                Alert.alert('Success', 'Sample hobbies loaded successfully!');
                fetchHobbies();
              } catch (error) {
                Alert.alert('Error', 'Failed to load sample data');
              }
            },
          },
        ]
      );
    } catch (error) {
      console.error('Error populating data:', error);
    }
  };

  const renderHobbyItem = ({ item }) => (
    <TouchableOpacity
      style={[styles.hobbyCard, item.completed && styles.hobbyCardCompleted]}
      onPress={() => navigation.navigate('HobbyDetail', { hobbyId: item.id })}
    >
      <View style={styles.hobbyHeader}>
        <TouchableOpacity
          style={[styles.checkbox, item.completed && styles.checkboxChecked]}
          onPress={() => handleToggleCompletion(item.id)}
        >
          {item.completed && <Text style={styles.checkmark}>✓</Text>}
        </TouchableOpacity>
        <View style={styles.hobbyInfo}>
          <Text style={[styles.hobbyTitle, item.completed && styles.hobbyTitleCompleted]}>
            {item.title}
          </Text>
          {item.description ? (
            <Text style={styles.hobbyDescription} numberOfLines={2}>
              {item.description}
            </Text>
          ) : null}
        </View>
      </View>
      <View style={styles.hobbyFooter}>
        <View style={[styles.categoryBadge, { backgroundColor: getCategoryColor(item.category) }]}>
          <Text style={styles.categoryText}>{item.category}</Text>
        </View>
        <View style={[styles.priorityBadge, { backgroundColor: getPriorityColor(item.priority) }]}>
          <Text style={styles.priorityText}>{item.priority}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  const getCategoryColor = (category) => {
    const colors = {
      'Sports': '#FF6B6B',
      'Art & Creative': '#4ECDC4',
      'Music': '#95E1D3',
      'Reading': '#F38181',
      'Technology': '#95A5A6',
      'Cooking': '#F39C12',
      'Travel': '#3498DB',
      'Other': '#9B59B6',
    };
    return colors[category] || '#95A5A6';
  };

  const getPriorityColor = (priority) => {
    const colors = {
      'High': '#E74C3C',
      'Medium': '#F39C12',
      'Low': '#3498DB',
    };
    return colors[priority] || '#95A5A6';
  };

  const getCategories = () => {
    const categories = hobbies.map(h => h.category).filter((value, index, self) => self.indexOf(value) === index);
    return ['all', ...categories];
  };

  if (loading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#4A90E2" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search hobbies..."
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholderTextColor="#999"
        />
      </View>

      {/* Filter Section */}
      <View style={styles.filterContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {/* Status Filter */}
          <TouchableOpacity
            style={[
              styles.filterChip,
              filterCompleted === 'all' && styles.filterChipActive,
            ]}
            onPress={() => setFilterCompleted('all')}
          >
            <Text
              style={[
                styles.filterChipText,
                filterCompleted === 'all' && styles.filterChipTextActive,
              ]}
            >
              All
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.filterChip,
              filterCompleted === 'active' && styles.filterChipActive,
            ]}
            onPress={() => setFilterCompleted('active')}
          >
            <Text
              style={[
                styles.filterChipText,
                filterCompleted === 'active' && styles.filterChipTextActive,
              ]}
            >
              Active
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.filterChip,
              filterCompleted === 'completed' && styles.filterChipActive,
            ]}
            onPress={() => setFilterCompleted('completed')}
          >
            <Text
              style={[
                styles.filterChipText,
                filterCompleted === 'completed' && styles.filterChipTextActive,
              ]}
            >
              Completed
            </Text>
          </TouchableOpacity>

          {/* Category Filter */}
          {getCategories().map((category) => (
            <TouchableOpacity
              key={category}
              style={[
                styles.filterChip,
                filterCategory === category && styles.filterChipActive,
              ]}
              onPress={() => setFilterCategory(category)}
            >
              <Text
                style={[
                  styles.filterChipText,
                  filterCategory === category && styles.filterChipTextActive,
                ]}
              >
                {category === 'all' ? 'All Categories' : category}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Hobby List */}
      <FlatList
        data={filteredHobbies}
        renderItem={renderHobbyItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyEmoji}>🎯</Text>
            <Text style={styles.emptyText}>No hobbies found</Text>
            <Text style={styles.emptySubtext}>
              {searchQuery || filterCompleted !== 'all' || filterCategory !== 'all'
                ? 'Try adjusting your filters'
                : 'Add your first hobby!'}
            </Text>
            {hobbies.length === 0 && !searchQuery && filterCompleted === 'all' && filterCategory === 'all' && (
              <TouchableOpacity
                style={styles.loadSamplesButton}
                onPress={handlePopulateSampleData}
              >
                <Text style={styles.loadSamplesButtonText}>📦 Load Sample Hobbies</Text>
              </TouchableOpacity>
            )}
          </View>
        }
      />

      {/* Floating Add Button */}
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate('AddHobby')}
      >
        <Text style={styles.addButtonText}>+</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchContainer: {
    padding: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  searchInput: {
    backgroundColor: '#f0f0f0',
    borderRadius: 12,
    padding: 12,
    fontSize: 16,
  },
  filterContainer: {
    backgroundColor: '#fff',
    paddingVertical: 12,
    paddingHorizontal: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  filterChip: {
    backgroundColor: '#f0f0f0',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginHorizontal: 4,
  },
  filterChipActive: {
    backgroundColor: '#4A90E2',
  },
  filterChipText: {
    fontSize: 14,
    color: '#666',
    fontWeight: '600',
  },
  filterChipTextActive: {
    color: '#fff',
  },
  listContainer: {
    padding: 16,
  },
  hobbyCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  hobbyCardCompleted: {
    opacity: 0.7,
  },
  hobbyHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  checkbox: {
    width: 24,
    height: 24,
    borderWidth: 2,
    borderColor: '#4A90E2',
    borderRadius: 6,
    marginRight: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxChecked: {
    backgroundColor: '#4A90E2',
  },
  checkmark: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  hobbyInfo: {
    flex: 1,
  },
  hobbyTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  hobbyTitleCompleted: {
    textDecorationLine: 'line-through',
    color: '#999',
  },
  hobbyDescription: {
    fontSize: 14,
    color: '#666',
  },
  hobbyFooter: {
    flexDirection: 'row',
    marginTop: 12,
    justifyContent: 'flex-start',
  },
  categoryBadge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
    marginRight: 8,
  },
  categoryText: {
    fontSize: 12,
    color: '#fff',
    fontWeight: '600',
  },
  priorityBadge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  priorityText: {
    fontSize: 12,
    color: '#fff',
    fontWeight: '600',
  },
  emptyContainer: {
    alignItems: 'center',
    marginTop: 60,
  },
  emptyEmoji: {
    fontSize: 64,
    marginBottom: 16,
  },
  emptyText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#999',
    marginBottom: 8,
  },
  emptySubtext: {
    fontSize: 14,
    color: '#bbb',
    textAlign: 'center',
  },
  addButton: {
    position: 'absolute',
    bottom: 24,
    right: 24,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#4A90E2',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 32,
    fontWeight: 'bold',
    lineHeight: 32,
  },
  loadSamplesButton: {
    backgroundColor: '#4A90E2',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 12,
    marginTop: 16,
  },
  loadSamplesButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
