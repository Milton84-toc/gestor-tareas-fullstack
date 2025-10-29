import { Task } from "../models/Task.js";

export async function listTasks(req, res) {
  const items = await Task.findAll({ where: { userId: req.user.id }, order: [["id","DESC"]] });
  res.json(items);
}

export async function createTask(req, res) {
  const { title } = req.body;
  if (!title) return res.status(400).json({ message: "title requerido" });
  const created = await Task.create({ title, userId: req.user.id });
  res.json(created);
}

export async function updateTask(req, res) {
  const { id } = req.params;
  const { title, completed } = req.body;
  const t = await Task.findOne({ where: { id, userId: req.user.id } });
  if (!t) return res.status(404).json({ message: "No encontrada" });
  if (title !== undefined) t.title = title;
  if (completed !== undefined) t.completed = completed;
  await t.save();
  res.json(t);
}

export async function deleteTask(req, res) {
  const { id } = req.params;
  const t = await Task.findOne({ where: { id, userId: req.user.id } });
  if (!t) return res.status(404).json({ message: "No encontrada" });
  await t.destroy();
  res.json({ ok: true });
}
