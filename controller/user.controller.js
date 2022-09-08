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
};

module.exports.seaveAnUser = async (req, res, next) => {
    const users = await JSON.parse(fs.readFileSync("users.json"));
    const newUserData = req.body;
    const newUser = { id: users.length + 1, ...newUserData };
    users.push(newUser);
    console.log(newUser, users)
    fs.writeFile("users.json", JSON.stringify(users), (err) => {
        err ? res.status(401).send("Unauthorized Action") : res.status(200).send("User Added successfully !!!")
    })
};
// Update an user 
module.exports.updateAnUser = async (req, res) => {
    const updateData = req.body;
    const users = await JSON.parse(fs.readFileSync("users.json"));
    let userIndex = users.findIndex((obj) => obj.id == updateData.id);
    const props = Object.keys(updateData);
    for (const prop of props) {
        users[userIndex][prop] = updateData[prop];
    }
    fs.writeFile("users.json", JSON.stringify(users), (err) => {
        if (err) {
            res.send("unable to save data")
        } else {
            res.status(200).send(
                { meassge: "updated data successfully", data: users }
            )
        }
    })
}

// Delete an user
module.exports.deleteAnUser = async (req, res) => {
    const { id } = req.query;
    const users = await JSON.parse(fs.readFileSync("users.json"));
    const exist = users.find(user => user.id === +id);
    if (exist) {
        const rest = users.filter(user => user.id !== +id);
        fs.writeFile("users.json", JSON.stringify(rest), (err) => {
            err ? res.send("something going wrong") : res.status(200).send({ data: rest });
        })
    } else {
        res.status(404).send("Id isn't available");
    }
}
