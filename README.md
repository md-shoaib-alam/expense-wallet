# 💰 Expense Wallet

A full-stack expense tracking application built with React Native (Expo) and Node.js, featuring real-time transaction management, user authentication, and beautiful UI design.

## 🚀 Features

- **📱 Cross-platform Mobile App**: Built with React Native and Expo for iOS and Android
- **🔐 Secure Authentication**: Powered by Clerk for user management
- **💳 Transaction Management**: Add, view, and categorize expenses
- **📊 Balance Tracking**: Real-time balance updates and transaction history
- **🎨 Modern UI/UX**: Beautiful, intuitive interface with smooth animations
- **⚡ Real-time Updates**: Instant synchronization between app and backend
- **🔒 Rate Limiting**: Built-in protection against abuse
- **📱 Responsive Design**: Optimized for all screen sizes

## 🏗️ Project Structure

```
expense-wallet/
├── 📱 mobile/                 # React Native mobile application
│   ├── app/                   # App screens and navigation
│   ├── components/            # Reusable UI components
│   ├── constants/             # App constants and configuration
│   ├── hooks/                 # Custom React hooks
│   ├── lib/                   # Utility functions
│   └── assets/                # Images, fonts, and styles
├── 🖥️ backend/                # Node.js backend server
│   ├── src/
│   │   ├── config/            # Database and service configurations
│   │   ├── controllers/       # API endpoint controllers
│   │   ├── middleware/        # Express middleware
│   │   └── routes/            # API route definitions
│   └── Server.js              # Main server file
└── 📖 README.md               # This file
```

## 🛠️ Tech Stack

### Frontend (Mobile)
- **React Native** - Cross-platform mobile development
- **Expo** - Development platform and tools
- **Expo Router** - File-based routing system
- **Clerk** - Authentication and user management
- **React Native Reanimated** - Smooth animations
- **TypeScript** - Type safety and better development experience

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web application framework
- **Neon Database** - Serverless PostgreSQL
- **Upstash Redis** - Rate limiting and caching
- **CORS** - Cross-origin resource sharing

## 📋 Prerequisites

Before running this project, make sure you have the following installed:

- **Node.js** (v18 or higher)
- **npm** or **yarn**
- **Expo CLI** (`npm install -g @expo/cli`)
- **Git**

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/expense-wallet.git
cd expense-wallet
```

### 2. Backend Setup

```bash
cd backend

# Install dependencies
npm install

# Create environment variables
cp .env.example .env
# Edit .env with your configuration

# Start development server
npm run dev
```

**Environment Variables Required:**
```env
DATABASE_URL=your_neon_database_url
UPSTASH_REDIS_REST_URL=your_upstash_redis_url
UPSTASH_REDIS_REST_TOKEN=your_upstash_redis_token
CLERK_SECRET_KEY=your_clerk_secret_key
```

### 3. Mobile App Setup

```bash
cd mobile

# Install dependencies
npm install

# Start the Expo development server
npm start
```

### 4. Running the App

- **Android**: Press `a` in the terminal or scan QR code with Expo Go app
- **iOS**: Press `i` in the terminal or scan QR code with Camera app
- **Web**: Press `w` in the terminal

## 📱 App Screens

- **Sign In/Sign Up**: User authentication screens
- **Home**: Transaction overview and balance display
- **Create**: Add new transactions
- **Settings**: User preferences and sign out

## 🔧 Development

### Backend Development

```bash
cd backend

# Development mode with auto-reload
npm run dev

# Production mode
npm start
```

### Mobile Development

```bash
cd mobile

# Start Expo development server
npm start

# Run on specific platform
npm run android
npm run ios
npm run web

# Lint code
npm run lint
```

## 📊 API Endpoints

- `GET /api/transactions` - Get user transactions
- `POST /api/transactions` - Create new transaction
- `PUT /api/transactions/:id` - Update transaction
- `DELETE /api/transactions/:id` - Delete transaction

## 🗄️ Database Schema

The application uses a PostgreSQL database with the following main tables:
- **users**: User account information
- **transactions**: Expense and income records
- **categories**: Transaction categories

## 🚀 Deployment

### Backend Deployment
The backend can be deployed to various platforms:
- **Vercel** - Serverless deployment
- **Railway** - Easy Node.js hosting
- **Heroku** - Traditional hosting
- **DigitalOcean** - VPS hosting

### Mobile App Deployment
- **Expo Application Services (EAS)** - Build and submit to app stores
- **Expo Go** - Development and testing

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the ISC License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Expo** team for the amazing development platform
- **Clerk** for secure authentication
- **Neon** for serverless PostgreSQL
- **Upstash** for Redis services

## 📞 Support

If you have any questions or need help:

- Create an [issue](https://github.com/md-shoaib-alam/expense-wallet/issues)
- Check the [documentation](https://docs.expo.dev/)
- Join our [Discord community](https://chat.expo.dev)

## 🔮 Roadmap

- [ ] Budget planning and goals
- [ ] Expense analytics and charts
- [ ] Receipt scanning with OCR
- [ ] Multi-currency support
- [ ] Export to CSV/PDF
- [ ] Dark mode theme
- [ ] Push notifications
- [ ] Offline support

---

**Made with ❤️ by [Shoaib alam]**

*Star this repository if you found it helpful!*
