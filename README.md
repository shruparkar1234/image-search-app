# 🔍 Image Search App

<div align="center">

![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)
![MongoDB](https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white)
![Passport](https://img.shields.io/badge/Passport-34E27A?style=for-the-badge&logo=passport&logoColor=white)

**A modern, full-stack image search application with OAuth authentication and search history tracking**

[Features](#-features) • [Demo](#-demo) • [Installation](#-installation) • [Tech Stack](#-tech-stack) • [License](#-license)

</div>

---

## 📖 Description

Image Search App is a feature-rich web application that allows users to search for high-quality images using the Unsplash API. The app provides secure authentication via Google and GitHub OAuth, tracks user search history, displays trending searches, and offers an intuitive, modern UI with smooth animations and responsive design.

## ✨ Features

### 🔐 Authentication
- **OAuth 2.0 Integration** - Secure login with Google and GitHub
- **Session Management** - Persistent user sessions with Express Session
- **Protected Routes** - Authenticated access to search functionality

### 🔎 Search Functionality
- **Real-time Image Search** - Powered by Unsplash API
- **Multi-select Images** - Select and track multiple images
- **Top Searches** - View most popular search terms across all users
- **Search History** - Personal search history with timestamps

### 📊 History Management
- **Time-based Clearing** - Clear history by time range:
  - Last Hour
  - Last 24 Hours
  - Last 7 Days
  - All Time
- **Quick Clear** - One-click clear all searches option

### 🎨 UI/UX
- **Modern Design** - Beautiful gradients and animations
- **Responsive Layout** - Works seamlessly on all devices
- **Smooth Animations** - Engaging transitions and hover effects
- **Interactive Elements** - Pulse, glow, and slide animations
- **Custom Scrollbars** - Styled scrollbars for enhanced aesthetics

### 🚀 Performance
- **Fast Loading** - Optimized image loading
- **Efficient Queries** - MongoDB aggregation for analytics
- **Session Caching** - Quick authentication checks

---

## 🎥 Demo

### Login Page
Beautiful animated login page with Google and GitHub OAuth options

### Search Interface
Modern search interface with image grid, selection capabilities, and history tracking

---

## 🛠️ Tech Stack

### Frontend
| Technology | Version | Purpose |
|------------|---------|---------|
| **React** | 18.2.0 | UI Framework |
| **React Router** | 6.16.0 | Client-side routing |
| **Axios** | 1.5.0 | HTTP client |
| **CSS3** | - | Styling & animations |

### Backend
| Technology | Version | Purpose |
|------------|---------|---------|
| **Node.js** | - | Runtime environment |
| **Express** | 4.18.2 | Web framework |
| **MongoDB** | - | Database |
| **Mongoose** | 7.8.7 | ODM for MongoDB |
| **Passport.js** | 0.6.0 | Authentication middleware |
| **Express Session** | 1.17.3 | Session management |

### APIs & Services
- **Unsplash API** - Image search and retrieval
- **Google OAuth 2.0** - Google authentication
- **GitHub OAuth 2.0** - GitHub authentication

---

## 📁 Project Structure

```
image-search-app/
├── client/                      # Frontend React application
│   ├── public/
│   │   ├── index.html
│   │   ├── manifest.json
│   │   └── robots.txt
│   ├── src/
│   │   ├── pages/
│   │   │   ├── Login.js        # Login page component
│   │   │   ├── Login.css       # Login page styles
│   │   │   ├── SearchPage.js   # Main search interface
│   │   │   └── SearchPage.css  # Search page styles
│   │   ├── components/         # Reusable components
│   │   ├── api.js              # Axios configuration
│   │   ├── App.js              # Main app component
│   │   ├── App.css             # Global styles
│   │   ├── index.js            # Entry point
│   │   └── index.css           # Base styles
│   ├── package.json
│   └── README.md
│
├── server/                      # Backend Node.js application
│   ├── models/
│   │   ├── User.js             # User schema
│   │   └── SearchRecord.js     # Search history schema
│   ├── routes/
│   │   ├── auth.js             # Authentication routes
│   │   └── api.js              # API routes
│   ├── passport-config.js      # Passport configuration
│   ├── index.js                # Server entry point
│   ├── .env                    # Environment variables
│   └── package.json
│
└── README.md                    # Project documentation
```

---

## 🚀 Installation

### Prerequisites
- **Node.js** (v14 or higher)
- **MongoDB** (local or Atlas)
- **Unsplash API Key** ([Get it here](https://unsplash.com/developers))
- **Google OAuth Credentials** ([Setup here](https://console.cloud.google.com/))
- **GitHub OAuth App** ([Create here](https://github.com/settings/developers))

### Step 1: Clone the Repository
```bash
git clone:- https://github.com/shruparkar1234/image-search-app-2.git
cd image-search-app
```

### Step 2: Setup Backend

#### Navigate to server directory
```bash
cd server
```

#### Install dependencies
```bash
npm install
```

#### Create `.env` file
```bash
touch .env
```

#### Add environment variables
```env
# MongoDB
MONGO_URI=mongodb://localhost:27017/image-search-app
# or MongoDB Atlas
# MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/image-search-app

# Session Secret
SESSION_SECRET=your-super-secret-session-key-change-this

# Google OAuth
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret

# GitHub OAuth
GITHUB_CLIENT_ID=your-github-client-id
GITHUB_CLIENT_SECRET=your-github-client-secret

# Unsplash API
UNSPLASH_ACCESS_KEY=your-unsplash-access-key

# Server Configuration
PORT=5050
CLIENT_URL=http://localhost:3000
```

#### Start the server
```bash
npm start
# or for development with auto-reload
npm run dev
```

Server will run on `http://localhost:5050`

### Step 3: Setup Frontend

#### Open new terminal and navigate to client directory
```bash
cd client
```

#### Install dependencies
```bash
npm install
```

#### Start the React app
```bash
npm start
```

Client will run on `http://localhost:3000`

---

## ⚙️ Configuration

### OAuth Setup

#### Google OAuth 2.0
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing
3. Enable Google+ API
4. Create OAuth 2.0 credentials
5. Add authorized redirect URI: `http://localhost:5050/auth/google/callback`
6. Copy Client ID and Client Secret to `.env`

#### GitHub OAuth
1. Go to [GitHub Developer Settings](https://github.com/settings/developers)
2. Create a new OAuth App
3. Set Authorization callback URL: `http://localhost:5050/auth/github/callback`
4. Copy Client ID and Client Secret to `.env`

#### Unsplash API
1. Go to [Unsplash Developers](https://unsplash.com/developers)
2. Create a new application
3. Copy Access Key to `.env`

---

## 📝 API Endpoints

### Authentication Routes
```
GET  /auth/google              # Initiate Google OAuth
GET  /auth/google/callback     # Google OAuth callback
GET  /auth/github              # Initiate GitHub OAuth
GET  /auth/github/callback     # GitHub OAuth callback
GET  /auth/logout              # Logout user
```

### API Routes (Protected)
```
GET    /api/me                           # Get current user
POST   /api/search                       # Search images
GET    /api/history                      # Get user search history
DELETE /api/history?timeRange=<range>   # Clear history by time range
GET    /api/top-searches                 # Get top searches
DELETE /api/top-searches                 # Clear all searches
```

---

## 🎨 Features Showcase

### Animated Login
- Gradient background with animation
- Smooth button transitions
- Glow effects on buttons
- Slide-in animations

### Search Interface
- Real-time image search
- Grid layout with hover effects
- Image zoom on hover
- Multi-select functionality
- Selected count display

### History Management
- Dropdown menu with time options
- Confirmation dialogs
- Smooth animations
- Empty state messages

### Responsive Design
- Mobile-friendly layout
- Touch-optimized controls
- Adaptive grid system
- Flexible navigation

---

## 🧪 Testing

### Run Tests
```bash
# Frontend tests
cd client
npm test

# Backend tests (if configured)
cd server
npm test
```

---

## 🚢 Deployment

### Frontend (Vercel/Netlify)
```bash
cd client
npm run build
# Deploy the build folder
```

### Backend (Heroku/Railway)
```bash
cd server
# Set environment variables in hosting platform
# Deploy using platform-specific method
```

### Environment Variables for Production
Update the following in production:
- `CLIENT_URL` - Your frontend URL
- `MONGO_URI` - Production MongoDB URI
- Update OAuth callback URLs in provider settings

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the **MIT License** - see below for details:

```
MIT License

Copyright (c) 2025 Image Search App

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

---

## 👨‍💻 Author

**Shrushti Parkar**

- GitHub: [@shruparkar1234](https://github.com/shruparkar1234)
- LinkedIn: [Connect with me](https://www.linkedin.com/in/yourprofile)
- Email: your.email@example.com

---

## 🙏 Acknowledgments

- [Unsplash](https://unsplash.com/) - For providing the amazing image API
- [Passport.js](http://www.passportjs.org/) - For authentication strategies
- [MongoDB](https://www.mongodb.com/) - For the database solution
- [React](https://reactjs.org/) - For the powerful UI framework

---

## 📞 Support

If you encounter any issues or have questions:

1. Check the [Issues](https://github.com/shruparkar1234/image-search-app/issues) page
2. Create a new issue with detailed description
3. Contact the author directly

---

## 🗺️ Roadmap

Future enhancements planned:

- [ ] Image download functionality
- [ ] User favorites/collections
- [ ] Advanced search filters
- [ ] Image sharing capabilities
- [ ] Dark mode toggle
- [ ] Social media integration
- [ ] Search suggestions/autocomplete
- [ ] Image analytics dashboard
- [ ] Export search history
- [ ] Multi-language support

---

<div align="center">

### ⭐ Star this repository if you find it helpful!

**Made with ❤️ by Shrushti Parkar**

[Back to Top](#-image-search-app)

</div>
