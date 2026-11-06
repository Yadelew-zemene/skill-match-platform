import dotenv from "dotenv";

console.log("SMTP CONFIG CHECK:", {
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  userExists: Boolean(process.env.SMTP_USER),
  passwordExists: Boolean(process.env.SMTP_PASS),
});

dotenv.config()
import app from "./src/app.js";
const PORT = process.env.PORT || 5000

app.listen(PORT, (err) => {
    if (err) {
        console.error(err);
        return
    }
    console.log("The server is running at port 5000");
})