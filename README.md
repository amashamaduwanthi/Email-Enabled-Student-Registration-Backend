
# 🎓 Student Registration System with Email Confirmation

This project is a Node.js and Express backend service that allows students to register with their name, email, and class, stores their data in Firestore, and sends them a confirmation email using NodeMailer.

---

## 🚀 Features

- 📚 Student registration with field validation
- 🔐 Stores data in FireStore
- ✉️ Sends styled confirmation email using NodeMailer
- 🆔 Auto-generates a unique registration ID
- 📦 Organized with controllers, services, and router functions

---

## 🛠️ Technologies Used

- **Node.js**
- **Express.js**
- **Firestore**
- **NodeMailer**
- **uuid**
- **dotenv**

---

## 📁 Project Structure

```
├── controllers/
│   └── studentController.js
├── routes/
│   └── studentRoutes.js
├── services/
│   └── emailService.js
├── firebase/
│   └── firebaseConfig.js
├── .env
├── server.js
├── package.json
└── README.md
```

---

## 🧪 Installation and Usage

### 1. Clone the repository

```bash
git clone https://github.com/amashamaduwanthi/Email-Enabled-Student-Registration-Backend.git
cd email-enable-student-registration
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up  Email credentials

Create a `.env` file in the root folder and add:



### 4. Start the server

```bash
npm start
```

---

## 📬 API Endpoint

**POST** `http://localhost:5000/api/students/register`

Request body:

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "className": "Grade 10"
}
```

---

## 👩‍💻 Author

**Amasha Maduwathi**  
Intern at DETZ Global Pvt Ltd

---

## 🎥 Demo Video

📺 [Watch the Demo](https://drive.google.com/file/d/1kJR3-Z_94k9CtZpoTXXpWS6FK-2624e9/view?usp=sharing)
