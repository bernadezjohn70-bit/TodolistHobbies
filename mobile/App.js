import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HobbyListScreen from './src/screens/HobbyListScreen';
import HobbyDetailScreen from './src/screens/HobbyDetailScreen';
import AddHobbyScreen from './src/screens/AddHobbyScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="HobbyList"
        screenOptions={{
          headerStyle: {
            backgroundColor: '#4A90E2',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      >
        <Stack.Screen 
          name="HobbyList" 
          component={HobbyListScreen}
          options={{ title: 'My Hobbies' }}
        />
        <Stack.Screen 
          name="HobbyDetail" 
          component={HobbyDetailScreen}
          options={{ title: 'Hobby Details' }}
        />
        <Stack.Screen 
          name="AddHobby" 
          component={AddHobbyScreen}
          options={{ title: 'Add New Hobby' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

