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

//"2do encuentro:"

//npm install body-parser
const bodyParser = require('body-parser'); //npm i body-parser
app.use(bodyParser.urlencoded({ extended: false })); // Use the body-parser middleware to parse form data

app.post("/form", (req, res) => {
    console.log("respuesta: ", req.body) //Equivalente en appscript getContentText
    const nombrePersona = req.body.nombre
    // You can save the form data to a variable or a database here
    // For example, you could create an array to store multiple form submissions

    //res.send('Form submitted successfully');
    res.redirect('/form')
})


module.exports = app;