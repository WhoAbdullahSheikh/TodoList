import React, { createContext, useState, useContext } from 'react';

const TodoContext = createContext();

export const useTodoContext = () => {
  return useContext(TodoContext);
};

export const TodoProvider = ({ children }) => {
  const [todos, setTodos] = useState([]);
  const [completedTodos, setCompletedTodos] = useState([]);

  const addTodo = (newTask) => {
    const newTodo = { id: Math.random().toString(), ...newTask };
    setTodos((prevTodos) => [...prevTodos, newTodo]);
  };

  const completeTodo = (id) => {
    const completedTodo = todos.find(todo => todo.id === id);
    if (completedTodo) {
      setTodos(todos.filter(todo => todo.id !== id));
      setCompletedTodos((prevCompletedTodos) => [...prevCompletedTodos, completedTodo]);
    }
  };

  const deleteTodo = (id) => {
    setTodos((prevTodos) => prevTodos.filter(todo => todo.id !== id));
    setCompletedTodos((prevCompletedTodos) => prevCompletedTodos.filter(todo => todo.id !== id));
  };

  return (
    <TodoContext.Provider value={{ todos, completedTodos, addTodo, completeTodo, deleteTodo }}>
      {children}
    </TodoContext.Provider>
  );
};
