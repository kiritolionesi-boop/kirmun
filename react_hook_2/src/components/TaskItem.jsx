import { memo } from 'react';

function TaskItem({ task, onToggle, onRemove, onRename }) {
  console.log('Рисуем задачу:', task.text);
  return (
    <li>
      <label>
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => onToggle(task.id)}
        />
        <span
          style={{
            textDecoration: task.completed ? 'line-through' : 'none',
          }}
        >
          {task.text}
        </span>
      </label>
      <button onClick={() => onRemove(task.id)}>×</button>
      <button
  onClick={() => {
    const text = prompt('Новый текст задачи:', task.text);
    if (text && text.trim()) {
      onRename(task.id, text.trim());
    }
  }}
>
  Редактировать
</button>
    </li>
  );
}

export default memo(TaskItem);