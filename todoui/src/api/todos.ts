import type { Todo } from "../types/todo";
const API_BASE = import.meta.env.VITE_API_URL;
const API = `${API_BASE}/todos`;

// Fetch all todos
export async function getTodos(): Promise<Todo[]> {
    const response = await fetch(API);
    return response.json();
}

// post Create 
export async function addTodo(todo: Omit<Todo, 'id'>): Promise<Todo> {
    const response = await fetch(API, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(todo)
    });
    return response.json();
}

// PUT Update todo
export async function updateTodo(id: number, todo: Omit<Todo, 'id'>): Promise<Todo> {
    const response = await fetch(`${API}/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(todo)
    });
    return response.json();
}
// DELETE Todo
export async function deleteTodo(id: number): Promise<void> {
    await fetch(`${API}/${id}`, {
        method: 'DELETE'
    });
}