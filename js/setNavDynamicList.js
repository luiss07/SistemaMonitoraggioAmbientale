// API call to GET Park list

async function getParkList() {
    let response = await fetch(variables.API_URL+'parco');
    let data = await response.json();
    return data;
}

getParkList().then(data=>{
    let parklist = document.getElementById('listaParchi');
    data.forEach(park =>{
        let li = document.createElement("li");
        let a = document.createElement("a");
        a.innerHTML = park.Parco;
        a.setAttribute("class", "dropdown-item");

        li.onclick = function() {
            $("#loadJQuery").load("../ui/parco.html");
            sessionStorage["selectedPark"] = park.Parco;
            sessionStorage["selectedPage"] = "parco";
            sessionStorage["parkPos"] = park.Posizione;
            $("#nav-placeholder").load("../ui/navbar.html"); //reload to update the navbar with fauna & flora data
            return false;
        };

        li.appendChild(a);
        parklist.appendChild(li);
    })
})

// API call to GET fauna list

async function getFaunaList(){
    let response = await fetch(variables.API_URL+'fauna');
    let data = await response.json();
    return data;
}

getFaunaList().then(data=>{
    let faunalist = document.getElementById('listafauna');
    if (sessionStorage.getItem("selectedPark") != null){
        data.forEach(animal => {
            animal.Parco.forEach(park =>{
                if(park == sessionStorage.getItem("selectedPark")){
                    let li = document.createElement("li");
                    let a = document.createElement("a");
                    a.innerHTML = animal.Tipo;
                    a.setAttribute("class", "dropdown-item");

                    li.onclick = function() {
                        $("#loadJQuery").load("../ui/flora_fauna.html");
                        sessionStorage["selectedAnimalPlant"] = animal.Tipo;
                        sessionStorage["description"] = animal.Descrizione;
                        sessionStorage["selectedPage"] = "fauna";
                        return false;
                    };
                    li.appendChild(a);
                    faunalist.appendChild(li);
                }
            })
        });
    }else{
        console.log("seleziona parco");
    }
    
})

//API call to GET flora list

async function getFloraList(){
    let response = await fetch(variables.API_URL+'flora');
    let data = await response.json();
    return data;
}

getFloraList().then(data=>{
    let faunalist = document.getElementById('listaflora');
    if (sessionStorage.getItem("selectedPark") != null){
        data.forEach(plant => {
            plant.Parco.forEach(park =>{
                if(park == sessionStorage.getItem("selectedPark")){
                    let li = document.createElement("li");
                    let a = document.createElement("a");
                    a.innerHTML = plant.Tipo;
                    a.setAttribute("class", "dropdown-item");

                    li.onclick = function() {
                        $("#loadJQuery").load("../ui/flora_fauna.html");
                        sessionStorage["selectedAnimalPlant"] = plant.Tipo;
                        sessionStorage["description"] = plant.Descrizione;
                        sessionStorage["selectedPage"] = "flora";
                        return false;
                    };
                    li.appendChild(a);
                    faunalist.appendChild(li);
                }
            })
        });
    }else{
        console.log("seleziona parco");
    }
    
})