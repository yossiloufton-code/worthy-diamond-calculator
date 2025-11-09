const { COLORS, CLARITIES } = require("../data/lookups");


const CUT_MULT = {
    Poor: 0.85,
    Fair: 0.9,
    Good: 1.0,
    "Very Good": 1.08,
    Excellent: 1.15,
};


const COLOR_MULT = { D: 1.25, E: 1.18, F: 1.12, G: 1.06, H: 1.02, I: 0.98, J: 0.95 };
const CLARITY_MULT = { IF: 1.25, VVS1: 1.18, VVS2: 1.12, VS1: 1.08, VS2: 1.03, SI1: 0.97, SI2: 0.92, I1: 0.85 };


function basePerCarat(carat) {
    if (carat >= 2.0) return 28000;
    if (carat >= 1.5) return 18000;
    if (carat >= 1.0) return 12000;
    if (carat >= 0.7) return 7500;
    if (carat >= 0.5) return 5000;
    if (carat >= 0.25) return 3000;
    return 1800;
}


function calculatePrice({ carat, cut, color, clarity }) {
    const c = Number(carat);
    const base = basePerCarat(c);
    const pm = (CUT_MULT[cut] ?? 1) * (COLOR_MULT[color] ?? 1) * (CLARITY_MULT[clarity] ?? 1);
    const raw = base * c * pm;
    return Math.round(raw);
}


function findSimilar(all, target) {
    const colorIdx = COLORS.indexOf(target.color);
    const clarityIdx = CLARITIES.indexOf(target.clarity);


    return all
        .filter(d => d.id !== target.id)
        .filter(d => Math.abs(d.carat - target.carat) <= 0.05)
        .filter(d => Math.abs(COLORS.indexOf(d.color) - colorIdx) <= 1)
        .filter(d => Math.abs(CLARITIES.indexOf(d.clarity) - clarityIdx) <= 1)
        .map(d => ({ ...d, price: calculatePrice(d) }))
        .sort((a, b) => a.price - b.price)
        .slice(0, 4);
}


module.exports = { calculatePrice, findSimilar };