// Make sure we wait to attach our handlers until the DOM is fully loaded.
$(function() {
     
    $(".newBurger").on("submit", function(){
        //we do not want the default - refresh form on submit
        event.preventDefault();
        
        var myBurger = {
            name: $("#burger").val()
        };

        console.log(myBurger);

        //post request
        $.ajax("/api/burgers", {
            type: "POST",
            data: myBurger
            }).then( 
                function(){
                    //console.log(myBurger);
                location.reload();
            });

        // var newBurger = "<li><h4>" + $("#burger").val() + "</h4></li> ";
        // $("#curOrder").append(newBurger);
    })
});