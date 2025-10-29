# Seed Data Guide

This document explains how to populate the Hobbies To-Do List app with sample data for testing and demonstration purposes.

## Overview

The app includes a built-in sample data feature that allows you to quickly populate AsyncStorage with 14 diverse hobbies across different categories, priorities, and completion statuses.

## Sample Data Included

The seed data includes 14 sample hobbies:

### Active Hobbies (11 items):
1. **Learn to Play Guitar** - Music, High Priority
2. **Watercolor Painting** - Art & Creative, Medium Priority
3. **Read "The Great Gatsby"** - Reading, Low Priority
4. **Build a Mobile App** - Technology, High Priority
5. **Master French Baking** - Cooking, Medium Priority
6. **Pottery Classes** - Art & Creative, Medium Priority
7. **Write a Short Story** - Art & Creative, Low Priority
8. **Learn Spanish** - Other, Medium Priority
9. **Photography Portfolio** - Art & Creative, High Priority
10. **Meditation Practice** - Other, High Priority

### Completed Hobbies (3 items):
11. **Morning Running** - Sports, High Priority ✓
12. **Plan Japan Trip** - Travel, Low Priority ✓
13. **Swimming** - Sports, Medium Priority ✓
14. **Subscribe to Technology Blogs** - Technology, Low Priority ✓

## How to Load Sample Data

### Option 1: From the App (Recommended)
1. Open the app when it's empty (no hobbies added yet)
2. On the empty state screen, you'll see a **"📦 Load Sample Hobbies"** button
3. Tap the button
4. Confirm the dialog
5. All 14 sample hobbies will be loaded instantly

### Option 2: Programmatically
You can import and use the `populateHobbies` function in your code:

```javascript
import { populateHobbies } from '../services/seedData';

// Load sample data
const count = await populateHobbies();
console.log(`Loaded ${count} hobbies`);
```

## Features Demonstrated by Sample Data

### Categories Represented:
- Sports (2 items)
- Art & Creative (4 items)
- Music (1 item)
- Reading (1 item)
- Technology (2 items)
- Cooking (1 item)
- Travel (1 item)
- Other (2 items)

### Priority Levels:
- High (5 items)
- Medium (6 items)
- Low (3 items)

### Completion Status:
- Active: 11 items
- Completed: 3 items

## Safeguards

The `populateHobbies()` function includes several safety features:

1. **No Overwrites**: Only adds data if the storage is completely empty
2. **Error Handling**: Continues even if individual items fail to save
3. **Sequential Writes**: Small delays between writes to prevent AsyncStorage issues
4. **User Confirmation**: Requires user confirmation before loading data

## Clearing Sample Data

To clear all data and start fresh:

### Option 1: Delete Individual Items
- Tap on a hobby
- Tap "Delete" button
- Confirm deletion

### Option 2: Programmatically
```javascript
import { clearAllHobbies } from '../services/seedData';

await clearAllHobbies();
```

## Data Structure

Each hobby follows this structure:
```javascript
{
  id: "unique_timestamp_id",
  title: "Hobby name",
  description: "Optional description text",
  category: "Category name",
  priority: "High | Medium | Low",
  completed: false,
  createdAt: "2024-01-01T00:00:00.000Z",
  updatedAt: "2024-01-01T00:00:00.000Z"
}
```

## File Location

The seed data is located at:
```
mobile/src/services/seedData.js
```

## Usage Example

```javascript
import { 
  populateHobbies, 
  clearAllHobbies, 
  getRandomHobby 
} from '../services/seedData';

// Load sample data
await populateHobbies();

// Get a random hobby from samples
const random = getRandomHobby();

// Clear all data
await clearAllHobbies();
```

## Best Practices

1. **Testing**: Use sample data during development to test features
2. **Demonstrations**: Load samples when showing the app to others
3. **Fresh Start**: Clear data before loading samples to avoid conflicts
4. **User Experience**: The button only appears when the app is truly empty

## Troubleshooting

### "Hobbies already exist" message
- The sample data won't load if you already have hobbies in storage
- Solution: Delete all hobbies first, or add them manually

### Data not appearing
- Make sure you've waited for AsyncStorage to complete writes
- Refresh the screen by navigating away and back

### Missing categories
- If you want to add more categories, edit `seedData.js` and add new hobbies
- You can also add them manually through the app

## Customizing Sample Data

To customize the sample data:

1. Open `mobile/src/services/seedData.js`
2. Edit the `sampleHobbies` array
3. Add or modify hobbies as needed:
```javascript
{
  title: 'Your Hobby Name',
  description: 'Description here',
  category: 'YourCategory',
  priority: 'High | Medium | Low',
  completed: false,
}
```

## Summary

The seed data feature provides a quick way to populate your app with diverse, realistic sample data that demonstrates all features including:
- Multiple categories
- Different priority levels
- Various completion statuses
- Search and filter functionality
- Rich descriptions

This makes it perfect for:
- Testing the app
- Demonstrating features
- Learning how the app works
- Development and debugging
