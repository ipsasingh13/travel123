# 🏰 Royal Rajasthan Tour - AI Travel Planner

A modern, full-stack React & TypeScript travel platform for Rajasthan with AI-powered itinerary planning, heritage stays, desert safaris, and authentic culinary trails.

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Clone repository
git clone https://github.com/ipsasingh13/travel123.git
cd travel123

# Install dependencies
npm install

# Start development server
npm run dev
```

Visit: **http://localhost:3000**

## 🛠️ Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - TypeScript validation
- `npm run clean` - Remove build artifacts

## 📂 Project Structure

```
travel123/
├── src/
│   ├── components/          # UI Components
│   ├── hooks/               # Custom React hooks
│   ├── utils/               # Helper functions
│   ├── App.tsx              # Main app component
│   ├── main.tsx             # React entry point
│   └── index.css            # Global styles
├── server.ts                # Express backend
├── vite.config.ts           # Vite configuration
├── tsconfig.json            # TypeScript config
├── index.html               # HTML template
├── Dockerfile               # Container config
├── cloudbuild.yaml          # GCP build config
└── package.json             # Dependencies
```

## ✨ Features

✅ AI-powered trip planner with Gemini integration  
✅ 13+ Rajasthan city guides (Jaipur, Udaipur, Jodhpur, Jaisalmer, etc.)  
✅ Heritage hotel listings with affiliate partnerships  
✅ Desert safari recommendations  
✅ Multi-language support (English, Hindi, Rajasthani)  
✅ Dark/Light theme toggle  
✅ Live weather forecasting  
✅ Dynamic packing checklists  
✅ Digital postcard creator  
✅ WhatsApp/Telegram itinerary sharing  

## 🔌 API Endpoints

### AI & Chat
- `POST /api/ai/chat` - Rajasthan travel concierge
- `POST /api/ai/planner` - Generate personalized itinerary

### Data Management
- `GET /api/itineraries` - List itineraries
- `POST /api/itineraries` - Create itinerary
- `POST /api/support-messages` - Submit support request

### Monetization
- `POST /api/bookings/inquiry` - Booking inquiries
- `GET /api/partners/hotels` - Affiliate hotel partners
- `GET /api/partners/transports` - Transport partners

### Health & Analytics
- `GET /api/health` - Service health check
- `POST /api/analytics/track` - Event tracking

## 🌐 Deployment

### Google Cloud Run (Recommended)

```bash
gcloud builds submit --config cloudbuild.yaml
```

### Docker Local

```bash
docker build -t rajasthan-tour .
docker run -p 3000:3000 rajasthan-tour
```

### Vercel (Frontend only)

```bash
npm run build
vercel --prod
```

See **DEPLOYMENT.md** for full deployment guide.

## 💰 Monetization

See **STARTUP_GUIDE.md** for:
- Hotel affiliate partnerships (5-10% commission)
- Lead generation strategies (₹500-2000/lead)
- Premium experience sales
- Partner outreach templates

## 🏗️ Architecture

See **ARCHITECTURE.md** for detailed system design, component breakdown, and tech stack.

## 📊 Tech Stack

**Frontend:**
- React 19 + TypeScript
- Vite (build tool)
- Tailwind CSS
- Lucide React (icons)
- Motion (animations)

**Backend:**
- Express.js
- Node.js
- Supabase (database)
- Google Gemini AI

**Deployment:**
- Docker
- Google Cloud Run
- GitHub Actions (CI/CD)

## 🔑 Environment Variables

Create `.env` file:

```env
NODE_ENV=development
PORT=3000
VITE_SUPABASE_URL=your-url
VITE_SUPABASE_ANON_KEY=your-key
GEMINI_API_KEY=your-gemini-key
```

## 📝 License

MIT

## 🤝 Contributing

Contributions welcome! Please read contributing guidelines.

## 💬 Support

Email: hello@rajasthantour.com  
WhatsApp: +91-XXXXXXXXXX  
Instagram: @rajasthantour

---

**Built with ❤️ for Rajasthan Tourism**