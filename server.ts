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

// In-memory fallbacks to guarantee continuous uptime & high availability
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
  console.warn('Gemini client initialized with fallback mode (GEMINI_API_KEY not provided)');
}

// ----------------------------------------------------
// Production SEO & Static Assets Routing
// ----------------------------------------------------
app.get('/robots.txt', (req, res) => {
  res.sendFile(path.join(process.cwd(), 'public', 'robots.txt'));
});

app.get('/sitemap.xml', (req, res) => {
  res.sendFile(path.join(process.cwd(), 'public', 'sitemap.xml'));
});

app.get('/download-zip', (req, res) => {
  const zipPath = path.join(process.cwd(), 'rajasthan-tour-app.zip');
  res.download(zipPath, 'rajasthan-tour-app.zip');
});

app.get('/rajasthan-tour-app.zip', (req, res) => {
  const zipPath = path.join(process.cwd(), 'rajasthan-tour-app.zip');
  res.download(zipPath, 'rajasthan-tour-app.zip');
});

// ----------------------------------------------------
// Health Check Endpoint
// ----------------------------------------------------
app.get('/api/health', async (req, res) => {
  res.json({
    status: 'online',
    environment: process.env.NODE_ENV || 'development',
    timestamp: new Date().toISOString(),
    uptimeSeconds: Math.floor(process.uptime()),
    service: 'Rajasthan Royal Tour Production API',
    version: '1.0.0',
    capabilities: {
      aiConcierge: true,
      itineraryPlanner: true,
      partnerBookings: true,
      analytics: true
    }
  });
});

// ----------------------------------------------------
// 1. AI Rajasthan Travel Concierge Endpoint
// ----------------------------------------------------
app.post('/api/ai/chat', async (req: Request, res: Response) => {
  const { message, history } = req.body;
  if (!message || typeof message !== 'string') {
    return res.status(400).json({ error: 'Valid message prompt is required' });
  }

  const promptText = message.trim();
  const lowerPrompt = promptText.toLowerCase();

  // Try server-side Gemini generation if available
  if (geminiClient && process.env.GEMINI_API_KEY) {
    try {
      const systemInstruction = `You are the Royal Rajasthan Explorer AI Concierge, an expert travel guide specializing in Rajasthan, India. 
You offer advice on forts, royal palaces, desert safaris in Jaisalmer/Bikaner, Rajasthani cuisine (Dal Baati Churma, Laal Maas, Ghevar), local culture, heritage hotels, shopping (bazaars, blue pottery, handicrafts), budget planning in INR (₹), and transportation. 
Be warm, hospitable ("Khamma Ghani!"), concise, clear, and highly practical. Provide bullet points where helpful.`;

      const response = await geminiClient.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: promptText,
        config: {
          systemInstruction,
          temperature: 0.7,
        }
      });

      const reply = response.text || "Khamma Ghani! We are delighted to assist with your Rajasthan journey.";
      return res.json({ success: true, source: 'gemini-ai', reply });
    } catch (err: any) {
      console.warn('Gemini API call failed, falling back to curated expert engine:', err.message);
    }
  }

  // Curated fallback intelligent responses
  let reply = "Khamma Ghani! Welcome to Rajasthan. We recommend setting aside 2 to 3 days for iconic fort exploration in Jaipur, Jodhpur, and Udaipur.";

  if (lowerPrompt.includes('temple') || lowerPrompt.includes('spiritual') || lowerPrompt.includes('religious')) {
    reply = "✨ Royal Spiritual Route Advisory:\n• Day 1: Visit Khatu Shyam Ji & Salasar Balaji in Shekhawati.\n• Day 2: Sacred Pushkar Lake, Brahma Temple & Ajmer Dargah Sharif.\n• Day 3: Ranakpur Jain Temple & Eklingji Temple near Udaipur.";
  } else if (lowerPrompt.includes('budget') || lowerPrompt.includes('20,000') || lowerPrompt.includes('cheap') || lowerPrompt.includes('cost')) {
    reply = "💰 Budget Travel Optimizations for Rajasthan:\n• Travel between major cities via overnight sleeper trains (Jaipur ↔ Jaisalmer ↔ Jodhpur).\n• Stay in authentic family-run Havelis (₹1,500 - ₹3,000/night).\n• Savor local Thali meals at heritage Bhojanalayas (₹150 - ₹300/meal).\n• Book shared desert jeep/camel safaris at Sam Sand Dunes.";
  } else if (lowerPrompt.includes('food') || lowerPrompt.includes('eat') || lowerPrompt.includes('restaurant') || lowerPrompt.includes('dish')) {
    reply = "🍲 Authentic Rajasthani Culinary Highlights:\n• Dal Baati Churma with pure desi ghee in Jaipur.\n• Mawa Kachori & Mirchi Vada at Jodhpur's Clock Tower.\n• Ker Sangri & Bajre ki Roti with garlic chutney in Jaisalmer.\n• Laal Maas & Royal Thali by Lake Pichola in Udaipur.\n• Sweet Treats: Ghevar, Mawa Ladoo, and Bikaner Bhujia.";
  } else if (lowerPrompt.includes('family') || lowerPrompt.includes('kids') || lowerPrompt.includes('elderly')) {
    reply = "🏰 Family & Heritage Caravan Recommendation:\n• Focus on Jaipur, Pushkar, and Udaipur for gentle pacing and luxury stays.\n• Experience Sound & Light shows at Amer Fort and Kumbhalgarh.\n• Enjoy private boat rides on Lake Pichola and vintage car museum visits.";
  } else if (lowerPrompt.includes('desert') || lowerPrompt.includes('safari') || lowerPrompt.includes('dunes') || lowerPrompt.includes('jaisalmer')) {
    reply = "🐪 Thar Desert Safari Guide:\n• Best Location: Sam Sand Dunes or pristine Khuri village in Jaisalmer.\n• Experience: Sunset camel trek, cultural Kalbelia folk dance & campfire dinner under the stars.\n• Best Season: October through March.";
  }

  res.json({ success: true, source: 'expert-engine', reply });
});

