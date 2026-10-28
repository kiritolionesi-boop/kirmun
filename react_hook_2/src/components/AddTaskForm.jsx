import { useId, useRef } from 'react';

export default function AddTaskForm({ onAdd }) {
  const inputRef = useRef(null);
  const inputId = useId();

  function handleSubmit(event) {
    event.preventDefault();
    const text = inputRef.current.value.trim();

    if (!text) return;

    onAdd(text);
    inputRef.current.value = '';
    inputRef.current.focus();
  }

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor={inputId}>Новая задача</label>
      <input id={inputId} ref={inputRef} />
      <button type="submit">Добавить</button>
    </form>
  );
}