$("#bt_searchauthor").on('click',function(event){
    event.preventDefault();
    if($("#author_name").val()==""||$("#author_name").val()==null){
        title = 'Please enter an author name!'
    }
    else{
        title = 'Here are the articles changed by '+$("#author_name").val();
    }  
    $("#content_title").html(title);
})