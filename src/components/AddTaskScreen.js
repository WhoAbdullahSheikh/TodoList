import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

const AddTaskScreen = ({ navigation }) => {
  const [taskTitle, setTaskTitle] = useState('');
  const [category, setCategory] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [notes, setNotes] = useState('');

  // Define your addTodo function inside the screen itself or pass it in some other way
  const addTodo = (todo) => {
    console.log('New Todo:', todo);
    // Add your logic to add the todo here
  };

  // Use setOptions to pass the addTodo function as part of navigation options
  useEffect(() => {
    navigation.setOptions({
      addTodo: addTodo, // Attach addTodo function to navigation options
    });
  }, [navigation]);

  const handleSave = () => {
    if (taskTitle.trim() !== '') {
      // Use the addTodo function from navigation options
      navigation.getParam('addTodo')({ title: taskTitle, category, date, time, notes });
      navigation.goBack();
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Add New Task</Text>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Task Title</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter task title"
          placeholderTextColor="#bbb"
          value={taskTitle}
          onChangeText={setTaskTitle}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Category</Text>
        <TextInput
          style={styles.input}
          placeholder="Select category"
          placeholderTextColor="#bbb"
          value={category}
          onChangeText={setCategory}
        />
      </View>

      <View style={styles.rowContainer}>
        <View style={styles.rowItem}>
          <Text style={styles.label}>Date</Text>
          <TextInput
            style={styles.input}
            placeholder="MM/DD/YYYY"
            placeholderTextColor="#bbb"
            value={date}
            onChangeText={setDate}
          />
        </View>
        <View style={styles.rowItem}>
          <Text style={styles.label}>Time</Text>
          <TextInput
            style={styles.input}
            placeholder="HH:MM"
            placeholderTextColor="#bbb"
            value={time}
            onChangeText={setTime}
          />
        </View>
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Notes</Text>
        <TextInput
          style={[styles.input, styles.notesInput]}
          placeholder="Add any notes"
          placeholderTextColor="#bbb"
          value={notes}
          onChangeText={setNotes}
          multiline
        />
      </View>

      <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
        <Text style={styles.saveButtonText}>Save</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1E1E2C',
    padding: 20,
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 20,
    textAlign: 'center',
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
    color: '#aaa',
    marginBottom: 5,
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: '#444',
    borderRadius: 8,
    paddingHorizontal: 15,
    color: '#fff',
    fontSize: 16,
    backgroundColor: '#2A2A3C',
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  rowItem: {
    width: '48%',
  },
  notesInput: {
    height: 100,
    textAlignVertical: 'top',
  },
  saveButton: {
    backgroundColor: '#4CAF50',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default AddTaskScreen;
