const todoForm = document.getElementById('todoForm');
const todoInput = document.getElementById('todoInput');
const todoList = document.getElementById('todoList');
const errorMessage = document.getElementById('errorMessage');

const STORAGE_KEY = 'todos';
let todos = [];
let draggedItem = null;

// Initialize app
document.addEventListener('DOMContentLoaded', () => {
    loadTodos();
    renderTodos();
});

// Form submission
todoForm.addEventListener('submit', (e) => {
    e.preventDefault();
    addTodo();
});

// Validation function
function validateTodo(text) {
    const errors = [];
    
    if (!text || text.trim().length < 3) {
        errors.push('Todo must have at least 3 characters');
    }
    
    if (text && text.length > 0 && text[0] !== text[0].toUpperCase()) {
        errors.push('Todo must start with a capital letter');
    }
    
    return errors;
}

// Add todo
function addTodo() {
    const text = todoInput.value.trim();
    const errors = validateTodo(text);
    
    if (errors.length > 0) {
        errorMessage.textContent = errors.join('. ');
        return;
    }
    
    errorMessage.textContent = '';
    
    const newTodo = {
        id: Date.now(),
        text: text,
        createdAt: new Date().toISOString()
    };
    
    todos.push(newTodo);
    saveTodos();
    renderTodos();
    todoInput.value = '';
    todoInput.focus();
}

// Delete todo
function deleteTodo(id) {
    todos = todos.filter(todo => todo.id !== id);
    saveTodos();
    renderTodos();
}

// Save todos to localStorage
function saveTodos() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
}

// Load todos from localStorage
function loadTodos() {
    const stored = localStorage.getItem(STORAGE_KEY);
    todos = stored ? JSON.parse(stored) : [];
}

// Render todos
function renderTodos() {
    if (todos.length === 0) {
        todoList.innerHTML = '<li class="list-group-item text-muted text-center">No todos yet. Add one to get started!</li>';
        return;
    }
    
    todoList.innerHTML = todos.map((todo, index) => `
        <li class="list-group-item todo-item" draggable="true" data-id="${todo.id}">
            <span class="todo-text">${escapeHtml(todo.text)}</span>
            <div class="todo-controls">
                <button class="btn btn-sm btn-secondary btn-drag" title="Drag to reorder">⋮</button>
                <button class="btn btn-sm btn-danger btn-delete" onclick="deleteTodo(${todo.id})">Delete</button>
            </div>
        </li>
    `).join('');
    
    // Add drag event listeners
    const items = todoList.querySelectorAll('.todo-item');
    items.forEach(item => {
        item.addEventListener('dragstart', handleDragStart);
        item.addEventListener('dragover', handleDragOver);
        item.addEventListener('drop', handleDrop);
        item.addEventListener('dragend', handleDragEnd);
        item.addEventListener('dragleave', handleDragLeave);
    });
}

// Drag and drop handlers
function handleDragStart(e) {
    draggedItem = this;
    this.style.opacity = '0.5';
    e.dataTransfer.effectAllowed = 'move';
}

function handleDragOver(e) {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    this.classList.add('drag-over');
}

function handleDragLeave(e) {
    this.classList.remove('drag-over');
}

function handleDrop(e) {
    e.preventDefault();
    
    if (draggedItem !== this) {
        const draggedId = parseInt(draggedItem.dataset.id);
        const targetId = parseInt(this.dataset.id);
        
        const draggedIndex = todos.findIndex(t => t.id === draggedId);
        const targetIndex = todos.findIndex(t => t.id === targetId);
        
        // Swap todos
        [todos[draggedIndex], todos[targetIndex]] = [todos[targetIndex], todos[draggedIndex]];
        
        saveTodos();
        renderTodos();
    }
}

function handleDragEnd(e) {
    this.style.opacity = '1';
    const items = todoList.querySelectorAll('.todo-item');
    items.forEach(item => item.classList.remove('drag-over'));
    draggedItem = null;
}

// Escape HTML to prevent XSS
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}