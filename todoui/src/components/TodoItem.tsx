import type { Todo } from "../types/todo";

export default function TodoItem({ todo, onDelete, onEdit, onToggleComplete }:
  { todo: Todo; onDelete: () => void; onEdit: () => void; onToggleComplete: () => void; }) {

  const due = todo.dueDate ? new Date(todo.dueDate).toLocaleDateString() : "No date";

  return (
    <div className={`card mb-2 ${todo.isCompleted ? "border-success" : ""}`}>
      <div className="card-body d-flex justify-content-between align-items-start">
        <div>
          <h5 className={`card-title ${todo.isCompleted ? "text-decoration-line-through" : ""}`}>{todo.title}</h5>
          <p className="small text-muted mb-0">Due: {due}</p>
        </div>

        <div className="btn-group-vertical">
          <button className="btn btn-outline-success btn-sm" onClick={onToggleComplete}>{todo.isCompleted ? "Undo" : "Done"}</button>
          <button className="btn btn-outline-primary btn-sm" onClick={onEdit}>Edit</button>
          <button className="btn btn-outline-danger btn-sm" onClick={onDelete}>Delete</button>
        </div>
      </div>
    </div>
  );
}