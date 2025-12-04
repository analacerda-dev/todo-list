import { useState, useEffect } from 'react';
import { Todo, DayOfWeek, FilterType, DAYS_OF_WEEK } from '@/types/todo';

const STORAGE_KEY = 'weekly-planner-todos';

export const useTodoList = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [currentDay, setCurrentDay] = useState<DayOfWeek>('Segunda');
  const [filter, setFilter] = useState<FilterType>('all');

  // Load from localStorage
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        setTodos(JSON.parse(stored));
      } catch (error) {
        console.error('Error loading todos:', error);
      }
    }
  }, []);

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
  }, [todos]);

  const addTodo = (text: string, day: DayOfWeek) => {
    const trimmedText = text.trim();
    if (!trimmedText) {
      alert('A tarefa não pode estar vazia');
      return false;
    }

    // Check for duplicate
    const duplicate = todos.find(
      (todo) => todo.text.toLowerCase() === trimmedText.toLowerCase() && todo.day === day
    );

    if (duplicate) {
      alert('Essa tarefa já existe nesse dia');
      return false;
    }

    const newTodo: Todo = {
      id: crypto.randomUUID(),
      text: trimmedText,
      completed: false,
      day,
    };

    setTodos((prev) => [...prev, newTodo]);
    return true;
  };

  const editTodo = (id: string, newText: string) => {
    const trimmedText = newText.trim();
    if (!trimmedText) {
      alert('A tarefa não pode estar vazia');
      return false;
    }

    const todo = todos.find((t) => t.id === id);
    if (!todo) return false;

    // Check for duplicate (excluding current todo)
    const duplicate = todos.find(
      (t) => t.id !== id && t.text.toLowerCase() === trimmedText.toLowerCase() && t.day === todo.day
    );

    if (duplicate) {
      alert('Essa tarefa já existe nesse dia');
      return false;
    }

    setTodos((prev) => prev.map((todo) => (todo.id === id ? { ...todo, text: trimmedText } : todo)));
    return true;
  };

  const toggleTodo = (id: string) => {
    setTodos((prev) =>
      prev.map((todo) => (todo.id === id ? { ...todo, completed: !todo.completed } : todo))
    );
  };

  const deleteTodo = (id: string) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };

  const moveTodoToDay = (id: string, newDay: DayOfWeek) => {
    const todo = todos.find((t) => t.id === id);
    if (!todo) return;

    // Check for duplicate in target day
    const duplicate = todos.find(
      (t) => t.id !== id && t.text.toLowerCase() === todo.text.toLowerCase() && t.day === newDay
    );

    if (duplicate) {
      alert('Essa tarefa já existe nesse dia');
      return;
    }

    setTodos((prev) => prev.map((t) => (t.id === id ? { ...t, day: newDay } : t)));
  };

  const replicateToAllDays = (id: string) => {
    const todo = todos.find((t) => t.id === id);
    if (!todo) return;

    const newTodos: Todo[] = [];

    DAYS_OF_WEEK.forEach((day) => {
      if (day === todo.day) return;

      // Check if already exists
      const exists = todos.find(
        (t) => t.text.toLowerCase() === todo.text.toLowerCase() && t.day === day
      );

      if (!exists) {
        newTodos.push({
          id: crypto.randomUUID(),
          text: todo.text,
          completed: false,
          day,
        });
      }
    });

    if (newTodos.length > 0) {
      setTodos((prev) => [...prev, ...newTodos]);
    }
  };

  const getTodosForDay = (day: DayOfWeek) => {
    return todos.filter((todo) => todo.day === day);
  };

  const getFilteredTodos = (day: DayOfWeek) => {
    let filtered = getTodosForDay(day);

    switch (filter) {
      case 'pending':
        filtered = filtered.filter((todo) => !todo.completed);
        break;
      case 'completed':
        filtered = filtered.filter((todo) => todo.completed);
        break;
    }

    return filtered;
  };

  return {
    todos,
    currentDay,
    setCurrentDay,
    filter,
    setFilter,
    addTodo,
    editTodo,
    toggleTodo,
    deleteTodo,
    moveTodoToDay,
    replicateToAllDays,
    getTodosForDay,
    getFilteredTodos,
  };
};
