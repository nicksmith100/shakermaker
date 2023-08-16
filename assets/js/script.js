// Declare consts ------------------------------------------ //

// Declare consts for API URLs

const ingredientListURL = "https://www.thecocktaildb.com/api/json/v2/9973533/list.php?i=list";
const ingredientSearchURL = "https://www.thecocktaildb.com/api/json/v2/9973533/filter.php?i=";
const cocktailSearchURL = "https://www.thecocktaildb.com/api/json/v2/9973533/lookup.php?i=";
const nameSearchURL = "https://www.thecocktaildb.com/api/json/v2/9973533/search.php?s=";
const alcoholSearchURL = "https://www.thecocktaildb.com/api/json/v2/9973533/filter.php?a=";
const randomSearchURL = "https://www.thecocktaildb.com/api/json/v2/9973533/random.php?";

// Declare consts for DOM elements

const spiritBtnsDiv = document.getElementById("spirit-buttons");
const ingBtnsDiv = document.getElementById("ing-buttons");
const resultList = document.getElementById("result-list");
const searchInput = document.getElementById("search-input");
const searchForm = document.getElementById("search-form");

// Define functions ------------------------------------------ //

// Hide welcome div, reveal header and main menu

function welcomeToMainMenu() {
    $("#welcome").hide("drop", { direction: "up" }, function () {
        $("#header").show("drop", { direction: "up" });
        $("#main-menu").show("drop", { direction: "up" });
    });

}

// Display instructions modal on button press

function showInstructions() {
    $("#instructions-button").click(function () {
        $('#modal-instructions').modal("show");
    });
}

// Create calls to API ------------------------------------------ //

/* Call API to get data based on API URL
(Utilises code from "Working with external resources" lessons of CI course) */

function getData(apiURL, cb) {
    let xhr = new XMLHttpRequest();

    xhr.open("GET", apiURL);
    xhr.send();

    xhr.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            cb(JSON.parse(this.responseText));
        }
    };
}

/* Invoke getData function to pull full list of ingredients and push to fullIngs array
(Utilises code from "Working with external resources" lessons of CI course) */

function getFullIngredients() {

    let fullIngs = [];

    getData(ingredientListURL, function (data) {
        data = data.drinks;
        data.forEach(function (item) {
            fullIngs.push(item.strIngredient1);
        });

    });

}

/* Select particular ingredients from full ingredients array using index
(This ensures names match those from API for future use) */

function getSelectedIngredients(...indices) {

    let ingArray = [];

    for (let i of indices) {

        getData(ingredientListURL, function (data) {
            data = data.drinks;
            ingArray.push(data[i].strIngredient1);
        });

    }

    return ingArray;

}

