var test = require('tape');
var request = require('supertest');
var app = require('./index_testing.js');

test('TEST1: correct fauna returned', function (assert) {
    request(app)
        .get('/api/fauna')
        .expect('Content-Type', /json/)
        .expect(200)
        .end(function (err, res) {
            var expectedUsers = [{
              "_id":  "61a2ae7bb48bb237244bf8a9",
              "Tipo": "Orso",
              "Descrizione": "Gli ursidi sono una famiglia di mammiferi appartenenti al sottordine dei caniformi. Sebbene oggi siano rappresentati solo da otto specie, essi sono molto diffusi e sono presenti in un'ampia varietà di habitat di tutto l'emisfero boreale e, in parte, di quello australe. Si trovano infatti in Nordamerica, Sudamerica, Europa e Asia. Caratteristiche comuni proprie degli orsi moderni sono il grande corpo sorretto da zampe tozze, il lungo muso, le piccole orecchie rotonde, la pelliccia ispida, le zampe plantigrade dotate di cinque artigli non retrattili e la coda corta.",
              "Immagine": [
                "orso.jpg",
                "orso2.jpg",
                "orso3.jpg"
              ],
              "Parco": [
                "Gran Paradiso"
              ],
              "Contenimento": true
            },{
              "_id": "61a7d19c96b02c0281a9dc37",
              "Tipo": "Lupo",
              "Descrizione": "Il lupo grigio, detto anche lupo comune o semplicemente lupo, è un canide lupino, presente nelle zone remote del Nordamerica e dell'Eurasia. È il più grande della sua famiglia, con un peso medio di 43–45 kg per i maschi, e 36-38,5 kg per le femmine. Oltre le dimensioni, il lupo grigio si distingue dagli altri membri del genere Canis per il suo muso e le orecchie meno appuntite. Il suo mantello invernale è lungo e folto, di colore prevalentemente grigio variegato. Alcuni esemplari presentano anche mantelli bianchi, rossi, bruni o neri.",
              "Immagine": [
                "lupo.jpg",
                "lupo2.jpg",
                "lupo3.jpg"
              ],
              "Parco": [
                "Gran Paradiso",
                "Stelvio"
              ],
              "Contenimento": true
            },{
              "_id": "61a7d28896b02c0281a9dc3b",
              "Tipo": "Volpe",
              "Descrizione": "La volpe rossa, o semplicemente volpe, è la più grande delle volpi propriamente dette e il carnivoro con l'areale più vasto, essendo presente in tutto l'emisfero boreale dal circolo polare artico al Nordafrica, il Nordamerica e l'Eurasia. È classificata come specie a rischio minimo dall'IUCN. Il suo areale si è espanso insieme a quello umano, essendo stata introdotta in Australia, dove vive considerata nociva per i marsupiali e uccelli indigeni. A causa dei suoi danni ecologici in quest'ultimo continente, la specie è considerata una tra le peggiori specie invasive.",
              "Immagine": [
                "volpe.jpg",
                "volpe2.jpg",
                "volpe3.jpg"
              ],
              "Parco": [
                "Stelvio"
              ],
              "Contenimento": true
            },{
              "_id": "61aa55e1528b2ed0b34f883c",
              "Tipo": "Stambecco",
              "Descrizione": "Lo stambecco, specie simbolo del Parco Nazionale Gran Paradiso, vive nelle praterie d'alta quota e sulle pareti rocciose. Le differenze tra il maschio e la femmina sono molto accentuate; alla fine dell'autunno il peso medio dei maschi adulti è di circa 90 kg, con una lunghezza media di circa 160 cm. Le femmine pesano 35-49 kg e hanno una lunghezza media di 135 cm.",
              "Immagine": [
                "stambecco.jpg",
                "stambecco2.jpg",
                "stambecco3.jpg"
              ],
              "Parco": [
                "Gran Paradiso"
              ],
              "Contenimento": true
            },{
              "_id": "61aa5784528b2ed0b34f8850",
              "Tipo": "Cervo",
              "Descrizione": "Il cervo è il più grosso erbivoro selvatico esistente sulle Alpi, pesa fra gli 80 kg e 200 kg circa. Il maschio è dotato di corna anche di notevoli dimensioni (palco), che cadono in inverno per riformarsi poi in pochi mesi sempre più ramificate e robuste. Il colore del mantello è bruno-rossastro in estate e grigio-bruno in inverno. I piccoli, nei primi mesi di vita, presentano una pelliccia maculata. Il cervo svolge generalmente un’attività crepuscolare –notturna. Vive in branchi composti da femmine e giovani, guidati da una femmina adulta. Il cervo essendo una delle prerogative della specie ha la  necessità  di disporre di spazi molto ampi.",
              "Immagine": [
                "cervo.jpg",
                "cervo2.jpg",
                "cervo3.jpg"
              ],
              "Parco": [
                "Stelvio"
              ],
              "Contenimento": true
            },{
              "_id": "61aa581a528b2ed0b34f8851",
              "Tipo": "Rana Temporaria",
              "Descrizione": "La Rana temporaria, nota anche come rana alpina o  rana rossa, è un anfibio anuro della famiglia Ranidae, di comune diffusione in Europa. In Italia la sua distribuzione è concentrata nel territorio Veneto.",
              "Immagine": [
                "rana_temporaria.jpg",
                "rana_temporaria2.jpg",
                "rana_temporaria3.jpg"
              ],
              "Parco": [
                "Stelvio"
              ],
              "Contenimento": false
            },{
              "_id": "61aa5985528b2ed0b34f8858",
              "Tipo": "Vipera",
              "Descrizione": "La vipera si distingue dagli altri serpenti per alcune caratteristiche distintive: ha la testa triangolare, contrariamente alla forma ovoidale degli altri serpenti, il corpo è piuttosto tozzo e non supera in nessun caso il metro di lunghezza, i loro occhi hanno la pupilla stretta e verticale, come i gatti, mentre gli altri serpenti hanno la pupilla tonda e il loro colore, che ovviamente differisce da specie a specie, è tendenzialmente bruno- rossastro scuro, a volte con macchie nere e comunque mai con tonalità o colori vivaci, quali sfumature di giallo, rosso o verde invece presenti in alcune specie di serpenti non velenosi. Naturalmente un altro segno distintivo è quello costituito dai due canini particolarmente evidenti, lunghi e appuntiti.",
              "Immagine": [
                "vipera.jpg",
                "vipera2.jpg",
                "vipera3.jpg"
              ],
              "Parco": [
                "La Mandria"
              ],
              "Contenimento": false
            },{
              "_id": "61aa59e0528b2ed0b34f8859",
              "Tipo": "Cinghiale",
              "Descrizione": "l Cinghiale appartiene all’ordine Artiodactyla, famiglia Suidae, grossi mammiferi di cui rappresenta l’unica specie selvatica in Europa. Il cinghiale è un mammifero di taglia piuttosto grossa, con una lunghezza corporea complessiva fino a 180 cm ed altezza alla spalla fino a 100 cm; il peso va da circa 87 kg nelle femmine ad oltre 94 kg per i maschi. Il cinghiale è simile ad un grosso maiale, l’aspetto è robusto e tozzo, con il corpo di forma allungata e gli arti corti. Il capo, a forma triangolare allungata, è molto grande rispetto al corpo, fino a raggiungere un terzo della lunghezza totale; nella femmina la testa appare però più slanciata. Il cinghiale presenta canini molto sporgenti a foggia di zanne, più grandi nei maschi, e presenta un grugno all’apice del muso, tipico dei suini. La coda, tenuta diritta, è corta e si completa con un ciuffo di peli. Il mantello del cinghiale è folto, di colore bruno scuro, con tonalità molto variabili; nei giovani sono presenti tipiche striature longitudinali marrone e crema, che li rendono particolarmente riconoscibili. Nelle popolazioni di Cinghiale si distinguono due tipi di raggruppamenti: i nuclei familiari più duraturi, costituiti da una o più femmine adulte e la loro prole, e piccoli gruppi di giovani maschi, meno stabili. All’interno di questi insiemi si stabilisce una gerarchia piuttosto rigida e ben definita, al cui interno il rango dipende da fattori quali sesso, età, dimensioni ed aggressività.",
              "Immagine": [
                "cinghiale.jpg",
                "cinghiale2.jpg",
                "cinghiale3.jpg"
              ],
              "Parco": [
                "La Mandria"
              ],
              "Contenimento": true
            },{
              "_id": "61ace1ad8b6876244a2029ba",
              "Tipo": "Scoiattolo Rosso",
              "Descrizione": "Lo scoiattolo rosso è lo scoiattolo tipico del nostro continente, abita l'Europa da più di centomila anni. La sua sopravvivenza è minacciata dalla presenza dello scoiattolo grigio americano, introdotto in Europa dall'uomo. Lo scoiattolo grigio è più efficiente nell'occupare lo spazio e sfruttare le risorse disponibili, in particolare le fonti di cibo, saccheggiando anche le scorte accantonate dallo scoiattolo rosso. Raggiunge sul territorio densità elevate: anche 10 volte quelle del rosso. La combinazione di questi fattori, da sola, crea evidenti difficoltà di sopravvivenza per lo scoiattolo rosso. Quando il grigio compare in una zona dove è presente lo scoiattolo nativo, dopo pochi anni riesce a soppiantarlo, portandolo gradualmente all'estinzione.",
              "Immagine": [
                "scoiattolo.jpg",
                "scoiattolo2.jpg",
                "scoiattolo3.jpg"
              ],
              "Parco": [
                "La Mandria"
              ],
              "Contenimento": false
            }];

            assert.error(err, 'No error');
            assert.same(res.body, expectedUsers, 'Fauna as expected');
            assert.end();
        });
});

