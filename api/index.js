var Express = require("express");
var bodyParser = require("body-parser");

//define Express and BodyParser
var app = Express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//define MongoDB
var MongoClient = require("mongodb").MongoClient;
var ObjectId = require("mongodb").ObjectId;
const { request, response } = require("express");
var CONNECTION_STRING = "mongodb+srv://admin:admin@unitncluster.nnj5z.mongodb.net/test"

//define swagger
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const swaggerOptions = {
    swaggerDefinition: {
        openapi: '3.0.0',
        info: {
            title: 'SistemaMonitoraggioAmbientale API',
            version: '1.0.0',
            description:
                'Information about SistemaMonitoraggioAmbientale API',
            license: {
                name: 'Licensed Under MIT',
                url: 'https://spdx.org/licenses/MIT.html',
            },
            contact: {
                name: 'Group19',
                url: 'http://localhost:49146/',
            },
        },
        servers: [
            {
                url: 'http://localhost:49146/',
                description: 'Development server',
            },
        ],
    },
    apis: ["index.js"]
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

//define Cors
var cors = require('cors')
app.use(cors())

//define Database name
var DATABASE = "SistemaMonitoraggioAmbientale";
var database;

//listen 
app.listen(49146, () => {
    console.log("APIs Running");
    
    MongoClient.connect(CONNECTION_STRING, { useNewUrlParser: true }, (error, client) => {
        if (error) {
            console.log("Error connecting at the MongoDB:" + error); 
        } else {
            database = client.db(DATABASE);
            console.log("Mongo DB Connection Successfull");
        }
    })

});


//API


/**
 * @swagger
 * /api/fauna:
 *   get:
 *     summary: Retrieve a list of fauna.
 *     description: Retrieve a list of fauna from the Server.
 *     responses:
 *       200:
 *         description: A list of fauna.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: ObjectId
 *                         description: Id of the animal.
 *                         example: 1489045
 *                       Type:
 *                         type: string
 *                         description: Type of the animal
 *                         example: Bear
 *                       Description:
 *                         type: string
 *                         description: The animal description.
 *                         example: This is a bear.
 *                       Image:
 *                          type: string
 *                          description: The animal image.
 *                          example: bear.jpg
 *                       SpecieProtetta:
 *                          type: bool
 *                          description: Protected species
 *                          example: true
 */
app.get('/api/fauna', (request, response) => {
    database.collection("Fauna").find({}).toArray((error, result) => {
        if (error) {
            console.log(error);
        }

        response.send(result);
    })
})

app.get('/api/flora', (request, response) => {
    database.collection("Flora").find({}).toArray((error, result) => {
        if (error) {
            console.log(error);
        }

        response.send(result);
    })
})

app.get('/api/parco', (request, response) => {
    database.collection("Parco").find({}).toArray((error, result) => {
        if (error) {
            console.log(error);
        }

        response.send(result);
    })
})

app.get('/api/rischioAmbientale', (request, response) => {
    database.collection("rischioAmbientale").find({}).toArray((error, result) => {
        if (error) {
            console.log(error);
        }

        response.send(result);
    })
})

app.put('/api/rischioAmbientale', (request, response) => {

    database.collection("rischioAmbientale").updateOne(
        // Filter Criteria
        {
            "parco": request.body['parco']
        },
        // Update
        {
            $set:
            {
                allagamento: request.body['allagamento'],
                incendio: request['incendio'],
                meteo: request.body['meteo'],
                parco: request.body['parco'],
                risoreIdriche: request.body['risoreIdriche'],
            }

        }
    );

    response.json("Updated Successfully");
})

app.get('/api/sensoreGPS', (request, response) => {
    database.collection("SensoreGPS").find({}).toArray((error, result) => {
        if (error) {
            console.log(error);
        }

        response.send(result);
    })
})
/*
app.get('/api/sensoreGPS/:id', (request, response) => {
    let senId = new ObjectId(request.params.id);
    database.collection("SensoreGPS").find({
        _id: senId
    }).toArray((error, result) => {
        if (error) {
            console.log(error);
        }

        response.send(result);
    })
})
*/
app.post('/api/sensoreGPS', (request, response) => {

    database.collection("SensoreGPS").count({}, function (error) {
        if (error){
            console.log(error);
        }

        database.collection("SensoreGPS").insertOne({
            Posizione: request.body['posizione'],
            TipoAnimale: request.body['tipoAnimale'],
            Parco: request.body['parco'],
            Contenimento: request.body['contenimento'],
            SenId: request.body['senId']
        });

        response.json("Added Successfully");
    })
})

app.delete('/api/sensoreGPS/:id', (request,response) => {
    let senId = new ObjectId(request.params.id);
    database.collection("SensoreGPS").deleteOne({
        _id: senId
    });

    response.json("Delete successfully!");
})

app.get('/api/storicoFauna', (request, response) => {
    database.collection("StoricoFauna").find({}).toArray((error, result) => {
        if (error) {
            console.log(error);
        }

        response.send(result);
    })
})