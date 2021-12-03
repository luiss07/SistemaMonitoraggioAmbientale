const app = document.getElementById('root');

/*const logo = document.createElement('img');
logo.src = 'logo.png';*/

const container = document.getElementById('listaParchi');
container.setAttribute('class', 'container');

//app.appendChild(logo);
app.appendChild(container);

var request = new XMLHttpRequest();
request.open('GET', 'http://localhost:49146/api/parco', true);
request.onload = function () {


    // Begin accessing JSON data here
    var data = JSON.parse(this.response);
    console.log("eccolo: " + data.Parco);
    if (request.status >= 200 && request.status < 400) {
        data.Parco.forEach(parco => {

            const li = document.createElement('li');
            li.setAttribute('class', 'href');
            /*
            const card = document.createElement('div');
            card.setAttribute('class', 'card');


            const h1 = document.createElement('h1');
            h1.textContent = product.Name;

            const p = document.createElement('p');
            p.textContent = `PRICE: ${product.Price}`;

            const p1 = document.createElement('p');
            p1.textContent = `LOCATION: ${product.Location}`;

            container.appendChild(card);
            card.appendChild(h1);
            card.appendChild(p);
            card.appendChild(p1);
            */
        });
    } else {
        const errorMessage = document.createElement('marquee');
        errorMessage.textContent = `THE API IS NOT WORKING!`;
        app.appendChild(errorMessage);
    }
}

request.send();