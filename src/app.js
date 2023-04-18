const express = require('express'); //require('romarito')
const app = express();

app.use(express.static(__dirname)); //__dirname establece como ruta principal donde esta este archivo (app.js)
app.set("views", "./src/public/views"); //El ./ establece que buscas algo en la misma carpeta que este archivo.

app.get("/hola", (req, res) => {
    res.send("Hello world") //the res.send() method in Express is used to send a response back to the user explorer with a string, buffer, or JSON object. 
})

app.get("/form", (req, res) => {
    res.sendFile(__dirname + "/public/views/form.html")
})

module.exports = app;