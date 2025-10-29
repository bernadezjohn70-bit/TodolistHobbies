# Hobbies To-Do List Mobile App

A React Native mobile application for managing your hobbies using Expo and AsyncStorage for local data persistence.

## Features

- ✅ **CRUD Operations**: Create, Read, Update, and Delete hobbies
- 🔍 **Search Functionality**: Search hobbies by title or description
- 🎯 **Filter System**: Filter by completion status (All, Active, Completed) and category
- 📝 **Rich Hobby Details**: Add titles, descriptions, categories, and priorities
- ✏️ **Edit & Delete**: Edit or delete hobbies from the detail screen
- 💾 **Local Storage**: All data stored locally using AsyncStorage
- 🎨 **Modern UI**: Clean, consistent design with smooth animations
- 📦 **Sample Data**: Load 14 pre-configured hobbies to get started quickly

## Installation

1. Install dependencies:
```bash
npm install
```

2. Start the Expo development server:
```bash
npm start
```

3. Run on your preferred platform:
- iOS: Press `i` or run `npm run ios`
- Android: Press `a` or run `npm run android`
- Web: Press `w` or run `npm run web`

## Features Explained

### Search & Filter
- Search by title or description
- Filter by completion status (All, Active, Completed)
- Filter by category (Sports, Art & Creative, Music, Reading, Technology, Cooking, Travel, Other)

### Categories
Choose from 8 predefined categories:
- Sports
- Art & Creative
- Music
- Reading
- Technology
- Cooking
- Travel
- Other

### Priority Levels
- High (Red)
- Medium (Orange)
- Low (Blue)

## Project Structure

```
mobile/
├── App.js                 # Main app entry point with navigation
├── src/
│   ├── screens/
│   │   ├── HobbyListScreen.js   # List view with search/filter
│   │   ├── AddHobbyScreen.js    # Add new hobby form
│   │   └── HobbyDetailScreen.js # View/edit/delete hobby
│   └── services/
│       └── storage.js     # AsyncStorage CRUD operations
└── package.json
```

## Usage

### Adding a Hobby
1. Tap the floating "+" button
2. Enter hobby title (required)
3. Add description (optional)
4. Select category and priority
5. Tap "Add Hobby"

### Editing a Hobby
1. Open a hobby from the list
2. Tap "Edit"
3. Modify fields
4. Tap "Save"

### Completing a Hobby
1. Check the checkbox on a hobby card, or
2. Open the hobby detail and toggle the completion checkbox

### Deleting a Hobby
1. Open the hobby detail screen
2. Tap "Delete"
3. Confirm deletion

### Loading Sample Data
When you first open the app with an empty list, you'll see a "📦 Load Sample Hobbies" button. Tap it to populate your app with 14 pre-configured hobbies across different categories, priorities, and completion statuses. This is perfect for:
- Testing the app
- Seeing how filters and search work
- Demonstrating features to others

See `SEED_DATA_GUIDE.md` for more details.

## Technologies

- **React Native**: Mobile framework
- **Expo**: Development platform
- **React Navigation**: Screen navigation
- **AsyncStorage**: Local data persistence
- **FlatList**: Efficient list rendering
- **ScrollView**: Scrollable content

## Requirements

- Node.js (v14 or higher)
- Expo CLI
- iOS Simulator (for iOS development) or Android Emulator (for Android development)

## Development

This app is built as a final project demonstrating:
- React Native app development
- Local data storage with AsyncStorage
- CRUD operations implementation
- Advanced features (search, filter, animations)
- Modern UI/UX design
