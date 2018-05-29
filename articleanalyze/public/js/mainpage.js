

$(document).ready(function() {
    $("#imgbox").slidesjs({height:500,width:600,navigation: false})
    $("#register").click(function(event){
    	event.preventDefault();
        $("#login_form").hide();
        $("#register_form ").show();
       })
    $("#return").click(function(event){
        event.preventDefault();
        $("#register_form ").hide();
        $("#login_form").show();
    })
    $("#login").click(function(){
		 //alert("123");
    	if($("#username").val()==""||$("#password").val()=="")
    	{
    		window.alert("Please enter your username and password");
    	}
    	else
    	{
			  $.post("/login",
			  {
				username:$("#username").val(),
				password: $("#password").val(),
			
			  },
			  function(data,status){
				  //alert(data);
				  if(data == "fail")
				{
					  window.alert("Your username and password are not match!");
				}
				  else if (data == "success")
				{
					  document.cookie="username="+$("#username").val();
					  //window.alert(document.cookie)
					  window.location.replace("http://localhost:3000/articles/add"); 
				}
					  
				  else if(data =="nouser")
				{
					  window.alert("The user doesn't exist");
				}
			  });
			  //alert("345");
    	}
    	
    })
     $("#submit").click(function(){
		//window.alert("123");
    	 if($("#first_name").val()==""||$("#last_name").val()==""||$("#last_name").val()==""||$("#email_address").val()==""||$("#re_username").val()==""||$("#re_password").val()==""||$("#confirm_password").val()=="")
    		{
    		  window.alert("Please fill all the required fields");
    		}
    	 else if($("#re_password").val()!=$("#confirm_password").val())
    	{
    		 window.alert("The passwords are not the same");
    	}
    	 else
    	{
    		 $.post("/register",
    				  {
    					firstname:$("#first_name").val(),
    					lastname: $("#last_name").val(),
    					emailaddress: $("#email_address").val(),
    					username: $("#re_username").val(),
    					password: $("#re_password").val(),
    				
    				  },
    				  function(data,status){
    					  //alert(data);
    					 if(data == "nouser")
	    				{
    						 window.alert("successfully registered!");
    						 $("#register_form ").hide();
    					     $("#login_form").show();
    					     $("#first_name").val("");
    	    				 $("#last_name").val("");
    	    				 $("#email_address").val("");
    	    				 $("#re_username").val("");
    	    				 $("#re_password").val("");
    	    				 $("#confirm_password").val("");
	    				}
    					 else if(data =="haveuser")
    					{
    						 window.alert("Username has already exist,please change to another one");
    						 
    					}
    					 
    				  });
    	}
     })
    	
})

