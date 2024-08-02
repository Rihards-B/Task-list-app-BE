import { app } from "./app";
import dotenv from "dotenv";
import { connectToDB } from "./database/connect";

dotenv.config();
const PORT = process.env.SERVER_PORT;
const DB_URI = process.env.DB_URI;

const runServer = (PORT: number) => {
    app.listen(PORT, () => {
        console.log(`Server is Running on port:`, PORT);
    });
}

const main = async () => {
    if(DB_URI) {
        await connectToDB(DB_URI);
    } else {
        console.log("No DB URI provided, exiting!")
        process.exit(1)
    }

    
    if(PORT) {
        runServer(parseInt(PORT));
    } else {
        console.log("No port provided for server");
    }
}

main();





