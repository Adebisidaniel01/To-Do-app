const express = require("express");
const Task = require("../models/Task");
const ensureAuth = require("../middleware/auth");

const router = express.Router();

// Dashboard (show tasks)
router.get("/dashboard", ensureAuth, async (req, res) => {
  const tasks = await Task.find({ userId: req.user.id });
  res.render("dashboard", { user: req.user, tasks });
});

// Add task
router.post("/tasks", ensureAuth, async (req, res) => {
  await Task.create({ title: req.body.title, description: req.body.description, userId: req.user.id });
  res.redirect("/dashboard");
});

// Delete task
router.post("/tasks/:id/delete", ensureAuth, async (req, res) => {
  await Task.findOneAndDelete({ _id: req.params.id, userId: req.user.id });
  res.redirect("/dashboard");
});

module.exports = router;
