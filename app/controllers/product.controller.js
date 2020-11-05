const Product = require("../models/product.model.js");

module.exports = {
  create : (req, res) => {
    console.log("POST : Product create "+ JSON.stringify(req.body))
    // Validate request
    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
    }
  
    // Create a Product
    const product = new Product({
      name: req.body.name,
      brand: req.body.brand,
      color: req.body.color,
      price: req.body.price
    });
  
    // Save Product in the database
    Product.create(product, (err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the Product."
        });
      else res.send(data);
    });
  },

  findAll : (req, res) => {
    console.log("GET : Product LIST ")
    Product.getAll((err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving Products."
        });
      else res.send(data);
    });
  },
  
  findOne : (req, res) => {
    console.log("GET : Product Item `id` "+ req.params.productId)
    Product.findById(req.params.productId, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Product with id ${req.params.productId}.`
          });
        } else {
          res.status(500).send({
            message: "Error retrieving Product with id " + req.params.productId
          });
        }
      } else res.send(data);
    });
  },
  update : (req, res) => {
    // Validate Request
    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
    }
  
  
    Product.updateById(
      req.params.productId,
      new Product(req.body),
      (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `Not found Product with id ${req.params.productId}.`
            });
          } else {
            res.status(500).send({
              message: "Error updating Product with id " + req.params.productId
            });
          }
        } else res.send(data);
      }
    );
  },
  delete : (req, res) => {
    console.log("delete : Product Item `id` "+ req.params.productId)
    Product.remove(req.params.productId, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Product with id ${req.params.productId}.`
          });
        } else {
          res.status(500).send({
            message: "Could not delete Product with id " + req.params.productId
          });
        }
      } else res.send({ message: `Product was deleted successfully!` });
    });
  },
  deleteAll : (req, res) => {
    Product.removeAll((err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while removing all Products."
        });
      else res.send({ message: `All Products were deleted successfully!` });
    });
  },
  seed : (req, res) => {
    Product.seed(req, (err, data) => {
      if (err) {
        res.status(500).send({
            message: "Error "
          });
      } else res.send({"status":"added dummy data"});
    });
  }
  
}
