const fs = require('fs');

module.exports.getAllUsers = (req, res, next) => {
    const { limit } = req.query;
    fs.readFile("users.json", (err, data) => {
        if (err) {
            res.send("Something Wrong !!!");
        } else {
            const users = JSON.parse(data);
            limit ? res.send(users.slice(0, limit)) : res.send(users);
            next();
        }
    })
};


module.exports.getRandomUser = (req, res, next) => {
    fs.readFile("users.json", (err, data) => {
        if (err) {
            res.send("Something Wrong !!!");
        } else {
            const users = JSON.parse(data);
            const randomId = Math.ceil(Math.random() * users.length);
            console.log(randomId);
            const randomUser = users.find((user) => user.id === randomId);
            res.send(randomUser);
            next();
        }
    })
}
