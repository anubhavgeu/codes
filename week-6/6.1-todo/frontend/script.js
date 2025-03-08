import { response } from "express";

const API_URL = 'http://localhost:3000/todos';

// Fetch existing todos when the page loads
document.addEventListener('DOMContentLoaded', () => {
  // fetch todos
});

// Fetch todos from backend
async function fetchTodos() {
    //  write here
    const todos = fetch(API_URL)
                    .then(response => response.json())
                    .then(todos => {
                        todos.forEach(todo => {
                            addTodoToDOM(todo);
                        });
                    })
                    .catch(error => console.error('Error fetching todos:', error));
}

// Add a new todo to the DOM
function addTodoToDOM(todo) {
    //  write here
}

// Add a new todo
document.getElementById('add-todo-btn').addEventListener('click', () => {
    //  write here
});

// Toggle todo completion
function toggleTodo(id, completed) {
//    write here
}

// Delete a todo
function deleteTodo(id) {
    // write here  
}