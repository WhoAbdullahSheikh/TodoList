import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Platform,
} from 'react-native';
import {useTodoContext} from '../context/TodoContext'; // Access the context
import TodoItem from '../components/TodoItem';

const HomeScreen = ({navigation}) => {
  // Access state and functions from the context
  const {todos, completedTodos, deleteTodo, completeTodo} = useTodoContext();

  // State to hold the current date
  const [currentDate, setCurrentDate] = useState('');

  // Effect to update the date on component mount
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

    // Call the updateDate function to set the initial date
    updateDate();

    // Optionally, set up an interval to update the date at midnight each day
    const intervalId = setInterval(updateDate, 86400000); // 86400000 ms = 1 day

    // Cleanup the interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.date}>{currentDate}</Text>
        <Text style={styles.title}>My Todo List</Text>
      </View>

      {/* Todo list */}
      <FlatList
        data={todos}
        renderItem={({item}) => (
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

      {/* Section Divider */}
      <View style={styles.divider} />

      {/* Completed list */}
      <FlatList
        data={completedTodos}
        renderItem={({item}) => (
          <TodoItem todo={item} onDelete={deleteTodo} isCompleted={true} />
        )}
        keyExtractor={item => item.id}
        ListHeaderComponent={
          <Text style={styles.sectionHeader}>Completed</Text>
        }
      />

      {/* Add New Task Button */}
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate('AddTask')}>
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
    height: 5,
    backgroundColor: '#d3d3d3', // Light grey divider color
    marginVertical: 10,
    marginHorizontal: 16,
  },
});

export default HomeScreen;
