const { calculatePrice } = require("../services/pricing.service");


function estimatePrice(req, res, next) {
    try {
        const { carat, cut, color, clarity } = req.body || {};
        if (!carat || !cut || !color || !clarity) {
            return res.status(400).json({ error: "Missing carat, cut, color or clarity" });
        }
        const price = calculatePrice({ carat, cut, color, clarity });
        res.json({ price });
    } catch (err) {
        next(err);
    }
}


module.exports = { estimatePrice };