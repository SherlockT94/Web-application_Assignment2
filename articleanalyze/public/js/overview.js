google.charts.load('current', {packages: ['corechart']});

var options = {
        'width':500,
        'height':400};

var data = {'Nitrogen': 0.78, 'Oxygen': 0.21, 'Other': 0.01}

function drawPie(){
   	graphData = new google.visualization.DataTable();
	graphData.addColumn('string', 'Element');
	graphData.addColumn('number', 'Percentage');
	$.each(data, function(key, val) {
		graphData.addRow([key, val]);
	})
	var chart = new google.visualization.PieChart($("#thechart")[0]);
	chart.draw(graphData, options);
}

function drawBar(){
    graphData = new google.visualization.DataTable();
 graphData.addColumn('string', 'Element');
 graphData.addColumn('number', 'Percentage');
 $.each(data, function(key, val) {
     graphData.addRow([key, val]);
 })
 var chart = new google.visualization.BarChart($("#thechart")[0]);
 chart.draw(graphData, options);
}


$(document).ready(function() {
    $('select').show();
    $('#chart_title').html('Overall yearly revision number distribution');
    $('#bt_piechart').on('click',function(event){
        event.preventDefault();
        $('#chart_title').html('Revision number distribution by user type')
    	drawPie();
       })
    $("#bt_barchart").on('click',function(event){
        event.preventDefault();
        $('#chart_title').html('Overall yearly revision number distribution')
        drawBar();
    })

    
})