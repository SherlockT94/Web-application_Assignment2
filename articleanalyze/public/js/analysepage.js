/**
 * 
 */
google.charts.load('current', {packages: ['corechart']});
google.charts.setOnLoadCallback(drawChart);
function drawChart() {
  // Define the chart to be drawn.
  var data = new google.visualization.DataTable();
  data.addColumn('string', 'Element');
  data.addColumn('number', 'Percentage');
  data.addRows([
    ['Nitrogen', 0.78],
    ['Oxygen', 0.21],
    ['Other', 0.01]
  ]);

  // Instantiate and draw the chart.
  var chart = new google.visualization.PieChart(document.getElementById('thechart'));
  chart.draw(data, null);
}



$(document).ready(function() {
	//选择要展示的部分
    $('select').show();
    //初始化表格
    $.get("/initial_draw",
    		function(data,status){
    			//window.alert(data);
    		});
    // 初始化数据
    $.get("/initial",
		  function(data,status){
    	//window.alert(data);
    	//window.alert(data[0].NumOfRevisions);
    	current_date = new Date();
    	for(i=0;i<3;i++)
    	{
    		//填充most和least区域
    		$('#most'+(i+1)).html("Title: "+data[i]._id+"<br/>Number of revisions: "+data[i].NumOfRevisions);
    		$('#least'+(i+1)).html("Title: "+data[i+3]._id+"<br/>Number of revisions: "+data[i+3].NumOfRevisions);
    		//时间差计算
    		past_long_time=data[i+6].mintimestamp.substring(0,10);
    		past_short_time=data[i+9].mintimestamp.substring(0,10);
    		//window.alert(past_long_time+past_short_time);
    		past_long_time_date = new Date(past_long_time.replace(/-/g, "/"));
    		past_short_time_date = new Date(past_short_time.replace(/-/g, "/"));
    		//window.alert("123");
    		past_long_ms = current_date.getTime()-past_long_time_date.getTime();
    		past_short_ms = current_date.getTime()-past_short_time_date.getTime();
    		past_long_day=parseInt(past_long_ms / (1000 * 60 * 60 * 24));
    		past_short_day=parseInt(past_short_ms / (1000 * 60 * 60 * 24));
    		//填充long和short区域
    		$('#long'+(i+1)).html("Title: "+data[i+6]._id+"<br/>First Revision on: "+data[i+6].mintimestamp.substring(0,10)+"<br/>Has been released for:"+ past_long_day);
    		$('#short'+(i+1)).html("Title: "+data[i+9]._id+"<br/>First Revision on: "+data[i+9].mintimestamp.substring(0,10)+"<br/>Has been released for:"+ past_short_day);
    	};
    	$('#popularity').html("The most popular one is: "+data[12].title+"<br/>Edited by "+data[12].NumOfUser+" users"+"<br/>The least popular one is: "+data[13].title+"<br/>Edited by "+data[13].NumOfUser+" users")
    });
    //当用户选择不同的数量时候
    $('#changeno_list').change(function(){
    	//
    	if ($('#changeno_list').val()=='1')
    	{
    		$('#most1').show();
    		$('#most2').hide();
    		$('#most3').hide();
    		$('#least1').show();
    		$('#least2').hide();
    		$('#least3').hide();
    		$('#most_title').text("top 1 most revision");
    		$('#least_title').text("top 1 least revision");
    	}
    	else if ($('#changeno_list').val()=='2')
    	{
    		$('#most1').show();
    		$('#most2').show();
    		$('#most3').hide();
    		$('#least1').show();
    		$('#least2').show();
    		$('#least3').hide();
    		$('#most_title').text("top 2 most revision");
    		$('#least_title').text("top 2 least revision");
    	}
    	else
    	{
    		$('#most1').show();
    		$('#most2').show();
    		$('#most3').show();
    		$('#least1').show();
    		$('#least2').show();
    		$('#least3').show();
    		$('#most_title').text("top 3 most revision");
    		$('#least_title').text("top 3 least revision");
    	}
    })
    //当用户选择不同历史的时候
    $('#history_list').change(function(){
    	//
    	if ($('#history_list').val()=='0')
    	{
    		$('.long').show();
    		$('.short').hide();
    	}
    	else
    	{
    		$('.short').show();
    		$('.long').hide();
    	}
    })
    
    //画图部分的代码，一开始默认是overview
    $('#chart_title').html('Overall yearly revision number distribution');
    //点击画饼图以后的代码
    $('#bt_piechart').on('click',function(event){
//        event.preventDefault();
//        $('#chart_title').html('Revision number distribution by user type')
//    	drawPie();
       });
    //点击画柱状图以后的代码
    $("#bt_barchart").on('click',function(event){
//        event.preventDefault();
//        $('#chart_title').html('Overall yearly revision number distribution')
//        drawBar();
    });
    //点击搜索author以后发生的事情
    $("#bt_searchauthor").on('click',function(event){
    event.preventDefault();
    if($("#author_name").val()==""||$("#author_name").val()==null){
        title = 'Please enter an author name!'
    }
    else{
        title = 'Here are the articles changed by '+$("#author_name").val();
    }  
    $("#content_title").html(title);
    });
    
})
