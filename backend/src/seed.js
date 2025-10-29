import dotenv from "dotenv";
dotenv.config();
import { sequelize } from "./config/db.js";
import { User } from "./models/User.js";
import { Task } from "./models/Task.js";
import bcrypt from "bcryptjs";

async function run() {
  await sequelize.sync({ force: true });
  const pass = await bcrypt.hash("1234", 10);
  const user = await User.create({ name: "Admin", email: "admin@demo.com", password: pass });
  await Task.bulkCreate([
    { title: "Primer ejemplo de tarea", userId: user.id },
    { title: "Tarea completada", completed: true, userId: user.id }
  ]);
  console.log("Seed completo. Usuario admin@demo.com / 1234");
  process.exit(0);
}
run();
