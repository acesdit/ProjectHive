import mongoose from "mongoose";

type ConnectionObject = {
    isConnected?: number
}
// ? for optional

const connection: ConnectionObject = {}

async function dbConnect(): Promise<void> {
    if (connection.isConnected) {
        console.log("Already Connected to database")
        return
    }

    try {
        const db = await mongoose.connect(process.env.MONGODB_URL || '', {})
        connection.isConnected = db.connections[0].readyState
        console.log("connected successfully")
    } catch (error) {
        console.log("database connection failed",error);
        process.exit(1)
    }
}

export default dbConnect;