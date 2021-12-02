var Express = require("express");
var bodyParser = require("body-parser");

//define Express and BodyParser
var app = Express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//define MongoDB
var MongoClient = require("mongodb").MongoClient;
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

//define Images  CAUSAVA ERRORE SE AVVIO L'INDEX.JS (CREDO VADA INSTALLATO)
// SE CI SERVIRA LO INSTALLEREMO

var fileUpload = require('express-fileupload');
var fs = require('fs');
app.use(fileUpload());
app.use('/images', Express.static(__dirname + '/images'));


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

app.get('/api/fauna/:park', (request, response) => {
    database.inventory("Fauna").find({
        //Tipo: request.params.typeA,
        Parco : {$in : [request.params.park]}
    }).toArray((error, result) => {
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

app.get('/api/sensoreAmbiente', (request, response) => {
    database.collection("SensoreAmbiente").find({}).toArray((error, result) => {
        if (error) {
            console.log(error);
        }

        response.send(result);
    })
})

app.get('/api/sensoreGPS', (request, response) => {
    database.collection("SensoreGPS").find({}).toArray((error, result) => {
        if (error) {
            console.log(error);
        }

        response.send(result);
    })
})

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

app.get('/api/storicoFauna', (request, response) => {
    database.collection("StoricoFauna").find({}).toArray((error, result) => {
        if (error) {
            console.log(error);
        }

        response.send(result);
    })
})

/*
app.get('/api/amministratore', (request, response) => {
    database.collection("Amministratore").find({}).toArray((error, result) => {
        if (error) {
            console.log(error);
        }

        response.send(result);
    })
})
*/
//quello che ci interessa a noi
















//------------------------------------------------------------------------------------------------------------

//GET-POST-PUT-DELETE
/*
app.get('/', (request, response) => {
    response.json('Hello World');
})


app.get('/api/department', (request, response) => {

    database.collection("Department").find({}).toArray((error, result) => {
        if (error) {
            console.log(error);
        }

        response.send(result);
    })

})

app.post('/api/department', (request, response) => {

    database.collection("Department").count({}, function (error, numOfDocs) {
        if (error) {
            console.log(error);
        }

        database.collection("Department").insertOne({
            DepartmentId: numOfDocs + 1,
            DepartmentName: request.body['DepartmentName']
        });

        response.json("Added Successfully");
    })

})


app.put('/api/department', (request, response) => {

    database.collection("Department").updateOne(
        //Filter Criteria
        {
            "DepartmentId": request.body['DepartmentId']
        },
        //Update
        {
            $set:
            {
                "DepartmentName": request.body['DepartmentName']
            }

        }
    );

    response.json("Updated Successfully");
})



app.delete('/api/department/:id', (request, response) => {

    database.collection("Department").deleteOne({
        DepartmentId: parseInt(request.params.id)
    });

    response.json("Deleted Successfully");
})



app.get('/api/employee', (request, response) => {

    database.collection("Employee").find({}).toArray((error, result) => {
        if (error) {
            console.log(error);
        }

        response.send(result);
    })

})

app.post('/api/employee', (request, response) => {

    database.collection("Employee").count({}, function (error, numOfDocs) {
        if (error) {
            console.log(error);
        }

        database.collection("Employee").insertOne({
            EmployeeId: numOfDocs + 1,
            EmployeeName: request.body['EmployeeName'],
            Department: request.body['Department'],
            DateOfJoining: request.body['DateOfJoining'],
            PhotoFileName: request.body['PhotoFileName'],
        });

        response.json("Added Successfully");
    })

})


app.put('/api/employee', (request, response) => {

    database.collection("Employee").updateOne(
        //Filter Criteria
        {
            "EmployeeId": request.body['EmployeeId']
        },
        //Update
        {
            $set:
            {
                EmployeeName: request.body['EmployeeName'],
                Department: request.body['Department'],
                DateOfJoining: request.body['DateOfJoining'],
                PhotoFileName: request.body['PhotoFileName'],
            }

        }
    );

    response.json("Updated Successfully");
})



app.delete('/api/employee/:id', (request, response) => {

    database.collection("Employee").deleteOne({
        EmployeeId: parseInt(request.params.id)
    });

    response.json("Deleted Successfully");
})


app.post('/api/employee/savefile', (request, response) => {

    fs.writeFile("./Photos/" + request.files.file.name,
        request.files.file.data, function (err) {
            if (err) {
                console.log(err);
            }

            response.json(request.files.file.name);
        }
    )
})

app.get('/api/prodotti', (request, response) => {
    var data = fs.readFileSync('prodotti.json');
    var myObject = JSON.parse(data);

    response.send(myObject);

})


app.post('/api/prodotti', (request, response) => {

    // lettura file json e estrazione dati
    var data = fs.readFileSync('prodotti.json');
    var myObject = JSON.parse(data);


    // creazione nuovo elemento da inserire da Request Parameter
    let newProduct = {
        "Name": request.body['Name'],
        "Price": request.body['Price'],
        "Location": request.body['Location']
    };

    //aggiunta nuovo elemento
    myObject.products.push(newProduct);

    //aggiornamento file json con il nuovo elemento
    var newData = JSON.stringify(myObject);
    fs.writeFile('prodotti.json', newData, err => {
        // error checking
        if (err) throw err;

    });

    response.json("Prodotto Aggiunto Correttamente: (" + myObject.products.length + ")");
})



app.delete('/api/prodotti/:name', (request, response) => {
    var data = fs.readFileSync('prodotti.json');
    var myObject = JSON.parse(data);
    for (let [i, product] of myObject.products.entries()) {

        if (product.Name == request.params.name) {
            myObject.products.splice(i, 1);
        }
    }
    //memorizzo il nuovo JSON dopo la cancellazione
    var newData = JSON.stringify(myObject);
    fs.writeFile('prodotti.json', newData, err => {
        // error checking
        if (err) throw err;
    });
    response.json("Deleted Successfully: " + myObject.products.length);
})
*/