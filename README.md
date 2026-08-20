# 🏰 Royal Rajasthan Travel & Itinerary Web App

A modern, full-stack React & TypeScript travel platform for Rajasthan featuring AI Itinerary Planning, Interactive Maps, Curated Heritage Stays, Regional Food Guides, Live Weather, Packing Checklists, and Digital Postcards.

---

## 🚀 Quick Start in Visual Studio Code

Follow these simple steps to run this project locally without any errors:

### 1. Prerequisites
- **Node.js**: Version `18.x`, `20.x`, or higher installed on your computer. ([Download Node.js](https://nodejs.org/))
- **VS Code**: Visual Studio Code editor.

### 2. Open Project in VS Code
1. Extract the downloaded `.zip` archive.
2. Open VS Code, click **File > Open Folder...** and select the extracted project directory.

### 3. Install Dependencies
Open the VS Code Terminal (`Ctrl + ~` on Windows/Linux or `Cmd + ~` on Mac) and run:

```bash
npm install
```

### 4. Configure Environment Variables (Optional)
A `.env.example` file is included. By default, built-in cloud endpoints and fallback mock data are already pre-configured. To customize:

Create a `.env` file in the root folder:
```env
# Optional Supabase credentials
VITE_SUPABASE_URL="https://tuvdvrysxjwkzjhlomsx.supabase.co"
VITE_SUPABASE_ANON_KEY="sb_publishable_YCgsKUyp9NHxEta_ZB0hjg_iIxG7E5D"

# Optional Gemini AI Key for live AI Concierge
GEMINI_API_KEY=""
```

### 5. Start the Development Server
Run the following command in the terminal:

```bash
npm run dev
```

Then open your browser and navigate to:
👉 **[http://localhost:3000](http://localhost:3000)** (or the port displayed in your terminal).

---

## 🛠️ Available NPM Scripts

- `npm run dev`: Starts the integrated full-stack Node/Express server + Vite frontend.
- `npm run build`: Compiles the React TypeScript frontend and Node server for production.
- `npm run start`: Starts the compiled production server (`dist/server.cjs`).
- `npm run lint`: Runs TypeScript validation checks (`tsc --noEmit`).

---

## 📂 Project Architecture

```text
├── src/
│   ├── components/       # UI Components (Planner, Explore, Hero, Weather, Postcards, etc.)
│   ├── hooks/            # Custom React hooks (usePlannerForm, etc.)
│   ├── utils/            # Helper utilities (wishlist, storage, sound effects)
│   ├── data.ts           # Rich datasets for 13+ Rajasthan cities, attractions, stays, food
│   ├── firebase.ts       # Firebase client integration
│   ├── supabase.ts       # Supabase data layer with fallback resilience
│   ├── types.ts          # TypeScript type definitions
│   ├── index.css         # Tailwind CSS styling
│   ├── App.tsx           # Main application root
│   └── main.tsx          # React DOM entry point
├── public/               # Static assets, sitemap, robots.txt
├── server.ts             # Express + Vite backend server & API routes
├── vite.config.ts        # Vite build & plugin configurations
├── tsconfig.json         # TypeScript compiler configurations
└── package.json          # Dependencies and script definitions
```

---

## ✨ Features Included

1. **AI Royal Trip Planner**: 6-step guided wizard for generating day-by-day morning, afternoon, and evening schedules with real-time costs and transit routes.
2. **Interactive City Explorer**: Detailed monuments, entry timings, ticket prices, and tips for Jaipur, Jodhpur, Udaipur, Jaisalmer, Pushkar, Bikaner, Ranthambore, Mount Abu, Chittorgarh, Bharatpur, Alwar, Mandawa, and Bundi.
3. **Live Weather & Season Advisory**: Temperature forecasts, seasonal recommendations, and best visit windows.
4. **Smart Packing Checklist**: Dynamic checklists customized for Rajasthan desert, city, and temple visits.
5. **Digital Postcard Creator**: Customizable heritage greeting cards to download and share.
6. **Heritage Stays & Transport**: Curated boutique Havelis, palaces, luxury camps, and taxi rates.
7. **Multi-Language Support**: English, हिंदी (Hindi), and मारवाड़ी (Rajasthani).
8. **Dark / Royal Light Theme**: Seamless switching with persistent preferences.

---

## 💡 Troubleshooting Tips

- **Port already in use**: If port 3000 is occupied, run `PORT=3001 npm run dev` (or `set PORT=3001 && npm run dev` on Windows).
- **Node version error**: Ensure you are running Node 18 or above by typing `node -v`.
