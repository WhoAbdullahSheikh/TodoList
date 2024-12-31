// src/components/TodoItem.js

import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const TodoItem = ({ todo, onDelete, onComplete, isCompleted }) => {
  return (
    <View style={[styles.container, isCompleted && styles.completed]}>
      <Text style={styles.text}>{todo.title}</Text>
      {!isCompleted && (
        <TouchableOpacity onPress={() => onComplete?.(todo.id)}>
          <Text style={styles.completeText}>✓</Text>
        </TouchableOpacity>
      )}
      <TouchableOpacity onPress={() => onDelete(todo.id)}>
        <Text style={styles.deleteText}>Delete</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#222',
    padding: 10,
    marginVertical: 5,
    borderRadius: 8,
    width: '100%',
    justifyContent: 'space-between',
  },
  completed: {
    backgroundColor: '#555',
  },
  text: {
    color: '#fff',
    fontSize: 16,
    flex: 1,
  },
  completeText: {
    color: 'green',
    fontSize: 18,
    marginRight: 10,
  },
  deleteText: {
    color: 'red',
    fontSize: 14,
  },
});

export default TodoItem;
