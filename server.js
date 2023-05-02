import mongoose from "mongoose"

const connectDatabase = () => {
    mongoose.connect(process.env.MONGODB_CONNECT, { useNewUrlParser: true, useUnifiedTopology: true })
        .then((data) => {
            console.log(`Mongodb connected with server : ${data.connection.host}`);
        });
}



// export const connectDatabase = async (Url) => {

//     try {
//         // connect take two paramerter 1 url, 2 object
//         await mongoose.connect(Url, { useUnifiedTopology: true, useNewUrlParser: true })
//         console.log("data base connnected sucessfully")
//     } catch (err) {
//         console.log(`Error while connecting with the database`, err.message);
//     }
// /}


export default connectDatabase