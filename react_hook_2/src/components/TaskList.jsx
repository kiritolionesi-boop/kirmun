import TaskItem from './TaskItem';

export default function TaskList({
  tasks,
  onToggle,
  onRemove,
  onRename,
}) {
  if (tasks.length === 0) {
    return <p>Пока нет задач. Добавьте первую!</p>;
  }

  return (
    <ul>
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onToggle={onToggle}
          onRemove={onRemove}
          onRename={onRename}
        />
      ))}
    </ul>
  );
}