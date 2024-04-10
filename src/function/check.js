const jwt = require("jsonwebtoken")

async function check(token, key){
    try {
        return await jwt.verify(token, key)
    } catch (error) {
        console.log(error)
        return false
    }
}

module.exports = check