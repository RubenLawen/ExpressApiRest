const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const { MongoClient } = require("mongodb")
require("dotenv").config();
const url = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@portefoliot.syxdk4w.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(
  url,
  { useNewUrlParser: true },
  { connectTimeoutMS: 30000 },
  { keepAlive: 1 }
);
const db = client.db("expressmvc").collection("user");

async function login(element){
    try {
        let exist = await db.findOne({email: element.email.toLowerCase()})
        if(exist){
            if(await bcrypt.compare(element.password, exist.password)){
                const tokenUser = await jwt.sign({user: element.pseudo}, process.env.SECURITY_KEY, {expiresIn: "1m"});
                await db.updateOne({email: element.email}, {$set: {token: tokenUser}})
                return exist
            }
            return false
        } else{
            return false
        }
    } catch (error) {
        return false   
    }
}

module.exports = login