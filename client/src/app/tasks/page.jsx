"use client";

import styles from "./page.module.css";
import api from "../lib/axios";
import { useState, useEffect } from "react";

function TasksPage() {
  const [tasks, setTasks] = useState([]);
  const [task, setTask] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

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
  }, []);

  const addTask = () => {
    e.preventDefault();
    setError("");
  }

  if (loading) return <p>Loading Tasks</p>;

  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div className={styles.tasksWrapper}>
      <h1 className={styles.title}>TO DO List</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>{task.title}</li>
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
