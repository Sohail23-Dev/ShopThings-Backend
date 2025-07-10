import express from "express";
import nodemailer from "nodemailer";

const mail = express.Router();
mail.post("/send-Order-confirmation/:email", async (req, res) => {
  const email = req.params.email;
  const { name, address, phone, payment, cart, total } = req.body;
  // Create a test account or replace with real credentials.
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
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
    <h2>Thank you for your order, ${name}!</h2>
    <p>Order Details:</p>
    <ul>${cartHtml}</ul>
    <p><strong>Total:</strong> $${total}</p>
    <p><strong>Shipping Address:</strong> ${address}</p>
    <p><strong>Phone:</strong> ${phone}</p>
    <p><strong>Payment Method:</strong> ${payment === 'cod' ? 'Cash on Delivery' : 'Credit/Debit Card'}</p>
    <p>We appreciate your business!</p>
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

mail.post("/send-Verification-Code/:email", async (req, res) => {
  const email = req.params.email;
  const { verificationCode} = req.body;
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    service: "gmail", // true for 465, false for other ports
    auth: {
      user: "shopthingsecommerce@gmail.com",
      pass: "ztuyolstuwwphegl",
    },
  });


   try {
    const info = await transporter.sendMail({
      from: '"Shopthings" <shopthingsecommerce@gmail.com>',
      to: email,
      subject: "Verification Code From Shopthings",
      text: `Verification Code: $${verificationCode}`
    });
    console.log("Message sent:", info.messageId);
    res.send({ message: "Email sent successfully" });
  } catch (err) {
    console.error("Mail error:", err);
    res.status(500).send({ message: "Failed to send email" });
  }
});
  

export default mail;
