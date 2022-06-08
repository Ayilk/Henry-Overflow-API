 
const axios = require('axios');
 require('dotenv').config();
 const {PAYPAL_API, CLIENT, SECRET} = process.env;

 const createOrder = async(req, res, next) => {
   try {
    const order = {
        intent: "CAPTURE",
        purchase_units: [
            {
                amount: {
                    currency_code: "USD",
                    value: '5'
                },
                description: "Donación"
            }
        ],
        application_context: {
            brand_name: "HenryOverflow",
            landing_page: "LOGIN",
            user_action: "PAY_NOW",
            return_url: "http://localhost:3001/payment/capture-order",
            cancel_url: "http://localhost:3001/payment/cancel-order"
        }
    }

   const params = new URLSearchParams()
   params.append("grant_type", "client_credentials")

   const {data: {access_token}} = await axios.post(`${PAYPAL_API}/v1/oauth2/token`, params, {
       headers: {
         'Content-Type': 'application/x-www-form-urlencoded'
       },
       auth:{//Para enviar una autenticacion basica
            username: CLIENT,
             password: SECRET
         }
   })
   //console.log(access_token);
    const response =await axios.post(`${PAYPAL_API}/v2/checkout/orders`, order, {
        // auth:{//Para enviar una autenticacion basica
        //     username: CLIENT,
        //     password: SECRET
        // }
        headers:{
            Authorization: `Bearer ${access_token}`
        }
    })
    console.log(response.data)
     res.send(response.data)
   } catch (error) {
       next(error)
   }
   
 }

 const captureOrder = async(req, res) => {

    const {token, PayerID} = req.query;

    const response = await axios.post(`${PAYPAL_API}/v2/checkout/orders/${token}/capture`, {}, {
        auth: {
            username: CLIENT,
             password: SECRET
        }
    })  
    console.log(response.data) 
     res.send("Capturing order")
 }

 const cancelOrder = (req, res) => {
     res.send('Canceling order')
 }

 const createProduct = async(req, res, next) => {
    try {
     const product = {
        name: "Donación",
        description: "Aportación a HenryOverFlow",
        type: "DIGITAL",          
        image_url: "https://www.impulsonegocios.com/wp-content/uploads/2019/04/donacion-organos.jpg",
        //home_url: "https://localhost:3000/questions",
     }
    const params = new URLSearchParams()
    params.append("grant_type", "client_credentials")
 
    const {data: {access_token}} = await axios.post(`${PAYPAL_API}/v1/oauth2/token`, params, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        auth:{//Para enviar una autenticacion basica
             username: CLIENT,
              password: SECRET
          }
    })
    console.log(access_token);
     const response =await axios.post(`${PAYPAL_API}/v1/catalogs/products`, product, {         
         headers:{
            'Content-Type': "application/json",
            'Authorization': `Bearer ${access_token}`,
             'PayPal-Request-Id': "PRODUCT-18062020-001"
         }
     })
     console.log(response.data)
      res.send(response.data)
    } catch (error) {
        next(error)
    }
    
  }

const createPlan = async(req, res, next) => {
    try {
        const plan = {
            "product_id": "PROD-1JR71498VV238292S",
            "name": "Basic Plan",
            "description": "Basic plan",
            "billing_cycles": [
            //   {
            //     "frequency": {
            //       "interval_unit": "MONTH",
            //       "interval_count": 1
            //     },
            //     "tenure_type": "TRIAL",
            //     "sequence": 1,
            //     "total_cycles": 1
            //   },
              {
                "frequency": {
                  "interval_unit": "MONTH",
                  "interval_count": 1
                },
                "tenure_type": "REGULAR",
                "sequence": 1,
                "total_cycles": 1,
                "pricing_scheme": {
                  "fixed_price": {
                    "value": "5",
                    "currency_code": "USD"
                  }
                }
              }
            ],
            "payment_preferences": {
              "auto_bill_outstanding": false,
            //   "setup_fee": {
            //     "value": "10",
            //     "currency_code": "USD"
            //   },
            //   "setup_fee_failure_action": "CONTINUE",
            //   "payment_failure_threshold": 3
            },
            "taxes": {
              "percentage": "10",
              "inclusive": false
            }
          }
    
    
       const params = new URLSearchParams()
       params.append("grant_type", "client_credentials")
    
       const {data: {access_token}} = await axios.post(`${PAYPAL_API}/v1/oauth2/token`, params, {
           headers: {
             'Content-Type': 'application/x-www-form-urlencoded'
           },
           auth:{//Para enviar una autenticacion basica
                username: CLIENT,
                 password: SECRET
             }
       })
       console.log(access_token);
        const response =await axios.post(`${PAYPAL_API}/v1/billing/plans`,plan, {         
            headers:{
               'Content-Type': "application/json",
               'Authorization': `Bearer ${access_token}`,
                'PayPal-Request-Id': "PRODUCT-18062020-001"
            }
        })
        console.log(response.data)
         res.send(response.data)
       } catch (error) {
           next(error)
       }
       
}

const listProducts = async(req, res, next) => {
  try {
    
   const params = new URLSearchParams()
   params.append("grant_type", "client_credentials")

   const {data: {access_token}} = await axios.post(`${PAYPAL_API}/v1/oauth2/token`, params, {
       headers: {
         'Content-Type': 'application/x-www-form-urlencoded'
       },
       auth:{//Para enviar una autenticacion basica
            username: CLIENT,
             password: SECRET
         }
   })
   console.log(access_token);
    const response =await axios.get(`${PAYPAL_API}/v1/catalogs/products?page_size=2&page=1&total_required=true`,  {         
        headers:{
           'Content-Type': "application/json",
           'Authorization': `Bearer ${access_token}`,
        }
    })
    console.log(response.data)
     res.send(response.data)
   } catch (error) {
       next(error)
   }
   
}
 

module.exports = {
    createOrder, 
    captureOrder,
    cancelOrder,
    createProduct,
    createPlan,
    listProducts
}