const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const asyncHandler = require("express-async-handler");
const Payment = require("../models/paymentModel");
const User = require("../models/userModel");

const packages = {
  PRO: process.env.PRO_PACKAGE,
  BASIC: process.env.BASIC_PACKAGE,
};

//@desc Create Checkout Session
//route POST /api/payment/create-checkout-session
//@access private

const checkoutSession = asyncHandler(async (req, res) => {
  const payment = await Payment.findById(req.user.paymentId);
  if (!payment) {
    res.status(400);
    throw new Error("No customer found");
  }
  if (!req.body.package) {
    res.status(400);
    throw new Error("Select one package");
  }
  let package = "";
  if (req.body.package === "Basic") {
    package = packages.BASIC;
  } else {
    package = packages.PRO;
  }
  // Create new Checkout Session for the order

  const session = await stripe.checkout.sessions.create({
    mode: "subscription",
    payment_method_types: ["card"],
    customer: payment.customerId,
    line_items: [
      {
        price: package,
        quantity: 1,
      },
    ],
    success_url: `http://localhost:5173/news?haPaid=true`,
    // cancel_url: `${domainURL}/canceled.html`,
  });
  if (!session) {
    res.status(400);
    throw new Error("Error creating session");
  }
  res.status(200).json({
    session: session.url,
  });
});

//@desc Check Payment
//route POST /api/payment/paymentCheck
//@access private

const paymentCheck = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id).populate("paymentId");
  res.status(200).json({
    payment: user.paymentId,
  });
});

module.exports = { checkoutSession, paymentCheck };
