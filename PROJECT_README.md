# FoodReels - Project Description & README

## 📱 FoodReels: The Short-Form Video Platform for Food Discovery

### One-Line Pitch
**"TikTok meets DoorDash" — Discover food through short-form videos and order directly from local partners.**

---

## 🎯 Problem Statement

**For Customers:**
- Spending 30+ minutes scrolling through endless menus and photos
- Overwhelmed by too many choices with no visual context
- Can't distinguish quality restaurants from average ones

**For Food Businesses:**
- Expensive traditional marketing (Google, Facebook ads cost $1,000s/month)
- Limited reach to potential customers in their area
- Long sales cycles and low conversion from static photos

**For the Industry:**
- Food delivery is stuck in 2005 (lists, photos, text reviews)
- No platform celebrates food as a visual, storytelling medium
- Small businesses can't compete with big chains on marketing budgets

---

## 💡 Solution: FoodReels

A modern, video-first platform where:
- **Customers** discover food through short-form videos (15-60 seconds) and order with one tap
- **Food Partners** (restaurants, chefs, small businesses) showcase their craft authentically and grow their business for free
- **Community** builds around real food and passionate creators

### Key Features

#### For Customers
✅ **Swipeable Video Feed** — TikTok-like interface with food videos from local partners
✅ **One-Tap Ordering** — Tap "Visit Store" → View menu → Place order
✅ **Discovery Algorithm** — Personalized recommendations based on viewed content
✅ **Reviews & Ratings** — See real customer feedback before ordering
✅ **Favorites & Following** — Save favorite dishes and follow preferred partners
✅ **Autoplay & Muted** — Mobile-optimized viewing experience

#### For Food Partners
✅ **Easy Video Upload** — Simple form: name, description, video file
✅ **Partner Dashboard** — Track uploads, views, orders, and customer inquiries
✅ **Verified Profile** — Build trust with customers
✅ **Order Management** — See and manage all orders from one place
✅ **Free Platform** — No listing fees, no subscription required
✅ **Analytics** — Understand which videos drive orders

#### For All Users
✅ **Secure Authentication** — User & Partner login with JWT tokens
✅ **Cloud Storage** — Videos hosted on ImageKit (fast, global delivery)
✅ **Mobile-First Design** — Fully responsive on phones, tablets, desktop
✅ **Real-Time Updates** — See new videos and orders instantly

---

## 🛠️ Tech Stack

### Frontend
- **React 18** — Modern UI framework
- **React Router** — Client-side routing
- **Axios** — API calls
- **CSS3** — Custom styling with mobile-first design
- **Vite** — Fast build tool
- **JavaScript ES6+** — Modern JavaScript features

### Backend
- **Node.js + Express** — REST API server
- **MongoDB + Mongoose** — NoSQL database
- **JWT** — Secure token-based authentication
- **bcryptjs** — Password hashing
- **Multer** — File upload handling
- **ImageKit** — Cloud image/video storage and delivery
- **Cookie Parser** — HTTP cookie handling
- **CORS** — Cross-origin resource sharing

### Infrastructure
- **MongoDB Atlas** — Managed database
- **ImageKit** — CDN & cloud storage
- **Localhost:3000** — Backend API
- **Localhost:5175** — Frontend dev server

---

## 📁 Project Structure

```
interview/
├── backend/
│   ├── src/
│   │   ├── app.js                 # Express app setup
│   │   ├── server.js              # Server entry point
│   │   ├── db/
│   │   │   └── db.js              # MongoDB connection
│   │   ├── controllers/
│   │   │   ├── auth.controller.js # User & partner auth
│   │   │   └── food.controller.js # Food CRUD & retrieval
│   │   ├── middlewares/
│   │   │   └── auth.middleware.js # JWT verification
│   │   ├── model/
│   │   │   ├── user.model.js
│   │   │   ├── foodpartner.model.js
│   │   │   └── food.model.js
│   │   ├── routers/
│   │   │   ├── auth.routers.js    # Auth endpoints
│   │   │   └── food.routers.js    # Food endpoints
│   │   └── services/
│   │       └── stroage.services.js # ImageKit integration
│   ├── .env                        # Environment variables
│   ├── package.json
│   └── server.js
│
├── fronted/
│   ├── src/
│   │   ├── App.jsx                # Main app component
│   │   ├── main.jsx               # Entry point
│   │   ├── css/
│   │   │   ├── home.css           # Home page styles (reels)
│   │   │   ├── auth.css           # Auth pages styles
│   │   │   └── variables.css      # CSS variables
│   │   ├── pages/
│   │   │   ├── UserRegister.jsx
│   │   │   ├── UserLogin.jsx
│   │   │   ├── PartnerRegister.jsx
│   │   │   ├── PartnerLogin.jsx
│   │   │   └── Home.jsx           # Main video feed
│   │   ├── general/
│   │   │   └── Home.jsx           # Reels page
│   │   ├── food-parnter/
│   │   │   ├── Profile.jsx        # Partner dashboard
│   │   │   ├── CreateFoodParnter.jsx # Video upload form
│   │   │   └── PartnerProfile.jsx # View partner profile
│   │   ├── routers/
│   │   │   └── AppRoutes.jsx      # Route definitions
│   │   └── assets/
│   ├── index.html
│   ├── package.json
│   └── vite.config.js
│
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v14+)
- npm or yarn
- MongoDB Atlas account
- ImageKit account

### Installation

**1. Clone the repository:**
```bash
git clone https://github.com/yourusername/foodreels.git
cd foodreels
```

**2. Backend setup:**
```bash
cd backend
npm install
```

Create `.env` file:
```
JWT_SECRET=your_jwt_secret_key
MONGODB_URI=mongodb+srv://user:password@cluster.mongodb.net/zomato_view
IMAGEKIT_PUBLIC_KEY=your_imagekit_public_key
IMAGEKIT_PRIVATE_KEY=your_imagekit_private_key
IMAGEKIT_URL_ENDPOINT=https://ik.imagekit.io/your_id
```

Start backend:
```bash
npx nodemon server.js
```

**3. Frontend setup:**
```bash
cd ../fronted
npm install
npm run dev
```

Open browser: `http://localhost:5175`

