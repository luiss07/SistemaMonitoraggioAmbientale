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
 *                         example: 61a2ae7bb48bb237244bf8a9
 *                       Type:
 *                         type: string
 *                         description: Type of the animal
 *                         example: Bear
 *                       Description:
 *                         type: string
 *                         description: The animal description.
 *                         example: This is a bear.
 *                       Image: 
 *                          type: array
 *                          items:
 *                              type: string
 *                          description: The animal image.
 *                          example: bear.jpg
 *                       Contenimento:
 *                          type: bool
 *                          description: If the species has the GPS sensor attached to it
 *                          example: true
 *                       Parco:
 *                          type: array
 *                          items:
 *                              type: string
 *                          description: The list of parks that cointain such animal.
 *                          example: [ Gran Paradiso, La Mandria ]
 */



app.get('/api/fauna', (request, response) => {
    database.collection("Fauna").find({}).toArray((error, result) => {
        if (error) {
            console.log(error);
        }

        response.send(result);
    })
})

/**
 * @swagger
 * /api/fauna/{animale}:
 *   get:
 *     summary: Retrieve a specific animal.
 *     description: Retrieve a specific animal from the Server.
 *     parameters:
 *       - in: path
 *         name: animale
 *         schema: 
 *             type: string
 *         required: true
 *         description: name of the animal desired
 *     responses:
 *       200:
 *         description: A spefic animal.
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
 *                         example: 61a2ae7bb48bb237244bf8a9
 *                       Type:
 *                         type: string
 *                         description: Type of the animal
 *                         example: Bear
 *                       Description:
 *                         type: string
 *                         description: The animal description.
 *                         example: This is a bear.
 *                       Image: 
 *                          type: array
 *                          items:
 *                              type: string
 *                          description: The animal image.
 *                          example: bear.jpg
 *                       Contenimento:
 *                          type: bool
 *                          description: If the species has the GPS sensor attached to it
 *                          example: true
 *                       Parco:
 *                          type: array
 *                          items:
 *                              type: string
 *                          description: The list of parks that cointain such animal.
 *                          example: [ Gran Paradiso, La Mandria ]
 */

app.get('/api/fauna/:animale', (request, response) => {
    database.collection("Fauna").find({
        Tipo: request.params.animale
    }).toArray((error, result) => {
        if (error) {
            console.log(error);
        }

        response.send(result);
    })
})

/**
 * @swagger
 * /api/flora:
 *   get:
 *     summary: Retrieve a list of flora.
 *     description: Retrieve a list of flora from the Server.
 *     responses:
 *       200:
 *         description: A list of flora.
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
 *                         description: Id of the vegetal.
 *                         example: 61a2ae7bb48bb237244bf8a9
 *                       Type:
 *                         type: string
 *                         description: Type of the vegetal.
 *                         example: Arnica
 *                       Description:
 *                         type: string
 *                         description: The vegetal description.
 *                         example: This is the Arnica plant.
 *                       Image:
 *                          type: string
 *                          description: The vegetal image.
 *                          example: arnica.jpg
 *                       Parco:
 *                          type: array
 *                          items: 
 *                              type: string
 *                          description: The list of parks that cointain such vegetable
 *                          example: [ Gran Paradiso, La Mandria ]
 *                       
 */

app.get('/api/flora', (request, response) => {
    database.collection("Flora").find({}).toArray((error, result) => {
        if (error) {
            console.log(error);
        }

        response.send(result);
    })
})

/**
 * @swagger
 * /api/flora/{pianta}:
 *   get:
 *     summary: Retrieve a specific vegetal.
 *     description: Retrieve a specific vegetal from the Server.
 *     parameters:
 *       - in: path
 *         name: pianta
 *         schema: 
 *             type: string
 *         required: true
 *         description: name of the vegetal desired
 *     responses:
 *       200:
 *         description: A vegetal.
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
 *                         description: Id of the vegetal.
 *                         example: 61a2ae7bb48bb237244bf8a9
 *                       Type:
 *                         type: string
 *                         description: Type of the vegetal.
 *                         example: Arnica
 *                       Description:
 *                         type: string
 *                         description: The vegetal description.
 *                         example: This is the Arnica plant.
 *                       Image:
 *                          type: string
 *                          description: The vegetal image.
 *                          example: arnica.jpg
 *                       Parco:
 *                          type: array
 *                          items: 
 *                              type: string
 *                          description: The list of parks that cointain such vegetable
 *                          example: [ Gran Paradiso, La Mandria ]
 *                       
 */
