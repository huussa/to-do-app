"use client";

import styles from "./page.module.css";
import api from "../lib/axios";
import { useState, useEffect } from "react";
import TaskCard from "./components/task-card";

function TasksPage() {
  const [tasks, setTasks] = useState([]);
  const [task, setTask] = useState("");
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
  }, [tasks]);

  const addTask = async (e) => {
    e.preventDefault();
    setError("");

    if (!task){
      setError("Enter a name for the Task")
      return;
    }

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

  if (loading) return <p>Loading Tasks</p>;

  return (
    <div className={styles.tasksWrapper}>
      <h1 className={styles.title}>TO DO List</h1>

      {error && <p className={styles.errorMessage}>{error}</p>}

      <TaskCard tasks={tasks} setTasks={setTasks} />

      <form className={styles.addForm} onSubmit={addTask}>
        <input
          className={styles.addInput}
          type="text"
          placeholder="Enter a new task..."
          value={task}
          onChange={(e) => setTask(e.target.value)}
        />
        <button className={styles.addBtn} type="submit">
          Add
        </button>
      </form>
    </div>
  );
}

export default TasksPage;
