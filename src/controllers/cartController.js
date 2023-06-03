import cartManager from '../managers/cartManager.js';

const cartController = {
  create: function (req, res) {
    const result = cartManager.create();
    return res.json(result);
  },
  show: function (req, res) {
    const cid = Number(req.params.cid);
    const result = cartManager.getCartById(cid);
    return res.json(result);
  },
  add: function (req, res) {
    const cid = Number(req.params.cid);
    const pid = Number(req.params.pid);
    const result = cartManager.addToCart(cid, pid);
    return res.json(result);
  }
};

export default cartController;