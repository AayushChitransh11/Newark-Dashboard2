const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const cors = require("cors");

dotenv.config();
connectDB();

const app = express();
app.use(express.json());
app.use(cors());

// ✅ Registering API Routes
app.use("/api/auth", require("./routes/authRoutes"));         // Authentication
app.use("/api/organisation", require("./routes/organisationRoutes")); // Organisation CRUD
// app.use("/api/participant", require("./routes/participantRoutes"));   // Participant CRUD
// app.use("/api/provider", require("./routes/providerRoutes"));         // Provider CRUD
// app.use("/api/service", require("./routes/serviceRoutes"));           // Services
// app.use("/api/payment", require("./routes/paymentRoutes"));           // Payments
// app.use("/api/evaluation", require("./routes/evaluationRoutes"));     // Evaluations
app.use("/api/users", require("./routes/userRoutes"));
// Default route
app.get("/", (req, res) => {
    res.send("API is running...");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
