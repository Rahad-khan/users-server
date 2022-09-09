const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 5000;
const fs = require('fs');
const userRouter = require('./routes/users.route');


app.use(cors())
app.use(express.json());
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.send("Server Running");
});

app.use('/user', userRouter);

console.log(app)
app.listen(port, () => {
    console.log("Port is running at ", port);
})