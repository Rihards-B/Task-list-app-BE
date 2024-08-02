import { app } from "./app"
import dotenv from "dotenv";

dotenv.config();
const PORT = process.env.SERVER_PORT;

// Making an async function when whe later connect to a DB
const runServer = async (PORT: number) => {
    try {
        app.listen(PORT, () => {
            console.log(`Server is Running on port:`, PORT);
        });
    } catch(error) {
        console.log(error);
    }
}

if(PORT) {
    runServer(parseInt(PORT));
} else {
    console.log("No port provided for server");
}

