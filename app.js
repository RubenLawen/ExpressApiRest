const express = require('express');
const app = express();
const fs = require("fs/promises")
const cors = require("cors");
require('dotenv').config(); 

// Setting for ejs
app.set("views", "./src/views")
app.set("view engine", "ejs")

// According Routes to the app

fs.readdir("./src/controlleurs", (err, files) => { return files }).then( async (files) => {

  await files.map( (file) => {
    const controlleur = require(`./src/controlleurs/${file}`)
    const route = file == "home.js" ? "/" : `/${file.replace(".js", "").toLowerCase()}`
    app.use(route, controlleur)
  })
  
  // According the static folder
  app.use(express.static('public'));
  app.use(cors());

  // if the user goes to an endpoint that is not managed by the service
  app.use( (req, res) => {
    res.status(404).json({
      method: req.method,
      respons: `Oops, I think you got lost! Return to the origin Endpoint: ${req.protocol + '://' + req.get('host')}`
    })
  });

  // for see if the it's the server has been started
  app.listen(process.env.PORT, () => {
    console.log(`Example app listening on port ${process.env.PORT}`) 
  })

})

