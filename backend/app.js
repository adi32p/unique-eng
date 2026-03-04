const express = require("express");
const cors = require("cors");
const authRoutes = require("./routes/auth.routes");
const adminRoutes = require("./routes/admin.routes");
const serviceRoutes = require("./routes/service.routes");
const requestRoutes = require("./routes/request.routes");
const newsRoutes = require("./routes/news.routes");
const licenseRoutes = require("./routes/license.routes");
const projectRoutes = require("./routes/project.routes");
const notificationRoutes = require("./routes/notification.routes");
require("./jobs/licenseReminder.job");
require("./jobs/expiryReminder");

const app = express();

// Middlewares
const corsOptions = {
  origin: ["http://localhost:5173", "http://localhost:8080", "https://uniqueeng.vercel.app"],
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
};

app.use(cors(corsOptions));
app.options("*", cors(corsOptions)); // handle preflight
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/services",serviceRoutes);
app.use("/api/requests", requestRoutes);
app.use("/api/news", newsRoutes);
app.use("/api/licenses", licenseRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/notifications", notificationRoutes);

//User Dashboard Route
app.use("/api/user/dashboard", require("./routes/userDashboard.routes"));
app.use("/api/user-services", require("./routes/userService.routes"));




// Test Route
app.get("/", (req, res) => {
  res.json({ message: "UniqueEPC Backend Running 🚀" });
});

module.exports = app;
