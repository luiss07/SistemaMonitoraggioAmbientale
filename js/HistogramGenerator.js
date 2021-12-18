drawChart = () => {
    console.log("drawchart");
    let startYear = document.getElementById("startList").options[document.getElementById("startList").selectedIndex].text;
    let endYear = document.getElementById("finishList").options[document.getElementById("finishList").selectedIndex].text;

    if (startYear <= endYear) {
        getHistoric(startYear, endYear);
    } else {
        Swal.fire({
            title: 'Attenzione!',
            text: "Il tempo non scorre al contrario.",
            icon: 'warning',
            confirmButtonColor: '#0095B6',
            confirmButtonText: 'OK'
          })
    }
}

barMouseOver = (e) => {
    barsVisualization.setSelection([e]);
}

barMouseOut = (e) => {
    barsVisualization.setSelection([{ 'row': null, 'column': null }]);
}

getHistoric = (sY, eY) => {
    var animalHistoric = new Array();

    fetch(variables.API_URL + 'storicoFauna/' + sessionStorage.getItem("selectedAnimalPlant") + "/" + sessionStorage.getItem("selectedPark"), {
        method: 'GET'
    })
        .then(response => response.json())
        .then(data => {
            if (sessionStorage.getItem("selectedPark") != null) {
                let equal = false;
                if (sY == eY) equal = true;

                data.forEach(h => {
                    if (equal && h.Anno == sY) {
                        animalHistoric.push(h);
                    } else if (h.Anno >= sY && h.Anno <= eY) {
                        animalHistoric.push(h);
                    }
                })
                return animalHistoric;
            } else {
                console.log("seleziona parco");
            }
        })
        .then(animalHistoric => {
            //console.log(animalHistoric);
            data = new google.visualization.DataTable();
            data.addColumn('string', 'Anno');
            data.addColumn('number', 'Quantità');

            // sort by month or year
            if (sY == eY){
                animalHistoric = animalHistoric.sort((h1, h2) => (h1.Mese > h2.Mese) ? 1 : (h1.Mese < h2.Mese) ? -1 : 0);
                animalHistoric.forEach(h => {
                    data.addRows([[mesi[h.Mese-1], h.NumEsemplari]])
                })

            }else{
                animalHistoric = animalHistoric.sort((h1, h2) => (h1.Anno > h2.Anno) ? 1 : (h1.Anno < h2.Anno) ? -1 : 0);
                let sumHistoric = [];
                let sumIndex = 0, YearSoFar = 0;
                let countMonth = new Array();
                console.log(animalHistoric);
                Object.keys(Object.keys(animalHistoric).length);
                for (let i = 0; i < Object.keys(animalHistoric).length; i++){
                    if (YearSoFar == animalHistoric[i].Anno){
                        sumHistoric[sumIndex-1].NumEsemplari += animalHistoric[i].NumEsemplari;
                        countMonth[sumIndex-1] += 1;
                    }else{
                        YearSoFar = animalHistoric[i].Anno;
                        sumHistoric[sumIndex] = animalHistoric[i];
                        countMonth[sumIndex] = 0 + 1;
                        console.log(countMonth[sumIndex]);
                        sumIndex++;
                    }
                }
                console.log(sumHistoric);
                for (let i = 0; i < Object.keys(sumHistoric).length; i++){
                    let year = sumHistoric[i].Anno.toString();
                    let avg = Math.trunc(sumHistoric[i].NumEsemplari/countMonth[i])
                    data.addRows([[year, avg]]);
                }
            }
            
            barsVisualization = new google.visualization.ColumnChart(document.getElementById('chart_div'));
            barsVisualization.draw(data, null);

            google.visualization.events.addListener(barsVisualization, 'onmouseover', barMouseOver);
            google.visualization.events.addListener(barsVisualization, 'onmouseout', barMouseOut);
        })
}
