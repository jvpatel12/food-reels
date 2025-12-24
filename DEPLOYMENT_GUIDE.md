# Production Deployment Guide

## ✅ What's Fixed

All 9 frontend files have been updated to use **environment variables** instead of hardcoded `localhost:3000` URLs:
- ✅ UserRegister.jsx
- ✅ UserLogin.jsx
- ✅ PartnerRegister.jsx
- ✅ PartnerLogin.jsx
- ✅ Home.jsx
- ✅ CreateFoodParnter.jsx
- ✅ Profile.jsx
- ✅ PartnerProfile.jsx

## 📋 Setup Steps

### Step 1: Configure Backend API URL

**For Development (local):**
```bash
# Already configured in fronted/.env.local
VITE_API_URL=http://localhost:3000
```

**For Production (Vercel):**
1. Open `fronted/.env.production`
2. Replace `https://your-backend-deployment-url.com` with your actual backend URL
3. Example: `VITE_API_URL=https://foodreels-api.onrender.com`

### Step 2: Deploy Backend

Choose one of these platforms:

#### Option A: Render (Recommended - Free with email)
1. Go to [https://render.com](https://render.com)
2. Create account and sign in
3. Click "New +" → "Web Service"
4. Connect your GitHub repository
5. Configure:
   - **Name**: `foodreels-api`
   - **Environment**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `node server.js`
6. Add environment variables:
   ```
   MONGODB_URI=your_mongodb_atlas_connection_string
   IMAGEKIT_PUBLIC_KEY=your_imagekit_public_key
   IMAGEKIT_PRIVATE_KEY=your_imagekit_private_key
   IMAGEKIT_URL_ENDPOINT=your_imagekit_url_endpoint
   JWT_SECRET=your_jwt_secret
   ```
7. Deploy and get the URL (e.g., `https://foodreels-api.onrender.com`)

#### Option B: Railway
1. Go to [https://railway.app](https://railway.app)
2. Create project → Deploy from GitHub
3. Add environment variables (same as above)
4. Get deployment URL

#### Option C: Heroku (Deprecated but still works)
1. Use traditional Heroku deployment with Procfile
2. Set environment variables via Heroku dashboard

### Step 3: Update Frontend with Backend URL

1. Update `fronted/.env.production`:
```bash
VITE_API_URL=https://your-deployed-backend-url.com
```

2. Example for Render:
```bash
VITE_API_URL=https://foodreels-api.onrender.com
```

### Step 4: Update CORS on Backend

Edit `backend/src/app.js` to allow Vercel domain:

```javascript
const corsOptions = {
  origin: [
    'http://localhost:5173',      // Development
    'https://yourproject.vercel.app' // Production
  ],
  credentials: true,
};

app.use(cors(corsOptions));
```

### Step 5: Redeploy to Vercel

1. Commit and push the changes:
```bash
git add .
git commit -m "Fix: Use environment variables for API URLs"
git push origin main
```

2. Vercel will auto-redeploy OR manually trigger:
   - Go to [https://vercel.com](https://vercel.com)
   - Select your project
   - Click "Redeploy"

## 🔧 How It Works

### Development Flow
```
Local Frontend (localhost:5173)
    ↓
Reads VITE_API_URL from .env.local (http://localhost:3000)
    ↓
Local Backend (localhost:3000)
```

### Production Flow
```
Vercel Frontend (https://yourproject.vercel.app)
    ↓
Reads VITE_API_URL from .env.production (https://your-backend-url.com)
    ↓
Deployed Backend API
```

## 🚀 API Service Layer

All API calls now use a centralized service (`fronted/src/services/api.js`):

```javascript
import apiClient from '../services/api';

// Instead of:
// axios.get('http://localhost:3000/api/food')

// Now use:
apiClient.get('/api/food');
```

This ensures:
- ✅ Single source of truth for API configuration
- ✅ Automatic handling of credentials (withCredentials: true)
- ✅ Easy to switch between dev/prod
- ✅ Cleaner code

## ✨ Environment Variables

**Vite uses `VITE_` prefix for exposed variables:**

```javascript
// In components:
console.log(import.meta.env.VITE_API_URL) // Only VITE_* are exposed
console.log(import.meta.env.SECRET_KEY)   // undefined (not exposed)
```

## 🔗 Useful Resources

- [Vite Environment Variables](https://vitejs.dev/guide/env-and-modes.html)
- [Render Deployment](https://docs.render.com/)
- [Vercel Environment Variables](https://vercel.com/docs/concepts/projects/environment-variables)
- [CORS Configuration](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS)

## ⚠️ Troubleshooting

**Q: Still getting 404 errors?**
- Check that `VITE_API_URL` is set correctly in `.env.production`
- Verify backend is deployed and accessible
- Check backend CORS settings
- Verify cookies/credentials are being sent

**Q: How do I find my backend URL?**
- After deploying to Render/Railway, check the dashboard for the generated URL
- Example: `https://foodreels-api-xxxx.onrender.com`

**Q: How do I test before going live?**
- Deploy backend first
- Update `.env.local` with backend URL and test locally
- Then deploy frontend to Vercel

---

## Summary

1. ✅ **API configuration fixed** - Using `VITE_API_URL` environment variable
2. ✅ **All 9 files updated** - Using centralized API service
3. 📝 **Backend deployment needed** - Choose Render/Railway/Heroku
4. 🔧 **CORS must be updated** - Add Vercel domain to allowed origins
5. 🚀 **Ready for production** - Just add backend URL and redeploy
