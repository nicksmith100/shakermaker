$(document).ready(function () {

    //Link to API to pull full list of ingredients and push to array (fullIngArray)

    function getIngList(cb) {
        var xhr = new XMLHttpRequest();

        xhr.open("GET", "https://www.thecocktaildb.com/api/json/v2/9973533/list.php?i=list");
        xhr.send();

        xhr.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                cb(JSON.parse(this.responseText));
            }
        };
    }

    var fullIngs = [];

    getIngList(function (data) {
        data = data.drinks;
        data.forEach(function (item) {
            fullIngs.push(item.strIngredient1);
        });

    });

    // Timeout inserted to check array is populating correctly - can be removed later

    // setTimeout(function () {
    // console.log(fullIngs);
    // }, 500);

    //Select top spirits from full ingredients array - ensures names match those from API

    var topSpirits = [];

    setTimeout(function () {
        topSpirits.push(fullIngs[0], fullIngs[1], fullIngs[2], fullIngs[3], fullIngs[4], fullIngs[65], fullIngs[66], fullIngs[149], fullIngs[186], fullIngs[349], fullIngs[416], fullIngs[465]);
    }, 500);

    console.log(topSpirits);

    //Select top ingredients from full ingredients array - ensures names match those from API

    var topIngs = [];

    setTimeout(function () {
        topIngs.push(fullIngs[378], fullIngs[234], fullIngs[247], fullIngs[18], fullIngs[155], fullIngs[385], fullIngs[279], fullIngs[281], fullIngs[396], fullIngs[315], fullIngs[158], fullIngs[361], fullIngs[200], fullIngs[194], fullIngs[26], fullIngs[261], fullIngs[126], fullIngs[72], fullIngs[132], fullIngs[84], fullIngs[190], fullIngs[71], fullIngs[29], fullIngs[30], fullIngs[273], fullIngs[114], fullIngs[47], fullIngs[16], fullIngs[280], fullIngs[196]);
    }, 500);

    console.log(topIngs);

    // Reveal sections on button click
    // Toggle code from https://api.jqueryui.com/toggle/
    // Use of scrollTop ensures revealed content is visible - from https://www.geeksforgeeks.org/how-to-scroll-automatically-to-the-bottom-of-the-page-using-jquery/

    $("#show-i-search").click(function () {
        $("#welcome").hide("drop", function () {
            $("#select-spirit").show("drop");
        }
        );


    });

    $("#show-c-search").click(function () {
        $("#welcome").hide("drop", function () {
            $("#search-cocktail").show("drop");
        }
        );

    });

    //Link to API to display drinks by main ingredient
    // Utilises code from "Working with external resources" lessons of CI course

    function getData(spirit, cb) {
        var xhr = new XMLHttpRequest();

        xhr.open("GET", "https://www.thecocktaildb.com/api/json/v2/9973533/filter.php?i=" + spirit);
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

        $("#select-spirit").hide("drop", function () {
            $("#results").show();
        }

        );

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
