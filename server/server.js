const express = require("express");
const bodyParser = require("body-parser");
const WebSocket = require("ws");
const http = require("http");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { student, user } = require("./models"); // Import model student dan user
const cors = require("cors");
const studentRoute = require("./routes/studentRoute"); // Import route student
const authRoute = require("./routes/authRoute");

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const PORT = 3000;
const hostName = "127.0.0.1";

const server = http.createServer(app);
const wss = new WebSocket.Server({ server });
const cosrOption = {
  origin: ["http://127.0.0.1:5501"],
};
app.use(cors(cosrOption));
const SECRET_KEY = process.env.SECRET_KEY || "adios";

// Endpoint Register
// app.post('/auth/register', async (req, res) => {
//     try {
//         const { username, password } = req.body;

//         if (!username || !password) {
//             return res.status(400).json({ message: "Username and password are required!" });
//         }

//         const hashedPassword = await bcrypt.hash(password, 10);
//         const newUser = await user.create({ username, password: hashedPassword });

//         res.status(201).json({
//             message: "User registered successfully!",
//             data: { id: newUser.id, username: newUser.username }
//         });
//     } catch (error) {
//         console.error("Error:", error.message);
//         res.status(500).json({ error: error.message });
//     }
// });

// Endpoint Login
app.post("/auth/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res
        .status(400)
        .json({ message: "Username and password are required!" });
    }

    const existingUser = await user.findOne({ where: { username } });
    if (!existingUser) {
      return res.status(404).json({ message: "User not found!" });
    }

    const isPasswordValid = await bcrypt.compare(
      password,
      existingUser.password
    );
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid credentials!" });
    }

    const token = jwt.sign(
      { id: existingUser.id, username: existingUser.username },
      SECRET_KEY,
      { expiresIn: "1h" }
    );

    res.status(200).json({
      message: "Login successful!",
      token,
    });
  } catch (error) {
    console.error("Error:", error.message);
    res.status(500).json({ error: error.message });
  }
});

app.use("v1/student", studentRoute(express));
app.use("/v1/auth", authRoute(express));

// Start Server
app.listen(PORT, () =>
  console.log(`Server running at http://${hostName}:${PORT}`)
);
