const container = document.getElementById('listaParchi');

var request = new XMLHttpRequest();
request.open('GET', 'http://localhost:49146/api/parco', true);
request.onload = function () {

    // Begin accessing JSON data here
    var data = JSON.parse(this.response);
    console.log(data.Parco);
    if (request.status >= 200 && request.status < 400) {
        data.forEach(park => {

            let li = document.createElement("li");
            let a = document.createElement("a");
            a.innerHTML = park.Parco;
            a.setAttribute("class", "dropdown-item");
            a.setAttribute("href", "parco.html");

            li.onclick = function() {
                selectedPark = park.Parco;
                let parkName = document.getElementById("parkName");
                parkName.innerHTML = park.Parco;
                return false;
            };
            //li.setAttribute("onclick", "NOME_FUNZIONE");
            li.appendChild(a);
            container.appendChild(li);
        });
    } else {
        const errorMessage = document.createElement('marquee');
        errorMessage.textContent = `THE API IS NOT WORKING!`;
        app.appendChild(errorMessage);
    }
}

request.send();