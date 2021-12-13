
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
        ['2005', 3.6],
        ['2006', 4.1],
        ['2007', 3.8],
        ['2008', 3.9],
        ['2009', 4.6]
    ]);

    var options = {
        title: 'Lengths of dinosaurs, in meters',
        legend: { position: 'none' },
    };

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
