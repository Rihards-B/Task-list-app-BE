import { app } from "./app"
import { connect } from "mongoose";
import dotenv from "dotenv";

dotenv.config();
const PORT = process.env.SERVER_PORT;
const DB_URI = process.env.DB_URI;

const runServer = async (PORT: number, DB_URI: string) => {
    try {
        await connect(DB_URI);
        console.log("DB Connection created!");
        app.listen(PORT, () => {
            console.log(`Server is Running on port:`, PORT);
        });
    } catch(error) {
        console.log(error);
    }
}

if(DB_URI) {
    if(PORT) {
        runServer(parseInt(PORT), DB_URI);
    } else {
        console.log("No port provided for server");
    }
} else {
    console.log("No database URI provided!");
}

