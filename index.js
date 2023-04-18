//Importo del archivo app.js "app":
const app = require('./src/app.js')

//Creo el servidor:
const port = process.env.PORT || 1234 // || significa OR

app.listen(port,() => {
    console.log(`server is runnig in port + ${port}`);
})