const { COLORS, CLARITIES, CUTS } = require("./lookups");

// Simple mock inventory for demo purposes
const DIAMONDS = [
{ id: "D1", carat: 0.42, cut: "Excellent", color: "F", clarity: "VS1", img: "https://picsum.photos/seed/d1/400/300" },
{ id: "D2", carat: 0.51, cut: "Very Good", color: "G", clarity: "VS2", img: "https://picsum.photos/seed/d2/400/300" },
{ id: "D3", carat: 0.73, cut: "Good", color: "H", clarity: "SI1", img: "https://picsum.photos/seed/d3/400/300" },
{ id: "D4", carat: 0.95, cut: "Excellent", color: "E", clarity: "VVS2",img: "https://picsum.photos/seed/d4/400/300" },
{ id: "D5", carat: 1.02, cut: "Very Good", color: "G", clarity: "VS1", img: "https://picsum.photos/seed/d5/400/300" },
{ id: "D6", carat: 1.33, cut: "Good", color: "I", clarity: "SI1", img: "https://picsum.photos/seed/d6/400/300" },
{ id: "D7", carat: 1.48, cut: "Excellent", color: "D", clarity: "IF", img: "https://picsum.photos/seed/d7/400/300" },
{ id: "D8", carat: 1.55, cut: "Very Good", color: "F", clarity: "VVS1",img: "https://picsum.photos/seed/d8/400/300" },
{ id: "D9", carat: 1.88, cut: "Good", color: "H", clarity: "VS2", img: "https://picsum.photos/seed/d9/400/300" },
{ id: "D10", carat: 2.02, cut: "Excellent", color: "E", clarity: "VS1", img: "https://picsum.photos/seed/d10/400/300" },
{ id: "D11", carat: 2.25, cut: "Fair", color: "I", clarity: "SI2", img: "https://picsum.photos/seed/d11/400/300" },
{ id: "D12", carat: 0.28, cut: "Good", color: "J", clarity: "I1", img: "https://picsum.photos/seed/d12/400/300" },
{ id: "D13", carat: 0.36, cut: "Fair", color: "H", clarity: "SI2", img: "https://picsum.photos/seed/d13/400/300" },
{ id: "D14", carat: 0.58, cut: "Poor", color: "G", clarity: "SI1", img: "https://picsum.photos/seed/d14/400/300" },
{ id: "D15", carat: 0.81, cut: "Very Good", color: "F", clarity: "VS2", img: "https://picsum.photos/seed/d15/400/300" },
{ id: "D16", carat: 1.12, cut: "Excellent", color: "D", clarity: "VVS1",img: "https://picsum.photos/seed/d16/400/300" },
{ id: "D17", carat: 1.41, cut: "Good", color: "E", clarity: "VS1", img: "https://picsum.photos/seed/d17/400/300" },
{ id: "D18", carat: 1.67, cut: "Very Good", color: "G", clarity: "SI1", img: "https://picsum.photos/seed/d18/400/300" },
{ id: "D19", carat: 1.95, cut: "Excellent", color: "H", clarity: "VS1", img: "https://picsum.photos/seed/d19/400/300" },
{ id: "D20", carat: 2.35, cut: "Good", color: "F", clarity: "VVS2",img: "https://picsum.photos/seed/d20/400/300" },
{ id: "D21", carat: 0.47, cut: "Excellent", color: "E", clarity: "IF", img: "https://picsum.photos/seed/d21/400/300" },
{ id: "D22", carat: 0.62, cut: "Very Good", color: "I", clarity: "SI2", img: "https://picsum.photos/seed/d22/400/300" },
{ id: "D23", carat: 1.26, cut: "Fair", color: "J", clarity: "I1", img: "https://picsum.photos/seed/d23/400/300" },
{ id: "D24", carat: 2.10, cut: "Excellent", color: "D", clarity: "VVS2",img: "https://picsum.photos/seed/d24/400/300" },
];


module.exports = { DIAMONDS };