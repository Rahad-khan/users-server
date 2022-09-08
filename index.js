const express = require('express');
const cors = require('cors');
const app = express();
const port = 5000;
const fs = require('fs');
const userRouter = require('./routes/users.route');


app.use(cors())
app.use(express.json());
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.send("Server Running");
});

app.use('/user', userRouter)

// app.get('/user/all', (req, res) => {
//     fs.readFile("users.json", (err, data) => {
//         if (err) {
//             res.write("Something Wrong !!!");
//             res.end()
//         } else {
//             const users = JSON.parse(data);
//             res.send(users)
//         }
//     })
// })

console.log(app)
app.listen(port, () => {
    console.log("Port is running at ", port);
})