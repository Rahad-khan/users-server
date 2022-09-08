const express = require('express');
const fs = require('fs');
const userController = require('../controller/user.controller');

const router = express.Router();

console.log(router)
router.get('/all', userController.getAllUsers);

router.get("/random", (req, res) => {

    res.send("random clicked")
});
router.post("/save", (req, res) => {
    res.send("save clicked")
});
router.patch("/update", (req, res) => {
    res.send("update clicked")
});
router.patch("/bulk-update", (req, res) => {
    res.send("bulk-update clicked")
});
router.delete("/delete", (req, res) => {
    res.send("delete clicked")
});


module.exports = router;