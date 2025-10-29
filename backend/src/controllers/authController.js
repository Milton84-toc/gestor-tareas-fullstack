import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { User } from "../models/User.js";
dotenv.config();

export async function register(req, res) {
  try {
    const { name, email, password } = req.body;
    const exists = await User.findOne({ where: { email } });
    if (exists) return res.status(400).json({ message: "El correo ya existe" });
    const hash = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hash });
    res.json({ id: user.id, name: user.name, email: user.email });
  } catch (e) {
    res.status(500).json({ message: "Error al registrar", error: e.message });
  }
}

export async function login(req, res) {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(400).json({ message: "Credenciales inválidas" });
    const ok = await bcrypt.compare(password, user.password);
    if (!ok) return res.status(400).json({ message: "Credenciales inválidas" });
    const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: "1d" });
    res.json({ token, user: { id: user.id, name: user.name, email: user.email } });
  } catch (e) {
    res.status(500).json({ message: "Error al iniciar sesión", error: e.message });
  }
}

export async function me(req, res) {
  try {
    const user = await User.findByPk(req.user.id, { attributes: ["id", "name", "email"] });
    res.json(user);
  } catch (e) {
    res.status(500).json({ message: "Error", error: e.message });
  }
}
