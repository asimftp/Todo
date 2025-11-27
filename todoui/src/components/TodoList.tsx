import { useEffect, useState } from 'react';
import type { Todo } from '../types/todo';
import { getTodos, addTodo, updateTodo, deleteTodo } from '../api/todos';
import TodoItem from './TodoItem';
import TodoForm from './TodoForm';

export default function TodoList() {
    const [todos, setTodos] = useState<Todo[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [editing, setEditing] = useState<Todo | null>(null);

    useEffect(() => { load(); }, []);
    async function load() {
        try {
            setLoading(true);
            const data = await getTodos();
            setTodos(data);
        } catch (err: any) {
            setError(err.message || 'Failed to load todos.');
        } finally {
            setLoading(false);
        }
    }
    async function handleAdd(form: Omit<Todo, 'id'>) {
        try {
            const newTodo = await addTodo(form);
            setTodos(prev => [...prev, newTodo]);
        } catch (err: any) {
            alert(err.message || 'Failed to add todo.');
        }
    }
    async function handleUpdate(id: number, form: Omit<Todo, 'id'>) {
        try {
            const updatedTodo = await updateTodo(id, form);
            setTodos(prev => prev.map(t => t.id === id ? updatedTodo : t));
            setEditing(null);
        } catch (err: any) {
            alert(err.message || 'Failed to update todo.');
        }
    }
    async function handleDelete(id: number) {
        if (!confirm('Are you sure you want to delete this todo?')) return;
        try {
            await deleteTodo(id);
            setTodos(prev => prev.filter(t => t.id !== id));
        } catch (err: any) {
            alert(err.message || 'Failed to delete todo.');
        }
    }

    async function handleToggleComplete(todo: Todo) {
        const payload: Omit<Todo, 'id'> = {
            title: todo.title,
            isCompleted: !todo.isCompleted,
            dueDate: todo.dueDate
        };
        await handleUpdate(todo.id, payload);
    }

    return (
        <div>
            <div className="card mb-3">
                <div className="card-body">
                    <TodoForm onSubmit={handleAdd}
                        initial={
                            {
                                title: '',
                                isCompleted: false,
                                dueDate: ''
                            } as Omit<Todo, 'id'>
                        }
                        submitLabel="Add Todo"
                    />
                </div>
            </div>
            {loading && <div className="text-muted">Loading...</div>}
            {error && <div className="alert alert-danger">Error: {error}</div>}

            <div>
                {todos.length === 0 && !loading ? <p className="text-muted">No todos found.</p> : null}
                {todos.map(todo => (
                    <TodoItem
                        key={todo.id}
                        todo={todo}
                        onDelete={() => handleDelete(todo.id)}
                        onEdit={() => setEditing(todo)}
                        onToggleComplete={() => handleToggleComplete(todo)}
                    />
                ))}
            </div>
            {editing && (
                <div className='card mb-3'>
                    <div className='card-body'>
                        <h5 className='card-title'>Edit Todo</h5>
                        <TodoForm
                            onSubmit={(form: any) => handleUpdate(editing.id, form)}
                            initial={{
                                title: editing.title,
                                isCompleted: editing.isCompleted,
                                dueDate: editing.dueDate
                            }}
                            submitLabel="Update Todo"
                            onCancel={() => setEditing(null)}
                        />
                    </div>
                </div>
            )}
        </div>
    );
}