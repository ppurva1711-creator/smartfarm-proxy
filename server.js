const express = require("express");
const axios = require("axios");

const app = express();
app.use(express.json());

const SECRET = "abc123";
const MAIN_SERVER = "https://smartfarmapp-production.up.railway.app";

// GET MOTOR
app.get("/motor", async(req, res) => {
    try {
        const { deviceId } = req.query;

        const response = await axios.get(`${MAIN_SERVER}/api/motor`, {
            params: { deviceId, secret: SECRET },
            timeout: 5000
        });

        res.json(response.data);
    } catch (err) {
        console.error("GET ERROR:", err.message);
        res.status(500).json({ error: "Proxy error" });
    }
});

// POST MOTOR
app.post("/motor", async(req, res) => {
    try {
        const response = await axios.post(
            `${MAIN_SERVER}/api/motor`, {...req.body, secret: SECRET }, { timeout: 5000 }
        );

        res.json(response.data);
    } catch (err) {
        console.error("POST ERROR:", err.message);
        res.status(500).json({ error: "Proxy error" });
    }
});

// SENSOR
app.post("/sensor", async(req, res) => {
    try {
        const response = await axios.post(
            `${MAIN_SERVER}/api/sensor-data`, {...req.body, secret: SECRET }, { timeout: 5000 }
        );

        res.json(response.data);
    } catch (err) {
        console.error("SENSOR ERROR:", err.message);
        res.status(500).json({ error: "Proxy error" });
    }
});

app.get("/", (req, res) => {
    res.send("Proxy Running ✅");
});

const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Proxy running on ${PORT}`));