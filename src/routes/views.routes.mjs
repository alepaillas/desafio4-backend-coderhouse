import { Router } from "express";

const router = Router();

let adminUser = {
  name: "ale",
  last_name: "paillas",
  role: "admin",
};

let testUser = {
  name: "usuario",
  last_name: "uno",
  role: "user",
};

router.get("/", (req, res) => {
  res.render("index", {
    style: "output.css",
    user: adminUser,
    isAdmin: adminUser.role === "admin", // va a guardar un booleano que usaremos para testear en la plantilla
  });
});

export default router;