test('TEST2: correct sensor added', function (assert) {
    request(app)
        .post('/api/sensoreGPS')
        .send({
            "posizione": "45° 32' 47 N 7° 10' 59 E",
            "tipoAnimale": "TestingAnimal",
            "parco": "Gran Paradiso",
            "senId": "100"
        })
        .end((err, res) => {

            if (err) {
                reject(new Error('An error occured with the sensor Adding API, err: ' + err))
            }

            assert.error(err, 'No error');
            assert.isEqual("Added Successfully", res.body, "Sensor added correctly")
            assert.end();
        });
});

test('TEST3: sensor deleted', function (assert) {
    request(app)
        .del('/api/sensoreGPS/61c0f505965f98fb6fec93bf')
        .end((err, res) => {

            if (err) {
                reject(new Error('An error occured with the sensor Deleting API, err: ' + err))
            }

            assert.error(err, 'No error');
            assert.isEqual("Deleted successfully!", res.body, "Sensor deleted correctly")
            assert.end();
        });
});

test('TEST4: risk modify', function (assert) {
    request(app)
        .put('/api/rischioAmbientale')
        .send({
          "parco": "Gran Paradiso",
          "allagamento": 0,
          "meteo": 0,
          "siccita": 0,
          "risorseIdriche": 0,
          "incendio": 0
        })
        .end((err, res) => {

            if (err) {
                reject(new Error('An error occured with the modifying API, err: ' + err))
            }

            assert.error(err, 'No error');
            assert.isEqual("Updated successfully", res.body, "Risk updated correctly")
            assert.end();
        });
});
