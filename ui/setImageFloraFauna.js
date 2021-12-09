async function setImageFloraFauna() {
    let sPage = sessionStorage.getItem("selectedPage");
    let response = await fetch(variables.API_URL+sPage);
    let data = await response.json();
    return data;
}

setImageFloraFauna().then(data=>{
    console.log("dentro setImageparco");
    let count = 0;
    let mainDiv = document.getElementById("ffImages");
    data.forEach(elem =>{
        console.log(sessionStorage.getItem("selectedAnimalPlant"));
        if (elem.Tipo == sessionStorage.getItem("selectedAnimalPlant")){
            elem.Immagine.forEach(image =>{
                let div = document.createElement("div");
                let img = document.createElement("img");
                if (count == 0){    //different div & img element for first declaration
                    div.setAttribute('class', 'carousel-item active');
                    img.setAttribute('src', '../images/FloraFauna/'+image);
                    img.setAttribute('class', 'myImg-fluid');
                    img.setAttribute('alt', sessionStorage.getItem("selectedPark") + 'image');
                    count++;
                    div.appendChild(img);
                }else{
                    div.setAttribute('class', 'carousel-item');
                    img.setAttribute('src', '../images/FloraFauna/'+image);
                    img.setAttribute('class', 'd-block w-100');
                    img.setAttribute('alt', '...');
                    div.appendChild(img);
                }
                mainDiv.appendChild(div);
            })
        }
    })
})