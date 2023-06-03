import express from "express";
import exphbs from "express-handlebars";
import { Server } from "socket.io";
import cartRouter from "./routes/cart.router.js";
import productRouter from "./routes/products.router.js";
import FileManager from "./managers/fileManager.js";

const app = express();
const httpServer = app.listen(8080, () =>
  console.log("Server en puerto 8080")
);
const socketServer = new Server(httpServer);

socketServer.on("connection", (socket) => {
  socket.on("addProduct", (newProduct) => {
    const { title, description, price, thumbnail, code, stock, category, status } = newProduct;
    console.log(newProduct);
    const message = FileManager.addProduct(title, description, price, thumbnail, code, stock, category, status);
    const result = FileManager.getProducts();
    result.message = message.message;
    socket.emit("getProducts", result);
  });
  const result = FileManager.getProducts();
  socket.emit("getProducts", result);
});

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.engine(
  "handlebars",
  exphbs({
    defaultLayout: "main",
    extname: ".handlebars",
  })
);
app.set("views", __dirname + "/views");
app.set("view engine", "handlebars");
app.use("/public", express.static(__dirname + "/public"));

app.get("/", (req, res) => {
  return res.render("index", { pageTitle: "Home", frase: "Index" });
});

app.use("/carts", cartRouter);
app.use("/products", productRouter);
app.get("/realTimeProducts", (req, res) => {
  return res.render("realTimeProducts", { pageTitle: "RTProucts" });
});

const PORT = process.env.PORT || 8080;
httpServer.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});