app.get('/api/flora/:pianta', (request, response) => {
    database.collection("Flora").find({
        Tipo: request.params.pianta
    }).toArray((error, result) => {
        if (error) {
            console.log(error);
        }

        response.send(result);
    })
})


/**
 * @swagger
 * /api/parco:
 *   get:
 *     summary: Retrieve a list of parks.
 *     description: Retrieve a list of parks from the Server.
 *     responses:
 *       200:
 *         description: A list of parks.
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
 *                         description: Id of the park.
 *                         example: 61a2ae7bb48bb237244bf8a9
 *                       Posizione:
 *                         type: string
 *                         description: Position of the park
 *                         example: 45° 32' 00 N 7° 17' 00 E
 *                       Coordinate:
 *                         type: string
 *                         description: URL to get the address of the park's map plugin from Google.
 *                         example: https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d89449.64978081748!2d7.204201272472531!3d45.52413689390132!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47891f116149b481%3A0xb8f1d32359844c53!2sParco%20Nazionale%20Gran%20Paradiso!5e0!3m2!1sit!2sit!4v1639037968821!5m2!1sit!2sit.
 *                       Image: 
 *                          type: array
 *                          items: 
 *                              type: string
 *                          description: The list of images of that park
 *                          example: [ GranParadiso.png , GranParadiso1.png ]
 *                       
 */
app.get('/api/parco', (request, response) => {
    database.collection("Parco").find({}).toArray((error, result) => {
        if (error) {
            console.log(error);
        }

        response.send(result);
    })
})

/**
 * @swagger
 * /api/parco/{name}:
 *   get:
 *     summary: Retrieve a specific park.
 *     description: Retrieve a park from the Server.
 *     parameters:
 *       - in: path
 *         name: name
 *         schema: 
 *             type: string
 *         required: true
 *         description: name of the park desired
 *     responses:
 *       200:
 *         description: A specific park.
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
 *                         description: Id of the park.
 *                         example: 61a2ae7bb48bb237244bf8a9
 *                       Posizione:
 *                         type: string
 *                         description: Position of the park
 *                         example: 45° 32' 00 N 7° 17' 00 E
 *                       Coordinate:
 *                         type: string
 *                         description: URL to get the address of the park's map plugin from Google.
 *                         example: https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d89449.64978081748!2d7.204201272472531!3d45.52413689390132!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47891f116149b481%3A0xb8f1d32359844c53!2sParco%20Nazionale%20Gran%20Paradiso!5e0!3m2!1sit!2sit!4v1639037968821!5m2!1sit!2sit.
 *                       Image: 
 *                          type: array
 *                          items: 
 *                              type: string
 *                          description: The list of images of that park
 *                          example: [ GranParadiso.png , GranParadiso1.png ]
 *                       
 */
app.get('/api/parco/:name', (request, response) => {
    database.collection("Parco").find({
        Parco: request.params.name
    }).toArray((error, result) => {
        if (error) {
            console.log(error);
        }

        response.send(result);
    })
})

/**
 * @swagger
 * /api/rischioAmbientale:
 *   get:
 *     summary: Retrieve a list of enviromental risks of the parks.
 *     description: Retrieve a list of enviromental risks of the parks from the Server.
 *     responses:
 *       200:
 *         description: A list of enviromental risks.
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
 *                         description: Id of the park.
 *                         example: 61a2ae7bb48bb237244bf8a9
 *                       allagamento:
 *                         type: integer
 *                         description: "flood level of the park expressed out of 100."
 *                         example: 86
 *                       incendio:
 *                         type: integer
 *                         description: fire percentage of the park.
 *                         example: 21
 *                       meteo: 
 *                          type: integer
 *                          description: probability of rain in the park.
 *                          example: 2
 *                       parco:
 *                          type: string
 *                          description: the name of the park.
 *                          example: Gran Paradiso
 *                       risorseIdriche:
 *                          type: integer
 *                          description: danger level of water resources to run out in the park.
 *                          example: 11
 *                       siccita:
 *                          type: integer
 *                          description: drought level of the park
 *                          example: 90
 * 
 */
