'use client';

import { useState, useEffect } from 'react';

interface Todo {
  id: number;
  text: string;
  createdAt: string;
}

export default function Home() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [input, setInput] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [draggedItem, setDraggedItem] = useState<number | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  const STORAGE_KEY = 'todos';

  // Load todos from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    setTodos(stored ? JSON.parse(stored) : []);
    setIsLoaded(true);
  }, []);

  // Save todos to localStorage whenever they change
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
    }
  }, [todos, isLoaded]);
  function validateTodo(text: string): string[] {
    const errors: string[] = [];

    if (!text || text.trim().length < 3) {
      errors.push('Todo must have at least 3 characters');
    }

    if (text && text.length > 0 && text[0] !== text[0].toUpperCase()) {
      errors.push('Todo must start with a capital letter');
    }

    return errors;
  }

  // Add todo
  function handleAddTodo(e: React.FormEvent) {
    e.preventDefault();
    const trimmedText = input.trim();
    const errors = validateTodo(trimmedText);

    if (errors.length > 0) {
      setErrorMessage(errors.join('. '));
      return;
    }

    setErrorMessage('');
    const newTodo: Todo = {
      id: Date.now(),
      text: trimmedText,
      createdAt: new Date().toISOString(),
    };

    setTodos([...todos, newTodo]);
    setInput('');
  }

  // Delete todo
  function handleDeleteTodo(id: number) {
    setTodos(todos.filter((todo) => todo.id !== id));
  }

  // Drag and drop handlers
  function handleDragStart(id: number) {
    setDraggedItem(id);
  }

  function handleDragOver(e: React.DragEvent) {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  }

  function handleDrop(e: React.DragEvent, targetId: number) {
    e.preventDefault();

    if (draggedItem !== null && draggedItem !== targetId) {
      const draggedIndex = todos.findIndex((t) => t.id === draggedItem);
      const targetIndex = todos.findIndex((t) => t.id === targetId);

      const newTodos = [...todos];
      [newTodos[draggedIndex], newTodos[targetIndex]] = [
        newTodos[targetIndex],
        newTodos[draggedIndex],
      ];

      setTodos(newTodos);
    }

    setDraggedItem(null);
  }

  function handleDragEnd() {
    setDraggedItem(null);
  }

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <header
        className="text-white text-center py-6 transition-colors duration-300"
        style={{ backgroundColor: 'var(--header-bg)' }}
      >
        <h1 className="text-3xl font-bold">My Todo App</h1>
      </header>

      {/* Main Content */}
      <main
        className="flex-1 container max-w-2xl mx-auto mt-8 px-4 pb-32 transition-colors duration-300"
        style={{ backgroundColor: 'var(--bg-secondary)' }}
      >
        {/* Add Todo Form */}
        <div
          className="rounded-lg shadow-md p-6 mb-6 transition-colors duration-300"
          style={{ backgroundColor: 'var(--card-bg)' }}
        >
          <h2
            className="text-xl font-semibold mb-4 transition-colors duration-300"
            style={{ color: 'var(--text-primary)' }}
          >
            Add New Todo
          </h2>
          <form onSubmit={handleAddTodo}>
            <div className="flex gap-2 mb-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Enter a new todo (min 3 chars, starts with capital letter)"
                className="flex-1 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 transition-colors duration-300"
                style={{
                  backgroundColor: 'var(--input-bg)',
                  color: 'var(--text-primary)',
                  borderColor: 'var(--input-border)',
                  borderWidth: '1px',
                  '--tw-ring-color': 'var(--header-bg)',
                } as React.CSSProperties}
                autoComplete="off"
              />
              <button
                type="submit"
                className="px-6 py-2 text-white rounded-lg hover:opacity-90 transition-opacity font-medium"
                style={{ backgroundColor: 'var(--header-bg)' }}
              >
                Add
              </button>
            </div>
            {errorMessage && (
              <small
                className="block mt-2 transition-colors duration-300"
                style={{ color: 'var(--delete-btn)' }}
              >
                {errorMessage}
              </small>
            )}
          </form>
        </div>

        {/* Todo List */}
        <div
          className="rounded-lg shadow-md p-6 transition-colors duration-300"
          style={{ backgroundColor: 'var(--card-bg)' }}
        >
          <h2
            className="text-xl font-semibold mb-4 transition-colors duration-300"
            style={{ color: 'var(--text-primary)' }}
          >
            Todos
          </h2>
          {todos.length === 0 ? (
            <div
              className="text-center py-8 transition-colors duration-300"
              style={{ color: 'var(--text-secondary)' }}
            >
              No todos yet. Add one to get started!
            </div>
          ) : (
            <ul className="divide-y" style={{ borderColor: 'var(--border-color)' }}>
              {todos.map((todo) => (
                <li
                  key={todo.id}
                  draggable
                  onDragStart={() => handleDragStart(todo.id)}
                  onDragOver={handleDragOver}
                  onDrop={(e) => handleDrop(e, todo.id)}
                  onDragEnd={handleDragEnd}
                  className={`todo-item transition-all duration-200 ${
                    draggedItem === todo.id ? 'opacity-50' : ''
                  } ${draggedItem !== null && draggedItem !== todo.id ? 'drag-over' : ''}`}
                >
                  <span className="todo-text">{todo.text}</span>
                  <div className="todo-controls">
                    <button
                      title="Drag to reorder"
                      className="btn-drag font-bold"
                    >
                      ⋮
                    </button>
                    <button
                      onClick={() => handleDeleteTodo(todo.id)}
                      className="px-3 py-1 text-white rounded hover:opacity-90 transition-opacity text-sm font-medium"
                      style={{ backgroundColor: 'var(--delete-btn)' }}
                    >
                      Delete
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer
        className="fixed bottom-0 left-0 right-0 text-white text-center py-3 transition-colors duration-300"
        style={{ backgroundColor: 'var(--footer-bg)' }}
      >
        <p>&copy; 2026 Todo App</p>
      </footer>
    </div>
  );
}
