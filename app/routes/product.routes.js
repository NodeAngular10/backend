module.exports = route => {
    const product = require("../controllers/product.controller.js");
  
    // Create a new Customer
    route.post("/product", product.create);

  
    // Retrieve all product
    route.get("/product", product.findAll);
  
    // Retrieve a single Customer with productId
    route.get("/product/:productId", product.findOne);
  
  
    // Delete a Customer with productId
    route.delete("/product/:productId", product.delete);
  
    // Create a new Customer
    route.delete("/product", product.deleteAll);

    route.post("/seed", product.seed);
    
  };
  