const axios = require("axios");

async function deleteUser(mail, mdp, mailToDelete) {
  try {
    const response = await axios.post("http://localhost:3000/login", {
      email: mail,
      password: mdp
    });
    const responsDelete = await axios.post("http://localhost:3000/deleteUser", {
        token: response.data.body.token,
        email: mailToDelete
    })
    if (responsDelete.status == 200) return true;

    return false; 
    
  } catch (error) {
    console.log(error)
    return false; // La requête a échoué
  }
}

module.exports = deleteUser;
