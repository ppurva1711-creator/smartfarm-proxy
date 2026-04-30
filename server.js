const express = require("express");
const app = express();

app.use(express.json());

// ✅ IMPORTANT: Railway dynamic port
const PORT = process.env.PORT || 3000;

// ---------------- STATE ----------------
let pumpState = false; // use boolean (better for ESP32)

// ---------------- ROUTES ----------------

// Test route
app.get("/", (req, res) => {
    res.send("Server running 🚀");
});

// Turn ON
app.post("/pump/on", (req, res) => {
    pumpState = true;
    console.log("Pump ON requested");
    res.json({ status: "ON" });
});

// Turn OFF
app.post("/pump/off", (req, res) => {
    pumpState = false;
    console.log("Pump OFF requested");
    res.json({ status: "OFF" });
});

// ESP32 reads this
app.get("/pump/status", (req, res) => {
    res.json({ motor: pumpState });
});

// Optional: sensor data
app.post("/sensor", (req, res) => {
    console.log("Sensor:", req.body);
    res.json({ ok: true });
});



app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on port ${PORT}`);
});