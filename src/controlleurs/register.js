const express = require("express");
const router = express.Router();
const bodyParser = require('body-parser');
const register = require("../models/register");

router.use( bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true})); 

router.post('/', async (req,res) => {
        if(req.body.pseudo && req.body.email && req.body.password){
            if(req.body.pseudo.length < 4) {
                return res.status(406).send({message: "Le pseudo est trop petit", old: req.body})
            }
            else if(req.body.pseudo.length > 25) {
                return res.status(406).send({ message: "Le pseudo est trop grand", old: req.body})
            }
            else if(!req.body.password.match(/.*[A-Z].*/)) {
                return res.status(406).send({message: "Le mot de passe doit contenir une majuscule", old: req.body})
            } 
            else if(req.body.password.length < 4) {
                return res.status(406).send({message: "Le mot de passe est trop petit", old: req.body})
            }
            else if(!req.body.password.match(/.*[!@#$%^&*()_+{}\[\]:;<>,.?\/\\-].*/)){
                return res.status(406).send({message: "Le mot de passe doit contenir au moins un caractère spécial", old: req.body})
            } 
            else if(!req.body.password.match(/[1-9]/)){
                return res.status(406).send({message: "Le mot de passe doit contenir au moins un chiffre", old: req.body})
            }
            else{
                let respons = await register(req.body)
                if(respons) return res.status(200).send({message: "Votre compte à bien été crée"}) 
                return res.status(406).send({message: "L'email est déjà utilisé", old: req.body})
            }
        } else{
            return res.status(406).send({ message: "Le body n'est pas correctement remplie"})
        }
});

module.exports = router