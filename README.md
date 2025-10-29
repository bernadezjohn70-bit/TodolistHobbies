# Hobbies To-Do List App

A React Native mobile application for managing your hobbies using Expo and AsyncStorage for local data persistence. Built as a final project demonstrating modern mobile app development practices.

## 📱 About the App

This is a to-do list application specifically designed for tracking hobbies. Users can add, edit, delete, and manage their hobbies with features like:

- **CRUD Operations**: Complete Create, Read, Update, Delete functionality
- **Search & Filter**: Search by title/description and filter by status/category
- **Rich Metadata**: Categories, priorities, completion status
- **Local Storage**: All data stored locally using AsyncStorage (no backend required)
- **Sample Data**: Load 14 pre-configured hobbies to get started quickly

## 🚀 Quick Start

### Prerequisites
- Node.js (v14 or higher)
- Expo CLI (or use `npx expo`)
- iOS Simulator (for iOS) or Android Emulator (for Android)

### Installation & Run

1. Navigate to the mobile directory:
```bash
cd mobile
```

2. Install dependencies:
```bash
npm install
```

3. Start the Expo development server:
```bash
npm start
```

4. Choose your platform:
- Press `i` to open iOS Simulator
- Press `a` to open Android Emulator
- Press `w` to open in web browser
- Or scan the QR code with your phone using the Camera app

## 📁 Project Structure

```
to-do-list-hobbies/
├── mobile/                          # React Native/Expo mobile app
│   ├── App.js                       # Main app entry point
│   ├── src/
│   │   ├── screens/
│   │   │   ├── HobbyListScreen.js  # Main list with search/filter
│   │   │   ├── AddHobbyScreen.js    # Add new hobby form
│   │   │   └── HobbyDetailScreen.js # View/edit/delete hobby
│   │   └── services/
│   │       ├── storage.js           # AsyncStorage CRUD operations
│   │       └── seedData.js          # Sample data for testing
│   ├── README.md                    # Mobile app documentation
│   └── SEED_DATA_GUIDE.md          # Seed data guide
├── MOBILE_APP_UPDATES.md           # Detailed update documentation
└── README.md                        # This file
```

## ✨ Features

### Core Features
- ✅ Add hobbies with title, description, category, and priority
- ✅ View all hobbies in a scrollable, searchable list
- ✅ Edit any hobby's details inline
- ✅ Delete hobbies with confirmation
- ✅ Mark hobbies as complete/incomplete

### Advanced Features
- 🔍 **Real-time Search**: Search across titles and descriptions
- 🎯 **Multi-Filter System**: Filter by completion status (All/Active/Completed) and category
- 🏷️ **8 Categories**: Sports, Art & Creative, Music, Reading, Technology, Cooking, Travel, Other
- ⚡ **Priority Levels**: High, Medium, Low with color coding
- 📦 **Sample Data**: One-click loading of 14 diverse sample hobbies

## 🎨 UI/UX

- **Modern Design**: Clean, consistent blue theme (#4A90E2)
- **Card-based Layout**: Easy to read and navigate
- **Color-coded Badges**: Visual category and priority indicators
- **Smooth Animations**: Elevation, shadows, and transitions
- **Empty States**: Helpful messages and quick action buttons
- **Responsive**: Works on iOS, Android, and Web

## 📚 Documentation

- **mobile/README.md**: Detailed mobile app usage and features
- **mobile/SEED_DATA_GUIDE.md**: How to use and customize sample data
- **k6-tests/README.md**: Load testing documentation
- **PROJECT_CLEANUP_SUMMARY.md**: Project cleanup details

## 🧪 Load Testing

The project includes K6 load testing to simulate API performance (for a mock backend):
```bash
# Navigate to k6-tests directory
cd k6-tests

# Install mock server dependencies
npm install

# Start the mock API server
npm run start-mock

# In another terminal, run the tests
./run-tests.sh
```

Note: The mobile app uses AsyncStorage (local), so these tests use a mock API server to simulate backend operations.

## 🛠️ Technologies

- **React Native** (~0.81.4): Mobile framework
- **Expo** (~54.0.0): Development platform
- **React Navigation**: Screen navigation
- **AsyncStorage**: Local data persistence
- **FlatList**: Efficient list rendering
- **ScrollView**: Scrollable content

## 📝 Usage Examples

### Adding a Hobby
1. Tap the floating "+" button
2. Enter title (required)
3. Add description (optional)
4. Select category and priority
5. Tap "Add Hobby"

### Loading Sample Data
When the app opens empty, tap "📦 Load Sample Hobbies" button to populate 14 diverse sample hobbies instantly.

### Search & Filter
- Use the search bar to find hobbies by title or description
- Use filter chips to filter by status (All/Active/Completed)
- Use filter chips to filter by category
- Filters can be combined for precise results

## 🎓 Project Requirements

This project fulfills all requirements for a React Native final project:
- ✅ **CRUD Operations**: Create, Read, Update, Delete
- ✅ **Expo Platform**: Built with Expo for easy development
- ✅ **AsyncStorage**: Local data storage (no backend)
- ✅ **React Navigation**: Stack navigation implemented
- ✅ **Core Components**: FlatList, ScrollView, TouchableOpacity
- ✅ **Special Feature**: Advanced search and filter system
- ✅ **Clean Design**: Consistent colors and modern UI
- ✅ **Modular Code**: Separated screens, services, and utilities

## 📄 License

This project is created for educational purposes as a final project.

## 👥 Author

Stephen - Final Project Submission

---

## 🚀 Quick Commands

```bash
# Start the app
cd mobile && npm start

# Run on iOS
cd mobile && npm run ios

# Run on Android
cd mobile && npm run android

# Run on Web
cd mobile && npm run web
```

Enjoy managing your hobbies! 🎯
