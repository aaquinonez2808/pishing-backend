const express = require('express');
const cors = require("cors")
const socketIo = require('socket.io');
const http = require('http');

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())
const sequelize = require('./db.js')
const User = require('./User.js');


const server = http.createServer(app);  // Crea un servidor HTTP utilizando Express
const io = socketIo(server, {
    cors:{
        origin:'*'
    }
});




const connection = async ()=>{
    await sequelize.sync();
}
const PORT = process.env.PORT || 3000;

app.get("/api/v1/users", async(req, res)=>{
    const users = await User.findAll();
    res.json({
        data:{users}
    })
})

connection().then(()=>{
    console.log("DB Connected")
})

app.post("/api/v1/users", async(req, res)=>{
    const {username, password} = req.body;
    console.log(req.body)
    const user = await User.create({
        username, password
    })

    io.emit('userCreated', { data: user });
    res.json({
        data:user
    })

})

io.on('connection', (socket) => {
    console.log('Client connected');
});

server.listen(PORT, ()=>{
    console.log("Server on port "+PORT)
})