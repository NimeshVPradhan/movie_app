const db_ops = require('./db_ops');
//const products = require('./initDB');

function Model(client) {
  this.db_ops = new db_ops.DB_ops(client);
  //this.products = new products.Products(db);
}


module.exports = {
  Model: Model
};