---

## 📖 API Documentation

### Authentication Endpoints

**Register User**
```
POST /api/auth/user/register
Body: { name, email, password }
Response: { message, user: { id, name, email } }
```

**Login User**
```
POST /api/auth/user/login
Body: { email, password }
Response: { message, user: { id, name, email } }
```

**Register Food Partner**
```
POST /api/auth/foodpartner/register
Body: { name, email, password }
Response: { message, foodPartner: { id, name, email } }
```

**Login Food Partner**
```
POST /api/auth/foodpartner/login
Body: { email, password }
Response: { message, foodPartner: { id, name, email } }
```

### Food Endpoints

**Upload Food Video**
```
POST /api/food
Headers: multipart/form-data
Body: { name, description, video }
Response: { message, food: { id, name, description, video, foodPartner } }
```

**Get All Foods**
```
GET /api/food
Response: { message, foodItems: [...] }
```

**Get Partner's Foods**
```
GET /api/food/partner/videos
Headers: Authorization (token)
Response: { message, foodItems: [...], partner: {...} }
```

---

## 🎨 Design System

### Colors (CSS Variables)
```css
--primary: #00bcd4   /* Cyan/Teal */
--accent: #ff6b6b   /* Red */
--bg: #0f0f0f       /* Dark background */
--text: #ffffff     /* White text */
```

### Typography
- **Headers:** Bold, 18px-24px
- **Body:** Regular, 14px-16px
- **Small:** 12px-13px

### Mobile-First Responsive
- **Mobile:** <= 768px (full viewport)
- **Tablet:** 768px - 1024px
- **Desktop:** > 1024px

---

## 🌟 Features Breakdown

### Video Reels (Home Feed)
- Infinite scrolling with snap-scroll effect
- IntersectionObserver autoplay (visible video plays, invisible pauses)
- Tap to toggle play/pause
- Video overlay with partner info, food name, description
- Mobile action bar (like, comment, share buttons)
- "Visit Store" button for instant ordering

### Authentication System
- Separate user and partner login flows
- JWT token stored in HTTP-only cookies
- Password hashing with bcryptjs
- Email validation

### Partner Dashboard
- View uploaded videos
- Track video views and engagement
- Manage orders
- Edit partner profile

### Video Upload
- Simple form: food name, description, video file
- File type & size validation (max 100MB)
- Video preview before upload
- ImageKit cloud storage integration

---

## 📊 Database Schema

### User Model
```javascript
{
  name: String,
  email: String (unique),
  password: String (hashed)
}
```

### FoodPartner Model
```javascript
{
  name: String,
  email: String (unique),
  password: String (hashed)
}
```

### Food Model
```javascript
{
  name: String,
  description: String,
  video: String (ImageKit URL),
  foodPartner: ObjectId (ref: FoodPartner),
  createdAt: Date
}
```

---

## 🔐 Security Features

✅ **Password Hashing** — bcryptjs with salt rounds
✅ **JWT Authentication** — Secure token-based auth
✅ **HTTP-Only Cookies** — Prevent XSS attacks
✅ **CORS** — Whitelist localhost:5173
✅ **Environment Variables** — Secrets not hardcoded
✅ **Input Validation** — Server-side validation
✅ **Email Verification** — Unique email constraint

---

## 🚧 Roadmap

### Phase 1 (Current)
✅ Video feed & autoplay
✅ User & partner authentication
✅ Video upload & storage
✅ Mobile-optimized UI

### Phase 2 (Next)
🔄 Real-time notifications
🔄 Comments & ratings system
🔄 Partner analytics dashboard
🔄 Payment integration (Stripe)

### Phase 3 (Future)
📌 Video recommendations AI
📌 Live streaming from partners
📌 Creator monetization
📌 Multi-city expansion
📌 Mobile app (iOS/Android)

---

## 🤝 Contributing

We welcome contributions! To get started:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📞 Support & Contact

**Email:** support@foodreels.com
**Website:** www.foodreels.com
**Twitter:** @FoodReelsApp
**Instagram:** @FoodReels

---

## 📄 License

This project is licensed under the MIT License — see the LICENSE file for details.

---

## 🙏 Acknowledgments

- Built with ❤️ by the FoodReels team
- Special thanks to ImageKit for video hosting
- Inspired by TikTok, Instagram Reels, and DoorDash
- Dedicated to supporting small food businesses worldwide

---

**Happy coding! 🍕🎬**

