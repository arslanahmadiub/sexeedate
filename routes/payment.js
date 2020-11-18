const express = require("express");
const router = express.Router();
const stripe = require("stripe")("sk_test_51HnRucEeHt0CNn6ZQSurKasE1mKXRTpusE1YFWsBrpYfjaCuh48aJUwLdCw5RTQu9JKOYNu2UDsLEjMCtTVulzNj00jL52moSY");
const uuid = require("uuid");



router.post("/", async (req, res) => {
   

    const { product, token } = req.body;
    console.log("PRODUCT ", product);
    console.log("PRICE ", product.price);
    const idempontencyKey = uuid();
  
    return stripe.customers
      .create({
        email: token.email,
        source: token.id
      })
      .then(customer => {
        stripe.charges.create(
          {
            amount: product.price * 100,
            currency: "usd",
            customer: customer.id,
            receipt_email: token.email,
            description: `purchase of ${product.name}`,
            shipping: {
              name: token.card.name,
              address: {
                country: token.card.address_country
              }
            }
          },
          { idempontencyKey }
        );
      })
      .then(result => res.status(200).json(result))
      .catch(err => console.log(err));
  });
  
  module.exports = router;
  