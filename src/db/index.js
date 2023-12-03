import {connect} from "mongoose";
import { db_name } from "../constants.js";


const connectDB = async () => {
    try {
        const connectionInstance = await connect(`${process.env.MONGO_URL}/${db_name}`)
        console.log(`\n MongoDB connected !! DB HOST: ${connectionInstance.connection.host}`);
    } catch (error) {
        console.error("MONGODB connection FAILED ", error);
        process.exit(1)
    }
}

export default connectDB