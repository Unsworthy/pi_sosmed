const express = require('express');
const bodyParser = require('body-parser');
const WebSocket = require('ws');
const http = require('http');
const { student } = require('./models'); // Import model student

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const PORT = 3000;
const hostName = "127.0.0.1";

const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

wss.on('connection', (ws) => {
    console.log(`connecting to ws`);

    ws.on('message', (message) => {
        console.log(`Received: `, message);
    });

    ws.on('close', () => console.log(`disconnected`));
});

app.post('/send-message', (req, res) => {
    const { data } = req.body;

    if (!!data == false) {
        res.status(422).json({
            data: [],
            message: "no message content !"
        });
        return;
    }

    res.status(200).json({
        data: data,
        message: "send message success!"
    });
});

app.get("/", (req, res) => {
    res.send({
        message: "Welcome to my sosmed backend services!"
    });
});


app.get("/student/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const studentData = await student.findByPk(id); // Cari data berdasarkan ID
        if (!studentData) return res.status(404).json({ message: "Student not found" });
        res.status(200).json(studentData);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.post("/student", async (req, res) => {
    try {
        console.log("Request Body:", req.body); // Tambahkan log ini untuk debugging

        const { firstName, lastName, classes, major_id, gender } = req.body;

        if (!firstName || !lastName || !classes || !major_id || !gender) {
            return res.status(400).json({ message: "All fields are required!" });
        }

        const newStudent = await student.create({
            firstName,
            lastName,
            classes,
            major_id,
            gender
        });

        res.status(201).json({
            message: "Student created successfully!",
            data: newStudent
        });
    } catch (error) {
        console.error("Error:", error.message); // Tambahkan log ini untuk debugging
        res.status(500).json({ error: error.message });
    }
});

app.put("/student/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { firstName, lastName, classes, major_id, gender } = req.body;

        const updated = await student.update(
            { firstName, lastName, classes, major_id, gender },
            { where: { id } }
        );

        if (!updated[0]) return res.status(404).json({ message: "Student not found" });

        res.status(200).json({ message: "Student updated successfully!" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.delete("/student/:id", async (req, res) => {
    try {
        const { id } = req.params;

        const deleted = await student.destroy({ where: { id } });

        if (!deleted) return res.status(404).json({ message: "Student not found" });

        res.status(200).json({ message: "Student deleted successfully!!" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.listen(PORT, () => console.log(`Server running at http://${hostName}:${PORT}`));