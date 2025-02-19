import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const TodoItem = ({ todo, onDelete, onComplete, isCompleted }) => {
  const getCategoryColor = (category) => {
    switch (category.toLowerCase()) {
      case 'high':
        return '#d11c0f';
      case 'moderate':
        return '#ff9800';
      case 'low':
        return '#4caf50';
      default:
        return '#3f51b5';
    }
  };

  return (
    <View style={[styles.itemContainer, isCompleted && styles.completedItem]}>
      <View style={styles.detailsContainer}>
        <Text style={[styles.title, isCompleted && styles.completedText]}>{todo.title}</Text>

        {}
        <View style={styles.categoryContainer}>
          <Text style={[styles.category, { backgroundColor: getCategoryColor(todo.category) }]}>
            {todo.category}
          </Text>
        </View>

        <Text style={styles.date}>Date: <Text style={styles.infoText}>{todo.date}</Text></Text>
        <Text style={styles.time}>Time: <Text style={styles.infoText}>{todo.time}</Text></Text>
        <Text style={styles.notes}>Notes: <Text style={styles.infoText}>{todo.notes}</Text></Text>
      </View>

      {}
      <View style={styles.actions}>
        <TouchableOpacity
          onPress={() => onComplete(todo.id)}
          style={[styles.actionButton, styles.completeButton]}
        >
          <Icon
            name={isCompleted ? 'undo' : 'check-circle'}
            size={20}
            color="#fff"
            style={styles.actionIcon}
          />
          <Text style={styles.actionText}>{isCompleted ? 'Undo' : 'Complete'}</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => onDelete(todo.id)}
          style={[styles.actionButton, styles.deleteButton]}
        >
          <Icon
            name="delete"
            size={20}
            color="#fff"
            style={styles.actionIcon}
          />
          <Text style={styles.actionText}>Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: 'row',
    padding: 15,
    marginBottom: 12,
    backgroundColor: '#f9f9f9',
    borderRadius: 12,
    alignItems: 'flex-start',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  completedItem: {
    backgroundColor: '#e0f7fa',
  },
  detailsContainer: {
    flex: 1,
    marginRight: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 5,
  },
  completedText: {
    textDecorationLine: 'line-through',
    color: '#90a4ae',
  },
  categoryContainer: {
    marginBottom: 8,
  },
  category: {
    fontSize: 14,
    color: '#fff',
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 12,
    overflow: 'hidden',
    alignSelf: 'flex-start',
  },
  date: {
    fontWeight: '500',
    color: 'black',
    marginBottom: 2,
  },
  time: {
    fontWeight: '500',
    color: 'black',
    marginBottom: 2,
  },
  notes: {
    fontWeight: '500',
    color: 'black',
    marginBottom: 5,
  },
  infoText: {
    fontWeight: '500',
    color: '#666',
  },
  actions: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginVertical: 5,
    borderRadius: 30,
    width: 130,
    justifyContent: 'center',
  },
  completeButton: {
    backgroundColor: '#4caf50',
  },
  deleteButton: {
    backgroundColor: '#ff5252',
  },
  actionIcon: {
    marginRight: 8,
  },
  actionText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default TodoItem;
