const express = require("express");
const router = express.Router();
const crypto = require("crypto");

router.post("/initiate", async (req, res) => {
  try {
    const { totalAmount } = req.body;
    const pid = crypto.randomBytes(8).toString("hex"); // unique ID

    const formData = {
      amt: totalAmount.toFixed(2),
      psc: 0,
      pdc: 0,
      txAmt: 0,
      tAmt: totalAmount.toFixed(2),
      pid: pid,
      scd: "epay_payment",
      su: `http://localhost:5000/api/esewa/success`,
      fu: `http://localhost:5000/api/esewa/failure`,
    };

    res.status(200).json({ formData });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to initiate payment" });
  }
});

router.post("/success", (req, res) => {
  // handle success - verify transaction with eSewa (optional for test)
  console.log("eSewa Success Callback:", req.body);
  res.redirect("http://localhost:3000/success");
});

router.post("/failure", (req, res) => {
  console.log("eSewa Failure Callback:", req.body);
  res.redirect("http://localhost:3000/fail");
});

module.exports = router;
