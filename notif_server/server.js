const express = require('express');
const bodyParser = require('body-parser');
const WebSocket = require('ws');
const http = require('http');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const PORT = 3001;
const hostName = "127.0.0.1";

const server = http.createServer(app);
const wss = new WebSocket.Server({ server });
const cosrOption = {
    origin: ['http://127.0.0.1:5500'],
    
};
app.use(cors(cosrOption)); 
wss.on('connection', (ws) => {
    console.log(`connecting to ws`);

    ws.on('message', (message) => {
        console.log(`Received: `, message);
    });

    ws.on('close', () => console.log(`disconnected`));
});

// Endpoint Send Message
app.post('/send-message', cors(cosrOption), async (req, res) => {
    const { message, name } = req.body;

    if (!message || !name) {
        return res.status(422).json({
            data: [],
            message: "Name and message are required!"
        });
    }

    try {
        wss.clients.forEach(client => {
            if (client.readyState === WebSocket.OPEN) {
                client.send(JSON.stringify({ message, name }));
            }
        });

        res.status(200).json({
            data: { message, name },
            message: "Send message success!"
        });
    } catch (error) {
        console.error("Error:", error.message);
        res.status(500).json({ error: error.message });
    }
});

// Endpoint Home
app.get("/", (req, res) => {
    res.send({
        message: "Welcome to my sosmed backend services!"
    });
});


server.listen(PORT, () => console.log(`Server running at http://${hostName}:${PORT}`));