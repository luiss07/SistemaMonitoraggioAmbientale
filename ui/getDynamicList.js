async function getParkList() {
    let response = await fetch('http://localhost:49146/api/parco');
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
        a.setAttribute("href", "parco.html");

        li.onclick = function() {
            variables.selectedPark = park.Parco;
            let parkName = document.getElementById("parkName");
            parkName.innerHTML = park.Parco;
            return false;
        };

        li.appendChild(a);
        parklist.appendChild(li);
    })
})


//let liParco = document.getElementById("navParco");
//liParco.addEventListener('click', getParkList());

async function getFaunaList(){
    let response = await fetch('http://localhost:49146/api/fauna');
    let data = await response.json();
    return data;
}

getFaunaList().then(data=>{
    let faunalist = document.getElementById('listafauna');
    data.forEach(animal => {
        if (selectedPark != null){
            animal.Parco.forEach(park =>{
                if(park == selectedPark){
                    let li = document.createElement("li");
                    let a = document.createElement("a");
                    a.innerHTML = animal.Tipo;
                    a.setAttribute("class", "dropdown-item");
                    a.setAttribute("href", "parco.html");

                    li.onclick = function() {
                        variables.selectedAnimal = animal.Tipo;
                        return false;
                    };
                    li.appendChild(a);
                    faunalist.appendChild(li);
                }
            })
        }else{
            console.log("seleziona parco");
        }
    });
})

//let lifauna = document.getElementById("navFauna");
//lifauna.addEventListener('click', getFaunaList());