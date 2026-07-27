import pool from "../config/db.js";

export const createTask = async (req, res) => {
  try {
    const { title, description } = req.body;
    const user_id = req.user.id;

    if (!title) {
      return res.status(400).json({ message: "Should Name the Task" });
    }

    const newTask = await pool.query(
      "INSERT INTO tasks (user_id, title, description) VALUES ($1, $2, $3) RETURNING *",
      [user_id, title, description],
    );

    res.status(201).json({ message: "Task Added", task: newTask.rows[0] });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Error in Server" });
  }
};

export const getTasks = async (req, res) => {
  try {
    const user_id = req.user.id;

    const tasks = await pool.query(
      "SELECT * FROM tasks WHERE user_id = $1 ORDER BY created_at DESC",
      [user_id],
    );

    res.status(200).json(tasks.rows);
  } catch (error) {
    console.error("Get Tasks Error:", error);
    res.status(500).json({ message: "Error in Server" });
  }
};

export const updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, is_completed } = req.body;
    const user_id = req.user.id;

    // update task
    const updatedTask = await pool.query(
      "UPDATE tasks SET title = $1, description = $2, is_completed = $3 WHERE id = $4 AND user_id = $5 RETURNING *",
      [title, description, is_completed, id, user_id],
    );

    if (updatedTask.rows.length <= 0) {
      return res.status(404).json({ message: "Task is not Exists" });
    }
    res.status(200).json({ message: "Task has been Updated Successfully :)" });
  } catch (error) {
    console.error("Get Tasks Error:", error);
    res.status(500).json({ message: "Error in Server" });
  }
};

export const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;
    const user_id = req.user.id;

    const deletedTask = await pool.query(
      "DELETE FROM tasks WHERE id = $1 AND user_id = $2 RETURNING *",
      [id, user_id],
    );
    if (deletedTask.rows.length <= 0) {
      return res.status(404).json({ message: "Task is not Exists" });
    }
    res.status(200).json({ message: "Task has been Deleted Successfully :)" });
  } catch (error) {
    console.error("Get Tasks Error:", error);
    res.status(500).json({ message: "Error in Server" });
  }
};
