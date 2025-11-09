# 💎  Worthy – Diamond Pricing Engine

A responsive React + Node.js application that simulates Worthy’s automatic diamond pricing engine.
Users can select Carat, Cut, Color, and Clarity to get an instant price estimate and view similar diamonds with photo and price.
Built with React 18 + Vite, Material UI (MUI), SCSS, and a clean Node + Express backend.

## ⚙️ Tech Stack

- Frontend: React 18, Vite, Material UI, SCSS
- State Management: Context API + useReducer
- Backend: Node.js + Express + CORS
- Architecture: routes → controllers → services → data
- Language: JavaScript (ES2023)

## 🚀 Getting Started
1. Clone and install
 - git clone https://github.com/yossiloufton-code/worthy-diamond-calculator.git
 - cd worthy-diamond-calculator

2. Run the backend
 - cd backend
 - npm install
 - npm run dev
Server runs on http://localhost:4000

3. Run the frontend
 - cd ../worthy-diamond-calculator
 - npm install
 - npm run dev
App runs on http://localhost:5173

## 💻 Usage

1. Open http://localhost:5173
2. Adjust Carat, Cut, Color, and Clarity
3. The estimated price updates automatically (fetched from backend)
4. Click “View Similar” to open a modal with up to 4 similar diamonds (photo + price)
5. Resize the window — app is fully responsive across devices

## 🧪 API Endpoints
Method	Endpoint	Description
POST	/api/pricing/estimate	Returns calculated price
POST	/api/diamonds/similar	Returns up to 4 similar diamonds
GET	/api/diamonds	Returns mock inventory

## 🧭 How this solution meets the Worthy Frontend Exercise

### **Core task**

- The app exposes a generic diamond pricing feature where the user selects **Carat, Cut, Color, and Clarity**.  
- These values are sent to a dedicated backend endpoint (`POST /api/pricing/estimate`) that returns a calculated price using:  
  `price = round(basePerCarat(carat) × carat × cutMultiplier × colorMultiplier × clarityMultiplier)`  
- For identical inputs, the same price is always returned — ensuring consistency for investors and demos.

---

### **Similar diamonds popup**

- Clicking **“View Similar”** calls `POST /api/diamonds/similar`.  
- The backend selects up to 4 diamonds from the mock inventory that are closest to the requested stone (±0.05ct, ±1 step color/clarity).  
- The frontend displays these results in a **responsive modal dialog**, with each card showing image, 4Cs, and formatted price.

---

### **Styling and responsiveness**

- Built with **React + Vite + Material UI + SCSS**.  
- Custom theme with deep **navy / teal / gold** palette to fit a **luxury marketplace** brand.  
- Gradient hero section, glowing price panel, elevated card with soft shadows and rounded corners.  
- Fully **responsive** layout using MUI Grid and CSS grid — tested on 360 px, 768 px, and 1440 px breakpoints.

---

### **Architecture**

- **Backend:** Node + Express with clean layering:  
  - `routes → controllers → services → data`  
  - Middleware for logging, 404, and error handling  
- **Frontend:** React SPA with modern patterns:  
  - `DiamondProvider` context and `useDiamond()` custom hook (with `useReducer` for state management)  
  - Centralized handling for:
    - 4C form state  
    - API calls for price and similar diamonds  
    - loading / error transitions  
    - dialog open / close  
  - Presentational components (`DiamondCalculator`, `SimilarDialog`) consume context data directly.

---

### **Assumptions**

- Pricing bands and multipliers are **illustrative** and intended to produce realistic demo prices (not actual Rapaport data).  
- All diamonds are assumed to be **round brilliant cut** and priced in USD.  
- “Similar” diamonds are defined as:  
  - Carat within ± 0.05 ct  
  - Color within ± 1 step  
  - Clarity within ± 1 step

---

### **References**

- React documentation – [https://react.dev/learn](https://react.dev/learn)  
- Vite guide – [https://vitejs.dev/guide](https://vitejs.dev/guide)  
- Material UI components – [https://mui.com/material-ui/react-text-field/](https://mui.com/material-ui/react-text-field/)  
- SCSS basics – [https://sass-lang.com/guide](https://sass-lang.com/guide)  
- GIA 4Cs overview – [https://4cs.gia.edu/en-us/4cs-diamond-quality/](https://4cs.gia.edu/en-us/4cs-diamond-quality/)

---

### **Summary**

> A full-stack, production-style React app that calculates diamond prices in real time, visualizes similar items, and presents them in a polished, luxury-grade responsive UI — built with clean architecture, reducer-based state management, and a beautiful user experience.
