import FileManager from '../managers/fileManager.js';

const productController = {
  index: async function (req, res) {
    if (req.query.limit) {
      const limit = Number(req.query.limit);
      const result = await FileManager.getProducts(limit);
      return res.render("products", result);
    } else {
      const result = await FileManager.getProducts();
      return res.render("products", { pageTitle: "Productos", ...result });
    }
  },
  show: async function (req, res) {
    const pid = Number(req.params.pid);
    const result = await FileManager.getProductById(pid);
    return res.render("productDetail", { pageTitle: result.product.title, ...result });
  },
  update: async function (req, res) {
    const pid = Number(req.params.pid);
    const newValues = req.body;
    const result = await FileManager.updateProduct(pid, newValues);
    return res.json(result);
  },
  create: async function (req, res) {
    const { title, description, price, thumbnail, code, stock, category, status } = req.body;
    const result = await FileManager.addProduct(
      title,
      description,
      price,
      thumbnail,
      code,
      stock,
      category,
      status
    );
    return res.json(result);
  },
  destroy: async function (req, res) {
    const pid = Number(req.params.pid);
    const result = await FileManager.deleteProduct(pid);
    return res.json(result);
  }
};

export default productController;