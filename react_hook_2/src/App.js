import { useReducer, useCallback, useMemo, useState } from 'react';
import tasksReducer from './tasksReducer';
import AddTaskForm from './components/AddTaskForm';
import TaskList from './components/TaskList';
import ThemeToggle from './components/ThemeToggle';
import { useTheme } from './ThemeContext';
import './App.css';

export default function App() {
  const [tasks, dispatch] = useReducer(tasksReducer, []);
  const [filter, setFilter] = useState('all');
  const { theme } = useTheme();

  const handleAdd = useCallback((text) => {
    dispatch({
      type: 'add',
      task: {
        id: Date.now(),
        text,
        completed: false,
      },
    });
  }, []);

  const handleToggle = useCallback((id) => {
    dispatch({ type: 'toggle', id });
  }, []);

  const handleRemove = useCallback((id) => {
    dispatch({ type: 'remove', id });
  }, []);

  const handleRename = useCallback((id, text) => {
  dispatch({ type: 'rename', id, text });
}, []);

  const visibleTasks = useMemo(() => {
    if (filter === 'active') {
      return tasks.filter((task) => !task.completed);
    }
    if (filter === 'completed') {
      return tasks.filter((task) => task.completed);
    }
    return tasks;
  }, [tasks, filter]);

  const completedCount = useMemo(
    () => tasks.filter((task) => task.completed).length,
    [tasks]
  );

  return (
    <main
      style={{
        minHeight: '100vh',
        padding: '30px',
        background: theme === 'dark' ? '#222' : '#fff',
        color: theme === 'dark' ? '#fff' : '#222',
      }}
    >
      <ThemeToggle />
      <h1>Менеджер задач</h1>

      <AddTaskForm onAdd={handleAdd} />

      <div style={{ margin: '20px 0' }}>
        <button onClick={() => setFilter('all')}>Все</button>{' '}
        <button onClick={() => setFilter('active')}>Активные</button>{' '}
        <button onClick={() => setFilter('completed')}>Готовые</button>
      </div>

      <p>
        Всего: {tasks.length}, выполнено: {completedCount}
      </p>

      <TaskList
        tasks={visibleTasks}
        onToggle={handleToggle}
        onRemove={handleRemove}
        onRename={handleRename}
      />
    </main>
  );
}