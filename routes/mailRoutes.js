import express from "express";
import nodemailer from "nodemailer";

const mail = express.Router();
mail.post("/send-Order-confirmation/:email", async (req, res) => {
  const email = req.params.email;
  // Create a test account or replace with real credentials.
  const transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false,
    service: "gmail", // true for 465, false for other ports
    auth: {
      user: "shopthingsecommerce@gmail.com",
      pass: "ztuyolstuwwphegl",
    },
  });

  const info = await transporter.sendMail({
    from: '"Shopthings" <shopthingsecommerce@gmail.com>',
    to: email,
    subject: "Order Confirmation From Shopthings",
    text: "Order Confirmed", // plain‑text body
    html: "<b>Hello world?</b>", // HTML body
  });

  console.log("Message sent:", info.messageId);
  res.send( { message: "Email sent successfully" });
});

export default mail;
