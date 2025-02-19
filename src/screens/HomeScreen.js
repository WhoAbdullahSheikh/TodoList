import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import { useTodoContext } from '../context/TodoContext';
import TodoItem from '../components/TodoItem';

const HomeScreen = ({ navigation }) => {
  const { todos, completedTodos, deleteTodo, completeTodo } = useTodoContext();

  const [currentDate, setCurrentDate] = useState('');

  useEffect(() => {
    const updateDate = () => {
      const today = new Date();
      const formattedDate = today.toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });
      setCurrentDate(formattedDate);
    };

    updateDate();

    const intervalId = setInterval(updateDate, 86400000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.date}>{currentDate}</Text>
        <Text style={styles.title}>My Todo List</Text>
      </View>

      {}
      <FlatList
        data={todos}
        renderItem={({ item }) => (
          <TodoItem
            todo={item}
            onDelete={deleteTodo}
            onComplete={completeTodo}
            isCompleted={false}
          />
        )}
        keyExtractor={item => item.id}
        ListHeaderComponent={<Text style={styles.sectionHeader}>Todo</Text>}
      />

      {}
      <View style={styles.divider} />

      {}
      <FlatList
        data={completedTodos}
        renderItem={({ item }) => (
          <TodoItem todo={item} onDelete={deleteTodo} isCompleted={true} />
        )}
        keyExtractor={item => item.id}
        ListHeaderComponent={<Text style={styles.sectionHeader}>Completed</Text>}
      />

      {}
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate('AddTask')}
      >
        <Text style={styles.addButtonText}>Add New Task</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    padding: 20,
    backgroundColor: '#0b0b0b',
    borderBottomLeftRadius: 26,
    borderBottomRightRadius: 26,
    paddingTop: Platform.OS === 'ios' ? 50 : 20,
  },
  date: {
    color: '#fff',
    fontSize: 14,
    textAlign: 'center',
  },
  title: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 10,
  },
  sectionHeader: {
    color: '#0b0b0b',
    fontSize: Platform.OS === 'ios' ? 22 : 18,
    fontWeight: 'bold',
    paddingHorizontal: 16,
    marginVertical: 10,
  },
  addButton: {
    backgroundColor: '#0b0b0b',
    padding: 16,
    borderRadius: 50,
    alignItems: 'center',
    position: 'absolute',
    bottom: 20,
    alignSelf: 'center',
    width: '80%',
  },
  addButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  divider: {
    height: Platform.OS === 'ios' ? 2 : 1,
    backgroundColor: '#ccc',
    marginVertical: 10,
    marginHorizontal: 16,
  },
});

export default HomeScreen;
