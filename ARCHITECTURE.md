# 🏗️ System Architecture & Codebase Organization

The Royal Rajasthan Tour application is built with a modern, systematic, and modular architecture. It uses **React (Vite)** for the frontend and **Tailwind CSS** for styling, structured as a Single Page Application (SPA).

## 📁 Directory Structure

```text
/
├── package.json          # Project dependencies and production build scripts
├── server.ts             # Express.js backend server (serves the SPA in production)
├── vite.config.ts        # Vite build configuration
├── STARTUP_GUIDE.md      # Monetization and business strategy guide
├── DEPLOYMENT.md         # Instructions for taking the app live on a custom domain
└── src/                  # Main application source code
    ├── App.tsx           # Root component, routing shell, and global state
    ├── main.tsx          # React DOM mounting point
    ├── index.css         # Global Tailwind CSS imports and variables
    ├── types.ts          # Global TypeScript interfaces
    ├── data.ts           # Centralized database for attractions, routes, and hotels
    ├── utils/            # Helper functions
    │   └── wishlist.ts   # LocalStorage management for saved items
    └── components/       # UI Components
```

## 🧩 Core Components Breakdown

To keep the application systematic, responsibilities are split across dedicated components:

### 1. Navigation & Shell
*   **`Header.tsx`**: Contains the global brand logo, desktop navigation, currency converter, language switcher, and Light/Dark mode toggle.
*   **`BottomNav.tsx`**: Mobile-first sticky bottom navigation bar ensuring seamless 1-handed usage on smartphones.
*   **`Toast.tsx`**: Global floating notification system.

### 2. Main Views (The 5 Tabs)
*   **`Hero.tsx`** (Home): Inspirational landing page, quick-start CTAs, and recommended circuits.
*   **`Explore.tsx`**: Categorized dictionary of Rajasthan (Places, Culture, Food, Experiences).
*   **`Planner.tsx`**: The core 5-step AI wizard. Collects user input, processes the itinerary, and manages the result view.
*   **`SavedTab.tsx`**: Wishlist manager that reads from LocalStorage to display saved trips and spots.
*   **`ProfileTab.tsx`**: User settings, theme preferences, and language controls.

### 3. Planner Result Sub-Components
The generated AI itinerary view in `Planner.tsx` systematically delegates rendering to:
*   **`SuggestedStays.tsx`**: Filters and displays hotels specific to the generated cities.
*   **`TransportationSection.tsx`**: Calculates and displays intercity travel modes, durations, and costs.
*   **`TripSummary.tsx`**: Calculates total budget, handles "Download" (TXT file generation), and manages the "Share Trip" URL encoding logic.

### 4. Interactive Utilities
*   **`Modal.tsx`**: A reusable, deep-dive informational overlay for any specific monument, hotel, or food item.
*   **`PlacesMap.tsx`**: SVG-based visual mapping system.
*   **`WeatherComponent.tsx`**: Live weather forecasting UI.

## 💾 State Management & Data Flow

*   **Global State**: Managed at the top level in `App.tsx` (Current Page, Language, Theme, Global Route/Destinations). This ensures that if a user clicks a city in the *Explore* tab, it carries over to the *Planner* tab automatically.
*   **URL Parameter Hydration**: The app natively reads `?route=Jaipur,Udaipur...` from the browser URL on initial load to support the 1-Click Share functionality.
*   **Persistence**: `localStorage` is used securely via `src/utils/wishlist.ts` to keep the user's saved items across sessions without requiring a database.