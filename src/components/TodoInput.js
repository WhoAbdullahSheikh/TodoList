
import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';

const TodoInput = ({ onAddTodo }) => {
  const [task, setTask] = useState('');

  const handleAdd = () => {
    if (task.trim()) {
      onAddTodo(task.trim());
      setTask('');
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Enter task"
        value={task}
        onChangeText={setTask}
      />
      <Button title="Add Task" onPress={handleAdd} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    padding: 16,
    marginBottom: 16,
    backgroundColor: '#fff',
  },
  input: {
    padding: 10,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 4,
    marginBottom: 10,
    fontSize: 16,
  },
});

export default TodoInput;
