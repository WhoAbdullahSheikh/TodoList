// src/utils/storage.js

import AsyncStorage from '@react-native-async-storage/async-storage';

const TODOS_KEY = '@todos';

export const saveTodos = async (todos) => {
  try {
    await AsyncStorage.setItem(TODOS_KEY, JSON.stringify(todos));
  } catch (error) {
    console.error('Error saving todos to storage', error);
  }
};

export const loadTodos = async () => {
  try {
    const todosString = await AsyncStorage.getItem(TODOS_KEY);
    return todosString ? JSON.parse(todosString) : [];
  } catch (error) {
    console.error('Error loading todos from storage', error);
    return [];
  }
};
