# Mart - E-Commerce Platform

A modern, full-stack e-commerce web application built with React and Node.js, featuring a comprehensive admin dashboard, user authentication, shopping cart functionality, and a responsive design with light/dark theme support.

## 🚀 Features

### User Features
- **User Authentication**: Secure login/registration with JWT tokens
- **Product Browsing**: Browse products organized by categories
- **Shopping Cart**: Add/remove items with real-time updates
- **Checkout Process**: Complete order placement with shipping and payment forms
- **Order History**: View past orders and order status
- **User Profile**: Manage account information and preferences
- **Theme Toggle**: Switch between light and dark themes

### Admin Features
- **Product Management**: Add, edit, delete products with detailed information
- **User Management**: View and manage user accounts
- **Category Organization**: Organize products by categories
- **Stock Management**: Track product inventory
- **Order Processing**: View and manage customer orders

### Technical Features
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Real-time Updates**: Dynamic cart and order updates
- **Secure API**: Protected routes with JWT authentication
- **Database Integration**: MongoDB with Mongoose ODM
- **Modern UI/UX**: Clean, intuitive interface

## 🛠️ Tech Stack

### Frontend
- **React 19** - Modern React with hooks and context
- **Vite** - Fast build tool and development server
- **React Router DOM** - Client-side routing
- **Tailwind CSS** - Utility-first CSS framework
- **Context API** - State management for cart and theme

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web application framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **JWT** - JSON Web Tokens for authentication
- **bcrypt** - Password hashing
- **CORS** - Cross-origin resource sharing

## 📁 Project Structure

```
Mart/
├── client/                 # React frontend
│   ├── src/
│   │   ├── admin/         # Admin dashboard components
│   │   ├── components/    # Reusable UI components
│   │   ├── contexts/      # React contexts (Cart, Theme)
│   │   ├── hooks/         # Custom React hooks
│   │   ├── pages/         # Page components
│   │   └── utils/         # Utility functions
│   └── public/            # Static assets
├── server/                # Node.js backend
│   ├── middleware/        # Express middleware
│   ├── model/            # MongoDB models
│   ├── routes/           # API routes
│   └── server.js         # Main server file
└── README.md
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- MongoDB (local installation or MongoDB Atlas)
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd Mart
   ```

2. **Install frontend dependencies**
   ```bash
   cd client
   npm install
   ```

3. **Install backend dependencies**
   ```bash
   cd ../server
   npm install
   ```

4. **Set up environment variables**
   Create a `.env` file in the server directory:
   ```env
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
   PORT=5000
   ```

5. **Start the development servers**

   **Backend (Terminal 1):**
   ```bash
   cd server
   npm start
   ```

   **Frontend (Terminal 2):**
   ```bash
   cd client
   npm run dev
   ```

6. **Access the application**
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:5000

## 📖 Usage

### For Users
1. **Register/Login**: Create an account or sign in
2. **Browse Products**: Navigate through different categories
3. **Add to Cart**: Click "Add to Cart" on any product
4. **Checkout**: Review cart and proceed to checkout
5. **Complete Order**: Fill shipping and payment information

### For Admins
1. **Access Admin Panel**: Navigate to `/admin` route
2. **Manage Products**: Add, edit, or delete products
3. **Manage Users**: View user accounts and information
4. **Monitor Orders**: Track customer orders and status

## 🔧 API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login

### Products
- `GET /api/products` - Get all products
- `POST /api/products` - Create new product (admin)
- `PUT /api/products/:id` - Update product (admin)
- `DELETE /api/products/:id` - Delete product (admin)

### Users
- `GET /api/users` - Get all users (admin)
- `PUT /api/users/:id` - Update user (admin)
- `DELETE /api/users/:id` - Delete user (admin)

### Orders
- `POST /api/orders` - Create new order
- `GET /api/orders` - Get user orders

## 🎨 Features in Detail

### Theme System
- Light/dark theme toggle with localStorage persistence
- Consistent theming across all components
- Smooth transitions between themes

### Shopping Cart
- Real-time cart updates
- Persistent cart data
- Quantity management
- Order summary with totals

### Admin Dashboard
- Comprehensive product management
- User account administration
- Category-based product organization
- Stock and inventory tracking

## 🔒 Security Features
- JWT-based authentication
- Password hashing with bcrypt
- Protected admin routes
- CORS configuration
- Input validation and sanitization

## 🚧 Future Enhancements
- [ ] Image upload for products
- [ ] Payment gateway integration
- [ ] Email notifications
- [ ] Product reviews and ratings
- [ ] Advanced search and filtering
- [ ] Inventory alerts
- [ ] Analytics dashboard


## 👨‍💻 Author

- GitHub: (https://github.com/piyush-gif)

## 🙏 Acknowledgments

- React team for the amazing framework
- Tailwind CSS for the utility-first approach
- MongoDB team for the database solution
- All contributors and supporters

---

⭐ If you found this project helpful, please give it a star!
