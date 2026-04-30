const express = require("express");
const app = express();

app.use(express.json());

const PORT = 3000;

// 🔥 GLOBAL STATE (temporary)
let pumpState = "OFF";

// Test route
app.get("/", (req, res) => {
    res.send("Server running 🚀");
});

// Turn ON
app.post("/pump/on", (req, res) => {
    pumpState = "ON";
    console.log("Pump ON requested");
    res.json({ status: "Pump turned ON" });
});

// Turn OFF
app.post("/pump/off", (req, res) => {
    pumpState = "OFF";
    console.log("Pump OFF requested");
    res.json({ status: "Pump turned OFF" });
});

// 🔥 ESP32 will call this
app.get("/pump/status", (req, res) => {
    res.json({ state: pumpState });
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});