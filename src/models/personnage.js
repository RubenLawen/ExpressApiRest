const { MongoClient } = require("mongodb")
require("dotenv").config();
const url = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@portefoliot.syxdk4w.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(
  url,
  { useNewUrlParser: true },
  { connectTimeoutMS: 30000 },
  { keepAlive: 1 }
);
const db = client.db("api-content").collection("brawlhalla")

async function personnage(){
    try {
        const lengther = await db.countDocuments().then(counter =>{ return counter } )
        const obj = await db.findOne( { "index": parseInt(Math.random() * (lengther) + 1) } )
        delete obj._id,
        delete obj.index
        return obj
    } catch (error) {
        return false
    }
}

module.exports = personnage