const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const decodeIDToken = require('./authenticateToken');
const postsRouter = require('./controllers/posts');
const socketio = require("socket.io");

const app = express();
var server = require("http").Server(app);
app.use(cors());
app.use(decodeIDToken);
app.use(express.json());

// socket.io
io = socketio(server, {
    cors: {
        origin: '*',
    }
});

app.use(function (req, res, next) {
    req.io = io;
    next();
});


mongoose.connect(
    'mongodb+srv://test:test@cluster0.4ie6i.mongodb.net/testdbname?retryWrites=true&w=majority',
    {
        useNewUrlParser: true, useUnifiedTopology: true 
    }
).then(() => {
    console.log('Connected to database');
}).catch((err) => console.log('Error connecting database', err.message));


app.use('/posts', postsRouter)

app.get('/', (req, res) => {
    res.send('Hello ynov toulouse');
});

const PORT = 3001;

server.listen(PORT, () => {
    console.log(`Serveur is running on port ${PORT}`);
});
