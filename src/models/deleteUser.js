const bcrypt = require("bcrypt")
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

async function deleteUser(element){
    try {
        const exist = await db.findOne({token: element.token})
        if(exist.admin && exist.email !== element.email) {
            let deleteResquest = await db.deleteOne({email: element.email})
            if(deleteResquest) return true
            return false
        }
        else{
            if(!exist.admin) return "tentative"
            return false
        }
    } catch (error) {
        return false   
    }
}

module.exports = deleteUser