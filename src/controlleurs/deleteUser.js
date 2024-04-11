const express = require("express");
const router = express.Router();
const bodyParser = require('body-parser');
const check = require("../function/check");
const deleteUser = require("../models/deleteUser");

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true})); 

router.post('/', async (req,res) => {
    if(req.body.token){
        if(req.body.email){
            let respons = await check(req.body.token, process.env.SECURITY_KEY)
            if(respons){
                const deleteRequest = await deleteUser(req.body)
                if(deleteRequest === true) return res.status(200).send({ message: "Le compte à bien été supprimé"})
                else if(deleteRequest == "tentative") return res.status(401).send({ message: "Vous n'êtes pas autorisé à faire cela"})
                return res.status(401).send({ message: "Le token est invalide"})
            } else{
                return res.status(406).send({ message: "Il semblerait l'utilisateur ciblé n'existe pas ou que c'est vous :)"})
            }
        } else{
            return res.status(406).send({ message: "Le body n'est pas correctement remplie"})
        }
    } else{
        return res.status(401).send({ message: "Aucun token n'a été soumis"})
    }
});

module.exports = router