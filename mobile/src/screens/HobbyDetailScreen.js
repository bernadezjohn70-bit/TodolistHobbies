import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  TextInput,
} from 'react-native';
import { getHobbyById, updateHobby, deleteHobby, toggleHobbyCompletion } from '../services/storage';

export default function HobbyDetailScreen({ route, navigation }) {
  const { hobbyId } = route.params;
  const [hobby, setHobby] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState('');
  const [editedDescription, setEditedDescription] = useState('');
  const [editedCategory, setEditedCategory] = useState('');
  const [editedPriority, setEditedPriority] = useState('');

  useEffect(() => {
    fetchHobbyDetail();
    
    // Update when screen is focused
    const unsubscribe = navigation.addListener('focus', () => {
      fetchHobbyDetail();
    });

    return unsubscribe;
  }, [navigation]);

  const fetchHobbyDetail = async () => {
    try {
      setLoading(true);
      const data = await getHobbyById(hobbyId);
      if (data) {
        setHobby(data);
        setEditedTitle(data.title);
        setEditedDescription(data.description || '');
        setEditedCategory(data.category);
        setEditedPriority(data.priority);
      } else {
        Alert.alert('Error', 'Hobby not found', [
          { text: 'OK', onPress: () => navigation.goBack() },
        ]);
      }
    } catch (error) {
      console.error('Error loading hobby detail:', error);
      Alert.alert('Error', 'Failed to load hobby details');
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    if (!editedTitle.trim()) {
      Alert.alert('Error', 'Title cannot be empty');
      return;
    }

    try {
      await updateHobby({
        ...hobby,
        title: editedTitle.trim(),
        description: editedDescription.trim(),
        category: editedCategory,
        priority: editedPriority,
      });
      
      setIsEditing(false);
      fetchHobbyDetail();
      Alert.alert('Success', 'Hobby updated successfully');
    } catch (error) {
      console.error('Error updating hobby:', error);
      Alert.alert('Error', 'Failed to update hobby');
    }
  };

  const handleDelete = () => {
    Alert.alert(
      'Delete Hobby',
      'Are you sure you want to delete this hobby?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            try {
              await deleteHobby(hobbyId);
              Alert.alert('Success', 'Hobby deleted successfully', [
                { text: 'OK', onPress: () => navigation.goBack() },
              ]);
            } catch (error) {
              console.error('Error deleting hobby:', error);
              Alert.alert('Error', 'Failed to delete hobby');
            }
          },
        },
      ]
    );
  };

  const handleToggleCompletion = async () => {
    try {
      await toggleHobbyCompletion(hobbyId);
      fetchHobbyDetail();
    } catch (error) {
      console.error('Error toggling hobby:', error);
    }
  };

  if (loading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#4A90E2" />
      </View>
    );
  }

  if (!hobby) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.errorText}>Hobby not found</Text>
      </View>
    );
  }

  const categories = [
    'Sports',
    'Art & Creative',
    'Music',
    'Reading',
    'Technology',
    'Cooking',
    'Travel',
    'Other',
  ];

  const priorities = ['High', 'Medium', 'Low'];

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

  return (
    <ScrollView style={styles.container}>
      <View style={styles.card}>
        {/* Completion Toggle */}
        <View style={styles.completionSection}>
          <TouchableOpacity
            style={[
              styles.checkbox,
              hobby.completed && styles.checkboxChecked,
            ]}
            onPress={handleToggleCompletion}
          >
            {hobby.completed && <Text style={styles.checkmark}>✓</Text>}
          </TouchableOpacity>
          <Text style={styles.completionText}>
            {hobby.completed ? 'Completed' : 'In Progress'}
          </Text>
        </View>

        {/* Title Section */}
        <Text style={styles.sectionLabel}>Title</Text>
        {isEditing ? (
          <TextInput
            style={styles.input}
            value={editedTitle}
            onChangeText={setEditedTitle}
            placeholder="Enter title"
          />
        ) : (
          <Text style={styles.title}>{hobby.title}</Text>
        )}

        {/* Description Section */}
        <Text style={styles.sectionLabel}>Description</Text>
        {isEditing ? (
          <TextInput
            style={[styles.input, styles.textArea]}
            value={editedDescription}
            onChangeText={setEditedDescription}
            placeholder="Enter description"
            multiline
            numberOfLines={4}
            textAlignVertical="top"
          />
        ) : (
          <Text style={styles.description}>
            {hobby.description || 'No description'}
          </Text>
        )}

        {/* Category Section */}
        <Text style={styles.sectionLabel}>Category</Text>
        {isEditing ? (
          <View style={styles.optionContainer}>
            {categories.map((cat) => (
              <TouchableOpacity
                key={cat}
                style={[
                  styles.optionButton,
                  editedCategory === cat && styles.optionButtonActive,
                ]}
                onPress={() => setEditedCategory(cat)}
              >
                <Text
                  style={[
                    styles.optionButtonText,
                    editedCategory === cat && styles.optionButtonTextActive,
                  ]}
                >
                  {cat}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        ) : (
          <View style={[styles.badge, { backgroundColor: getCategoryColor(hobby.category) }]}>
            <Text style={styles.badgeText}>{hobby.category}</Text>
          </View>
        )}

        {/* Priority Section */}
        <Text style={styles.sectionLabel}>Priority</Text>
        {isEditing ? (
          <View style={styles.optionContainer}>
            {priorities.map((pri) => (
              <TouchableOpacity
                key={pri}
                style={[
                  styles.optionButton,
                  editedPriority === pri && styles.optionButtonActive,
                ]}
                onPress={() => setEditedPriority(pri)}
              >
                <Text
                  style={[
                    styles.optionButtonText,
                    editedPriority === pri && styles.optionButtonTextActive,
                  ]}
                >
                  {pri}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        ) : (
          <View style={[styles.badge, { backgroundColor: getPriorityColor(hobby.priority) }]}>
            <Text style={styles.badgeText}>{hobby.priority}</Text>
          </View>
        )}

        {/* Action Buttons */}
        <View style={styles.actionButtons}>
          {isEditing ? (
            <>
              <TouchableOpacity
                style={[styles.button, styles.cancelButton]}
                onPress={() => {
                  setIsEditing(false);
                  setEditedTitle(hobby.title);
                  setEditedDescription(hobby.description || '');
                  setEditedCategory(hobby.category);
                  setEditedPriority(hobby.priority);
                }}
              >
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.button, styles.saveButton]}
                onPress={handleSave}
              >
                <Text style={styles.saveButtonText}>Save</Text>
              </TouchableOpacity>
            </>
          ) : (
            <>
              <TouchableOpacity
                style={[styles.button, styles.editButton]}
                onPress={() => setIsEditing(true)}
              >
                <Text style={styles.editButtonText}>Edit</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.button, styles.deleteButton]}
                onPress={handleDelete}
              >
                <Text style={styles.deleteButtonText}>Delete</Text>
              </TouchableOpacity>
            </>
          )}
        </View>

        {/* Metadata */}
        <View style={styles.metadata}>
          <Text style={styles.metadataText}>
            Created: {new Date(hobby.createdAt).toLocaleDateString()}
          </Text>
          <Text style={styles.metadataText}>
            Updated: {new Date(hobby.updatedAt).toLocaleDateString()}
          </Text>
        </View>
      </View>
    </ScrollView>
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
  errorText: {
    fontSize: 16,
    color: '#999',
  },
  card: {
    backgroundColor: '#fff',
    margin: 16,
    borderRadius: 12,
    padding: 20,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  completionSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  checkbox: {
    width: 28,
    height: 28,
    borderWidth: 2,
    borderColor: '#4A90E2',
    borderRadius: 8,
    marginRight: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxChecked: {
    backgroundColor: '#4A90E2',
  },
  checkmark: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  completionText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  sectionLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666',
    marginBottom: 8,
    marginTop: 12,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 12,
  },
  description: {
    fontSize: 16,
    color: '#555',
    lineHeight: 24,
    marginBottom: 12,
  },
  badge: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 12,
    alignSelf: 'flex-start',
    marginBottom: 12,
  },
  badgeText: {
    fontSize: 14,
    color: '#fff',
    fontWeight: '600',
  },
  input: {
    backgroundColor: '#f0f0f0',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    marginBottom: 12,
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  optionContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 12,
  },
  optionButton: {
    backgroundColor: '#f0f0f0',
    borderWidth: 2,
    borderColor: '#ddd',
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 8,
    marginBottom: 8,
  },
  optionButtonActive: {
    backgroundColor: '#4A90E2',
    borderColor: '#4A90E2',
  },
  optionButtonText: {
    fontSize: 14,
    color: '#666',
    fontWeight: '600',
  },
  optionButtonTextActive: {
    color: '#fff',
  },
  actionButtons: {
    flexDirection: 'row',
    marginTop: 24,
    marginBottom: 16,
  },
  button: {
    flex: 1,
    borderRadius: 10,
    padding: 14,
    alignItems: 'center',
    marginHorizontal: 6,
  },
  editButton: {
    backgroundColor: '#4A90E2',
  },
  editButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  deleteButton: {
    backgroundColor: '#E74C3C',
  },
  deleteButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  saveButton: {
    backgroundColor: '#27AE60',
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  cancelButton: {
    backgroundColor: '#95A5A6',
  },
  cancelButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  metadata: {
    marginTop: 16,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
  },
  metadataText: {
    fontSize: 12,
    color: '#999',
    marginBottom: 4,
  },
});
