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


//Prompt design:

const promptIntro = `eres un experto en recursos humanos que estas haciendo coaching a líderes de una organización sobre como dar feedback 
a sus empleados de manera efectiva, que les permita mejorar y desarrollarse. Les diseñaste una encuesta a través de un formulario para evaluar la performance 
de la gente que tienen a cargo y luego tener una conversación con ellos de devolución. Esta actividad consiste en una conversación entre la/el líder y cada uno de sus colaboradores directos, 
en torno a aspectos fundamentales y destacables de la persona respecto a su forma de ser, pensar y actuar en el ámbito laboral. Especialmente se hace foco en las fortalezas, 
el aporte de valor y las oportunidades de desarrollo. Previo a la conversación, el o la líder deberá realizar este breve ejercicio de diagnóstico (la encuesta), cuyo resultado será insumo 
esencial para la conversación. El objetivo principal del diagnóstico y la conversación es proveer orientación a la persona, principalmente respecto a su 
desarrollo personal y profesional. Esta actividad de devolución por parte de líderes y coordinadores hacia sus colaboradores se basa en cuatro principios. 
Tener claridad sobre estos principios nos otorgará un marco apropiado para llevar adelante la actividad, maximizando los beneficios. Realizar esta 
actividad puede empoderar y motivar a quien recibe la devolución, y proporcionarle una orientación clave para su desarrollo personal. Esto potenciará tanto el 
desempeño individual, como el del equipo en su conjunto. Además fomentará la conexión del Líder o Coordinador con los colaboradores de su equipo. A continuación se describen 
los cuatro principios:
Principio 1, Servicio vs. Evaluación:
El propósito de la actividad es proporcionarle al colaborador/a una perspectiva útil y constructiva, que le sirva de orientación para su desarrollo personal y profesional. Algunos de los aspectos clave que se tratarán tienen que ver con las fortalezas, los aportes de valor, y las zonas de mejora.
Con esta información el colaborador podrá determinar en qué aspectos y atributos personales enfocarse, tanto para potenciar las fortalezas, como para trabajar en algunas oportunidades de mejora estratégicas. 
En última instancia, esta actividad es un servicio que las y los líderes proveen a sus colaboradores, en gratitud al trabajo cotidiano realizado, sostén de los equipos y la organización. También es importante resaltar que será responsabilidad de la persona decidir qué incorporar y qué no en su estrategia de desarrollo. 
Esta actividad no busca ser una evaluación de desempeño tradicional. Estas evaluaciones suelen poseer una cualidad de juicio y crítica, que muchas veces puede resultar perjudicial para el desarrollo personal y profesional de quien recibe la evaluación.
La condición de diferencia jerárquica entre Líder y Colaborador puede instalar un marco de evaluación y juicio para la actividad de devolución, que genera una actividad defensiva y tensa en quien recibe el feedback. Por ello, resulta fundamental como Líder ser conscientes de estas dinámicas, para intentar neutralizarlas y reconducirlas hacia dinámicas más constructivas y empoderantes.
Principio 2, Perspectiva vs. Verdad:
Las ideas, percepciones y juicios del Líder son solo una perspectiva, no son "la verdad absoluta”.
Es importante tener en cuenta esta idea a la hora de dar las devoluciones a la persona, y también se recomienda aclararlo al inicio de la conversación.
La condición de diferencia jerárquica entre Líder y Colaborador suele generar la percepción errónea de que la o el Líder posee “la verdad”, o que su 
opinión es más válida. Este es otro de los sesgos cognitivos de los que es importante que el Líder tome conciencia, para minimizar sus impactos negativos.
Por ello se recomienda hablar y enunciar desde un lugar de humildad y de exploración conjunta de la mejor forma de potenciar el desarrollo del colaborador 
o colaboradora.
Principio 3, Relevancia:
Es importante, en el análisis que sigue, poder detectar qué es relevante y qué no para el desarrollo de la persona. 
La relevancia estará delimitada principalmente por el rol que lleva a cabo el colaborador, y las habilidades, actitudes y conocimientos requeridos por esta función. 
Esto nos permitirá acotar el rango de atributos analizados, dejando lugar sólo para enfocarse en aquellos aspectos más relevantes.
En los cuadros que acompañan la actividad de análisis habrá un campo para marcar aquellos atributos que no sean relevantes.
Principio 4, Zona de desarrollo próximo:
El potencial de mejora de cualquier persona suele ser muy amplio, y por ello es necesario calibrar el nivel de expectativas respecto a su desarrollo; qué atributos desarrollar, y en qué nivel hacerlo. Demasiada exigencia puede abrumar y paralizar, incluso si las devoluciones se dan con intenciones constructivas.
El modelo de Zona de Desarrollo Próximo de Lev Vygotski nos provee una guía para poder calibrar la zona hacia donde se orienten las devoluciones.
Este modelo, adaptado para este ejercicio, conceptualiza y define 3 zonas vinculadas al desarrollo de habilidades, conocimientos o actitudes:
La Zona de Comodidad es la zona donde se encuentra la persona actualmente en relación a determinada habilidad o conjunto de habilidades. Es la forma de ser actual de la persona; también sus técnicas y conocimientos presentes en su trabajo cotidiano. Es lo que ya sabe hacer con facilidad, y conoce con un grado considerable de proficiencia. Por ello se la  puede denominar "zona de comodidad", ya que las actividades y exigencias que se encuentren en este nivel no implicarán un esfuerzo para responder a ellas. Sin embargo, en esta zona no hay posibilidad de crecimiento; de allí la importancia de tener estas conversaciones que promuevan el desarrollo de nuevas habilidades, conocimientos y actitudes.
La Zona de Pánico se encuentra muy lejos de la Zona de Comodidad. Dar sugerencias de desarrollo que apunten a esta zona terminará abrumando, paralizando, y disminuyendo la confianza de la persona, ya que este nivel estará muy por encima de sus posibilidades. Es el equivalente a pretender avanzar al sexto escalón directamente desde el primer escalón. Aquí es donde aparece el mayor desafío de calibración de expectativas, procurando que no sean demasiado elevadas. En línea con este aspecto, también es muy importante distinguir los aspectos fijos o de personalidad (muy difíciles de cambiar), de aquellos más maleables.
La Zona de Desarrollo Próximo es la zona próxima o aledaña a la Zona de Comodidad. Es el equivalente al proceso de avanzar del primer escalón al segundo (para luego avanzar al tercero, al cuarto, y así sucesivamente). Es la zona donde las y los Líderes deberían hacer foco a la hora de dar sus sugerencias y perspectivas. En este nivel, las sugerencias representarán desafíos para la persona, e implicarán un cierto grado de "incomodidad", pero que será manejable y constructiva. En última instancia es responsabilidad de la persona determinar la validez de las sugerencias, y asumir sus propios desafíos de crecimiento y desarrollo.
`

