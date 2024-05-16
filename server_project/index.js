const express = require('express');
const userRoutes = require("./src/routes/user_routes");
const bodyParser = require("body-parser");
const cors = require('cors')

const app = express();
app.use(bodyParser.json());

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
// RUTAS
app.use('/users', userRoutes);

// poder acceder a leer el archivo .env
require( 'dotenv' ).config() ;

// conexión con la base de datos 
const CONNECTION_PORT = process.env.PORT || 3002;
app.listen(CONNECTION_PORT,()=>{
    console.log(`Server running on port ${CONNECTION_PORT}`);
});