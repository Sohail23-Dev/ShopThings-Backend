import express from "express";
import mongoose from "mongoose";
import router from "./routes/authRoutes.js";
import cors from "cors";
import mail from "./routes/mailRoutes.js";

const PORT = 3004;
const server = express();
server.use(cors({
  origin: ["https://shopthings.netlify.app"], // add your frontend domain here
  credentials: true
}));
server.use(express.json({ limit: '5mb' })); // or higher if needed
server.use(express.urlencoded({ limit: '5mb', extended: true }));
mongoose
  .connect(
    "mongodb+srv://sohailshaikh778822:ShopThings@shopthings.yyssty9.mongodb.net/ShopThings?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log(`Database is Connected`);
  })
  .catch((e) => {
    console.log(`${e}`);
  });

  server.use("/api/auth", router);
  server.use("/Checkout/mail/", mail);

server.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
});