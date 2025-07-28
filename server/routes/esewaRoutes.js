// routes/esewaRoutes.js
import express from "express";
import crypto from "crypto";

const router = express.Router();

router.post("/initiate", async (req, res) => {
  try {
    const { totalAmount } = req.body;
    const pid = crypto.randomBytes(8).toString("hex");

    const esewaFormData = {
      amt: totalAmount.toFixed(2),
      psc: 0,
      pdc: 0,
      txAmt: 0,
      tAmt: totalAmount.toFixed(2),
      pid,
      scd: "epay_payment",
      su: "http://localhost:5000/esewa/success",
      fu: "http://localhost:5000/esewa/failure",
    };

    res.json({ esewaFormData });
  } catch (err) {
    console.error("Esewa initiation error", err);
    res.status(500).json({ message: "Payment initiation failed" });
  }
});

router.get("/success", (req, res) => {
  console.log("✅ eSewa Success:", req.query);
  res.redirect("http://localhost:3000/success");
});

router.get("/failure", (req, res) => {
  console.log("❌ eSewa Failure:", req.query);
  res.redirect("http://localhost:3000/fail");
});

export default router;
