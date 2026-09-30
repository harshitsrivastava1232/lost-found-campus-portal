# 🎒 Lost & Found Campus Portal

**A campus platform for posting and searching lost or found items, with category and location-based filtering.**

---

## 🚀 Overview

Lost & Found Campus Portal is a full-stack MERN application built for students and staff to report items they've lost or found around campus. Every post carries category, location, date, and contact details, so the right person can be reached quickly — and posts can be marked resolved once an item is returned.

---

## ✨ Key Features

- 📝 Post a lost or found item with title, description, category, and location
- 🔎 Search items by keyword across title, description, and location
- 🗂️ Filter by category (Electronics, Documents, ID Card, Keys, and more)
- 🏷️ Filter by status — Lost / Found / All
- ✅ Mark a post as resolved once the item is returned to its owner
- 📊 Live homepage stats — active lost, active found, and resolved counts
- 📞 Contact details (name, email, phone) shown on each item so people can connect directly
- 📱 Fully responsive interface

---

## 🛠️ Tech Stack

### Frontend
- React.js
- Vite
- React Router
- Tailwind CSS
- Axios
- Lucide React

### Backend
- Node.js
- Express.js
- REST APIs

### Database
- MongoDB
- MongoDB Atlas

### Tools & Deployment
- Git, GitHub
- Vercel (frontend)
- Render (backend)

---

## 📂 Project Structure

```
lost-found-campus-portal/
│
├── backend/
│   ├── config/
│   │   └── db.js
│   ├── controllers/
│   │   └── itemController.js
│   ├── models/
│   │   └── Item.js
│   ├── routes/
│   │   └── itemRoutes.js
│   ├── package.json
│   └── server.js
│
├── src/
│   ├── api/
│   │   └── axios.js
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Navbar.jsx
│   │   │   └── Footer.jsx
│   │   └── items/
│   │       ├── ItemCard.jsx
│   │       └── FilterBar.jsx
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── PostItem.jsx
│   │   └── ItemDetails.jsx
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
│
├── .gitignore
├── index.html
├── package.json
├── tailwind.config.js
├── vite.config.js
└── README.md
```
> Environment files such as `.env` are intentionally excluded from the repository for security.

---

## 🔌 API Reference

| Method | Endpoint                  | Description                          |
|--------|----------------------------|---------------------------------------|
| GET    | `/api/items`               | Get all items (supports `search`, `status`, `category` query params) |
| GET    | `/api/items/:id`           | Get a single item by ID              |
| POST   | `/api/items`                | Create a new lost/found post         |
| PUT    | `/api/items/:id`           | Update an item (e.g. mark resolved)  |
| DELETE | `/api/items/:id`           | Delete an item                       |
| GET    | `/api/items/stats/summary` | Get homepage stats (lost/found/resolved counts) |

---

## ⚙️ Local Setup

### 1. Clone the repository
```
git clone https://github.com/harshitsrivastava1232/lost-found-campus-portal.git
cd lost-found-campus-portal
```

### 2. Install frontend dependencies
```
npm install
```

### 3. Install backend dependencies
```
cd backend
npm install
cd ..
```

### 4. Configure environment variables

Create a `.env` file in the project root:
```
VITE_API_URL=http://localhost:5000
```

Create another `.env` file inside the `backend` folder:
```
PORT=5000
MONGODB_URI=your_mongodb_atlas_connection_string
```
> Never commit `.env` files or database credentials to GitHub.

### 5. Start the backend
```
cd backend
npm run dev
```
Runs on `http://localhost:5000`

### 6. Start the frontend
```
npm run dev
```
Runs on `http://localhost:5173`

---

## 🔮 Future Improvements

- User authentication (login/signup)
- Image upload instead of image URL field
- Email notifications when a matching item is posted
- Admin dashboard for moderating posts
- Comments/claim requests on a post
- Custom domain deployment

---

## 👨‍💻 Author

**Harshit Srivastava**
B.Tech Computer Science Engineering

**GitHub:** https://github.com/harshitsrivastava1232
**LinkedIn:** https://www.linkedin.com/in/harshit-srivastava123

---

## 📄 License

This project is intended for educational, portfolio, and demonstration purposes.
