"use client";

import styles from "../page.module.css";
import api from "../../lib/axios";
import { useState } from "react";

function TaskCard({ tasks, setTasks }) {
  const [editingId, setEditingId] = useState(null); // which tasks should we edited
  const [editTitle, setEditTitle] = useState(""); // edit title

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
      setEditingId(null);
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

  return (
    <>
    {!tasks.length && <h2 style={{textAlign: "center"}}>{"There are no Tasks yet"}</h2>}
    <ul className={styles.taskList}>
      {tasks.map((t) => (
        <li key={t.id} className={styles.taskItem}>
          {editingId === t.id ? (
            <>
              <input
                type="text"
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
                className={styles.editInput}
              />
              <div className={styles.buttonGroup}>
                <button
                  onClick={() => handleSaveEdit(t)}
                  className={`${styles.btn} ${styles.btnComplete}`}
                >
                  Save
                </button>
                <button
                  onClick={() => setEditingId(null)}
                  className={`${styles.btn} ${styles.btnUndo}`}
                >
                  Cancel
                </button>
              </div>
            </>
          ) : (
            <>
              <span
                className={`${styles.taskTitle} ${t.is_completed ? styles.completedTask : ""}`}
              >
                {t.title}
              </span>

              <div className={styles.buttonGroup}>
                <button
                  onClick={() => handleToggleComplete(t)}
                  className={`${styles.btn} ${t.is_completed ? styles.btnUndo : styles.btnComplete}`}
                >
                  {t.is_completed ? "Undo" : "Complete"}
                </button>

                <button
                  onClick={() => {
                    setEditingId(t.id);
                    setEditTitle(t.title);
                  }}
                  className={`${styles.btn} ${styles.btnEdit}`}
                >
                  Edit
                </button>

                <button
                  onClick={() => handleDelete(t.id)}
                  className={`${styles.btn} ${styles.btnDelete}`}
                >
                  Delete
                </button>
              </div>
            </>
          )}
        </li>
      ))}
    </ul>
    </>
  );
}

export default TaskCard;
