import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import { Request, Response, NextFunction, ErrorRequestHandler } from "express";
// import productsRouter from "./router/products.js";
import analyticsRouter from "./router/auth.js";
import authRouter from "./router/auth.js";
import productRouter from "./router/products.js";
import cartRouter from "./router/cart.js";
import { config } from "./config.js";
import { sequelize } from "./db/database.js";
import { Cart } from "./models/Cart.js";
import { User } from "./models/User.js";
import { Product } from "./models/Product.js";
import { CartItem } from "./models/CartItem.js";

const app = express();

const corsOption = {
    origin: config.cors.allowedOrigin,
    optionsSuccessStatus: 200,
    credentials: true,
};

app.use(express.json());
app.use(cookieParser());
app.use(cors(corsOption));
app.use(helmet());
app.use(morgan("tiny"));

// app.use("/tweets", productsRouter);
app.use("/auth", authRouter);
app.use("/products", productRouter);
app.use("/cart", cartRouter);

// app.use("/auth", analyticsRouter);

app.use("/", (req, res, next) => {
    res.send("hello world!");
});
app.use((req, res, next) => {
    res.sendStatus(404);
});

app.use(
    (
        error: ErrorRequestHandler,
        req: Request,
        res: Response,
        next: NextFunction
    ) => {
        console.error(error);
        res.sendStatus(500);
    }
);

User.hasOne(Cart);

Product.belongsToMany(Cart, { through: CartItem });

Cart.belongsTo(User, { targetKey: "id" });
Cart.belongsToMany(Product, { through: CartItem });

sequelize.sync().then((client) => {
    console.log("✔️  db-connected");
    const server = app.listen(config.port, () =>
        console.log(`✅ node-express connected in ${new Date()}`)
    );
});
