const express = require("express");
const { getAllDiamonds, getSimilarDiamonds } = require("../controllers/diamonds.controller");


const router = express.Router();


router.get("/", getAllDiamonds);
router.post("/similar", getSimilarDiamonds);

router.get("/meta", (req, res) => {
  res.json({
    cuts: ["Poor", "Fair", "Good", "Very Good", "Excellent"],
    colors: ["D", "E", "F", "G", "H", "I", "J"],
    clarities: ["IF", "VVS1", "VVS2", "VS1", "VS2", "SI1", "SI2", "I1"],
  });
});


module.exports = router;