import dotenv from "dotenv";
dotenv.config()
import app from "./src/app.js";
const PORT = process.env.PORT||5000
app.listen(PORT, (err) => {
    if (err) {
        console.error(err);
        return
    }
    console.log("The server is running at port 5000");
})