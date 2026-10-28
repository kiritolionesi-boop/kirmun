export default function tasksReducer(tasks, action) {
  switch (action.type) {
    case 'add':
      return [...tasks, action.task];

    case 'toggle':
      return tasks.map((task) =>
        task.id === action.id
          ? { ...task, completed: !task.completed }
          : task
      );

    case 'remove':
      return tasks.filter((task) => task.id !== action.id);

    case 'rename':
      return tasks.map((task) =>
        task.id === action.id
          ? { ...task, text: action.text }
          : task
      );

    default:
      return tasks;
  }
}