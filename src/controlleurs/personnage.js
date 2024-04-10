const express = require("express");
const router = express.Router();
const bodyParser = require('body-parser');
const personnage = require("../models/personnage");
const check = require("../function/check");
require("dotenv").config();

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true})); 

router.get('/', async (req,res) => {
    if(req.body && req.body.token){
        let respons = await check(req.body.token, process.env.SECURITY_KEY)
        if(respons) {
            let cara = await personnage()
            return res.status(200).send(cara)
        }
        return res.status(401).send({ message: "Le token est invalide"})
    } 
    return res.status(401).send({ message: "Aucun token n'a été soumis"})
});

module.exports = router