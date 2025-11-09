# worthy-diamond-calculator
front/back realtime diamond calculator with mock data.
💎 Worthy – Diamond Pricing Engine (React + Node + MUI + SCSS)

A responsive, production-style demo of Worthy’s diamond pricing engine.
Users select the 4 Cs — Carat, Cut, Color, Clarity — to instantly get an estimated price and view up to 4 similar diamonds (photo + price).
Built with React 18 + Vite, Material UI, SCSS, and a structured Node + Express backend.

✨ Features

Real-time price calculation via backend algorithm

“View Similar” popup with up to 4 matching diamonds

Luxury-styled UI (navy / teal / gold palette, gradient hero, glowing price panel)

Fully responsive (mobile → desktop) and accessible

Clean context + reducer architecture for API calls & state

Proper backend layers: routes → controllers → services → data

Loading & error handling for both price and similar-item fetches

📂 Project Structure
worthy-diamond-calculator/
├─ backend/
│  └─ src/
│     ├─ server.js
│     ├─ app.js
│     ├─ routes/
│     ├─ controllers/
│     ├─ services/
│     ├─ middleware/
│     └─ data/
└─ frontend/
   └─ src/
      ├─ main.jsx
      ├─ App.jsx
      ├─ context/
      │   └─ DiamondContext.jsx
      ├─ components/
      │   ├─ DiamondCalculator.jsx
      │   └─ SimilarDialog.jsx
      ├─ lib/api.js
      └─ styles/
          ├─ _variables.scss
          └─ app.scss

🚀 Getting Started
# clone or unzip the repo
cd worthy-diamond-calculator

# backend
cd backend
npm install
npm run dev        # http://localhost:4000

# frontend
cd ../frontend
npm install
npm run dev        # http://localhost:5173


Ensure both servers are running before opening the app in the browser.

🧮 Pricing Algorithm
price = round(
  basePerCarat(carat) *
  carat *
  cutMultiplier *
  colorMultiplier *
  clarityMultiplier
)

Base price per carat (USD)
Carat Range	Base $ / ct
0.25–0.49	3 000
0.50–0.69	5 000
0.70–0.99	7 500
1.00–1.49	12 000
1.50–1.99	18 000
2.00 +	28 000
Multipliers
Cut	x
Poor 0.85	Fair 0.9
Color	x	 	Clarity	x
D 1.25	E 1.18	F 1.12	G 1.06	H 1.02

Similar diamonds:
carat ± 0.05 | color ± 1 step | clarity ± 1 step, max 4 results.

Values are illustrative for demo purposes (not real Rapaport data).

🧠 Frontend Architecture
State management

All app state is handled in DiamondContext using useReducer + dispatch:

form – 4 C inputs

price, priceLoading, priceError

similar – open / loading / items / error

Actions:
UPDATE_FIELD, PRICE_REQUEST/SUCCESS/FAILURE, SIMILAR_OPEN_REQUEST/SUCCESS/FAILURE/CLOSE

This makes transitions explicit and keeps logic centralized.

Components
Component	Responsibility
DiamondCalculator	Form + price panel + button to open modal
SimilarDialog	Responsive modal grid of similar diamonds
App	Layout, theme, providers
useDiamond()	Custom hook exposing context actions and state
Styling

Material UI v5 with a custom theme

SCSS for gradient hero & fine-tuned visuals

Palette: deep navy #0f172a, teal #14b8a6, gold #facc15

Responsive grid → 1-column mobile / 2-column desktop

🧩 Backend Architecture

Node + Express + CORS

Layer	Files	Role
Routes	pricing.routes.js, diamonds.routes.js	Define API endpoints
Controllers	pricing.controller.js, diamonds.controller.js	Validate & delegate
Services	pricing.service.js, diamonds.service.js	Business logic & algorithm
Data	diamonds.js, lookups.js	Static inventory & 4C lists
Middleware	requestLogger, notFound, errorHandler	Infra concerns

Endpoints

POST /api/pricing/estimate   → { price }
GET  /api/diamonds           → { items }
POST /api/diamonds/similar   → { target, items }

✅ Requirements Checklist
Requirement	Implemented ?	Details
Generic feature to price diamond	✅	Carat, Cut, Color, Clarity → price from backend algorithm
Show price for specific diamond	✅	Live estimate display in pricing panel
Popup with up to 4 similar items	✅	Modal shows image + price + details
Working algorithm demo	✅	Visible via requests to /api/pricing/estimate
Beautiful styling	✅	MUI theme + SCSS + luxury palette
Responsive layout	✅	MUI Grid + CSS grid hero
ReactJS advantage	✅	Hooks, context, reducer, functional components
Extra features	✅	Backend API, loading/errors, reducer pattern
Imagination	✅	Luxury theme + animated progress + glowing price panel
📚 References

React Docs – https://react.dev/learn

Vite Guide – https://vitejs.dev/guide

Material UI Docs – https://mui.com/material-ui/

SCSS Guide – https://sass-lang.com/guide

GIA 4Cs Overview – https://4cs.gia.edu/en-us/4cs-diamond-quality/

⚙️ Assumptions

All data and prices are mock values for demonstration.

Diamonds are assumed round brilliant, prices in USD.

“Similar” bounds: ±0.05 ct, ±1 step color, ±1 step clarity.

Responsive tested at 360 px / 768 px / 1440 px.

Works on Chrome, Edge, Firefox, Safari latest.

🧪 Manual Test Checklist

 Changing any 4C updates price instantly

 “View Similar” opens modal with ≤ 4 cards

 Shows photo + price + color + clarity

 Responsive and pixel perfect

 Handles loading and error states gracefully

🏁 In one sentence

A full-stack, production-style React app that calculates diamond prices in real-time, visualizes similar items, and looks like a luxury-marketplace product — built end-to-end with clean architecture, reducer-based state, and polished responsive design.
