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

async function login(element){
    try {
        const exist = await db.findOne({email: element.email.toLowerCase()})
        if(exist){
            if(await bcrypt.compare(element.password, exist.password)) return true
            return false
        } else{
            return false
        }
    } catch (error) {
        console.log(error)
        return false   
    }
}

module.exports = login