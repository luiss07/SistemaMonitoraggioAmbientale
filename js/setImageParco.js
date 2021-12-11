async function setImageParco() {
    let sPage = sessionStorage.getItem("selectedPage");
    let response = await fetch(variables.API_URL + 'parco');
    let data = await response.json();
    return data;
}

setImageParco().then(data => {
    let count = 0;
    let mainDiv = document.getElementById("parkImages");
    data.forEach(park => {
        if (park.Parco == sessionStorage.getItem("selectedPark")) {
            park.Immagine.forEach(image => {
                let div = document.createElement("div");
                let img = document.createElement("img");
                if (count == 0) {    //different div & img element for first declaration
                    div.setAttribute('class', 'carousel-item active');
                    img.setAttribute('src', '../images/Parchi/' + image);
                    img.setAttribute('class', 'myImg-fluid');
                    img.setAttribute('alt', park.Tipo + 'image');
                    count++;
                    div.appendChild(img);
                } else {
                    div.setAttribute('class', 'carousel-item');
                    img.setAttribute('src', '../images/Parchi/' + image);
                    img.setAttribute('class', 'd-block w-100');
                    img.setAttribute('alt', '...');
                    div.appendChild(img);
                }
                mainDiv.appendChild(div);
            })
        }
    })
})