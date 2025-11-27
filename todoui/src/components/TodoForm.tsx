import React, { useEffect, useState } from "react";
import type { Todo } from "../types/todo";

type FormProps = {
    initial: Omit<Todo, "id">;
    onSubmit: (payload: Omit<Todo, "id">) => void | Promise<void>;
    submitLabel?: string;
    onCancel?: () => void;
};

export default function TodoForm({ initial, onSubmit, submitLabel = "Save", onCancel }: FormProps) {
    const [title, setTitle] = useState(initial.title ?? "");
    const [dueDate, setDueDate] = useState<string>(initial.dueDate ? toInputDate(initial.dueDate) : "");
    const [isCompleted, setIsCompleted] = useState<boolean>(!!initial.isCompleted);
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        setTitle(initial.title ?? "");
        setDueDate(initial.dueDate ? toInputDate(initial.dueDate) : "");
        setIsCompleted(!!initial.isCompleted);
    }, [initial]);

    function toInputDate(dateStr: string | null) {
        if (!dateStr) return "";
        const d = new Date(dateStr);
        if (isNaN(d.getTime())) return "";
        const yyyy = d.getFullYear();
        const mm = String(d.getMonth() + 1).padStart(2, "0");
        const dd = String(d.getDate()).padStart(2, "0");
        return `${yyyy}-${mm}-${dd}`;
    }

    function toISODate(dateInput: string) {
        if (!dateInput) return null;
        const d = new Date(dateInput + "T00:00:00");
        return d.toISOString();
    }

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        if (!title.trim()) return alert("Title required");
        setSubmitting(true);
        try {
            const payload: Omit<Todo, "id"> = {
                title: title.trim(),
                isCompleted,
                dueDate: toISODate(dueDate)
            };
            await onSubmit(payload);

            if (!("id" in (initial as any))) {
                setTitle("");
                setDueDate("");
                setIsCompleted(false);
            }
        } finally {
            setSubmitting(false);
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <div className="row g-2">
                <div className="col-md-6">
                    <input
                        className="form-control"
                        value={title}
                        onChange={e => setTitle(e.target.value)}
                        placeholder="Title"
                    />
                </div>
                <div className="col-md-3">
                    <input
                        className="form-control"
                        type="date"
                        value={dueDate}
                        onChange={e => setDueDate(e.target.value)}
                    />
                </div>
                <div className="col-md-3 d-flex align-items-center">
                    <div className="form-check">
                        <input
                            className="form-check-input"
                            id={`completed-${Math.random()}`}
                            type="checkbox"
                            checked={isCompleted}
                            onChange={e => setIsCompleted(e.target.checked)}
                        />
                        <label className="form-check-label">Completed</label>
                    </div>
                </div>

                <div className="col-12 d-flex gap-2 mt-2">
                    <button
                        className="btn btn-primary"
                        type="submit"
                        disabled={submitting}>{submitLabel}
                    </button>
                    {onCancel && <button
                        type="button"
                        className="btn btn-secondary"
                        onClick={onCancel}>Cancel
                    </button>}
                </div>
            </div>
        </form>
    );
}