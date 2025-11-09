const { DIAMONDS } = require("../data/diamonds");
const { calculatePrice, findSimilar } = require("./pricing.service");


function listDiamonds() {
    return DIAMONDS.map(d => ({ ...d, price: calculatePrice(d) }));
}


function similarFor(target) {
    return findSimilar(DIAMONDS, target);
}


module.exports = { listDiamonds, similarFor };