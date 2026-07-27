import express from 'express';
import { createTask, getTasks, updateTask, deleteTask } from '../logic/tasks.js';
import verifyToken from "../Middleware/verifyToken.js"


const router = express.Router();

// createTask
router.post("/", verifyToken, createTask)

// getTasks
router.get("/all", verifyToken, getTasks)

// updateTask
router.put("/:id", verifyToken, updateTask)

// deleteTask
router.delete("/:id", verifyToken, deleteTask)

export default router;