const sql = require("./db.js");
var random_name = require('node-random-name');


function dumpDb(){
   
    //callback("populated data")
}

/**
 * Table Product
 * Fields
 * 1. id - primary key auto increment
 * 2. name VARCHAR(255), 
 * 3. brand VARCHAR(255),
 * 4. color VARCHAR(16),
 * 5. price FLOAT(10)
 */
var create_table_query = "CREATE TABLE IF NOT EXISTS product  (id MEDIUMINT NOT NULL AUTO_INCREMENT, PRIMARY KEY (id), name VARCHAR(255), brand VARCHAR(255), color VARCHAR(16), price FLOAT(10))";
sql.query(create_table_query,  (err, result) => {
  if (err) throw err;
  console.log("Table  product created");
  //dumpDb();  
});


// constructor
const Product = function(product) {
  this.name = product.name;
  this.brand = product.brand;
  this.color = product.color;
  this.price = product.price;
};
/**
 * 
 * @param {*Object} newProduct 
 * @param {*} result 
 */
Product.create = (newProduct, result) => {
  sql.query("INSERT INTO product SET ?", newProduct, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created product: ", { id: res.insertId, ...newProduct });
    result(null, { id: res.insertId, ...newProduct });
  });
};

Product.findById = (productId, result) => {
  sql.query(`SELECT * FROM product WHERE id = ${productId}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      result(null, res[0]);
      return;
    }
    // not found product with the id
    result({ kind: "not_found" }, null);
  });
};

Product.getAll = result => {
  sql.query("SELECT * FROM product", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    
    result(null, res);
  });
};

Product.remove = (id, result) => {
  sql.query("DELETE FROM product WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found product with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted prodcuct with id: ", id);
    result(null, res);
  });
};

Product.removeAll = result => {
  sql.query("DELETE FROM product", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} product`);
    result(null, res);
  });
};


Product.seed = (req,result) => {
    for(var i=0;i<=10;i++){
        let product = {
            name: random_name({random: Math.random}),
            brand: random_name({ first: true }),
            color:random_name({ last: true }),
            price: Math.floor(Math.random() * Math.floor(5000))
          };

        sql.query("INSERT INTO product SET ?", product, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        //console.log("created product: ", { id: res.insertId, ...product });
        });
        
    }

    result(null, "success")
  };


module.exports = Product;
