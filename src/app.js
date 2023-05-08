//npm install express (en consola)
const express = require('express'); //require('romarito')
const app = express();
const fs = require('fs');
const formExample = require('./tests/form_result')
require('dotenv').config();


const apiKey = process.env.OPENAI_API_KEY;
if (!apiKey) {
  console.error('API_KEY is not defined in process.env.');
  process.exit(1);
}


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

let formData = formExample;

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
    apiKey: apiKey,
  });
  const openai = new OpenAIApi(configuration);

  const completion = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: [{ role: "user", content: "Hello world" }],
  });
  console.log(completion.data.choices[0].message);
}

const generarImagen = async () => {
  const configuration = new Configuration({
    apiKey: apiKey,
  });
  const openai = new OpenAIApi(configuration);
  const response = await openai.createImage({
    prompt: "A pink cute english bulldog",
    n: 2,
    size: "1024x1024",
  });
}

//Prompt design:

const promptIntro = `Eres experto en recursos humanos y diseñaste una actividad de coaching para líderes de una organización que se basa en una encuesta que evalúa la performance de los colaboradores y en una conversación de devolución. Los líderes deben tener en cuenta cuatro principios para maximizar los beneficios de la actividad y brindar una orientación clave para el desarrollo personal y profesional de los empleados: servicio vs. evaluación, perspectiva vs. verdad, relevancia y zona de desarrollo próximo. La actividad de devolución se realiza a través de una conversación en la que se destacan las fortalezas, el aporte de valor y las oportunidades de desarrollo. Los líderes deben estar dispuestos a brindar retroalimentación de manera regular y constante y diseñar planes de desarrollo personalizados para cada colaborador.`

const promptInstruction = `Instrucción: Debes escribir un texto de 400 a 500 palabras con instrucciones para la conversación del líder con su miembro del equipo, que destaque las fortalezas, aporte de valor, oportunidades de mejora y otras observaciones de un empleado evaluado en varios aspectos. 
Trata de ser positivo y acompañar cada oportunidad de mejora con un halago. Evita repetir cualidades en diferentes oraciones o ponerlas como fortalezas y debilidades a la vez.
Ejemplo:
Resumen de devolución y líneas sugeridas para Javier Casado:
1) Fortalezas: 
- Metodologías de trabajo: autonomía, meticulosidad, atención al detalle. 
- Actitudinal: responsabilidad, automotivación, entusiasmo, tolerancia a la presión, cordialidad, honestidad, respeto y empatía. 
- Comunicación: tono, claridad, estilo, síntesis y relevancia. 
- Estrategia y resolución de problemas: diagnóstico, resolución y pensamiento racional. 
2) Aprendizajes recientes y fortalezas adicionales: paciencia, memoria, templanza, uso de excel y Google Sheets. 
3) Aporte de valor: 
- Al equipo: paciencia y simpatía. 
- A la organización: metodicidad y seguridad en el manejo de los números. 
4) Oportunidades de mejora: 
- Metodologías de trabajo: organización personal, sistematización y automatización de procesos y archivos, planificación y anticipación. 
- Actitudinal: comunicación y accesibilidad en el trabajo en equipo. 
- Comunicación: implementación de informes. 
Cierre y motivación: Agradecer por el tiempo y oportunidad de dar feedback. Ofrecer ayuda para mejorar y desarrollarse profesionalmente.
`

//Extraigo solo las preguntas cuanti:
const inputCuanti = {};
for (const key in formData) {
  if (key >= "page1" && key <= "page4") {
    inputCuanti[key] = formData[key];
  }
}
console.log("Solo pagina 1 a 4:", inputCuanti)

//Las transformo a texto plano:
function formatSurveyData(surveyData) {
  let formattedData = "";
  Object.keys(surveyData).forEach((page) => {
    Object.keys(surveyData[page]).forEach((question) => {
      const questionText = question.replace(/_/g, " ");
      const answerText = surveyData[page][question].replace(/_/g, " ");
      formattedData += `${questionText}: ${answerText}. `;
    });
  });
  return formattedData.trim();
}

const promptInputCuanti = formatSurveyData(inputCuanti);

//Extraigo solo las preguntas cuanti:
const inputCuali = {};
for (const key in formData) {
  if (key >= "page5" && key <= "page7") {
    inputCuali[key] = formData[key];
  }
}

//console.log("Solo pagina 5 a 7", inputCuali)

function convertObjectToPlanChunk(obj) {
  let text = "";
  if (obj.page5) {
    text += `¿En qué destaca la persona? ¿Cuáles son sus fortalezas?  ¿Tiene alguna característica de personalidad y forma de ser destacable? ¿Qué es lo que hace mejor?  ¿De qué conocimientos valiosos dispone? ${obj.page5.destaca_persona}\n\n`;
    text += `¿Tiene talentos "naturales"? ${obj.page5.talento_persona}\n\n`;
    text += `¿Tiene talentos que ha desarrollado en el último tiempo, a base de hábitos y prácticas positivas? ${obj.page5.talento_desarrollado_persona}\n\n`;
    text += `¿Tiene fortalezas evidentes, pero que no reconoce en sí mismo? ${obj.page5.fortalezas_persona}\n\n`;
  }
  if (obj.page6) {
    text += `¿Cuál es su principal aporte de valor al equipo? ${obj.page6.aporte_equipo}\n\n`;
    text += `¿Y a la organización? ${obj.page6.aporte_organizacion}\n\n`;
    text += `¿Cuán único es su aporte de valor? ¿Cuán fundamental es? ¿Cómo sería el equipo y la organización sin la persona? ¿Cuán fácil resultaría conseguir otro perfil similar? ${obj.page6.singularidad_aporte}\n\n`;
  }
  if (obj.page7) {
    text += `¿Qué potencial tiene la persona? ¿Hasta qué nivel podría crecer y desarrollarse? ${obj.page7.potencial_persona}\n\n`;
    text += `¿Cómo podría ser mejor profesional? ¿Qué atributos positivos podría desarrollar? ${obj.page7.desarrollo_persona}\n\n`;
    text += `¿Tiene un potencial desaprovechado? ¿Tiene barreras autoimpuestas? ${obj.page7.barreras_persona}\n\n`;
    text += `¿Podría especializarse y orientar su carrera profesional a un tema o sector en particular? ${obj.page7.especializacion_persona}\n\n`;
    text += `¿Podría, eventualmente, asumir funciones de liderazgo? ¿Qué atributos clave tiene desarrollados, y cuáles sería necesario que desarrolle? ${obj.page7.eventual_liderazgo_persona}\n\n`;
  }
  return text;
}


//console.log("Solo pagina 1 a 4:", inputCuanti)
const promptInputCuali = convertObjectToPlanChunk(inputCuali);
//console.log("promptInputCuali: ", promptInputCuali)

const finalPrompt = promptIntro + ". " + promptInstruction + ". " + promptInputCuanti + ". " + promptInputCuali


const generateText = async (finalPrompt) => {
  const configuration = new Configuration({
    apiKey: apiKey,
  });
  const openai = new OpenAIApi(configuration);

  const completion = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: finalPrompt,
    temperature: 0.6,
    max_tokens: 1500
  });
  console.log(completion);
  console.log("Texto sugerido:",completion.data.choices[0].text);
}

generateText(finalPrompt)



module.exports = app;