app.get('/api/rischioAmbientale', (request, response) => {
    database.collection("rischioAmbientale").find({}).toArray((error, result) => {
        if (error) {
            console.log(error);
        }

        response.send(result);
    })
})

/**
 * @swagger
 * /api/rischioAmbientale/{parco}:
 *   get:
 *     summary: Retrieve the enviromental risk correlated to the park.
 *     description: Retrieve the enviromental risk of the park from the Server given a specific park.
 *     parameters:
 *       - in: path
 *         name: parco
 *         schema: 
 *             type: string
 *         required: true
 *         description: name of the park that you need information about the enviromental risk
 *     responses:
 *       200:
 *         description: Enviromental risk of the park.
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
 *                         description: Id of the park.
 *                         example: 61a2ae7bb48bb237244bf8a9
 *                       allagamento:
 *                         type: integer
 *                         description: "flood level of the park expressed out of 100."
 *                         example: 86
 *                       incendio:
 *                         type: integer
 *                         description: fire percentage of the park.
 *                         example: 21
 *                       meteo: 
 *                          type: integer
 *                          description: probability of rain in the park.
 *                          example: 2
 *                       parco:
 *                          type: string
 *                          description: the name of the park.
 *                          example: Gran Paradiso
 *                       risorseIdriche:
 *                          type: integer
 *                          description: danger level of water resources to run out in the park.
 *                          example: 11
 *                       siccita:
 *                          type: integer
 *                          description: drought level of the park
 *                          example: 90
 * 
 */

app.get('/api/rischioAmbientale/:parco', (request, response) => {
    database.collection("rischioAmbientale").find({
        parco: request.params.parco
    }).toArray((error, result) => {
        if (error) {
            console.log(error);
        }

        response.send(result);
    })
})

/**
 * @swagger
 * /api/rischioAmbientale:
 *   put:
 *     summary: Modify the values of a park's enviromental statistics.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
*                       allagamento:
*                         type: integer
*                         description: "flood level of the park expressed out of 100."
*                         example: 86
*                       incendio:
*                         type: integer
*                         description: fire percentage of the park.
*                         example: 21
*                       meteo: 
*                          type: integer
*                          description: probability of rain in the park.
*                          example: 2
*                       parco:
*                          type: string
*                          description: the name of the park.
*                          example: Gran Paradiso
*                       risorseIdriche:
*                          type: integer
*                          description: danger level of water resources to run out in the park.
*                          example: 11
*                       siccita:
*                          type: integer
*                          description: drought level of the park
*                          example: 90
 *     responses:
 *       201:
 *         description: successful executed
*/
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
                incendio: request.body['incendio'],
                meteo: request.body['meteo'],
                siccita: request.body['siccita'],
                risorseIdriche: request.body['risorseIdriche'],
            }

        }
    );

    response.json("Updated Successfully");
})


/**
 * @swagger
 * /api/sensoreGPS/{parco}:
 *   get:
 *     summary: Retreive all of the GPS Sensors of a park.
 *     description: Retreive all of the GPS Sensors of a park from the Server.
 *     parameters:
 *       - in: path
 *         name: parco
 *         schema: 
 *             type: string
 *         required: true
 *         description: name of the park
 *     responses:
 *       200:
 *         description: A list of GPS Sensors.
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
 *                         example: 61a2ae7bb48bb237244bf8a9
 *                       Posizione:
 *                         type: string
 *                         description: Position of the animal
 *                         example: 45° 28' 23 N 7° 20' 35 E
 *                       TipoAnimale:
 *                         type: string
 *                         description: The animal species.
 *                         example: Lupo
 *                       Parco: 
 *                          type: string
 *                          description: The name of the park.
 *                          example: Gran Paradiso
 *                       SenId:
 *                          type: integer
 *                          description: The id of the GPS Sensor.
 *                          example: 2
 */
app.get('/api/sensoreGPS/:parco', (request, response) => {
    database.collection("SensoreGPS").find({
        Parco: request.params.parco
    }).toArray((error, result) => {
        if (error) {
            console.log(error);
        }

        response.send(result);
    })
})


