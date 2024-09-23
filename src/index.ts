import { app } from "./app";
import dotenv from "dotenv";
import { initialize } from "./database/initialize";
import { connectToDB } from "./database/connect";

dotenv.config();
const PORT = process.env.SERVER_PORT;
const DB_URI = process.env.DB_URI;
const SESSION_SECRET = process.env.SESSION_SECRET;
const args = process.argv.splice(2);

const runServer = (PORT: number) => {
    app.listen(PORT, () => {
        console.log(`Server is Running on port:`, PORT);
    });
}

const main = async () => {
    if (!SESSION_SECRET) {
        console.log("No sessionSecret provided exiting!")
        process.exit(3);
    }
    if (DB_URI) {
        await connectToDB(DB_URI);
    } else {
        console.log("No DB URI provided, exiting!")
        process.exit(1)
    }

    if (args.length > 0) {
        if (args.length > 1) {
            console.log("More than 1 arguments entered, exiting!");
            process.exit(2);
        } else {
            switch (args[0].toLowerCase()) {
                case "initialize": {
                    await initialize();
                    process.exit();
                }
            }
        }
    }

    if (PORT) {
        runServer(parseInt(PORT));
    } else {
        console.log("No port provided for server");
    }
}

main();