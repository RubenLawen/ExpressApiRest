const express = require("express");
const router = express.Router();
const bodyParser = require('body-parser');
const login = require("../models/login");

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true})); 

router.post('/', async (req,res) => {
    if(req.body.email && req.body.password){
        let respons = await login(req.body)
        if(respons) return res.status(200).send({message: "Bienvenue !!"})
        return res.status(401).send({message: "Le mot de passe ou l'email est incorect"})
    } else{
        return res.status(406).send({ message: "Le body n'est pas correctement remplie"})
    }
});

module.exports = router