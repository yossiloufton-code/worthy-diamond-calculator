const express = require("express");
const { estimatePrice } = require("../controllers/pricing.controller");


const router = express.Router();


router.post("/estimate", estimatePrice);


module.exports = router;