import React, { useState, useCallback, useMemo } from 'react';
import styles from './App.module.css';
import classnames from 'classnames';

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}
type Filter = 'All' | 'Active' | 'Completed';

const TodoMVC: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState('');
  const [filter, setFilter] = useState<Filter>('All');

  const addTodo = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter' && newTodo.trim()) {
        setTodos((prev) => [...prev, { id: Date.now(), text: newTodo.trim(), completed: false }]);
        setNewTodo('');
      }
    },
    [newTodo],
  );

  const toggleTodo = useCallback((id: number) => {
    setTodos((prev) =>
      prev.map((todo) => (todo.id === id ? { ...todo, completed: !todo.completed } : todo)),
    );
  }, []);

  const deleteTodo = useCallback((id: number) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  }, []);

  const filterTodos = useMemo(
    () =>
      todos.filter((todo) => {
        if (filter === 'Active') return !todo.completed;
        if (filter === 'Completed') return todo.completed;
        return true;
      }),
    [todos, filter],
  );

  const itemLeft = useMemo(() => todos.filter((todo) => !todo.completed).length, [todos]);

  const TodoItem = useCallback(
    ({ todo }: { todo: Todo }) => {
      return (
        <li className={styles.todoItem}>
          <input
            type="checkbox"
            checked={todo.completed}
            onChange={() => toggleTodo(todo.id)}
            className={styles.todoCheckbox}
          />
          <span className={classnames(styles.todoText && todo.completed ? styles.completed : '')}>
            {todo.text}
          </span>
          <button className={styles.deleteButton} onClick={() => deleteTodo(todo.id)}>
            x
          </button>
        </li>
      );
    },
    [toggleTodo, deleteTodo],
  );
  return (
    <div className={styles.todoApp}>
      <h1 className={styles.title}>TODOS</h1>
      <input
        className={styles.newTodo}
        placeholder="What needs to be done?"
        value={newTodo}
        onChange={(e) => setNewTodo(e.target.value)}
        onKeyDown={addTodo}
      />
      <ul className={styles.todoList}>
        {filterTodos.map((todo) => (
          <TodoItem key={todo.id} todo={todo} />
        ))}
      </ul>
      <div className={styles.footer}>
        <span>
          {itemLeft} item{itemLeft !== 1 ? 's' : ''} left
        </span>
        <div>
          {(['All', 'Active', 'Completed'] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={classnames(styles.filterButton, filter === f && styles.selected)}
            >
              {f}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TodoMVC;
