const fetch = require("node-fetch");

const TransactionModel = require("../models/Transaction");

const { createHash } = require("crypto");

class Transaction {
  static async makeOrder(req, res) {
    try {
      const { userId, cart, first_name, last_name, phone_number, address } =
        await req.body;
      console.log({ cart });

      const payloadDuitku = {
        paymentAmount: cart.subtotal.raw,
        merchantOrderId: String(Date.now()),
        productDetails: "Order",
        email: "sheknows2023@gmail.com",
        callbackUrl:
          "https://olive-walls-cough-103-181-222-27.loca.lt/transaction/confirm-payment",
        returnUrl: "https://www.google.com",
      };

      const duitkuInvoiceResponse = await fetch(
        `${process.env.DUITKU_API_URL}/merchant/createInvoice`,
        {
          method: "POST",
          body: JSON.stringify(payloadDuitku),
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "x-duitku-signature": createHash("sha256")
              .update(
                `${process.env.DUITKU_MERCHANT_CODE}${Date.now()}${
                  process.env.DUITKU_API_KEY
                }`
              )
              .digest("hex"),
            "x-duitku-timestamp": Date.now(),
            "x-duitku-merchantcode": process.env.DUITKU_MERCHANT_CODE,
          },
        }
      )
        .then((res) => {
          return res.json();
        })
        .catch((err) => {
          return err;
        });

      const newTransaction = new TransactionModel({
        cart: cart.id,
        price: cart.subtotal.raw,
        duitku_response: duitkuInvoiceResponse,
        first_name,
        last_name,
        address,
        phone_number,
      });
      const transaction = await newTransaction.save();
      return res.json({ transaction });
    } catch (error) {
      return res.json(error.message);
    }
  }
  static async confirmPayment(req, res) {
    try {
      const transaction = await TransactionModel.findOne({
        "duitku_response.reference": req.body.reference,
      });
      transaction.paid_response = req.body;
      transaction.status = "paid";
      const savedTransaction = await transaction.save();
      return res.json(savedTransaction);
    } catch (error) {
      return res.json(error.message);
    }
  }
  static async deleteTransactions(req, res) {
    try {
      const transaction = await TransactionModel.deleteMany({});
      return res.json(transaction);
    } catch (error) {
      return res.json(error.message);
    }
  }
}

module.exports = Transaction;
