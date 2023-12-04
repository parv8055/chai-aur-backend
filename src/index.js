import dotenv from "dotenv";
import connectDB from "./db/index.js";
import app from "./app.js";

dotenv.config({
  path: "./env",
});
app.on("error", (err) => {
  console.error(`Error in app: ${err}`);
  throw err;
});
const port = process.env.PORT || 3000;
connectDB().then(() => {
  app.listen(port, () => {
    console.log(`😇 App is running at port ${port}`);
  });
});
