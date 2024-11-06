import { backend } from "declarations/backend";

let todos = [];
const todoForm = document.getElementById('todoForm');
const todoInput = document.getElementById('todoInput');
const todoList = document.getElementById('todoList');
const loadingSpinner = document.getElementById('loadingSpinner');

// Show/hide loading spinner
const toggleLoading = (show) => {
    loadingSpinner.classList.toggle('d-none', !show);
};

// Render todos
const renderTodos = () => {
    todoList.innerHTML = todos
        .sort((a, b) => b.id - a.id)
        .map(todo => `
            <li class="list-group-item d-flex justify-content-between align-items-center">
                <div class="form-check">
                    <input class="form-check-input" type="checkbox" 
                        ${todo.completed ? 'checked' : ''}
                        onchange="window.toggleTodo(${todo.id})"
                    >
                    <label class="form-check-label ${todo.completed ? 'text-decoration-line-through' : ''}">
                        ${todo.text}
                    </label>
                </div>
                <button class="btn btn-danger btn-sm" onclick="window.deleteTodo(${todo.id})">
                    Delete
                </button>
            </li>
        `).join('');
};

// Load todos
const loadTodos = async () => {
    try {
        toggleLoading(true);
        todos = await backend.getAllTodos();
        renderTodos();
    } catch (error) {
        console.error('Error loading todos:', error);
    } finally {
        toggleLoading(false);
    }
};

// Add todo
todoForm.onsubmit = async (e) => {
    e.preventDefault();
    const text = todoInput.value.trim();
    if (!text) return;

    try {
        toggleLoading(true);
        const newTodo = await backend.createTodo(text);
        todos.push(newTodo);
        renderTodos();
        todoInput.value = '';
    } catch (error) {
        console.error('Error creating todo:', error);
    } finally {
        toggleLoading(false);
    }
};

// Toggle todo completion
window.toggleTodo = async (id) => {
    try {
        toggleLoading(true);
        const updatedTodo = await backend.toggleTodo(id);
        if (updatedTodo) {
            todos = todos.map(todo => 
                todo.id === id ? updatedTodo : todo
            );
            renderTodos();
        }
    } catch (error) {
        console.error('Error toggling todo:', error);
    } finally {
        toggleLoading(false);
    }
};

// Delete todo
window.deleteTodo = async (id) => {
    try {
        toggleLoading(true);
        const success = await backend.deleteTodo(id);
        if (success) {
            todos = todos.filter(todo => todo.id !== id);
            renderTodos();
        }
    } catch (error) {
        console.error('Error deleting todo:', error);
    } finally {
        toggleLoading(false);
    }
};

// Initial load
loadTodos();