$(document).ready(function () {

    // Reveal header and menu after delay

    setTimeout(welcomeToMainMenu, 500);

    // Call other general functions

    showInstructions();
    getFullIngredients();

    // Select 12 most popular spirits from full ingredients array

    let topSpirits = getSelectedIngredients(0, 1, 2, 3, 4, 65, 66, 149, 186, 349, 416, 465);

    /* Reveal "Select spirit" div on button click and create buttons from topSpirits array
    Code for show and hide from: https://api.jqueryui.com/ */

    $("#show-i-search").click(function () {

        for (let i = 0; i < topSpirits.length; i++) {
            spiritBtnsDiv.innerHTML += `
            <button class="btn btn-lg mx-3 my-3 spirit-btn btn-yellow d-sm-none" id="${topSpirits[i]}-button">${topSpirits[i]}</button>
            <button class="spirit-btn img-btn btn-yellow d-none d-sm-inline-block rounded border border-light mx-1 my-1" id="${topSpirits[i]}-button"><img src="https://www.thecocktaildb.com/images/ingredients/${topSpirits[i]}-Small.png" alt="${topSpirits[i]} bottle" class="w-75"><br><br>${topSpirits[i]}</button>
        `;
        }

        // Add event listeners to spirit buttons. Code adapted from: https://www.codeinwp.com/snippets/add-event-listener-to-multiple-elements-with-javascript/

        let spiritBtns = document.querySelectorAll('.spirit-btn');

        for (i of spiritBtns) {
            i.addEventListener('click', function () {

                // Highlight selected spirit button only

                let spiritBtns2 = document.querySelectorAll('.spirit-btn');
                for (j of spiritBtns2) {
                    j.classList.remove("btn-green");
                    j.classList.add("btn-yellow");
                }
                this.classList.remove("btn-yellow");
                this.classList.add("btn-green", "spirit-selected");

            });

        };

        $("#main-menu").hide("drop", function () {

            $("#select-spirit").show("drop");
            $("#header").show("drop");
        }
        );


    });

    $("#s-search-back").click(function () {
        $("#select-spirit").hide("drop", function () {

            // Reset innerHTML of "spirit-buttons" to avoid potential duplication
            spiritBtnsDiv.innerHTML = "";

            $("#main-menu").show("drop");
        });
    });

    // Select 30 most popular ingredients from full ingredients array

    let topIngs = getSelectedIngredients(378, 234, 247, 18, 155, 385, 279, 281, 396, 315, 158, 361, 200, 194, 26, 261, 126, 72, 132, 84, 190, 71, 29, 30, 273, 114, 47, 16, 280, 196);

    // Reveal "Select ingredients" div, and create buttons from topIngs array

    $("#s-search-next").click(function () {

        let selectedSpiritBtn = document.getElementsByClassName("spirit-selected")[0];

        if (selectedSpiritBtn == undefined) {
            $('#modal-spirit-alert').modal("show");
        }

        else {

            $("#select-spirit").hide("drop", function () {
                $("#select-ingredients").show("drop");
                for (let i = 0; i < topIngs.length; i++) {
                    ingBtnsDiv.innerHTML += `
                                <button class="btn btn-yellow btn-lg mx-3 my-3 ing-btn" id="${topIngs[i]}-button">${topIngs[i]}</button>
                                `;
                }


                // Add event listeners to ingredient buttons

                let ingBtns = document.querySelectorAll('.ing-btn');

                for (i of ingBtns) {
                    i.addEventListener('click', function () {

                        let selectedIngs = document.getElementsByClassName("ing-selected");

                        // Allow toggling of button classes, and add max selection of 3

                        if (selectedIngs.length < 3) {

                            if (this.classList.contains("btn-yellow")) {
                                this.classList.remove("btn-yellow");
                                this.classList.add("btn-green", "ing-selected");
                            }
                            else if (this.classList.contains("ing-selected")) {
                                this.classList.remove("btn-green", "ing-selected");
                                this.classList.add("btn-yellow");
                            }


                        }

                        else if (selectedIngs.length === 3) {

                            if (this.classList.contains("btn-yellow")) {
                                $('#modal-ing-alert').modal("show");

                            }
                            else if (this.classList.contains("ing-selected")) {
                                this.classList.remove("btn-green", "ing-selected");
                                this.classList.add("btn-yellow");
                            }

                        }

                    });
                };
            });

        }

    });



    // Add event listener to search buttons

    $("#i-search-back").click(function () {
        $("#select-ingredients").hide("drop", function () {

            // Reset innerHTML of "ing-buttons" to avoid potential duplication
            ingBtnsDiv.innerHTML = "";

            $("#select-spirit").show("drop");
        });
    });

    $("#i-search-button").click(function () {

        // Create search string from inner text of selected spirit and ingredients

        let selectedSpirit = document.getElementsByClassName("spirit-selected")[0].innerText;
        let selectedIngs = document.getElementsByClassName("ing-selected");

        let ingString = selectedSpirit;

        for (i of selectedIngs) {

            ingString += "," + i.innerText;

        };

        // Create spaced, grammatical list for results page

        let ingStringSpaced = selectedSpirit;

        for (i of selectedIngs) {

            ingStringSpaced += ", " + i.innerText;

        };

        // Replace final comma with "and" - code from: https://stackoverflow.com/questions/29985085/replace-final-comma-in-a-string-with-and

        ingStringSpaced = ingStringSpaced.replace(/,(?=[^,]+$)/, ' and ');

        //Invoke getData function to display drinks by main ingredient

        function writeResults(ingredients) {
            searchURL = ingredientSearchURL + ingredients;
            searchURL2 = ingredientSearchURL + selectedSpirit;

            resultList.innerHTML = "";

            getData(searchURL, function (data) {
                data = data.drinks;

                // Returns drinks based on just base spirit if no results found for particular ingredients

                if (data.includes("None")) {

                    resultList.innerHTML = `<p class="fs-2">Sorry, no drinks were found with <strong>${ingStringSpaced}</strong>, but here are all the cocktails you can make with <strong>${selectedSpirit}</strong>.</p>
                    <p class="fs-3">(Click on a drink image to see the full recipe.)</p>`;

                    getData(searchURL2, function (data) {
                        data = data.drinks;

                        data.forEach(function (item) {

                            let drinkCode = item.idDrink;
                            let drinkImage = item.strDrinkThumb;
                            let drinkName = item.strDrink;


                            getData(cocktailSearchURL + drinkCode, function (data) {
                                data = data.drinks;
                                data.forEach(function (item) {
                                    let drinkInstructions = item.strInstructions;
                                    let drinkIngredients = [item.strIngredient1, item.strIngredient2, item.strIngredient3, item.strIngredient4, item.strIngredient5, item.strIngredient6, item.strIngredient7, item.strIngredient8, item.strIngredient9, item.strIngredient10, item.strIngredient11, item.strIngredient12, item.strIngredient13, item.strIngredient14, item.strIngredient15];

                                    //Filter null values

                                    drinkIngredients = drinkIngredients.filter(elements => {
                                        return elements !== null;
                                    });

                                    resultList.innerHTML +=

                                        `<div id="result-${drinkCode}" class="drink-result mt-5">
                        <div class="row">
                            <div class="col-12">
                                <h2>${drinkName}</h2>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-12 col-sm-4">
                                <img src="${drinkImage}" class="drink-img img-fluid rounded border border-light">
                            </div>
                            <div id="recipe-${drinkCode}" class="recipe hidden col-12 col-sm-4">
                                <div class = "rounded text-dark px-3 py-2 mt-2 my-sm-0 recipe-card">
                                    <h3>Ingredients:</h3>
                                    <ul id="ingredient-list${drinkCode}" class="list-unstyled"></ul>
                                </div>
                            </div>
                            <div id="instructions-${drinkCode}" class="instructions hidden col-12 col-sm-4">
                                <div class = "rounded text-dark px-3 py-2 mt-2 my-sm-0 inst-card">    
                                    <h3>Instructions:</h3>
                                    <p>${drinkInstructions}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    `;

                                    resultList.onclick = function (event) {

                                        let target = event.target;

                                        if (target.tagName === "IMG") {

                                            $(target.parentNode.nextElementSibling).show("drop");
                                            $(target.parentNode.nextElementSibling).siblings().show("drop");


                                        }

                                    };


                                    //Create list from array. Code from: https://www.tutorialspoint.com/how-to-create-html-list-from-javascript-array

                                    let list = document.getElementById("ingredient-list" + drinkCode);
                                    for (i = 0; i < drinkIngredients.length; ++i) {
                                        let li = document.createElement('li');
                                        li.innerText = drinkIngredients[i];
                                        list.appendChild(li);
                                    }

                                });
                            });


                        });


                    });

                }

                else {

                    resultList.innerHTML = `<p class="fs-2">Here are all the cocktails you can make with <strong>${ingStringSpaced}</strong>.</p>
                    <p class="fs-3">(Click on a drink image to see the full recipe.)</p>`;

                    data.forEach(function (item) {

                        let drinkCode = item.idDrink;
                        let drinkImage = item.strDrinkThumb;
                        let drinkName = item.strDrink;

                        getData(cocktailSearchURL + drinkCode, function (data) {
                            data = data.drinks;
                            data.forEach(function (item) {
                                let drinkInstructions = item.strInstructions;
                                let drinkIngredients = [item.strIngredient1, item.strIngredient2, item.strIngredient3, item.strIngredient4, item.strIngredient5, item.strIngredient6, item.strIngredient7, item.strIngredient8, item.strIngredient9, item.strIngredient10, item.strIngredient11, item.strIngredient12, item.strIngredient13, item.strIngredient14, item.strIngredient15];

                                //Filter null values

                                drinkIngredients = drinkIngredients.filter(elements => {
                                    return elements !== null;
                                });

                                resultList.innerHTML +=

                                    `<div id="result-${drinkCode}" class="drink-result mt-5">
                        <div class="row">
                            <div class="col-12">
                                <h2>${drinkName}</h2>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-12 col-sm-4">
                                <img src="${drinkImage}" class="drink-img img-fluid rounded border border-light">
                            </div>
                            <div id="recipe-${drinkCode}" class="recipe hidden col-12 col-sm-4">
                                <div class = "rounded text-dark px-3 py-2 mt-2 my-sm-0 recipe-card">
                                    <h3>Ingredients:</h3>
                                    <ul id="ingredient-list${drinkCode}" class="list-unstyled"></ul>
                                </div>
                            </div>
                            <div id="instructions-${drinkCode}" class="instructions hidden col-12 col-sm-4">
                                <div class = "rounded text-dark px-3 py-2 mt-2 my-sm-0 inst-card">    
                                    <h3>Instructions:</h3>
                                    <p>${drinkInstructions}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    `;


                                resultList.onclick = function (event) {

                                    let target = event.target;

                                    if (target.tagName === "IMG") {

                                        $(target.parentNode.nextElementSibling).show("drop");
                                        $(target.parentNode.nextElementSibling).siblings().show("drop");

                                    }

                                };



                                //Create list from array. Code from: https://www.tutorialspoint.com/how-to-create-html-list-from-javascript-array

                                let list = document.getElementById("ingredient-list" + drinkCode);
                                for (i = 0; i < drinkIngredients.length; ++i) {
                                    let li = document.createElement('li');
                                    li.innerText = drinkIngredients[i];
                                    list.appendChild(li);
                                }

                            });
                        });

                    });

                }

            });

        };

        writeResults(ingString);

        // Hide "search-ingredients" div and display "results" div

        $("#search-ingredients").hide("drop", function () {
            $("#results").show("drop");
            $("#results-back").fadeIn();
        }
        );

    });

    // Show "search-cocktail" section and header on button click

    $("#show-c-search").click(function () {
        $("#main-menu").hide("drop", function () {
            $("#search-cocktail").show("drop");
            $("#header").show("drop");
        }
        );

    });

    // Get full list of cocktail names and add to array

    let cocktailNames = [];

    getData(alcoholSearchURL + "Alcoholic", function (data) {
        data = data.drinks;
        data.forEach(function (item) {
            cocktailNames.push(item.strDrink);
        });

        getData(alcoholSearchURL + "Non_Alcoholic", function (data) {
            data = data.drinks;
            data.forEach(function (item) {
                cocktailNames.push(item.strDrink);
            });

            // Add autocomplete functionality to search form

            $("#search-input").autocomplete({
                source: cocktailNames,

                // Force selection from autocomplete list, otherwise sets value to blank string - code from: https://itecnote.com/tecnote/jquery-autocomplete-how-to-force-selection-from-list-keyboard/

                change: function (event, ui) {
                    if (!ui.item) {
                        $("#search-input").val("");
                    }

                }

            });

            // Get and display results

            function searchName(event) {

                event.preventDefault();

                let searchTerm = searchInput.value;

                if (!cocktailNames.includes(searchTerm)) {
                    $('#modal-no-input-alert').modal("show");
                }

                else {
                    resultList.innerHTML = `<p class="fs-2">Here's the recipe for <strong>${searchTerm}</strong>.</p>`;

                    getData(nameSearchURL + searchTerm, function (data) {
                        data = data.drinks;
                        data.forEach(function (item) {
                            let drinkCode = item.idDrink;
                            let drinkImage = item.strDrinkThumb;
                            let drinkName = item.strDrink;
                            let drinkInstructions = item.strInstructions;
                            let drinkIngredients = [item.strIngredient1, item.strIngredient2, item.strIngredient3, item.strIngredient4, item.strIngredient5, item.strIngredient6, item.strIngredient7, item.strIngredient8, item.strIngredient9, item.strIngredient10, item.strIngredient11, item.strIngredient12, item.strIngredient13, item.strIngredient14, item.strIngredient15];

                            //Filter null values

                            drinkIngredients = drinkIngredients.filter(elements => {
                                return elements !== null;
                            });

                            resultList.innerHTML +=

                                `<div id="result-${drinkCode}" class="drink-result mt-5">
                        <div class="row">
                            <div class="col-12">
                                <h2>${drinkName}</h2>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-12 col-sm-4">
                                <img src="${drinkImage}" class="drink-img img-fluid rounded border border-light">
                            </div>
                            <div id="recipe-${drinkCode}" class="recipe hidden col-12 col-sm-4">
                                <div class = "rounded text-dark px-3 py-2 mt-2 my-sm-0 recipe-card">
                                    <h3>Ingredients:</h3>
                                    <ul id="ingredient-list${drinkCode}" class="list-unstyled"></ul>
                                </div>
                            </div>
                            <div id="instructions-${drinkCode}" class="instructions hidden col-12 col-sm-4">
                                <div class = "rounded text-dark px-3 py-2 mt-2 my-sm-0 inst-card">    
                                    <h3>Instructions:</h3>
                                    <p>${drinkInstructions}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    `;








                            //Create list from array. Code from: https://www.tutorialspoint.com/how-to-create-html-list-from-javascript-array

                            let list = document.getElementById("ingredient-list" + drinkCode);

                            for (i = 0; i < drinkIngredients.length; ++i) {
                                let li = document.createElement('li');
                                li.innerText = drinkIngredients[i];
                                list.appendChild(li);
                            }

                            // Hide "search-cocktail" div and display "results" div, then show recipe and instructions.

                            $("#search-cocktail").hide("drop", function () {

                                $("#results").show("drop", function () {
                                    $(".recipe").show("drop");
                                    $(".instructions").show("drop");

                                });

                                $("#results-back").fadeIn();

                            });

                        });
                    });




                    // Hide "search-cocktail" div and display "results" div

                    $("#search-cocktail").hide("drop", function () {
                        $("#results").show("drop");
                        $("#results-back").fadeIn();
                    });
                }

            }


            searchForm.addEventListener('submit', searchName);





        });





    });

    $("#c-search-back").click(function () {
        $("#search-cocktail").hide("drop", function () {
            $("#main-menu").show("drop");
        }
        );

    });

    $("#random-search").click(function () {

        resultList.innerHTML = `<p class="fs-2">Here's a <strong>random cocktail</strong> for you to try!</p>`;

        getData(randomSearchURL, function (data) {
            data = data.drinks;
            data.forEach(function (item) {
                let drinkCode = item.idDrink;
                let drinkImage = item.strDrinkThumb;
                let drinkName = item.strDrink;
                let drinkInstructions = item.strInstructions;
                let drinkIngredients = [item.strIngredient1, item.strIngredient2, item.strIngredient3, item.strIngredient4, item.strIngredient5, item.strIngredient6, item.strIngredient7, item.strIngredient8, item.strIngredient9, item.strIngredient10, item.strIngredient11, item.strIngredient12, item.strIngredient13, item.strIngredient14, item.strIngredient15];

                //Filter null values

                drinkIngredients = drinkIngredients.filter(elements => {
                    return elements !== null;
                });

                resultList.innerHTML +=

                    `<div id="result-${drinkCode}" class="drink-result mt-5">
                        <div class="row">
                            <div class="col-12">
                                <h2>${drinkName}</h2>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-12 col-sm-4">
                                <img src="${drinkImage}" class="drink-img img-fluid rounded border border-light">
                            </div>
                            <div id="recipe-${drinkCode}" class="recipe hidden col-12 col-sm-4">
                                <div class = "rounded text-dark px-3 py-2 mt-2 my-sm-0 recipe-card">
                                    <h3>Ingredients:</h3>
                                    <ul id="ingredient-list${drinkCode}" class="list-unstyled"></ul>
                                </div>
                            </div>
                            <div id="instructions-${drinkCode}" class="instructions hidden col-12 col-sm-4">
                                <div class = "rounded text-dark px-3 py-2 mt-2 my-sm-0 inst-card">    
                                    <h3>Instructions:</h3>
                                    <p>${drinkInstructions}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    `;

                //Create list from array. Code from: https://www.tutorialspoint.com/how-to-create-html-list-from-javascript-array

                let list = document.getElementById("ingredient-list" + drinkCode);

                for (i = 0; i < drinkIngredients.length; ++i) {
                    let li = document.createElement('li');
                    li.innerText = drinkIngredients[i];
                    list.appendChild(li);
                }



            });
        });

        // Hide "main-menu" div and display "results" div with header, then show recipe and instructions.

        $("#main-menu").hide("drop", function () {
            $("#header").show("drop");

            $("#results").show("drop", function () {
                $(".recipe").show("drop");
                $(".instructions").show("drop");

            });

            $("#results-back").fadeIn();

        });


    });

    // Return to main menu on button click

    $("#results-back").click(function () {
        getFullIngredients();
        $("#results").hide("drop", function () {
            $("#main-menu").show("drop");
            $("#results-back").fadeOut();
        });
    });

});
