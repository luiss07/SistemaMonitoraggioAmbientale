
google.charts.load("current", { packages: ["corechart"] });
google.charts.setOnLoadCallback(drawChart);

var barsVisualization;
var data;

function drawChart() {
    data = new google.visualization.DataTable();
    data.addColumn('string', 'Anno');
    data.addColumn('number', 'Quantità');
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
}


function barMouseOver(e) {
    barsVisualization.setSelection([e]);
}

function barMouseOut(e) {
    barsVisualization.setSelection([{ 'row': null, 'column': null }]);
}
