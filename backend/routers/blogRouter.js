const express = require('express');
const router = express.Router();
const Model = require('../models/blogmodel.js');



router.post('/add', (req, res) => {

    console.log(req.body);

    new Model(req.body).save()
        .then((result) => {
            res.status(200).json(result);
        })
        .catch((err) => {
            console.log(err);
            if (err.code === 11000) {
                res.status(500).json({ message: 'Email Already Exists' });
            } else {
                res.status(500).json({ message: 'Internal Server Error' });
            }
        });
});

router.get('/getall', (req, res) => {

    Model.find()
        .then((result) => {
            res.status(200).json(result);
        }).catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
});

router.get('/getbytitle', (req, res) => {
    Model.findOne({ title: req.params.title })
        .then((result) => {
            res.status(200).json(result);
        }).catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
});

router.get('/getbytags', (req, res) => {
    Model.findOne({ tags: req.params.tags })
        .then((result) => {
            res.status(200).json(result);
        }).catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
});
