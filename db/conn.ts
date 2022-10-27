// include mongoose
import mongoose from "mongoose";

// connection url
const connUri = process.env.DATABASE;

// function to connect database to backend
const connectToMongo = () => {
    mongoose
        .connect(connUri)
        .then(() => console.log("Connected to MongoDB"))
        .catch((err) => console.log(err));
};

// export connection function
export default connectToMongo;
