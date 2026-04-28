# 🎬 Baro Cinema Backend

Backend API for the Baro Cinema application.
Handles movie management, seat reservations, and user authentication.

---

## 🚀 Features

* 🎥 Movie management (CRUD)
* 💺 Seat reservation system
* 👤 User authentication & authorization
* 🛡️ Admin-protected routes
* 🖼️ Image upload support (movie images)
* 🌐 CORS configured for frontend integration

---

## 🛠️ Tech Stack

* **Node.js**
* **Express.js**
* **Middleware-ek:**

    * auth
    * bcryptjs
    * cookie-parser
    * cors
    * dotenv
    * express
    * jsonwebtoken
    * multer
    * mysql2
 
* **File upload:** custom middleware

---

## 📂 Project Structure

```
baro_cinema_backend/
│
├── config/
│   └── dotenvConfig.js
│
├── controllers/
│   ├── movieController.js
│   ├── seatController.js
│   └── userController.js
│
├── database/
│   └── database.js
│
├── middleware/
│   ├── adminMiddleware.js
│   ├── uploadMovieImage.js
│   └── userMiddleware.js
│
├── models/
│   ├── movieModels.js
│   ├── seatModels.js
│   └── userModels.js
│
├── routes/
│   ├── movieRoutes.js
│   ├── seatRoutes.js
│   └── userRoutes.js
│
├── uploads/           # statikus fájlok (képek)
├── app.js             # Express app konfiguráció
├── server.js          # szerver indítás
├── package.json
└── .gitignore
```

---

## ⚙️ Installation

```bash
git clone https://github.com/varoli50/baro_cinema_backend.git
cd baro_cinema_backend
npm install
```

---

## ▶️ Running the Project

Development módban:

```bash
npm run dev
```

Production módban:

```bash
npm start
```

---

## 🔑 Environment Variables

Hozz létre egy `.env` fájlt a gyökérben:

```
.env adatok 
```

---

## 📡 Routes
```
app.use('/user', userRoutes)
app.use('/movies', movieRoutes)
app.use("/api/uploads", express.static("uploads"), movieRoutes);
app.use('/seats', seatRoutes)
```

### 👤 User

```
/user
```

* Regisztráció
* Bejelentkezés
* Auth kezelés

---

### 🎥 Movies

```
/movies
```

* GET – összes film
* POST – új film (admin)
* PUT – film módosítása (admin)
* DELETE – film törlése (admin)

---

### 💺 Seats

```
/seats
```

* Ülések lekérdezése
* Foglalás kezelése

---

### 🖼️ Static Files

```
/api/uploads
```

* Film képek elérése

---

## 🌐 CORS Configuration

Engedélyezett origin-ek:

* http://127.0.0.1:5173
* http://localhost:5173
* http://192.168.9.110:5173
* https://barocinema.netlify.app

---

## 🛡️ Middleware

* **userMiddleware** → autentikáció
* **adminMiddleware** → admin jogosultság
* **uploadMovieImage** → képfeltöltés

---

## 🧪 Testing

```bash
npm test
```

(vagy manuális API teszt Postman-nel)
Ide kellenek Postman képek

---


## 👨‍💻 Author

* varoli50

---

## 📄 License

ChatGPT
W3Schools
