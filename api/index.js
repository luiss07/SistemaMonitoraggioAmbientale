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
            title: 'Express API for My Project',
            version: '1.0.0',
            description:
                'This is a REST API application made with Express.',
            license: {
                name: 'Licensed Under MIT',
                url: 'https://spdx.org/licenses/MIT.html',
            },
            contact: {
                name: 'GroupXX',
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



//define Images

var fileUpload = require('express-fileupload');
var fs = require('fs');
app.use(fileUpload());
app.use('/Photos', Express.static(__dirname + '/Photos'));

//define Cors

var cors = require('cors')
app.use(cors())


var DATABASE = "SistemaMonitoraggioAmbientale";
var database;

//listen 
app.listen(49146, () => {
    console.log("APIs Running");
    
    MongoClient.connect(CONNECTION_STRING, { useNewUrlParser: true }, (error, client) => {
        database = client.db(DATABASE);
        console.log("Mongo DB Connection Successfull");
    })

});


//API

//quello che ci interessa a noi
















//------------------------------------------------------------------------------------------------------------

//GET-POST-PUT-DELETE
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