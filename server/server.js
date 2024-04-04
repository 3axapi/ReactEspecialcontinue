const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
const PORT = 8000;

app.use(express.json());
app.use(cors());

const myDataBase = "myDB";
const url = `mongodb://localhost:27017/${myDataBase}`;

mongoose.connect(url)
    .then(() => console.log("connected to MongoDB"))
    .catch(err => console.log("connection error:", err.message));

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    age: Number
});

const User = mongoose.model("users", userSchema);
 
app.get("/api/users", async (req, res) => {
    try {
        const users = await User.find({});
        res.json(users)
    } catch (err) {
        res.status(500).json({message: err.message})
    }
});

app.delete("/api/users/:id", async (req, res) => {
    const userID = req.params.id;
    try {
        const deleteUser = await User.findByIdAndDelete(userID);
        if (!deleteUser)
            return res.status(404).json({message: "User not found"});
    } catch (err) {
        res.status(500).json({message: err.message});
    }
});
 
app.listen(PORT, () => console.log("Server express is running", PORT));
 
process.on("SIGINT", () => {
    console.log("Closing MongoDB")
    mongoose.disconnect()
        .then(() => console.log("MongoDB connection closed"))
        .finally(() => process.exit())
}); 