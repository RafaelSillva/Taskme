import asyncHandler from "express-async-handler";
import TaskModel from "../../models/tasks/TaskModel.js";

export const createTask = asyncHandler(async (req, res) => {
  const { title, description, dueDate, priority, status } = req.body;

  if (!title || title.trim() === "") {
    return res.status(400).json({ message: "Title is required!" });
  }

  if (!description || description.trim() === "") {
    return res.status(400).json({ message: "Description is required!" });
  }

  try {
    const task = new TaskModel({
      title,
      description,
      dueDate,
      priority,
      status,
      user: req.user._id,
    });

    await task.save();
    res.status(201).json(task);
  } catch (error) {
    console.error("Error in createTask:", error.message);
    res.status(500).json({ message: "Error creating task" });
  }
});

export const getTasks = asyncHandler(async (req, res) => {
  const userId = req.user?._id;

  if (!userId) {
    return res.status(400).json({ message: "User not found!" });
  }

  try {
    const tasks = await TaskModel.find({ user: userId });
    res.status(200).json({ length: tasks.length, tasks });
  } catch (error) {
    console.error("Error in getTasks:", error.message);
    res.status(500).json({ message: "Error retrieving tasks" });
  }
});

export const getTask = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const userId = req.user?._id;

  if (!id) {
    return res.status(400).json({ message: "Please provide a task id" });
  }

  try {
    const task = await TaskModel.findById(id);

    if (!task) {
      return res.status(404).json({ message: "Task not found!" });
    }

    if (!task.user.equals(userId)) {
      return res.status(403).json({ message: "Not authorized!" });
    }

    res.status(200).json(task);
  } catch (error) {
    console.error("Error in getTask:", error.message);
    res.status(500).json({ message: "Error retrieving task" });
  }
});

export const updateTask = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const userId = req.user?._id;
  const { title, description, dueDate, priority, status, completed } = req.body;

  if (!id) {
    return res.status(400).json({ message: "Please provide a task id" });
  }

  try {
    const task = await TaskModel.findById(id);

    if (!task) {
      return res.status(404).json({ message: "Task not found!" });
    }

    if (!task.user.equals(userId)) {
      return res.status(403).json({ message: "Not authorized!" });
    }

    task.title = title || task.title;
    task.description = description || task.description;
    task.dueDate = dueDate || task.dueDate;
    task.priority = priority || task.priority;
    task.status = status || task.status;
    task.completed = completed || task.completed;

    await task.save();
    res.status(200).json(task);
  } catch (error) {
    console.error("Error in updateTask:", error.message);
    res.status(500).json({ message: "Error updating task" });
  }
});

export const deleteTask = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const userId = req.user?._id;

  if (!id) {
    return res.status(400).json({ message: "Please provide a task id" });
  }

  try {
    const task = await TaskModel.findById(id);

    if (!task) {
      return res.status(404).json({ message: "Task not found!" });
    }

    if (!task.user.equals(userId)) {
      return res.status(403).json({ message: "Not authorized!" });
    }

    await TaskModel.findByIdAndDelete(id);
    res.status(200).json({ message: "Task deleted successfully!" });
  } catch (error) {
    console.error("Error in deleteTask:", error.message);
    res.status(500).json({ message: "Error deleting task" });
  }
});

export const deleteAllTasks = asyncHandler(async (req, res) => {
  const userId = req.user?._id;

  if (!userId) {
    return res.status(400).json({ message: "User not found!" });
  }

  try {
    await TaskModel.deleteMany({ user: userId });
    res.status(200).json({ message: "All tasks deleted successfully!" });
  } catch (error) {
    console.error("Error in deleteAllTasks:", error.message);
    res.status(500).json({ message: "Error deleting all tasks" });
  }
});
