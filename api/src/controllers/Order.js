const {Order} = require('../db');

const postOrder = async(req, res, next) => {
    const { idUser } = req.params;
    const { id, amount, orderIdPayment, email_address, paymentSource, status } = req.body
    try {
        const createdBy = await User.findByPk(idUser);

        const newOrder = await Order.create(
            { id, amount, orderIdPayment, email_address, paymentSource, status }
        )

        createdBy.addOrder(newOrder);
        res.send(newOrder)
    } catch (error) {
        next(error)
    }
}

const getOrder = async(req, res, next) => {
    const idOrder = req.params.id;
    try {
        const orders = await Order.findAll({
            include:[{
                model: User
            }]
        }) 
        if (idOrder) {
            let orderId = orders.filter((el) => el.id == idOrder);
            return orderId.length
              ? res.send(orderId)
              : res.status(404).send("Order not found");
          }       
    } catch (error) {
        next(error)
    }
}

module.exports = {
    postOrder,
    getOrder
}