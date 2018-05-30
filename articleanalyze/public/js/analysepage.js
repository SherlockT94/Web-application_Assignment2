/**
 * 
 */
 google.charts.load('current', {'packages':['corechart','bar']});
 //柱状图通用函数
 function drawBar(a,id) {
		var data = new google.visualization.DataTable();
		data.addColumn('string', 'year'); // Implicit domain label col.
		data.addColumn('number', 'admin'); // Implicit series 1 data col.
		data.addColumn('number', 'bot'); // Implicit domain label col.
		data.addColumn('number', 'anon'); // Implicit series 1 data col.
		data.addColumn('number', 'regular'); // Implicit series 1 data col.
		for(i=0;i<a.length;i++)
		{
			temp=a[i].year.toString();
			data.addRows([
			  [temp,a[i].admin,a[i].bot,a[i].anon,a[i].regular]
			]);
		}
		var options = {
		          width: 800,
		          chart: {
		            title: 'Nearby galaxies',
		        subtitle: 'distance on the left, brightness on the right'
		      },
		      bars: 'vertical', // Required for Material Bar Charts.
			  }
		 var chart = new google.charts.Bar(document.getElementById(id));
        chart.draw(data, options);
 }
 //饼图通用函数
 function drawPie(a,id) {
	 var data = new google.visualization.DataTable();
		var admin=0, bot=0, anon=0, regular=0;
     data.addColumn('string', 'Year');
     data.addColumn('number', 'total');
		for(i=0;i<a.length;i++)
		{
			admin+=a[i].admin;
			bot+=a[i].bot;
			anon+=a[i].anon;
			regular+=a[i].regular;
		}
     data.addRows([
       ['admin', admin],
       ['bot', bot],
       ['anon', anon],
       ['regular', regular]
     ]);

     // Set chart options
     var options = {'title':'How Much Pizza I Ate Last Night',
                    'width':400,
                    'height':300};

     // Instantiate and draw our chart, passing in some options.
     var chart = new google.visualization.PieChart(document.getElementById(id));
     chart.draw(data, options);
}
 //top5user单独使用的函数
 function top5_drawBar(a) {
		var data = new google.visualization.DataTable();
		data.addColumn('string', 'year'); // Implicit domain label col.
		data.addColumn('number', top5_userdata[0].user); // Implicit series 1 data col.
		data.addColumn('number', top5_userdata[1].user); // Implicit domain label col.
		data.addColumn('number', top5_userdata[2].user); // Implicit series 1 data col.
		data.addColumn('number', top5_userdata[3].user); // Implicit series 1 data col.
		data.addColumn('number', top5_userdata[4].user); // Implicit series 1 data col.
		for(i=0;i<a.length;i++)
		{
			temp=a[i].year.toString();
			data.addRows([
			  [temp,a[i][top5_userdata[0].user],a[i][top5_userdata[1].user],a[i][top5_userdata[2].user],a[i][top5_userdata[3].user],a[i][top5_userdata[4].user]]
			]);
		}
		var options = {
		          width: 800,
		          chart: {
		            title: 'Nearby galaxies',
		        subtitle: 'distance on the left, brightness on the right'
		      },
		      bars: 'vertical', // Required for Material Bar Charts.
			  }
		 var chart = new google.charts.Bar(document.getElementById('individual_chart'));
     chart.draw(data, options);
}
 //一个人单独用的画画函数
 function top1_drawBar(username) {
	 	//window.alert(username)
	 	//window.alert("123")
		var data = new google.visualization.DataTable();
		data.addColumn('string', 'year'); // Implicit domain label col.
		data.addColumn('number', username); // Implicit series 1 data col.
		//window.alert(top5_year_data.length)
		//window.alert(top5_year_data[0])
		//window.alert(top5_year_data[0][username])
		for(i=0;i<top5_year_data.length;i++)
		{
			temp=top5_year_data[i].year.toString();
			data.addRows([
			  [temp,top5_year_data[i][username]]
			]);
		}
//		data.addRows([
//	          ['admin', 100],
//	          ['bot', 150],
//	          ['anon', 200],
//	          ['regular', 250]
//	        ]);
		var options = {
		          width: 800,
		          chart: {
		            title: 'Nearby galaxies',
		        subtitle: 'distance on the left, brightness on the right'
		      },
		      bars: 'vertical', // Required for Material Bar Charts.
			  }
		 var chart = new google.charts.Bar(document.getElementById('individual_chart'));
  chart.draw(data, options);
}
 var pic_data //画画用的数据
 var individual_data//个人页面用的
 var draw_article_flag=""//记录画不同的图片的时候是不是改变了文章名字，如果没有改变文章的名字的话那么就可以在不用调用数据库的情况下用下面的article_pic_data去进行相应的操作了。
 var article_pic_data//记录当前文章的图片所用数据，然后就可以在不用调数据库的情况下画不同的图片了
 var top5_userdata//在载入individual的左边的数据列表的时候使用。然后这里保存下来以后就可以在右边的画图的时候同时使用这些数据了就不用再去数据库调用一次了
 var top5_year_data//用来记录这top5的人每个人在每年的当前这本书的revison数量是多少，是个每个json object为[年份，top1:0，top2:0，top3:0...]的json数组。
 var user_data={}//在初始化的时候就把user的姓名给载入好，这样后面就不用去数据库查询了。
 var author_revision_list//接受每一个author的所有的revision信息的列表，这样在后面显示的时候就不用一次次向mongoDB去请求了。{id, timestamp,title}
