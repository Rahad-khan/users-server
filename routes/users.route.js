const express = require('express');
const fs = require('fs');
const userController = require('../controller/user.controller');

const router = express.Router();

console.log(router)
router.get('/all', userController.getAllUsers);

router.get("/random", userController.getRandomUser);

router.post("/save", userController.seaveAnUser);

router.patch("/update", userController.updateAnUser);
router.patch("/bulk-update", (req, res) => {
    res.send("bulk-update clicked")
});
router.delete("/delete", userController.deleteAnUser);


module.exports = router;