import mongoose from "mongoose";

const connectDB = async () => {
    try{
        const connect = await mongoose.connect(process.env.MONGO_URI);
        console.log(connect.connection.host)
    }
    catch(error) {
        console.log(error);
        process.exit(1);
        // throw new Error({message: error});
    }
}

export default connectDB;