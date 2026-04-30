const express = require("express");
const axios = require("axios");

const app = express(); // ✅ MUST come BEFORE app.use

app.use(express.json({ limit: "1mb" }));

const SECRET = "abc123";
const MAIN_SERVER = "https://smartfarmapp-production.up.railway.app";

// ================================
// GET MOTOR
// ================================
app.get("/motor", async(req, res) => {
    try {
        const { deviceId } = req.query;

        const response = await axios.get(
            `${MAIN_SERVER}/api/motor`, {
                params: { deviceId, secret: SECRET },
                timeout: 5000
            }
        );

        res.json(response.data);
    } catch (err) {
        if (err.response && err.response.data) {
            console.error("FULL ERROR:", err.response.data);
        } else {
            console.error("FULL ERROR:", err.message);
        }
        res.status(500).json({ error: "Proxy error" });
    }
});

// ================================
// POST MOTOR
// ================================
app.post("/motor", async(req, res) => {
    try {
        const body = {
            ...req.body,
            secret: SECRET
        };

        const response = await axios.post(
            `${MAIN_SERVER}/api/motor`,
            body, { timeout: 5000 }
        );

        res.json(response.data);
    } catch (err) {
        if (err.response && err.response.data) {
            console.error("FULL ERROR:", err.response.data);
        } else {
            console.error("FULL ERROR:", err.message);
        }
        res.status(500).json({ error: "Proxy error" });
    }
});

// ================================
// SENSOR
// ================================
app.post("/sensor", async(req, res) => {
    try {
        const body = {
            ...req.body,
            secret: SECRET
        };

        const response = await axios.post(
            `${MAIN_SERVER}/api/sensor-data`,
            body, { timeout: 5000 }
        );

        res.json(response.data);
    } catch (err) {
        if (err.response && err.response.data) {
            console.error("FULL ERROR:", err.response.data);
        } else {
            console.error("FULL ERROR:", err.message);
        }
        res.status(500).json({ error: "Proxy error" });
    }
});

// ================================
app.get("/", (req, res) => {
    res.send("Proxy Running ✅");
});

// ================================
const PORT = process.env.PORT || 8080;

app.listen(PORT, "0.0.0.0", () => {
    console.log("Proxy running on", PORT);
});