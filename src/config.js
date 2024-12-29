const mongoose = require('mongoose');
const connect = mongoose.connect("mongodb://localhost:27017/Login");

connect.then(() => {
    console.log('Connected to the server seccessfully');
})
.catch(() => {
    console.log('Error connecting to the server');
});

const LoginSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

const collection = new mongoose.model("users", LoginSchema);

module.exports = collection;