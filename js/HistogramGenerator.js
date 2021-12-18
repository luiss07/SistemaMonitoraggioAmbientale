var barsVisualization;
var data;

drawChart = () => {
    console.log("drawchart");
    let startYear = document.getElementById("startList").options[document.getElementById("startList").selectedIndex].text;
    let endYear = document.getElementById("finishList").options[document.getElementById("finishList").selectedIndex].text;

    if (startYear <= endYear) {
        data = new google.visualization.DataTable();
        data.addColumn('string', 'Anno');
        data.addColumn('number', 'Quantità');

        console.log(startYear + " " + endYear);

        var animalHistoric = new Array();

        // get list of historic
        getHistoric(animalHistoric, startYear, endYear);
        console.log(animalHistoric);

        // sort by month or year
        if (startYear == endYear)
            animalHistoric = animalHistoric.sort((h1, h2) => (h1.Mese > h2.Mese) ? 1 : (h1.Mese < h2.Mese) ? -1 : 0);
        else
            animalHistoric = animalHistoric.sort((h1, h2) => (h1.Anno > h2.Anno) ? 1 : (h1.Anno < h2.Anno) ? -1 : 0);

        console.log(animalHistoric);

        data.addRows([
            // da popolare dinamicamente
            ['2016', 14],
            ['2017', 12],
            ['2018', 11],
            ['2019', 15],
            ['2020', 17]
        ]);
        data.addRows([['2021', 16]]);
    
        barsVisualization = new google.visualization.ColumnChart(document.getElementById('chart_div'));
        barsVisualization.draw(data, null);
    
        google.visualization.events.addListener(barsVisualization, 'onmouseover', barMouseOver);
        google.visualization.events.addListener(barsVisualization, 'onmouseout', barMouseOut);
    } else {
        console.log("inizio deve essere minore di fine");
    }
}

barMouseOver = (e) => {
    barsVisualization.setSelection([e]);
}

barMouseOut = (e) => {
    barsVisualization.setSelection([{ 'row': null, 'column': null }]);
}

getHistoric = (animalHistoric, sY, eY) => {
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
            } else {
                console.log("seleziona parco");
            }
        })
}
