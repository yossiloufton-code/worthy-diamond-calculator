const { listDiamonds, similarFor } = require("../services/diamonds.service");


function getAllDiamonds(req, res, next) {
    try {
        const all = listDiamonds();
        res.json({ items: all });
    } catch (err) {
        next(err);
    }
}


function getSimilarDiamonds(req, res, next) {
    try {
        const { carat, cut, color, clarity, id = "CUSTOM" } = req.body || {};
        if (!carat || !cut || !color || !clarity) {
            return res.status(400).json({ error: "Missing carat, cut, color or clarity" });
        }
        const target = { id, carat: Number(carat), cut, color, clarity };
        const items = similarFor(target);
        res.json({ target, items });
    } catch (err) {
        next(err);
    }
}


module.exports = { getAllDiamonds, getSimilarDiamonds };