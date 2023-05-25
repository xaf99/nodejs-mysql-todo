const express = require("express");
const errorHandler = require("./middleware/errorHandler");
const connectDb = require("./config/dbConnection");
const dotenv = require("dotenv").config();
const runCompletion = require("./controllers/gptController");
const cors = require("cors");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

connectDb();
const app = express();
const PORT = process.env.PORT || 3000;

app.use(require("./routes/stripeWebhooksRoutes"));

app.use(express.json());
app.use(cors());

app.use((req, res, next) => {
  console.log(req.method, req.url);
  next();
});

app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/news", require("./routes/newsRoutes"));
app.use("/api/payment", require("./routes/paymentRoutes"));

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server Running on ${PORT}`);
});
