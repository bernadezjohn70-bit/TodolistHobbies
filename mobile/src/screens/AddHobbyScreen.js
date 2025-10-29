import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Alert,
} from 'react-native';
import { saveHobby } from '../services/storage';

export default function AddHobbyScreen({ navigation }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('Other');
  const [priority, setPriority] = useState('Medium');
  const [loading, setLoading] = useState(false);

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

  const handleSubmit = async () => {
    // Validation
    if (!title.trim()) {
      Alert.alert('Error', 'Please enter a hobby title');
      return;
    }

    const hobbyData = {
      title: title.trim(),
      description: description.trim(),
      category,
      priority,
    };

    try {
      setLoading(true);
      await saveHobby(hobbyData);
      Alert.alert('Success', 'Hobby added successfully!', [
        { text: 'OK', onPress: () => navigation.goBack() },
      ]);
    } catch (error) {
      console.error('Error creating hobby:', error);
      Alert.alert('Error', 'Failed to add hobby. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.form}>
        {/* Title Input */}
        <Text style={styles.label}>Hobby Title *</Text>
        <TextInput
          style={styles.input}
          value={title}
          onChangeText={setTitle}
          placeholder="e.g., Learn to Play Guitar"
          placeholderTextColor="#999"
        />

        {/* Description Input */}
        <Text style={styles.label}>Description</Text>
        <TextInput
          style={[styles.input, styles.textArea]}
          value={description}
          onChangeText={setDescription}
          placeholder="Add a description for this hobby..."
          placeholderTextColor="#999"
          multiline
          numberOfLines={4}
          textAlignVertical="top"
        />

        {/* Category Selection */}
        <Text style={styles.label}>Category</Text>
        <View style={styles.optionContainer}>
          {categories.map((cat) => (
            <TouchableOpacity
              key={cat}
              style={[
                styles.optionButton,
                category === cat && styles.optionButtonActive,
              ]}
              onPress={() => setCategory(cat)}
            >
              <Text
                style={[
                  styles.optionButtonText,
                  category === cat && styles.optionButtonTextActive,
                ]}
              >
                {cat}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Priority Selection */}
        <Text style={styles.label}>Priority</Text>
        <View style={styles.optionContainer}>
          {priorities.map((pri) => (
            <TouchableOpacity
              key={pri}
              style={[
                styles.optionButton,
                priority === pri && styles.optionButtonActive,
              ]}
              onPress={() => setPriority(pri)}
            >
              <Text
                style={[
                  styles.optionButtonText,
                  priority === pri && styles.optionButtonTextActive,
                ]}
              >
                {pri}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Submit Button */}
        <TouchableOpacity
          style={[styles.submitButton, loading && styles.submitButtonDisabled]}
          onPress={handleSubmit}
          disabled={loading}
        >
          <Text style={styles.submitButtonText}>
            {loading ? 'Adding Hobby...' : 'Add Hobby'}
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  form: {
    padding: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
    marginTop: 8,
  },
  input: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    padding: 14,
    fontSize: 16,
    marginBottom: 8,
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  optionContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 16,
  },
  optionButton: {
    backgroundColor: '#fff',
    borderWidth: 2,
    borderColor: '#ddd',
    borderRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 10,
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
  submitButton: {
    backgroundColor: '#4A90E2',
    borderRadius: 10,
    padding: 16,
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 40,
  },
  submitButtonDisabled: {
    backgroundColor: '#ccc',
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
