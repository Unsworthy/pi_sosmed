const express = require('express');
const bodyParser = require('body-parser');
const WebSocket = require('ws');
const http = require('http');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { student, user } = require('./models'); // Import model student dan user
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const PORT = 3000;
const hostName = "127.0.0.1";

const server = http.createServer(app);
const wss = new WebSocket.Server({ server });
const cosrOption = {
    origin: ['http://127.0.0.1:5501'],
    
};
app.use(cors(cosrOption)); 
const SECRET_KEY = process.env.SECRET_KEY || "adios";

// Endpoint Register
app.post('/auth/register', async (req, res) => {
    try {
        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(400).json({ message: "Username and password are required!" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await user.create({ username, password: hashedPassword });

        res.status(201).json({
            message: "User registered successfully!",
            data: { id: newUser.id, username: newUser.username }
        });
    } catch (error) {
        console.error("Error:", error.message);
        res.status(500).json({ error: error.message });
    }
});

// Endpoint Login
app.post('/auth/login', async (req, res) => {
    try {
        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(400).json({ message: "Username and password are required!" });
        }

        const existingUser = await user.findOne({ where: { username } });
        if (!existingUser) {
            return res.status(404).json({ message: "User not found!" });
        }

        const isPasswordValid = await bcrypt.compare(password, existingUser.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: "Invalid credentials!" });
        }

        const token = jwt.sign({ id: existingUser.id, username: existingUser.username }, SECRET_KEY, { expiresIn: '1h' });

        res.status(200).json({
            message: "Login successful!",
            token
        });
    } catch (error) {
        console.error("Error:", error.message);
        res.status(500).json({ error: error.message });
    }
});

// CRUD Student
app.get("/student/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const studentData = await student.findByPk(id);
        if (!studentData) return res.status(404).json({ message: "Student not found" });
        res.status(200).json(studentData);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.post("/student", async (req, res) => {
    try {
        const { firstName, lastName, classes, major_id, gender } = req.body;

        if (!firstName || !lastName || !classes || !major_id || !gender) {
            return res.status(400).json({ message: "All fields are required!" });
        }

        const newStudent = await student.create({ firstName, lastName, classes, major_id, gender });

        res.status(201).json({
            message: "Student created successfully!",
            data: newStudent
        });
    } catch (error) {
        console.error("Error:", error.message);
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

        res.status(200).json({ message: "Student deleted successfully!" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Start Server
app.listen(PORT, () => console.log(`Server running at http://${hostName}:${PORT}`));