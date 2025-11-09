const express = require("express");
const cors = require("cors");
const pricingRoutes = require("./routes/pricing.routes");
const diamondsRoutes = require("./routes/diamonds.routes");
const { requestLogger } = require("./middleware/requestLogger");
const { notFoundHandler } = require("./middleware/notFound");
const { errorHandler } = require("./middleware/errorHandler");


const app = express();


app.use(cors({ origin: "http://localhost:5173" })); // Vite dev origin
app.use(express.json());
app.use(requestLogger);


app.use("/api/pricing", pricingRoutes);
app.use("/api/diamonds", diamondsRoutes);


app.use(notFoundHandler);
app.use(errorHandler);


module.exports = app;