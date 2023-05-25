const mongoose = require("mongoose");

const PaymentSchema = mongoose.Schema(
    {
        customerId: {
            type: String,
            default: ""
        },
        hasPaid: {
            type: Boolean,
            default: false,
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Payment", PaymentSchema);
