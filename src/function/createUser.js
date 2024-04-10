const axios = require("axios");

async function createUser(username, mail, mdp) {
  try {
    const response = await axios.post("http://localhost:3000/register", {
      pseudo: username,
      email: mail,
      password: mdp
    });

    if (response.status == 200) return true;

    return false; 
    
  } catch (error) {
    return false; // La requête a échoué
  }
}

module.exports = createUser;