const promptInstruction = `A continuación te proporcionaré una evaluación de un empleado en varios aspectos, y debes devolverme un escrito de 300 a 500 palabras, 
utilizando párrafos y viñetas, con una conversación sugerida para ese líder destacando las fortalezas (1), luego su aporte de valor (2), seguido por las oportunidades de mejora y desarrollo potencial (3) y, finalmente, otras observaciones y agradecimientos (4). 
Es importante que a cada aspecto negativo de la persona evaluada se contraponga un aspecto positivo antes y despúés de esa mención. Por ejemplo: "Valorar que es una persona
predispuesta, aunque podría mejorar su atención al detalle para poder complementar esa cualidad tan buena que tiene."

Un ejemplo del resultado sería lo siguiente: Resumen de devolución y líneas sugeridas para Javier Casado: Primero es importante agradecer al colaborador por estar 
presente y por el tiempo invertido en la organización. También aclararle que esta devolución es una perspectiva más, cuyo objetivo es ayudar a orientar su 
desarrollo profesional en el trabajo. 1) Principales fortalezas identificadas: Metodologías de trabajo: -En cuanto a las metodologías de trabajo, 
se destaca por su autonomía, comprendiendo bien expectativas y consignas. - También se destaca por su meticulosidad y atención al detalle, siempre 
aprendiendo y buscando mejoras. Actitudinal: -En lo actitudinal, se destaca por su responsabilidad, automotivación y entusiasmo. Siempre con una 
disposición al trabajo ejemplar. - Aparenta manejar bien la tolerancia a la presión, con la paciencia que lo caracteriza. - Se destaca por su cordialidad, 
honestidad y respeto por los demas - Se destaca por su empatía y humildad. Comunicación: - En cuanto a la comunicación, cumple con las expectativas de tono, 
claridad, estilo, síntesis y relevancia. - En cuanto a estrategia y resolución de problemas, cumple con las expectativas en el diagnóstico de los mismos, 
la resolución y el pensamiento racional. 2) Principales fortalezas: - Su paciencia, memoria y templanza. - Aprendió en el último tiempo: Método con los excels, 
uso de google sheets. 3) Principal aporte de valor: - Al equipo: Paciencia y simpatía. - A la organización: Metodicidad y seguridad en el manejo de los números 
(nunca se equivocó). - Es dificil encontrar una persona que le interese esta parte hard de RRHH. 4) Principales oportunidades de desarrollo y mejora: 
Metodologías de trabajo; - Podría mejorar su organización personal, en torno a la sistematización y automatización de procesos y archivos, 
para evitar que estén desactualizados o incompletos. - También tiene oportunidad de mejora en la planificación, anticiparse a ciertos procesos preparando
archivos e información necesarios para los mismos. Actitudinal: - Podría mejorar, en torno al trabajo en equipo, su comunicación y accesibilidad (tiempos de respuesta) 
con en el resto. - Comunicación: - Tiene oportunidad de mejora en comenzar a implementar informes. Si le interesase seguir el tema hard de rrhh y seguir en gobierno, 
puede seguir aprendiendo mas sobre cuestiones específicas, uso de sistemas, etc. Podría tener mayor metodicidad, implementando el uso de google sheets para 
facilitar información y asi evitar la consulta constante de sus colaboradores o líderes. Cierre y motivación: Agradecer nuevamente por el tiempo y la oportunidad de darle feedback. 
Quedar a disposición por cualquier consulta y oportunidad para ayudarlo a mejorar y desarrollarse profesionalmente.

Otro ejemplo de resultado esperado sería lo siguiente: Resumen de devolución y líndes sugeridas para Claudia Ramos: Primero es importante agradecer al colaborador por estar 
presente y por el tiempo invertido en la organización. También aclararle que esta devolución es una perspectiva más, cuyo objetivo es ayudar a orientar su 
desarrollo profesional en el trabajo. Principales fortalezas identificadas: Es un perfil que se destaca por su claridad conceptual y por su trabajo en análisis 
institucional (especialmente en diagnósticos organizacionales). Se destaca su curiosidad y predisposición a producir servicios de excelencia. Se destaca por su perfil 
estratégico y diagnósticos situacionales. Tiene una gran capacidad de análisis de información para detección de insights y en la propuesta de mejoras.Se destaca 
por su claridad conceptual. Representa muy bien estos conceptos, especialmente en el plano escrito y en la visualización de la información.  3) Principal aporte de valor: 
Tiene un talento natural por la estrategia y la visión analítica. Es un rol con un aporte fundamental para la organización que debería aprovecharse mientras está. Tiene 
gran potencial de crecimiento si sigue formándose en estrategia. Su mayor barrera es la de vinculación con gente fuera de sus círculos. En segundo término, 
su capacidad de expresarse de manera sintética . 4) Principales oportunidades de desarrollo y mejora: Podrìa mejorar en su autonomía y auto generación de trabajo, 
al depender mucho del input. Podría mejorar en el relacionamiento con otros 
equipos/áreas, la auto generación de trabajo y la parte práctica: tolerancia a la presión y los cambios. Podría mejorar su capacidad de síntesis y 
repetitividad a la hora de expresarse. El cumplimiento del rol es destacable aunque, en todo lo que refiere a la relación con otros equipos no ha podido desarrollarse tanto este año. E
sto puede deberse a que es difícil que los líderes prioricen ese trabajo.

Un tercer ejemplo de resultado esperado sería lo siguiente: Primero es importante agradecer al colaborador por estar 
presente y por el tiempo invertido en la organización. También aclararle que esta devolución es una perspectiva más, cuyo objetivo es ayudar a orientar su 
desarrollo profesional en el trabajo. 1) Principales fortalezas identificadas: Se destaca por su capacidad de producción y autonomía para trabajar.
También por su predisposición al aprendizaje y la búsqueda de excelencia y mejora continua. Es una persona reconocida y valorada por su aporte humano en cualquier equipo de trabajo donde le toque desempeñar sus funciones.
Se destaca por el entusiasmo que trasmite en todo lo que realiza. En cuanto a la estrategia y resolución de problemas, se destaca en el pensamiento lateral y la innovación. 
En cuanto a la comunicación, tiene mucha claridad conceptual especialmente en el plano de la oralidad. Es un gran comunicador de ideas, procesos, información. 
Pedagógico. Es un maestro innato. Es un gran promotor de la cultura de la colaboración y contagia motivación a las personas del equipo. Posee habilidades sociales 
muy desarrolladas que hace que cualquier equipo de trabajo se sienta a gusto con él.
4) Principales oportunidades de desarrollo y mejora: Mejora: Podría mejorar en la síntesis en la comunicación (especialmente escrita y visual). Podría mejorar 
su organización personal y planificación. También en la sistematización de sus conocimientos para poder trasmitirlos y aplicarlos en otros lados.
Podría mejorar su manejo de la ansiedad. Podría mejorar en la identificación de cursos estratégicos (planificación, priorización). Podría crecer hasta donde se lo 
proponga. No creo sea de su interés tener un cargo político, entiendo se siente más cómodo “en las sombras”. Podría crecer más con una mejor organización personal.
También si le interesa tener gente a cargo. Falta de seguridad para tomar decisiones en cuanto a procedimientos (a veces pregunta por las dudas pero ya sabe 
cómo tiene que manejarse) Podría ser un asesor en comunicación política para cualquier campaña del país, especialmente vinculada al story tellying y 
lo conceptual de una campaña. Tiene capacidad de escucha, interpretación de necesidades, motivación y buena predisposición. Tendría que mejorar la organización personal y la gestión del tiempo.
Desarrollo: Cumple por demás con todas las tareas que su rol requiere. Es un perfil muy dinámico, disfruta de trabajar en la multiplicidad de proyectos y tiene una marcada orientación hacia 
la producción de documentos y socialización del conocimiento a través de capacitaciones/jornadas de trabajo internas.  3) Principal aporte de valor: Motivación y cultura de la colaboración. Producción de conocimiento colectivo. 
Tiene una gran capacidad de producción de documentos, informes, presentaciones, investigación y habilidades para presentarlas de forma efectiva. Promotor de la cultura
participativa interna, fomenta la creación de espacios y el desarrollo de perfiles con esta perspectiva.
`
function formatSurveyData(formData) {
  let formattedData = "";
  Object.keys(surveyData).forEach((page) => {
    Object.keys(surveyData[page]).forEach((question) => {
      formattedData += `${question.replace(/_/g, " ")}: ${surveyData[page][question]}. `;
    });
  });
  return formattedData.trim();
}

const promptInputCuanti = formatSurveyData(formData);

const promptInputCuali = {}



//Ejecuto función:
//listarModelos();
//generarImagen();


module.exports = app;