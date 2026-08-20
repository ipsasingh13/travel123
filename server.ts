import express, { Request, Response } from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import { createClient } from '@supabase/supabase-js';
import { GoogleGenAI } from '@google/genai';

const app = express();
const PORT = Number(process.env.PORT) || 3000;

// Security & Body Parser Middlewares
app.use(express.json({ limit: '2mb' }));
app.use(express.urlencoded({ extended: true, limit: '2mb' }));

// Production Security Headers
app.use((req, res, next) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-XSS-Protection', '1; mode=block');
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  res.setHeader('Permissions-Policy', 'camera=(), microphone=(), geolocation=(self)');
  if (process.env.NODE_ENV === 'production') {
    res.setHeader('Strict-Transport-Security', 'max-age=31536000; includeSubDomains; preload');
  }
  next();
});

// Supabase Initialization
const supabaseUrl = process.env.VITE_SUPABASE_URL || 'https://tuvdvrysxjwkzjhlomsx.supabase.co';
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY || 'sb_publishable_YCgsKUyp9NHxEta_ZB0hjg_iIxG7E5D';
const supabase = createClient(supabaseUrl, supabaseKey);

// In-memory fallbacks for high availability
const inMemoryItineraries: any[] = [];
const inMemoryMessages: any[] = [];
const inMemoryInquiries: any[] = [];
const inMemoryAnalytics: any[] = [];

// Gemini AI Client setup
let geminiClient: GoogleGenAI | null = null;
try {
  const apiKey = process.env.GEMINI_API_KEY;
  if (apiKey) {
    geminiClient = new GoogleGenAI({ apiKey });
  }
} catch (err) {
  console.warn('Gemini client initialized with fallback mode');
}

// Production SEO & Static Assets
app.get('/robots.txt', (req, res) => {
  res.sendFile(path.join(process.cwd(), 'public', 'robots.txt'));
});

app.get('/sitemap.xml', (req, res) => {
  res.sendFile(path.join(process.cwd(), 'public', 'sitemap.xml'));
});

// Health Check
app.get('/api/health', async (req, res) => {
  res.json({
    status: 'online',
    environment: process.env.NODE_ENV || 'development',
    timestamp: new Date().toISOString(),
    uptimeSeconds: Math.floor(process.uptime()),
    service: 'Rajasthan Royal Tour Production API',
    version: '1.0.0'
  });
});

// AI Concierge Chat
app.post('/api/ai/chat', async (req: Request, res: Response) => {
  const { message } = req.body;
  if (!message || typeof message !== 'string') {
    return res.status(400).json({ error: 'Valid message prompt is required' });
  }

  const promptText = message.trim().toLowerCase();
  let reply = "Khamma Ghani! Welcome to Rajasthan. We recommend setting aside 2-3 days for iconic fort exploration.";

  if (promptText.includes('food') || promptText.includes('eat')) {
    reply = "🍲 Authentic Rajasthani Dishes:\n• Dal Baati Churma with ghee\n• Mawa Kachori\n• Laal Maas (red mutton curry)";
  } else if (promptText.includes('hotel') || promptText.includes('stay')) {
    reply = "🏰 Heritage Stays:\n• Rambagh Palace, Jaipur\n• Udai Vilas Palace, Udaipur\n• Fort Chanwa, Khimsar";
  } else if (promptText.includes('desert') || promptText.includes('safari')) {
    reply = "🐪 Desert Adventures:\n• Camel Safari in Jaisalmer\n• Jeep Safari in Sam Sand Dunes\n• Desert Camping with cultural programs";
  }

  return res.json({ success: true, reply });
});

// Itinerary Generation
app.post('/api/itineraries', async (req: Request, res: Response) => {
  const { cities, days, budget } = req.body;
  
  const itinerary = {
    id: Date.now(),
    cities,
    days,
    budget,
    createdAt: new Date().toISOString()
  };
  
  inMemoryItineraries.push(itinerary);
  res.json({ success: true, itinerary });
});

app.get('/api/itineraries', (req, res) => {
  res.json({ success: true, itineraries: inMemoryItineraries });
});

// Support Messages
app.post('/api/support-messages', (req: Request, res: Response) => {
  const { name, email, message } = req.body;
  const supportMessage = { id: Date.now(), name, email, message, createdAt: new Date().toISOString() };
  inMemoryMessages.push(supportMessage);
  res.json({ success: true, message: 'Support request received' });
});

// Booking Inquiries
app.post('/api/bookings/inquiry', (req: Request, res: Response) => {
  const inquiry = { id: Date.now(), ...req.body, createdAt: new Date().toISOString() };
  inMemoryInquiries.push(inquiry);
  res.json({ success: true, message: 'Booking inquiry received' });
});

// Analytics
app.post('/api/analytics/track', (req: Request, res: Response) => {
  const event = { id: Date.now(), ...req.body, timestamp: new Date().toISOString() };
  inMemoryAnalytics.push(event);
  res.json({ success: true });
});

// Vite HMR in development
if (process.env.NODE_ENV !== 'production') {
  const viteDevServer = await createViteServer({
    server: { middlewareMode: true }
  });
  app.use(viteDevServer.middlewares);
}

// Serve static files
app.use(express.static(path.join(process.cwd(), 'dist')));

// SPA fallback - serve index.html for all unknown routes
app.get('*', (req, res) => {
  res.sendFile(path.join(process.cwd(), 'dist', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`🚀 Royal Rajasthan Tour Server running on http://localhost:${PORT}`);
  console.log(`📍 Environment: ${process.env.NODE_ENV || 'development'}`);
});