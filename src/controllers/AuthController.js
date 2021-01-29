const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
require('dotenv').config();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const UserService = require("../services/user-service")
const { User } = require('../models/mongoose');
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

router.post('/register', (req, res) => {
    const hashedPassword = bcrypt.hashSync(req.body.password, 8);
    const token = jwt.sign({ id: req.body.email}, process.env.SECRET);
    try {
        UserService.create({ email: req.body.email, password: hashedPassword, token: token });
        res.status(201).send({token: token})
    } catch (e) {
        console.log(e);
        res.status(500).send({error: e});
    }
});

router.post('/login', (req, res) => {
    User.findOne({ email: req.body.email }, (err, user) => {
        if (err) return res.status(500).send('Error on the server');
        if (!user) return res.status(404).send('User not found');

        const passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
        if (!passwordIsValid) return res.status(401).send({ token: null });

        res.status(200).send({ userId:user._id, token: user.token });
    });
});

module.exports = router;
