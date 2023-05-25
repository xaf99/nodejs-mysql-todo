const dotenv = require("dotenv").config();
const asyncHandler = require("express-async-handler");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const Payment = require("../models/paymentModel");

const webHooks = asyncHandler(async (req, res) => {
  let data;
  let eventType;
  // Check if webhook signing is configured.
  const webhookSecret =
    "whsec_f107de79e49f2043b2ccbb371b20bdbd675359039bc521917cf22fcaf28ef901";
  if (webhookSecret) {
    // Retrieve the event by verifying the signature using the raw body and secret.
    let event;
    let signature = req.headers["stripe-signature"];
    event = stripe.webhooks.constructEvent(req.body, signature, webhookSecret);

    if (!event) {
      console.log(`⚠️  Webhook signature verification failed.`);
      return res.sendStatus(400);
    }
    // Extract the object from the event.
    data = event.data;
    eventType = event.type;
  }

  //console.log(eventType)
  else {
    // Webhook signing is recommended, but if the secret is not configured in `config.js`,
    // retrieve the event data directly from the request body.
    data = req.body.data;
    eventType = req.body.type;
  }
  switch (eventType) {
    case "checkout.session.completed":
      // console.log("checkout.session.completed", eventType);
      // console.log("checkout.session.completed", data.object);
      // console.log("checkout.session.completed", data.object.id);
      // Payment is successful and the subscription is created.
      // You should provision the subscription and save the customer ID to your database.
      break;
    case "invoice.paid":
      // console.log("invoice.paid uqwyeiuqyweiu", eventType);
      // console.log("invoice.paid iwiuqeoiquweoi", data.object.paid);
      // console.log("invoice.paid pqwiepoqiwpoe", data.object.customer);
      // Continue to provision the subscription as payments continue to be made.
      // Store the status in your database and check when a user accesses your service.
      // This approach helps you avoid hitting rate limits.
      break;
    case "invoice.updated":
      const payment = await Payment.findOne({
        customerId: data.object.customer,
      });
      if (!payment) {
        res.status(400);
        throw new Error("No customer found");
      }
      const updatedPayment = await Payment.findByIdAndUpdate(
        payment._id,
        { hasPaid: data.object.paid },
        { new: true }
      );
      // console.log("invoice.updated asdlkajsdlkaj", updatedPayment);
      // console.log("invoice.updated jaskdjaslkdjlkjlk", data.object.customer);
      // Continue to provision the subscription as payments continue to be made.
      // Store the status in your database and check when a user accesses your service.
      // This approach helps you avoid hitting rate limits.
      break;

    case "customer.subscription.created":
      // console.log("customer.subscription.created", eventType);
      // console.log("customer.subscription.created", data.object);
      // console.log("customer.subscription.created", data.object.id);
      break;

    case "invoice.payment_failed":
      // console.log("invoice.payment_failed", eventType);
      // console.log("invoice.payment_failed", data.object);
      // console.log("invoice.payment_failed", data.object.id);

      // The payment failed or the customer does not have a valid payment method.
      // The subscription becomes past_due. Notify your customer and send them to the
      // customer portal to update their payment information.
      break;

    default:
    // console.log(eventType);
    // console.log(data.object);
    // console.log(data.object.id);
    // Unhandled event type
  }
  res.sendStatus(200);
});

module.exports = { webHooks };
