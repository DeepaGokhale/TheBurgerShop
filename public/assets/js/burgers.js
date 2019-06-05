// Make sure we wait to attach our handlers until the DOM is fully loaded.
$(function() {
    $(".newBurger").on("submit", function(){    
        //we do not want the default - refresh form on submit
        event.preventDefault();
        var name = $("#burger").val();
        fillTheOrder(name);
        $("#burger").val("");
    });
    //When the burger is devoured     
    $(document).on("click", ".devoured", function(){
        //we do not want the default - refresh form on submit
        event.preventDefault();

        var id = this.id;
        var lItem = "#"+id;
        // console.log(lItem);
        //get the text from the listitem
        var nameOfBurger = $(lItem).text();

        //console.log(nameOfBurger);
        var myBurger = {
            name: nameOfBurger
        };

        //post request
        $.ajax("/api/burgers", {
            type: "POST",
            data: myBurger
            }).then( 
                function(){                                   
                //console.log(myBurger);                
                $(lItem).remove();     
                $(lItem).remove();   
            });

    });
});

//add to the Past order (also adds to the database for future)
function fillThePastOrder(burgerName)
{
    var pastList = $("#pastOrder");
    var row = $("<li>");
    row.addClass("newOrder");
    row.attr("id", id);
    row.append(burgerName);
    pastList.append(row);
}

function fillTheOrder(burgerName)
{
    var listItems = $("ul.order").children();
    var id = listItems.length;
    console.log("The id is " + id);
    if(id == 0)
    {
        var h3 = $("<h3>");
        h3.addClass("burgerList");
        h3.text("Current Orders:");
        $("#curOrder").append(h3);
    }
 
    var h4 = $("<h4>");

    var row = $("<li>");
    row.addClass("newOrder");
    row.attr("id", id);
    row.append(burgerName);

    var span1 = $("<span>");
    span1.addClass("order");
    span1.append(row);

    // <span class="a">Aliquam</span> <span class="a"></span>

    var btn = $("<button>");
    btn.addClass("btn btn-secondary newOrder devoured");
    btn.attr("id", id);
    btn.text("Devoured!");

    var span2 = $("<span>");
    span2.addClass("order");
    span2.append(btn);

    h4.append(span1);
    h4.append(span2);
    // $("#btnOrder").append(btnRow);    
    $("#curOrder").append(h4);
}