/**
 * @swagger
 * /api/sensoreGPS/{animale}/{parco}:
 *   get:
 *     summary: Retreive all of the GPS Sensors of a park related to a specific species.
 *     description: Retreive all of the GPS Sensors of a park related to a specific species from the Server.
 *     parameters:
 *       - in: path
 *         name: animale
 *         schema: 
 *             type: string
 *         required: true
 *         description: name of the animal
 *       - in: path
 *         name: parco
 *         schema: 
 *             type: string
 *         required: true
 *         description: name of the park
 *     responses:
 *       200:
 *         description: A list of GPS Sensors.
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
 *                         example: 61a2ae7bb48bb237244bf8a9
 *                       Posizione:
 *                         type: string
 *                         description: Position of the animal
 *                         example: 45° 28' 23 N 7° 20' 35 E
 *                       TipoAnimale:
 *                         type: string
 *                         description: The animal species.
 *                         example: Lupo
 *                       Parco: 
 *                          type: string
 *                          description: The name of the park.
 *                          example: Gran Paradiso
 *                       SenId:
 *                          type: integer
 *                          description: The id of the GPS Sensor.
 *                          example: 2
 */

app.get('/api/sensoreGPS/:animale/:parco', (request, response) => {
    database.collection("SensoreGPS").find({
        TipoAnimale: request.params.animale,
        Parco: request.params.parco
    }).toArray((error, result) => {
        if (error) {
            console.log(error);
        }

        response.send(result);
    })
})

/**
 * @swagger
 * /api/sensoreGPS:
 *   post:
 *     summary: Create a GPS sensor.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               posizione:
 *                  type: string
 *                  description: Position of the sensor.
 *                  example: 45° 28' 23 N 7° 20' 35 E
 *               tipoAnimale:
 *                  type: string
 *                  description: The animal who has the GPS sensor.
 *                  example: orso
 *               parco:
 *                  type: string
 *                  description: The park in which the animal is located.
 *                  example: Gran Paradiso
 *               senId:
 *                  type: integer
 *                  description: An incremental identifier used to address the number of sensors in a park and other functions
 *                  example: 1
 *     responses:
 *       201:
 *         description: successful executed
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
            SenId: request.body['senId']
        });

        response.json("Added Successfully");
    })
})



/**
 * @swagger
 * /api/sensoreGPS/{id}:
 *   delete:
 *     summary: Delete a GPS sensor.
 *     description: Given an ObjectId, the sensor gets removed from the Server.
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *             type: string
 *         required: true
 *         description: Insert the Id of the object
 *     responses:
 *       200:
 *         description: the product was deleted
 *       404:
 *         description: the product was not found
*/

app.delete('/api/sensoreGPS/:id', (request,response) => {
    let senId = new ObjectId(request.params.id);
    database.collection("SensoreGPS").deleteOne({
        _id: senId
    });

    response.json("Delete successfully!");
})

/**
 * @swagger
 * /api/storicoFauna:
 *   get:
 *     summary: Retrieve the historical of the park.
 *     description: Retrieve the historical of the park from the Server.
 *     responses:
 *       200:
 *         description: The historical of the park.
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
 *                         description: Id of the historic.
 *                         example: 619ffb40588047e3616941db
 *                       Parco:
 *                         type: string
 *                         description: Name of the park that is being referred.
 *                         example: Gran Paradiso
 *                       TipoAnimale:
 *                         type: string
 *                         description: The species of the animal.
 *                         example: Orso
 *                       NumEsemplari:
 *                         type: integer
 *                         description: The vegetal image.
 *                         example: arnica.jpg
 *                       Giorno:
 *                         type: integer
 *                         description: The day of the date.
 *                         example: 1
 *                       Anno: 
 *                         type: integer
 *                         description: The year of the date.
 *                         example: 2021
 *                       Mese:
 *                         type: integer
 *                         description: The month of the date.
 *                         example: 11
 *                       
 */

app.get('/api/storicoFauna', (request, response) => {
    database.collection("StoricoFauna").find({}).toArray((error, result) => {
        if (error) {
            console.log(error);
        }

        response.send(result);
    })
})