// ----------------------------------------------------
// 2. AI Personalized Itinerary Generator
// ----------------------------------------------------
app.post('/api/ai/planner', async (req: Request, res: Response) => {
  const { destinations, days, budgetTier, people, travelStyle } = req.body;

  if (geminiClient && process.env.GEMINI_API_KEY) {
    try {
      const prompt = `Create a detailed day-by-day travel itinerary for Rajasthan, India:
- Destinations: ${Array.isArray(destinations) ? destinations.join(', ') : 'Jaipur, Jodhpur, Udaipur'}
- Duration: ${days || '5'} days
- Group size: ${people || '2'} travelers
- Budget Tier: ${budgetTier || 'Mid-range / Comfort'}
- Travel Style: ${travelStyle || 'Heritage & Culture'}

Format your response as a structured, inspiring itinerary with Day-by-Day highlights, recommended meals, stay suggestions, transport tips, and estimated costs in INR (₹).`;

      const response = await geminiClient.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
        config: { temperature: 0.7 }
      });

      return res.json({ success: true, source: 'gemini-ai', itinerary: response.text });
    } catch (err: any) {
      console.warn('AI Planner error, returning structured template:', err.message);
    }
  }

  res.json({
    success: true,
    source: 'template-engine',
    summary: `Curated ${days || 5}-Day Royal Rajasthan Expedition across ${(destinations || ['Jaipur', 'Udaipur']).join(', ')}.`
  });
});

// ----------------------------------------------------
// 3. Monetization & Booking Partner Inquiries
// ----------------------------------------------------
app.post('/api/bookings/inquiry', async (req: Request, res: Response) => {
  const inquiry = {
    id: 'INQ-' + Date.now(),
    ...req.body,
    status: 'received',
    created_at: new Date().toISOString()
  };

  try {
    const { data, error } = await supabase.from('booking_inquiries').insert([inquiry]).select();
    if (error || !data) {
      inMemoryInquiries.unshift(inquiry);
      return res.json({ success: true, source: 'memory', inquiry });
    }
    res.json({ success: true, source: 'supabase', inquiry: data[0] });
  } catch (err) {
    inMemoryInquiries.unshift(inquiry);
    res.json({ success: true, source: 'memory', inquiry });
  }
});

