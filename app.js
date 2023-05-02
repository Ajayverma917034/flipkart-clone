import express from "express";
import dotenv from "dotenv"
import cookieParser from "cookie-parser";
import productRouters from "./routes/ProductRouters.js";
import ErroThrow from "./middleware/error.js";
import connectDatabase from "./server.js"
import UserRouters from "./routes/userRoutes.js";
import orderRouters from "./routes/orderRouters.js";
import cloundinary from "cloudinary"
import bodyParser from "body-parser";
import fileUpload from "express-fileupload";
import cors from "cors"
import path from "path"
import url from 'url'
const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

process.on("uncaughtException", (err) => {
    console.log(`Error: ${err.message}`)
    console.log(`Shutting down the server due to Uncaught Exception`)
    process.exit(1)
})


dotenv.config();
const port = process.env.PORT || 5000

const app = express();


app.use(cors());
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', process.env.CLIENT_URL)
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE')
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Authorization')
    next()
})

app.use(express.json({ limit: '10mb' }))
app.use(cookieParser())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(fileUpload());


// new routers
app.use('/api/v1', productRouters)
app.use('/api/v1', UserRouters)
app.use('/api/v1', orderRouters)


app.use(ErroThrow)


app.use(express.static(path.join(__dirname, "./client/build")));

console.log(path.join(__dirname, "./client/build/index.html"))
app.get("*", function (_, res) {
    res.sendFile(
        path.join(__dirname, "./client/build/index.html"),
        function (err) {
            res.status(500).send(err);
        }
    );
});

app.get('/', (req, res) => res.json({ message: 'Welcome to our API' }))
app.use((req, res) => res.status(404).json({ success: false, message: 'Not Found' }))

connectDatabase(process.env.MONGODB_CONNECT)

cloundinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,

})
const server = app.listen(port, () => console.log(`Server is listining on port : ${port}`))

process.on("unhandledRejection", err => {
    console.log(`Error: ${err.message}`)
    console.log(`Shutting down the server due to Unhandled promise Rejection`);
    server.close(() => {
        server.exit(1);
    })
})