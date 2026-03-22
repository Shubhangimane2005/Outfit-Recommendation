# Fashion Style AI - Conversational Fashion Recommendation System

A modern, responsive website with an AI-powered chatbot that provides personalized fashion recommendations based on user preferences, occasions, weather, and body type.

## 🚀 Features

### Frontend
- **Modern React Website** with TypeScript and Tailwind CSS
- **Virtual Try-On** with camera integration and outfit overlays
- **AI Chatbot Interface** with conversational fashion recommendations
- **Responsive Design** optimized for all devices
- **Fashion-Inspired UI** with smooth animations and modern aesthetics

### Backend
- **Express.js API** with intelligent fashion recommendation engine
- **Conversational AI** that understands context and user preferences
- **Personalized Recommendations** based on:
  - Occasion (casual, formal, party, workout, date)
  - Weather conditions (hot, cold, rainy)
  - Body type (pear, apple, hourglass, rectangle)
  - Color preferences and seasonal analysis
- **Memory System** that remembers user preferences across conversations

## 🛠️ Installation & Setup

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn

### 1. Clone and Setup Frontend
```bash
# Install frontend dependencies
npm install

# Install additional packages for chatbot
npm add express cors dotenv uuid @types/express @types/cors @types/uuid concurrently
```

### 2. Setup Backend
```bash
# Navigate to server directory
cd server

# Install backend dependencies
npm install
```

### 3. Run the Application

#### Option 1: Run Both Frontend and Backend Together
```bash
# From the root directory
npm run dev:full
```

#### Option 2: Run Separately
```bash
# Terminal 1 - Backend
npm run server

# Terminal 2 - Frontend  
npm run dev
```

The application will be available at:
- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:3001

## 🤖 AI Chatbot Features

### Conversation Examples

**User**: "Hi, what should I wear for a casual day out?"
**AI**: "Hello! For a casual day out, here's what I recommend:
👕 **Top:** Basic T-shirt
👖 **Bottom:** Jeans  
👠 **Shoes:** Sneakers
💎 **Accessory:** Baseball Cap"

**User**: "I have a formal meeting tomorrow and it's cold outside"
**AI**: "Perfect! For a formal meeting in cold weather, I recommend:
👔 **Top:** Blazer with dress shirt
👖 **Bottom:** Dress pants
👠 **Shoes:** Oxford shoes
🧥 **Layer:** Wool coat
Since it's cold, I recommend wool or cashmere materials in dark colors."

### Supported Contexts
- **Occasions**: casual, formal, party, workout, date
- **Weather**: hot, cold, rainy
- **Body Types**: pear, apple, hourglass, rectangle  
- **Colors**: Full seasonal color analysis
- **Preferences**: Style memory and personalization

## 📱 API Endpoints

### POST /api/chat
Send a message to the AI stylist
```json
{
  "message": "What should I wear to a party?",
  "userId": "user123"
}
```

### GET /api/categories
Get available fashion categories

### POST /api/recommendations
Get specific outfit recommendations
```json
{
  "occasion": "formal",
  "weather": "cold", 
  "bodyType": "hourglass",
  "colorPreference": "blue"
}
```

## 🎨 Fashion Database

The AI uses a comprehensive fashion database including:

- **5 Occasion Categories** with 15+ items each
- **3 Weather Conditions** with material and color recommendations  
- **4 Body Types** with specific styling advice
- **4 Seasonal Color Palettes** with 20+ colors each

## 🔧 Customization

### Adding New Fashion Items
Edit `server/index.js` and add items to the `fashionDatabase` object:

```javascript
fashionDatabase.occasions.casual.tops.push('New Casual Top');
```

### Extending AI Responses
Modify the `FashionAI` class methods:
- `generateResponse()` - Main conversation logic
- `extractContext()` - Context understanding
- `generateOutfitRecommendation()` - Outfit creation

### Styling Customization
- Edit `src/index.css` for global styles
- Modify component files for specific styling
- Update Tailwind classes for design changes

## 🚀 Deployment

### Frontend (Netlify/Vercel)
```bash
npm run build
# Deploy the 'dist' folder
```

### Backend (Heroku/Railway)
```bash
cd server
# Deploy the server directory
```

## 📝 Project Structure

```
fashion-style-ai/
├── src/
│   ├── components/
│   │   ├── ChatBot.tsx          # AI Chatbot component
│   │   ├── Hero.tsx             # Hero section
│   │   ├── VirtualTryOn.tsx     # Camera try-on feature
│   │   └── ...
│   ├── App.tsx                  # Main app component
│   └── index.css               # Global styles
├── server/
│   ├── index.js                # Backend API server
│   ├── package.json            # Backend dependencies
│   └── .env                    # Environment variables
└── README.md
```

## 🎯 Key Features Implemented

✅ **Conversational AI** - Natural language fashion consultation  
✅ **Context Understanding** - Extracts occasion, weather, preferences  
✅ **Personalized Recommendations** - Tailored outfit suggestions  
✅ **Memory System** - Remembers user preferences  
✅ **Virtual Try-On** - Camera integration with outfit overlays  
✅ **Responsive Design** - Works on all devices  
✅ **Modern UI/UX** - Fashion-inspired design with animations  
✅ **RESTful API** - Clean backend architecture  

## 👥 Project Details

- **Student**: Shubhangi Mane (T094)
- **Project**: Fashion Style – A Conversational AI System for Personalized Outfit Recommendation
- **Year**: 2025-26
- **Technology Stack**: React, TypeScript, Node.js, Express.js, Tailwind CSS

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is created for academic purposes as part of the Fashion Technology curriculum.