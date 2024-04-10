const express = require("express");
const router = express.Router();
const bodyParser = require('body-parser');
const personnage = require("../models/personnage")

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true})); 

router.get('/', async (req,res) => {
    if(req.body && req.body.token){
        let cara = await personnage()
        return res.status(200).send(cara)
    } 
    return res.status(401).send({ message: "Aucun token n'a été soumis"})
});

module.exports = router