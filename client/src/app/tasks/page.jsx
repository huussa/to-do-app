"use client";

import styles from "./page.module.css";
import api from "../lib/axios";
import { useState, useEffect } from "react";

function TasksPage() {
  const [tasks, setTasks] = useState([]);
  const [task, setTask] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [editingId, setEditingId] = useState(null); // which tasks should we edited
  const [editTitle, setEditTitle] = useState(""); // edit title

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");

        const response = await api.get("tasks/all", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setTasks(response.data);
      } catch (error) {
        setError({ message: error });
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [tasks]);

  const addTask = async (e) => {
    e.preventDefault();
    setError("");

    if (!task) return;

    try {
      const token = localStorage.getItem("token");

      const response = await api.post(
        "tasks",
        { title: task },
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );
      setTasks([...tasks, response.data.task]);

      setTask("");
    } catch (error) {
      setError(error.response?.data?.message || "Wrong Email or Password");
    }
  };

  const handleToggleComplete = async (task) => {
    try {
      const token = localStorage.getItem("token");
      const response = await api.put(
        `/tasks/${task.id}`,
        { title: task.title, is_completed: !task.is_completed },
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );
      setTasks(
        tasks.map((item) => (item === task.id ? response.data.task : item)),
      );
    } catch (error) {
      console.error(error);
    }
  };

  const handleSaveEdit = async (task) => {
    try {
      const token = localStorage.getItem("token");
      const response = await api.put(
        `/tasks/${task.id}`,
        { title: editTitle, is_completed: task.is_completed },
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );
      setTasks(
        tasks.map((item) => (item === task.id ? response.data.task : item)),
      );
      setEditingId(null)
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem("token");
      await api.delete(`/tasks/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTasks(tasks.filter((task) => task.id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  if (loading) return <p>Loading Tasks</p>;

  return (
    <div className={styles.tasksWrapper}>
      <h1 className={styles.title}>TO DO List</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <ul>
        {tasks.map((t) => (
          <li
            key={t.id}
            style={{ display: "flex", gap: "10px", marginBottom: "10px" }}
          >
            {editingId === t.id ? (
              <>
                <input
                  type="text"
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                />
                <button onClick={() => handleSaveEdit(t)}>Save</button>
                <button onClick={() => setEditingId(null)}>Cancel</button>
              </>
            ) : (
              <>
                <span
                  style={{
                    textDecoration: t.is_completed ? "line-through" : "none",
                  }}
                >
                  {t.title}
                </span>

                <button onClick={() => handleToggleComplete(t)}>
                  {t.is_completed ? "Undo" : "Complete"}
                </button>

                <button
                  onClick={() => {
                    setEditingId(t.id);
                    setEditTitle(t.title);
                  }}
                >
                  Edit
                </button>

                <button onClick={() => handleDelete(t.id)}>Delete</button>
              </>
            )}
          </li>
        ))}
      </ul>
      <form onSubmit={addTask}>
        <input
          type="text"
          placeholder="Enter a Task"
          value={task}
          onChange={(e) => setTask(e.target.value)}
        />
        <button type="submit">add</button>
      </form>
    </div>
  );
}

export default TasksPage;
