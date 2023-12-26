const express = require("express");
const dotenv = require("dotenv");
const helmet = require("helmet");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const clientRoutes = require("./routers/client");
const generalRoutes = require("./routers/general");
const managementRoutes = require("./routers/management");
const salesRoutes = require("./routers/sales");

// data imports
const User = require("./models/user.js");
const Product = require("./models/product.js");
const ProductStat = require("./models/productStat.js");
const Transaction = require("./models/Transaction.js");
const OverallStat = require("./models/OverallStat.js");
const AffiliateStat = require("./models/AffiliateStat.js");

const {
  dataUser,
  dataProduct,
  dataProductStat,
  dataTransaction,
  dataOverallStat,
  dataAffiliateStat,
} = require("./data/index.js");

/* CONFIGURATION */
const app = express();
dotenv.config();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

// Routes
app.use("/client", clientRoutes);
app.use("/general", generalRoutes);
app.use("/management", managementRoutes);
app.use("/sales", salesRoutes);

const PORT = process.env.PORT || 5001;

mongoose
  .connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error, "not connected!");
  });
