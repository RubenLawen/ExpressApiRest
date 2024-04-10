const bcrypt = require("bcrypt")
const { MongoClient } = require("mongodb")
require("dotenv").config();
const url = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@portefoliot.syxdk4w.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(
  url,
  { useUnifiedTopology: true },
  { useNewUrlParser: true },
  { connectTimeoutMS: 30000 },
  { keepAlive: 1 }
);
const db = client.db("expressmvc").collection("user");

async function register(element){
    try {
        const exist = await db.findOne({email: element.email.toLowerCase()})
        if(exist) return false
        else{
            let encryptedPassword = await bcrypt.hash(element.password, 10)
            const respons = await db.insertOne({pseudo: element.pseudo, email: element.email.toLowerCase(), password: encryptedPassword}) 
            if(respons) return true
            else return false
        }
    } catch (error) {
        return false   
    }
}

module.exports = register