import React from 'react';
import 'react-native-gesture-handler';  // Add this at the very top
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './src/screens/HomeScreen';
import AddTaskScreen from './src/components/AddTaskScreen';
import { TodoProvider } from './src/context/TodoContext'; // Import the context provider

const Stack = createStackNavigator();

const App = () => {
  return (
    <TodoProvider>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="AddTask" component={AddTaskScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </TodoProvider>
  );
};

export default App;
