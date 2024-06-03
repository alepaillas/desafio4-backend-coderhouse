// Importamos el módulo express para crear nuestra aplicación web
import express from "express";
import { initializeMongoDb } from "./config/mongoDb.config.mjs";
import { disconnectMongoDb } from "./config/mongoDb.config.mjs";
// Importamos nuestras rutas
import productsRouter from "./routes/products.routes.mjs";
import cartsRouter from "./routes/carts.routes.mjs";

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

// Usamos las rutas
app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter);

// Escuchamos las solicitudes en el puerto definido y mostramos un mensaje en la consola cuando el servidor esté listo
app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});
