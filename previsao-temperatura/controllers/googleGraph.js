google.charts.load('current', { packages: ['corechart', 'line'] });
google.charts.setOnLoadCallback(drawBackgroundColor);

function drawBackgroundColor() {
    var data = new google.visualization.DataTable();
    data.addColumn('datetime', 'Date');
    data.addColumn('number', 'Temperature');

    var date_1 = new Date();
    var date_2 = new Date();
    var date_3 = new Date();

    date_1.setDate(date_1.getDate() - 2);
    date_2.setDate(date_2.getDate() - 1);

    data.addRows([
        [date_1, 25], [date_2, 30], [date_3, 28]
    ]);

    var options = {
        hAxis: {
            title: 'Time',
            format: 'Y-MM-d',
            textStyle: {
                fontSize: 12
            }
        },
        vAxis: {
            title: 'Temperature',
            textStyle: {
                fontSize: 12
            }
        },
        backgroundColor: '#f1f8e9',
        height: 400,
        textStyle: {
            fontSize: 50
        }
    };

    var chart = new google.visualization.LineChart(document.getElementById('chart_div'));
    chart.draw(data, options);
}
