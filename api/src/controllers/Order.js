const {Order, User} = require('../db');

const postOrder = async(req, res, next) => {
    const { idUser } = req.params;
    const { id, first_name, last_name, payer_Id, amount, cycles_completed,
            cycles_remaining, sequence, ternure_type, total_cycles, failed_payments_count,
            last_payment_time, next_billing_time, create_time, plan_Id, plan_overridden,
            quantity, start_time, status, status_update_time, email_address
          } = req.body
    try {
        const createdBy = await User.findByPk(idUser);

        const newOrder = await Order.create(
            { id, first_name, last_name, payer_Id, amount, cycles_completed,
              cycles_remaining, sequence, ternure_type, total_cycles, failed_payments_count,
              last_payment_time, next_billing_time, create_time, plan_Id, plan_overridden,
              quantity, start_time, status, status_update_time, email_address
            }
        )

        createdBy.addOrder(newOrder);
        res.send(newOrder)
    } catch (error) {
        next(error)
    }
}

const getOrder = async(req, res, next) => {
    const idOrder = req.params.id;

    Order.findAll({
        include:[{
            model: User
        }]
    }).then(orders => {
        if (idOrder) {
            let orderId = orders.filter((el) => el.id == idOrder);
            return orderId.length
              ? res.send(orderId)
              : res.status(404).send("Order not found");
          }else{
              return res.send(orders)
          }  
    }).catch(error => next(error))   
}

module.exports = {
    postOrder,
    getOrder
}