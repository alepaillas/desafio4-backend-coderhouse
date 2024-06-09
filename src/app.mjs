// Importamos el módulo express para crear nuestra aplicación web
import express from "express";
import { initializeMongoDb } from "./config/mongoDb.config.mjs";
import { disconnectMongoDb } from "./config/mongoDb.config.mjs";
import handlebars from "express-handlebars";
import viewRoutes from "./routes/views.routes.mjs";
import session from "express-session";
import MongoStore from "connect-mongo";
import router from "./routes/index.mjs";

// Conexión con la base de datos
initializeMongoDb();

// Escuchamos señales de la terminal para desconectarnos de MongoDb cuando termine el proceso del servidor
process.on("SIGINT", async () => {
  await disconnectMongoDb();
  process.exit(0); // Exit gracefully
});
process.on("SIGTERM", async () => {
  await disconnectMongoDb();
  process.exit(0); // Exit gracefully
});

// Creamos una nueva instancia de la aplicación express
const app = express();
// Definimos el puerto en el que se ejecutará el servidor, utilizando el puerto definido en las variables de entorno si está disponible, de lo contrario, utilizamos el puerto 8080 por defecto
const PORT = process.env.PORT || 8080;

// Para parsear JSON entrante por req.body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Guardar las sesiones en la base de datos
app.use(
  session({
    store: MongoStore.create({
      mongoUrl:
        "mongodb+srv://coderUser:jajalolxd123@cluster0.nr27ayq.mongodb.net/ecommerce?retryWrites=true&w=majority&appName=Cluster0",
      //mongoOptions: { useNewUrlParser: true, useUnifiedTopology: true },
      ttl: 15,
    }),
    secret: "CodigoSecreto",
    resave: true,
    saveUninitialized: false,
  }),
);

// Usamos las rutas
app.use("/api", router);

// iniciamos el motor handlebars
app.engine("handlebars", handlebars.engine());
const viewPath = new URL("./views/", import.meta.url);
app.set("views", viewPath.pathname);
app.set("view engine", "handlebars");
const publicPath = new URL("./public", import.meta.url);
app.use(express.static(publicPath.pathname));

app.use("/", viewRoutes);

// Escuchamos las solicitudes en el puerto definido y mostramos un mensaje en la consola cuando el servidor esté listo
app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});
