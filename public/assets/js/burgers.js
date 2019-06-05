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
        var listItems = $("ul.current").children();
        // console.log(lItem);
        //get the text from the listitem
        var nameOfBurger = $(lItem).text();

        //console.log(nameOfBurger);
        var myBurger = {
            name: nameOfBurger
        };

        //post request and also add to past list and remove from current
        $.ajax("/api/burgers", {
            type: "POST",
            data: myBurger
            }).then( 
                function(){                                   
                //console.log(myBurger);                   
                $(lItem).remove();     
                $(lItem).remove();   
                console.log("Length is: " + listItems.length);
                fillThePastOrder(nameOfBurger);
                if(listItems.length == 0)
                {
                    location.reload();
                }
            });
    });
});

//add to the Past order (also adds to the database for future)
function fillThePastOrder(burgerName)
{
    var listItems = $("ul.order").children();
    var id = listItems.length;
    var pastList = $("#pastOrder");
    var h4 = $("<h4>");
    var row = $("<li>");
    row.addClass("burgerList");
    row.attr("id", id);
    row.append(burgerName);
    h4.append(row);
    pastList.prepend(h4);
}

function fillTheOrder(burgerName)
{
    var listItems = $("ul.current").children();
    var id = listItems.length;
    // console.log("The id is " + id);
    if(id == 0)
    {
        var h3 = $("<h3>");
        h3.addClass("burgerList");
        h3.text("Current Orders:");
        $("#curOrderHeader").prepend(h3);
    }
 
    var h4 = $("<h4>");

    var row = $("<li>");
    row.addClass("orderNew");
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

    // var span2 = $("<span>");
    // span2.addClass("order");
    span1.append(btn);

    h4.append(span1);
    // h4.append(span2);
    // $("#btnOrder").append(btnRow);    
    $("#curOrder").append(h4);
}