// ----------------------------------------------------
// 4. Partner Stays & Transport Affiliates API
// ----------------------------------------------------
app.get('/api/partners/hotels', (req, res) => {
  res.json({
    success: true,
    partners: [
      { id: 'taj-rambagh', name: 'Rambagh Palace', affiliateCommissionRate: '8%', directBookingUrl: 'https://www.rajasthantour.com/partners/rambagh' },
      { id: 'oberoi-udaivilas', name: 'The Oberoi Udaivilas', affiliateCommissionRate: '8%', directBookingUrl: 'https://www.rajasthantour.com/partners/udaivilas' },
      { id: 'suryagarh-jaisalmer', name: 'Suryagarh Jaisalmer', affiliateCommissionRate: '10%', directBookingUrl: 'https://www.rajasthantour.com/partners/suryagarh' },
      { id: 'umaid-bhawan', name: 'Umaid Bhawan Palace', affiliateCommissionRate: '7%', directBookingUrl: 'https://www.rajasthantour.com/partners/umaid-bhawan' }
    ]
  });
});

app.get('/api/partners/transports', (req, res) => {
  res.json({
    success: true,
    partners: [
      { id: 'royal-cabs-jaipur', name: 'Royal Rajputana Private Chauffeur Fleet', type: 'Private Sedan/Innova Crysta', rating: 4.9 },
      { id: 'thar-desert-safari', name: 'Thar Desert 4x4 Dune Bashing & Safari', type: 'Desert Safari', rating: 4.8 },
      { id: 'lake-pichola-charters', name: 'Udaipur Heritage Solar Boat Charters', type: 'Boat Cruise', rating: 4.9 }
    ]
  });
});

// ----------------------------------------------------
// 5. Analytics & Conversion Event Tracking
// ----------------------------------------------------
app.post('/api/analytics/track', (req, res) => {
  const event = {
    id: Date.now(),
    event: req.body.event || 'page_view',
    metadata: req.body.metadata || {},
    timestamp: new Date().toISOString(),
    ip: req.ip || req.headers['x-forwarded-for'] || 'unknown'
  };
  inMemoryAnalytics.push(event);
  if (inMemoryAnalytics.length > 500) inMemoryAnalytics.shift();
  res.json({ success: true, tracked: true });
});

// ----------------------------------------------------
// 6. Itineraries CRUD Endpoints
// ----------------------------------------------------
app.get('/api/itineraries', async (req, res) => {
  try {
    const { data, error } = await supabase.from('itineraries').select('*').order('created_at', { ascending: false });
    if (error || !data) {
      return res.json({ success: true, source: 'memory', itineraries: inMemoryItineraries });
    }
    res.json({ success: true, source: 'supabase', itineraries: data });
  } catch (err) {
    res.json({ success: true, source: 'memory', itineraries: inMemoryItineraries });
  }
});

app.post('/api/itineraries', async (req, res) => {
  const itinerary = {
    id: Date.now().toString(),
    ...req.body,
    created_at: new Date().toISOString()
  };

  try {
    const { data, error } = await supabase.from('itineraries').insert([itinerary]).select();
    if (error || !data) {
      inMemoryItineraries.unshift(itinerary);
      return res.json({ success: true, source: 'memory', itinerary });
    }
    res.json({ success: true, source: 'supabase', itinerary: data[0] });
  } catch (err) {
    inMemoryItineraries.unshift(itinerary);
    res.json({ success: true, source: 'memory', itinerary });
  }
});

// ----------------------------------------------------
// 7. Support & Lead Messages
// ----------------------------------------------------
app.post('/api/support-messages', async (req, res) => {
  const msg = {
    id: Date.now().toString(),
    ...req.body,
    created_at: new Date().toISOString()
  };

  try {
    const { data, error } = await supabase.from('support_messages').insert([msg]).select();
    if (error || !data) {
      inMemoryMessages.unshift(msg);
      return res.json({ success: true, source: 'memory', message: msg });
    }
    res.json({ success: true, source: 'supabase', message: data[0] });
  } catch (err) {
    inMemoryMessages.unshift(msg);
    res.json({ success: true, source: 'memory', message: msg });
  }
});

// ----------------------------------------------------
// 8. Server Boot & Frontend Routing
// ----------------------------------------------------
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath, { maxAge: '1d' }));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Rajasthan Tour Production Backend listening on port ${PORT}`);
  });
}

startServer();
