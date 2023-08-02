$(document).ready(function () {

    // Reveal divs on button click
    // Toggle code from https://api.jqueryui.com/toggle/
    // Use of scrollTop ensures revealed content is visible - from https://www.geeksforgeeks.org/how-to-scroll-automatically-to-the-bottom-of-the-page-using-jquery/

    $(".toggle").click(function () {
        $(this).siblings("div").toggle("drop");
        $(document).scrollTop($(document).height());
    });

    //Link to API to display drinks by main ingredient
    // Utilises code from "Working with external resources" lessons of CI course

    function getData(spirit, cb) {
        var xhr = new XMLHttpRequest();

        xhr.open("GET", "https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=" + spirit);
        xhr.send();

        xhr.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                cb(JSON.parse(this.responseText));
            }
        };
    }

    function writeToDocument(spirit) {
        document.getElementById("list").innerHTML = "";
        getData(spirit, function (data) {
            data = data.drinks;
            data.forEach(function (item) {
                document.getElementById("list").innerHTML +=
                    `<span><p>${item.strDrink}</p><img src="${item.strDrinkThumb}" class="mb-5" width="150"></span><br>`;
            });


        });

    }

    $("#vodka-button").click(function () {
        writeToDocument("Vodka");
    });
    $("#gin-button").click(function () {
        writeToDocument("Gin");
    });
    $("#scotch-button").click(function () {
        writeToDocument("Scotch");
    });
    $("#bourbon-button").click(function () {
        writeToDocument("Bourbon");
    });
    $("#rum-button").click(function () {
        writeToDocument("Rum");
    });
    $("#tequila-button").click(function () {
        writeToDocument("Tequila");
    });

});
