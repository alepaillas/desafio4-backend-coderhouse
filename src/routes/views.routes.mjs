import { Router } from "express";

const router = Router();

router.get("/", (req, res) => {
  // si existe una sesión vamos al index, sino al login
  if (req.session.user) {
    res.render("index", {
      style: "output.css",
      user: req.session.user,
      isAdmin: req.session.user.role === "admin", // va a guardar un booleano que usaremos para testear en la plantilla
    });
  }

  res.render("login", {
    style: "output.css",
  });
});

router.get("/register", (req, res) => {
  res.render("register", {
    style: "output.css",
  });
});

export default router;
