$(document).ready(function () {

    // Declare consts for API URLs

    const ingredientListURL = "https://www.thecocktaildb.com/api/json/v2/9973533/list.php?i=list";
    const ingredientSearchURL = "https://www.thecocktaildb.com/api/json/v2/9973533/filter.php?i=";

    // Link to API to get data based on API URL
    // Utilises code from "Working with external resources" lessons of CI course

    function getData(apiURL, cb) {
        var xhr = new XMLHttpRequest();

        xhr.open("GET", apiURL);
        xhr.send();

        xhr.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                cb(JSON.parse(this.responseText));
            }
        };
    }

    // Invoke getData function to pull full list of ingredients and push to array (fullIngArray)

    var fullIngs = [];

    getData(ingredientListURL, function (data) {
        data = data.drinks;
        data.forEach(function (item) {
            fullIngs.push(item.strIngredient1);
        });

    });

    //Select top spirits from full ingredients array - ensures names match those from API

    var topSpirits = [];

    setTimeout(function () {
        topSpirits.push(fullIngs[0], fullIngs[1], fullIngs[2], fullIngs[3], fullIngs[4], fullIngs[65], fullIngs[66], fullIngs[149], fullIngs[186], fullIngs[349], fullIngs[416], fullIngs[465]);
    }, 500);

    console.log(topSpirits);

    //Select top ingredients from full ingredients array - ensures ingredient names match those from API

    var topIngs = [];

    setTimeout(function () {
        topIngs.push(fullIngs[378], fullIngs[234], fullIngs[247], fullIngs[18], fullIngs[155], fullIngs[385], fullIngs[279], fullIngs[281], fullIngs[396], fullIngs[315], fullIngs[158], fullIngs[361], fullIngs[200], fullIngs[194], fullIngs[26], fullIngs[261], fullIngs[126], fullIngs[72], fullIngs[132], fullIngs[84], fullIngs[190], fullIngs[71], fullIngs[29], fullIngs[30], fullIngs[273], fullIngs[114], fullIngs[47], fullIngs[16], fullIngs[280], fullIngs[196]);
    }, 500);

    console.log(topIngs);

    //Invoke getData function to display drinks by main ingredient

    function writeToDocument(spirit) {
        let spiritURL = ingredientSearchURL + spirit;
        document.getElementById("list").innerHTML = "";
        getData(spiritURL, function (data) {
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

    // Reveal "Search by ingredient" section on button click and create buttons from topSpirits array
    // Code for show and hide from https://api.jqueryui.com/

    $("#show-i-search").click(function () {
        $("#welcome").hide("drop", function () {
            $("#select-spirit").show("drop");
        }
        );

        for (let i = 0; i < topSpirits.length; i++) {
            document.getElementById("spirit-buttons").innerHTML += `
            <button class="btn btn-dark btn-lg btn-block spirit-btn" id="${topSpirits[i]}-button">${topSpirits[i]}</button>
        `;
        }

        // Code to add event listeners to multiple elements: https://www.codeinwp.com/snippets/add-event-listener-to-multiple-elements-with-javascript/

        let spiritBtns = document.querySelectorAll('.spirit-btn');

        for (i of spiritBtns) {
            i.addEventListener('click', function () {
                writeToDocument(this.innerText);
            });
        }

    });

    $("#show-c-search").click(function () {
        $("#welcome").hide("drop", function () {
            $("#search-cocktail").show("drop");
        }
        );

    });






});
