module.exports = route => {
  const customers = require("../controllers/customer.controller.js");

  // Create a new Customer
  route.post("/customers", customers.create);

  // Retrieve all Customers
  route.get("/customers", customers.findAll);

  // Retrieve a single Customer with customerId
  route.get("/customers/:customerId", customers.findOne);

  // Update a Customer with customerId
  route.put("/customers/:customerId", customers.update);

  // Delete a Customer with customerId
  route.delete("/customers/:customerId", customers.delete);

  // Create a new Customer
  route.delete("/customers", customers.deleteAll);
  
  //login the user
  route.post("/login", customers.login);

};
