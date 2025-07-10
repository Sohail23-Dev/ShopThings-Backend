import express from "express";
import nodemailer from "nodemailer";

const mail = express.Router();
mail.post("/send-Order-confirmation/:email", async (req, res) => {
  const email = req.params.email;
  const { name, address, phone, payment, cart, total } = req.body;
  // Create a test account or replace with real credentials.
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587, //587
    secure: true,
    service: "gmail", // true for 465, false for other ports
    auth: {
      user: "shopthingsecommerce@gmail.com",
      pass: "ztuyolstuwwphegl",
    },
  });

  // Build order summary HTML
  const cartHtml = (cart || []).map(item =>
    `<li>${item.title} (x${item.quantity}) - $${item.price * item.quantity}</li>`
  ).join("");

  const html = `
  <div style="background: #fff; padding: 2rem; border-radius: 0.75rem; box-shadow: 0 4px 24px #0001; max-width: 480px; margin: 2rem auto; font-family: 'Segoe UI', Arial, sans-serif;">
    <h2 style="font-size: 1.5rem; font-weight: 800; color: #2563eb; margin-bottom: 1rem;">
      Thank you for your order, ${name}!
    </h2>
    <p style="margin-bottom: 1rem; color: #374151;">Order Details:</p>
    <ul style="margin-bottom: 1rem; padding-left: 1.25rem; color: #374151;">
      ${cartHtml}
    </ul>
    <p style="font-weight: bold; margin-bottom: 1rem;">
      <strong>Total:</strong> $${total}
    </p>
    <p style="margin-bottom: 0.5rem;"><strong>Shipping Address:</strong> ${address}</p>
    <p style="margin-bottom: 0.5rem;"><strong>Phone:</strong> ${phone}</p>
    <p style="margin-bottom: 0.5rem;"><strong>Payment Method:</strong> ${payment === 'cod' ? 'Cash on Delivery' : 'Credit/Debit Card'}</p>
    <p style="margin-top: 1.5rem; color: #16a34a; font-weight: 600;">We appreciate your business!</p>
    <div style="margin-top:2rem; text-align:center;">
      <a href="https://shopthings.vercel.app" style="display:inline-block; background: linear-gradient(to right, #2563eb, #9333ea); color:#fff; padding:0.75rem 2rem; border-radius:999px; text-decoration:none; font-weight:600; letter-spacing:0.05em;">
        Visit ShopThings
      </a>
    </div>
  </div>
`;

  try {
    const info = await transporter.sendMail({
      from: '"Shopthings" <shopthingsecommerce@gmail.com>',
      to: email,
      subject: "Order Confirmation From Shopthings",
      text: `Order Confirmed. Total: $${total}`,
      html,
    });
    console.log("Message sent:", info.messageId);
    res.send({ message: "Email sent successfully" });
  } catch (err) {
    console.error("Mail error:", err);
    res.status(500).send({ message: "Failed to send email" });
  }
});
// Example Express route
mail.post("/send-Verification-Code/:email", async (req, res) => {
  const email = req.params.email;
  const { verificationCode } = req.body;
  if (!email || !verificationCode) {
    return res.status(400).json({ message: "Missing email or verification code" });
  }
  try {
    const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465, //587
    secure: true,
    service: "gmail", // true for 465, false for other ports
    auth: {
      user: "shopthingsecommerce@gmail.com",
      pass: "ztuyolstuwwphegl",
    },
  });
    // ...nodemailer setup...
    await transporter.sendMail({
      from: `"Shopthings" <shopthingsecommerce@gmail.com>`,
      to: email,
      subject: "Your OTP Code",
      html: `<h2>Your OTP is: ${verificationCode}</h2>`,
    });
    res.json({ message: "OTP sent" });
  } catch (err) {
    console.error("Mail error:", err);
    res.status(500).json({ message: "Failed to send OTP", error: err.message });
  }
});
export default mail;
