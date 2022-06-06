const {User, Product} = require('../db')

const addProduct = async (req, res, next) => {
    try {
      
      const { name, image, description } = req.body;
      const productCreated = await Product.create({
          name, image, description
      });     
      return res.send(productCreated);
    } catch (error) {
      next(error);
    }
  };

  const getProduct = async(req, res, next) => {
      try {
          const product = await Product.findAll()
          res.send(product)
      } catch (error) {
          next(error)
      }
  }

module.exports = {
    getProduct, 
    addProduct
}