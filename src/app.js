//npm install express (en consola)
const express = require('express'); //require('romarito')
const app = express();
const fs = require('fs');


app.use(express.static(__dirname)); //__dirname establece como ruta principal donde esta este archivo (app.js)
app.set("views", "./src/public/views"); //El ./ establece que buscas algo en la misma carpeta que este archivo.


app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/views/home.html")
})

app.get("/formpage1", (req, res) => {
  res.sendFile(__dirname + "/public/views/form-step1.html")
})

app.get("/formpage2", (req, res) => {
  res.sendFile(__dirname + "/public/views/form-step2.html")
})

app.get("/formpage3", (req, res) => {
  res.sendFile(__dirname + "/public/views/form-step3.html")
})

app.get("/formpage4", (req, res) => {
  res.sendFile(__dirname + "/public/views/form-step4.html")
})

app.get("/formpage5", (req, res) => {
  res.sendFile(__dirname + "/public/views/form-step5.html")
})

app.get("/formpage6", (req, res) => {
  res.sendFile(__dirname + "/public/views/form-step6.html")
})

app.get("/formpage7", (req, res) => {
  res.sendFile(__dirname + "/public/views/form-step7.html")
})

app.get("/formpagefinal", (req, res) => {
  res.sendFile(__dirname + "/public/views/form-final.html")
})

//CLIENTE:
//npm install body-parser (en consola)
const bodyParser = require('body-parser'); //npm i body-parser
app.use(bodyParser.urlencoded({ extended: false })); // Use the body-parser middleware to parse form data

// app.post("/form", (req, res) => {
//     console.log("respuesta: ", req.body) //Equivalente en appscript getContentText
//     const nombrePersona = req.body.nombre
//     //res.send('Form submitted successfully');
//     res.redirect('/hola')
// })

let formData = {};

app.post('/formpage1', (req, res) => {
  formData.page1 = req.body;
  res.redirect('/formpage2');
});

app.post('/formpage2', (req, res) => {
  formData.page2 = req.body;
  res.redirect('/formpage3');
});

app.post('/formpage3', (req, res) => {
  formData.page3 = req.body;
  res.redirect('/formpage4');
});

app.post('/formpage4', (req, res) => {
  formData.page4 = req.body;
  res.redirect('/formpage5');
});

app.post('/formpage5', (req, res) => {
  formData.page5 = req.body;
  res.redirect('/formpage6');
});

app.post('/formpage6', (req, res) => {
  formData.page6 = req.body;
  res.redirect('/formpage7');
});

app.post('/formpage7', (req, res) => {
  formData.page7 = req.body;
  res.redirect('/formpagefinal');
});


app.post('/formpagefinal', (req, res) => {
  formData.page8 = req.body;
  console.log(formData);

  // Save file to disk
  const text = JSON.stringify(formData);
  const filename = "sample.json";
  fs.writeFile(filename, text, (err) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error saving file');
    } else {
      console.log("Archivo descargado a PC exitosamente");
      res.download(filename, (err) => {
        if (err) {
          console.error(err);
          res.status(500).send('Error downloading file');
        } else {
          fs.unlink(filename, (err) => {
            if (err) {
              console.error(err);
            }
          });
        }
      });
    }
  });
});





//OPENAI:

const { Configuration, OpenAIApi } = require("openai");

const listarModelos = async () => {
  const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
  });
  const openai = new OpenAIApi(configuration);

  const completion = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: [{ role: "user", content: "Hello world" }],
  });
  console.log(completion.data.choices[0].message);
}

const generarImagen = async () => {
  const { Configuration, OpenAIApi } = require("openai");
  const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
  });
  const openai = new OpenAIApi(configuration);
  const response = await openai.createImage({
    prompt: "A pink cute english bulldog",
    n: 2,
    size: "1024x1024",
  });
}

//Ejecuto función:
//listarModelos();
//generarImagen();


module.exports = app;