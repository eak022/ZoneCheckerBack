const express = require("express");
const app = express();
require("dotenv").config();
const db = require("./models"); 
const storeRoutes = require('./routers/store.router'); 
const authRoutes = require('./routers/auth.routes'); // เพิ่ม auth routes
const cors = require("cors");
const PORT = process.env.PORT || 5000;

const corsOption = {
  origin: "https://zone-checker-front.vercel.app",
};

app.use(cors(corsOption));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api', storeRoutes);
app.use('/api/auth', authRoutes); // ใช้ auth routes

app.get("/", (req, res) => {
  res.send("<h1>Hello FinancialTracker API</h1>");
});

// ฟังก์ชันเพิ่ม role
// const initRole = async () => {
//   const existingRoles = await db.Role.findAll();
//   if (existingRoles.length === 0) {
//     await db.Role.create({ id: 1, name: "user" });
//     await db.Role.create({ id: 2, name: "admin" });
//   } else {
//     console.log("Roles already exist.");
//   }
// };

// Sync all models at once
db.sequelize.sync({ alter: true })
  .then(async () => {
    console.log('All tables have been created or updated.');
    // await initRole(); 
    app.listen(PORT, () => {
      console.log("Listening to http://localhost:" + PORT);
    });
  })
  .catch((error) => {
    console.error('Error creating or updating tables:', error);
  });
