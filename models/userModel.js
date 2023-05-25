const mongoose = require("mongoose");

const UserSchema = mongoose.Schema(
  {
    fullName: {
      type: String,
      required: [true, "Please add the fullname"],
    },
    email: {
      type: String,
      required: [true, "Please add the email address"],
      unique: [true, "Email already taken"],
    },
    password: {
      type: String,
      required: [true, "Please add the password"],
    },
    paymentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Payment"
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);
