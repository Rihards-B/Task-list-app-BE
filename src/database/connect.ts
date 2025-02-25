import { connect } from "mongoose";

export const connectToDB = async (DB_URI: string) => {
    try {
        await connect(DB_URI);
    } catch (error) {
        console.log("Failed connecting to database: ", error);
    }
}