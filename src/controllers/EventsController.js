const express = require('express');
const router = express.Router();
const authUser = require("../middlewares/currentUser");
const { Event } = require('../models/mongoose');

router.get('/events/user/:id', authUser(), async (req, res) => {
  Event.find({ userId: req.params.id }, (err, events) => {
    if (err) return res.status(500).send('Error on the server');
    res.status(200).send({ events: events });
  });
})

module.exports = router;
