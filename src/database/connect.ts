import { connect } from "mongoose";

export const connectToDB = async (DB_URI: string) => {
    try {
        console.log("Connecting to DB");
        await connect(DB_URI);
        console.log("DB Connection created!");
    } catch(error) {
        console.log("Failed connecting to database: ", error);
    } 
}