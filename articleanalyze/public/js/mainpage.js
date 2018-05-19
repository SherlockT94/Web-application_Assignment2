

$(document).ready(function() {
    $("#imgbox").slidesjs({height:500,width:600,navigation: false})
    $("#register").click(function(event){
    	event.preventDefault();
        $(".container").hide();
        $("#register_form ").show();
       })
    $("#return_mainpage").click(function(event){
        event.preventDefault();
        $("#register_form ").hide();
        $(".container").show();
    })

});