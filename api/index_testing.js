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

//define Cors
var cors = require('cors')
app.use(cors())

//define Database name
var DATABASE = "SistemaMonitoraggioAmbientale";
var database;

//listen 
app.listen(49146, () => {
    console.log("APIs Running");
});


//API

app.get('/api/fauna', (request, response) => {
    MongoClient.connect(CONNECTION_STRING, { useNewUrlParser: true }, (error, client) => {
        database = client.db(DATABASE);
        console.log("Mongo DB Connection Successfull");
        database.collection("Fauna").find({}).toArray((error, result) => {
            if (error) {
                console.log(error);
            }

            response.status(200).send(result);
        })
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
                incendio: request.body['incendio'],
                meteo: request.body['meteo'],
                siccita: request.body['siccita'],
                risorseIdriche: request.body['risorseIdriche'],
            }

        }
    );

    response.json("Updated successfully");
})

app.post('/api/sensoreGPS', (request, response) => {

    database.collection("SensoreGPS").count({}, function (error) {
        if (error) {
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

app.delete('/api/sensoreGPS/:id', (request, response) => {
    let senId = new ObjectId(request.params.id);
    database.collection("SensoreGPS").deleteOne({
        _id: senId
    });

    response.json("Deleted successfully!");
})

module.exports = app; 