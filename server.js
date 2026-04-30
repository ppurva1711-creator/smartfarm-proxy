const express = require("express");
const axios = require("axios");

const app = express();
app.use(express.json());

// 🔐 same secret as ESP/backend
const SECRET = "abc123";

// 🔥 Railway backend
const MAIN_SERVER = "https://smartfarmapp-production.up.railway.app";

// ================================
// GET MOTOR STATE (ESP calls this)
// ================================
app.get("/motor", async(req, res) => {
    try {
        const { deviceId } = req.query;

        const response = await axios.get(
            `${MAIN_SERVER}/api/motor`, {
                params: { deviceId, secret: SECRET },
                timeout: 5000 // 🔥 ADD THIS
            }
        );

        res.json(response.data);

    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: "Proxy error" });
    }
});

// ================================
// POST MOTOR STATE
// ================================
app.post("/motor", async(req, res) => {
    try {
        const body = {
            ...req.body,
            secret: SECRET // ✅ inject here
        };

        const response = await axios.post(
            `${MAIN_SERVER}/api/motor`, {
                params: { deviceId, secret: SECRET },
                timeout: 5000 // 🔥 ADD THIS
            }
        );

        res.json(response.data);

    } catch (err) {
        console.error("ERROR:", err.response ? err.response.data || err.message : err.message);
        res.status(500).json({ error: "Proxy error" });
    }
});

// ================================
// SENSOR DATA
// ================================
app.post("/sensor", async(req, res) => {
    try {
        const body = {
            ...req.body,
            secret: SECRET // ✅ inject here
        };

        const response = await axios.post(
            `${MAIN_SERVER}/api/sensor-data`,
            body
        );

        res.json(response.data);

    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: "Proxy error" });
    }
});

// ================================
app.get("/", (req, res) => {
    res.send("Proxy Running ✅");
});

// ================================
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("Proxy started on port", PORT));