$(document).ready(function() {
	//选择要展示的部分
	if(window.location=="http://localhost:3000/articles/add")
{
	if(document.cookie=="")
	{
		window.alert("Pleas login first")
		window.location="http://localhost:3000"
	}

	$("#username").html("Welcome, "+document.cookie.substring(9,document.cookie.length))
    $('select').show();
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
    //初始化表格
    $.getJSON("/initial_draw",
    		null,
    		function(data,status){
    			//window.alert(data);
    			pic_data=data;
    			drawBar(data,'thechart');
    		});
    //初始化individual页面的文章数据
    $.get("/initial_individual",
    	function(data,status)
	    {
	    	//window.alert(data);
    		individual_data=data;
    		var list={}
    		for(i=0;i<data.length;i++)
    		{
    			$('#title_list').append("<option value='"+data[i]._id+"'>"+data[i]._id+"["+data[i].NumOfRevisions+"]</option>")
    			list[data[i]._id]=null
    			
    		}
    		//自动补全
    		 $('#autocomplete-input').autocomplete({
    		      data: list,
    		    });
	    }
    	
    );
    //加载用户的列表
    $.get("/initial_author",
    	function(data, status)
    	{
    		
    		user_data=data
    		//window.alert("123")
    	
    	})
    //另辟蹊径的autocomplete 失败了
    //搜索用户功能
    	$("#bt_searchauthor").click(function(){
    		//window.alert("click!")
    		 if($("#author_name").val()=="")
    		 	{
    		        window.alert( 'Please enter an author name!')
    		 	}
    		 else
    			{
    			 	flag=0
    	    		for(i=0;i<user_data.length;i++)
    	    		{
    	    			if($("#author_name").val()==user_data[i])
    	    			{
    	    				flag=1
    	    				break
    	    			}
    	    		}
    	    		if(flag==1)
    	    		{
    	    			$.post("/author_title",
    	    			{
    	    					author_name:$("#author_name").val()
    	    			},
    	    			function(data,status){
    	    				//window.alert(data)
    	    				author_html=""
    	    				for(i=0;i<data.length;i++)
    	    				{
    	    					author_html+=("Title: "+data[i]._id+"<br/>contributed revision number:"+data[i].numOfEdits+"<br/><br/>")
    	    					$('#revision_detail').append("<option value='"+data[i]._id+"'>"+data[i]._id+"</option>")
    	    				}
    	    				window.alert(author_html)
    	    				$("#author_info").html(author_html)
    	    			})
    	    			//window.alert("Have user")
    	    			$.post("/author_detail",
    	    	       			 {
    	    	   						author_name:$("#author_name").val()
    	    	   		
    	    	       			 },
    	    	       			 function(data, status){
    	    	       				 //window.alert(data)
    	    	       				 author_revision_list=data
    	    	       			 })   			
    	    		}
    	    		else
    	    		{
    	    			 window.alert( 'No user is found!')
    	    		}
    			}
    		
    	})
    //当用户选择某个title妄图看到他的revision的值的时候（选个jb！自己不会去mongodb看嘛！）
    $("#revision_detail").change(function()
    		{
    		
    			revision_time_html=""
    			for(i=0;i<author_revision_list.length;i++)
    			{
    				if($("#revision_detail").val()==author_revision_list[i].title)
    				{
    					revision_time_html+=("Time: "+author_revision_list[i].timestamp+"<br/>")
    				}
    			}
    			$("#revision_time").html(revision_time_html)
    			
    	
    		})
    //搜索文章功能
    $("#bt_searchArticle").click(function(){
    	flag=0
    	tip=0
    	for(i=0;i<individual_data.length;i++)
    	{
    		//window.alert($('#autocomplete-input').val());
    		if($('#autocomplete-input').val()==individual_data[i]._id)
    		{
    			//window.alert($('#autocomplete-input').val());
    			flag+=1;
    			$("#article_title").text($('#autocomplete-input').val());
    			$("#total_revision").text("Total revisions:"+individual_data[i].NumOfRevisions);
    			s1 = new Date();
    			timestamp=individual_data[i].timestamp
    			s2=Date.parse(timestamp)
    			//window.alert(s1-s2)
    			if((s1-s2)<(1000*60*60*24))
    			{
    				tip=1
    				window.alert("No data is needed for update")
    			}
    			break
    		}
    	}
    	if(flag==0)
    	{
    		window.alert("No result is found!Please enter again")
    	}
    	else
    	{
    		//window.alert("Found!")$.post("/article_detail",
    		$("#top5_revision").text("Searching for the top 5 users...");
        	$(".top").text("");
        	if(tip==1)
        	{
	    		$.post("/article_detail",
	       			 {
	   						title:$("#article_title").text()
	   		
	       			 },
	       			 function(data, status){
	       				 //window.alert(data)
	       				 for(i=0;i<data.length;i++)
	       				{
	       					top5_userdata=data
	       					 $("#top5_revision").text("The top five regular users");
	       					 //window.alert(data[i].number)
	       					 //window.alert(data[i].user)
	       					 $("#top"+(2*i+1)).text("Username: "+data[i].user);
	       					 $("#top"+(2*i+2)).text("Number of revision: "+data[i].number);
	       				}
	       			 }
	       			)
        	}
        	else
        	{
        		$.post("/update",
       	   			 {
       							title:$("#title_list").val(),
       							timestamp: timestamp
       			
       	   			 },
       	   			 function(data, status){
       	   				 window.alert(data+" Records has been updated!")
       		   				 $.post("/article_detail",
       	       			 {
       	   						title:$("#title_list").val()
       	   		
       	       			 },
       	       			 function(data, status){
       	       				 //window.alert(data)
       	       				 top5_userdata=data
       	       				 for(i=0;i<data.length;i++)
       	       				{
       	       					 $("#top5_revision").text("The top five regular users");
       	       					 //window.alert(data[i].number)
       	       					 //window.alert(data[i].user)
       	       					 $("#top"+(2*i+1)).text("Username: "+data[i].user);
       	       					 $("#top"+(2*i+2)).text("Number of revision: "+data[i].number);
       	       				}
       	       			 }
       	       			)
       	   			 }
       	   			)
        	}
    	}
    })
    //当用户选择不同的文章的时候
    $("#title_list").change(function(){
    	tip=0
    	$("#article_title").text($("#title_list").val());
    	for(i=0;i<individual_data.length;i++)
    	{
    		if(individual_data[i]._id==$("#title_list").val())
    		{
    			$("#total_revision").text("Total revisions:"+individual_data[i].NumOfRevisions);
    			s1 = new Date();
    			timestamp=individual_data[i].timestamp
    			s2=Date.parse(timestamp)
    			//window.alert(s1-s2)
    			if((s1-s2)<(1000*60*60*24))
    			{
    				tip=1
    				window.alert("No data is needed for update")
    			}
    		}
    	}
    	$("#top5_revision").text("Searching for the top 5 users...");
    	$(".top").text("");
    	//如果需要更新的话
    	if(tip==0)
    	{
	    	$.post("/update",
	   			 {
							title:$("#title_list").val(),
							timestamp: timestamp
			
	   			 },
	   			 function(data, status){
	   				 window.alert(data+" Records has been updated!")
		   				 $.post("/article_detail",
	       			 {
	   						title:$("#title_list").val()
	   		
	       			 },
	       			 function(data, status){
	       				 //window.alert(data)
	       				 top5_userdata=data
	       				 for(i=0;i<data.length;i++)
	       				{
	       					 $("#top5_revision").text("The top five regular users");
	       					 //window.alert(data[i].number)
	       					 //window.alert(data[i].user)
	       					 $("#top"+(2*i+1)).text("Username: "+data[i].user);
	       					 $("#top"+(2*i+2)).text("Number of revision: "+data[i].number);
	       				}
	       			 }
	       			)
	   			 }
	   			)
    	}
    	//原有正常操作
    	else
    	{
    		$.post("/article_detail",
       			 {
   						title:$("#title_list").val()
   		
       			 },
       			 function(data, status){
       				 //window.alert(data)
       				 top5_userdata=data
       				 for(i=0;i<data.length;i++)
       				{
       					 $("#top5_revision").text("The top five regular users");
       					 //window.alert(data[i].number)
       					 //window.alert(data[i].user)
       					 $("#top"+(2*i+1)).text("Username: "+data[i].user);
       					 $("#top"+(2*i+2)).text("Number of revision: "+data[i].number);
       				}
       			 }
       			)
    	}
    	
    	
    })
    //当用户选择画某个文章的图片的时候
    $("#bt_article_draw").click(function(){
    	$("#search_user").hide();
		$("#user_list").hide();
    	if($("#article_title").text()!=draw_article_flag)
    	{
    		draw_article_flag=$("#article_title").text();
	    	$.post("/article_draw",
	   			 {
							title:$("#article_title").text()
			
	   			 },
	   			 function(data, status){
	   				 //window.alert(data)
	   				//window.alert(data)
	   				article_pic_data=data
	   				if($('#changechart').val()=="year_type")
	   		    	{
	   					drawBar(data,'individual_chart');
	   		    	}
	   				else if($('#changechart').val()=="type")
	   		    	{
	   					drawPie(data,'individual_chart');
	   		    	}
	   		    	else
	   		    	{
	   		    		$.post("/top5_data",
			    		{
	   		    			top1:top5_userdata[0].user,
			    			top2:top5_userdata[1].user,
			    			top3:top5_userdata[2].user,
			    			top4:top5_userdata[3].user,
			    			top5:top5_userdata[4].user
			    		},
			    		function(data,status)
			    		{
			    			//window.alert(data)
			    			top5_year_data=data;
			    			top5_drawBar(data);
			    			$('#user_list').empty();
			    			for(i=0;i<5;i++)
			    			{
			    				$('#user_list').append("<option value='"+top5_userdata[i].user+"'>"+top5_userdata[i].user+"</option>")
			    			}
			    			$("#search_user").show();
			    			$("#user_list").show();
			    		})
	   		    		//window.alert("changed")
	   		    	}
	   			 }
	   			)
    	}
    	else
    	{
    		if($('#changechart').val()=="year_type")
	    	{
				drawBar(article_pic_data,'individual_chart');
	    	}
			else if($('#changechart').val()=="type")
	    	{
				drawPie(article_pic_data,'individual_chart');
	    	}
	    	else
	    	{
	    		//window.alert("not change")
	    		$.post("/top5_data",
		    		{
		    			top1:top5_userdata[0].user,
		    			top2:top5_userdata[1].user,
		    			top3:top5_userdata[2].user,
		    			top4:top5_userdata[3].user,
		    			top5:top5_userdata[4].user
		    		},
		    		function(data,status)
		    		{
		    			//window.alert(data)
		    			top5_year_data=data;
		    			top5_drawBar(data);
		    			$('#user_list').empty();
		    			for(i=0;i<5;i++)
		    			{
		    				$('#user_list').append("<option value='"+top5_userdata[i].user+"'>"+top5_userdata[i].user+"</option>")
		    			}
		    			$("#search_user").show();
		    			$("#user_list").show();
		    			
		    		})
	    	}
    		
    	}
    	
    
    })
    //当选择某个特定用户妄图显示他的数据的时候(我显示您妈)
    $("#search_user").click(function(){
    	//window.alert($('#user_list').val())
    	for(i=0;i<5;i++)
    	{
    		if($('#user_list').val()==top5_userdata[i].user)
    		{
    			//window.alert("find!")
    			top1_drawBar(top5_userdata[i].user)
    		}
    	}
    	
    })
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
    $('#bt_barchart').click(function()
    {
    	drawBar(pic_data,'thechart');
    });
    $('#bt_piechart').click(function()
    	    {
    	    	drawPie(pic_data,'thechart');
    });
    
    
    //画图部分的代码，一开始默认是overview
    $('#chart_title').html('Overall yearly revision number distribution');
 
    
}   
})

