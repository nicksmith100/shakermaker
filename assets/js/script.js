// Declare consts ------------------------------------------ //

// Declare consts for API URLs

const ingredientListURL = "https://www.thecocktaildb.com/api/json/v2/9973533/list.php?i=list";
const ingredientSearchURL = "https://www.thecocktaildb.com/api/json/v2/9973533/filter.php?i=";
const cocktailSearchURL = "https://www.thecocktaildb.com/api/json/v2/9973533/lookup.php?i=";
const nameSearchURL = "https://www.thecocktaildb.com/api/json/v2/9973533/search.php?s=";
const alcoholSearchURL = "https://www.thecocktaildb.com/api/json/v2/9973533/filter.php?a=";
const randomSearchURL = "https://www.thecocktaildb.com/api/json/v2/9973533/random.php?";
const randomSelectionURL = "https://www.thecocktaildb.com/api/json/v2/9973533/randomselection.php?";

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

// Hide main menu, reveal spirit selection

function mainMenuToSpirits() {
    $("#main-menu").hide("drop", function () {
        $("#select-spirit").show("drop");
        $("#header").show("drop");
    }
    );
}

// Hide main menu, reveal cocktail search

function mainMenuToCocktailSearch() {
    $("#main-menu").hide("drop", function () {
        $("#search-cocktail").show("drop");
        $("#header").show("drop");
    }
    );
}

// Hide spirit selection, show main menu

function spiritSearchBack() {
    $("#s-search-back").click(function () {
        $("#select-spirit").hide("drop", function () {

            // Reset innerHTML of "spirit-buttons" to avoid potential duplication
            spiritBtnsDiv.innerHTML = "";

            $("#main-menu").show("drop");
        });
    });
}

// Hide ingredient selection, show spirit search

function ingSearchBack() {
    $("#i-search-back").click(function () {
        $("#select-ingredients").hide("drop", function () {

            // Reset innerHTML of "ing-buttons" to avoid potential duplication
            ingBtnsDiv.innerHTML = "";

            $("#select-spirit").show("drop");
        });
    });
}

// Hide ingredient search, display results and "Back to menu" button

function searchIngredientsToResults() {
    $("#select-ingredients").hide("drop", function () {

        // Reset innerHTML of "spirit-buttons" and "ing-buttons" to avoid potential duplication
        spiritBtnsDiv.innerHTML = "";
        ingBtnsDiv.innerHTML = "";

        $("#results").show("drop");
        $("#results-back").fadeIn();
    }
    );
}

// Hide cocktail search, display main menu

function cocktailSearchBack() {
    $("#search-cocktail").hide("drop", function () {
        $("#main-menu").show("drop");
    }
    );
}

// Hide cocktail search, display results and "Back to menu" button

function cocktailSearchToResults() {

    $("#search-cocktail").hide("drop", function () {

        $("#results").show("drop", function () {
            $(".recipe").show("drop");
            $(".instructions").show("drop");

        });

        $("#results-back").fadeIn();

    });
}

// Hide main menu, display results with recipe, and display "Back to menu" button

function mainMenuToResults() {

    $("#main-menu").hide("drop", function () {
        $("#header").show("drop");

        $("#results").show("drop", function () {
            $(".recipe").show("drop");
            $(".instructions").show("drop");

        });

        $("#results-back").fadeIn();

    });

}

// Return to main menu

function returnToMainMenu() {

    $("#results-back").click(function () {
        $("#results").hide("drop", function () {
            $("#main-menu").show("drop");
            $("#results-back").fadeOut();
        });
    });

}

// Display database error modal with "close page" button

function databaseError() {
    $("#modal-db-error").modal("show");
    $("#db-error-close").click(function () {
        window.close();
    });
}

// Display instructions modal on button press

function showInstructions() {
    $("#instructions-button").click(function () {
        $("#modal-instructions").modal("show");
    });
}

// Alert if no spirit selected

function noSpiritAlert() {
    $("#modal-spirit-alert").modal("show");
}

// Alert if maximum number of ingredients exceeded

function maxIngredientsAlert() {
    $("#modal-max-ing-alert").modal("show");
}

// Alert if no additional ingredients selected

function noIngAlert() {
    $("#modal-no-ing-alert").modal("show");
}

// Alert if no search input provided

function noInputAlert() {
    $("#modal-no-input-alert").modal("show");
}

// Create calls to API ------------------------------------------ //

/* Call API to get data based on API URL
(Utilises code from "Working with external resources" lessons of CI course) */

function getData(apiURL, cb) {

    try {
    
        let xhr = new XMLHttpRequest();

        xhr.open("GET", apiURL);
        xhr.send();

        xhr.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                cb(JSON.parse(this.responseText));
            }
        };
    }

    catch (error) {
        databaseError();
    }

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

/* Select particular ingredients from full ingredients list using index
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

// Get full list of cocktail names and add to array

function getCocktailNames() {

    let array = [];

    getData(alcoholSearchURL + "Alcoholic", function (data) {
        data = data.drinks;
        data.forEach(function (item) {
            array.push(item.strDrink);
        });
    });

    getData(alcoholSearchURL + "Non_Alcoholic", function (data) {
        data = data.drinks;
        data.forEach(function (item) {
            array.push(item.strDrink);
        });
    });

    return array;

}

// Call functions when document ready ------------------------------------------ //

$(document).ready(function () {

    // Reveal header and menu after 2 second delay

    setTimeout(welcomeToMainMenu, 2000);

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

        let spiritBtns = document.querySelectorAll(".spirit-btn");

        for (let i of spiritBtns) {
            i.addEventListener("click", function () {

                // Highlight selected spirit button only

                let spiritBtns2 = document.querySelectorAll(".spirit-btn");
                for (let j of spiritBtns2) {
                    j.classList.remove("btn-green");
                    j.classList.add("btn-yellow");
                }
                this.classList.remove("btn-yellow");
                this.classList.add("btn-green", "spirit-selected");

            });

        }

        mainMenuToSpirits();

        spiritSearchBack();

    });

    // Select 30 most popular ingredients from full ingredients array

    let topIngs = getSelectedIngredients(378, 234, 247, 18, 155, 385, 279, 281, 396, 315, 158, 361, 200, 194, 26, 261, 126, 72, 132, 84, 190, 71, 29, 30, 273, 114, 47, 16, 280, 196);

    // Reveal "Select ingredients" div, and create buttons from topIngs array

    $("#s-search-next").click(function () {

        let selectedSpiritBtn = document.getElementsByClassName("spirit-selected")[0];

        if (selectedSpiritBtn == undefined) {
            noSpiritAlert();
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

                let ingBtns = document.querySelectorAll(".ing-btn");

                for (let i of ingBtns) {
                    i.addEventListener("click", function () {

                        let selectedIngs = document.getElementsByClassName("ing-selected");

                        // Allow toggling of button classes, and display alert if maximum selection of 3 is reached

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
                                maxIngredientsAlert();

                            }
                            else if (this.classList.contains("ing-selected")) {
                                this.classList.remove("btn-green", "ing-selected");
                                this.classList.add("btn-yellow");
                            }

                        }

                    });
                }
            });

        }

        ingSearchBack();

    });

    // Add event listener to search button

    $("#i-search-button").click(function () {

        //Invoke getData function to display drinks by main ingredient

        function writeResults(ingredients, ingredientsSpaced) {
            
            let searchURL = ingredientSearchURL + ingredients;
            
            resultList.innerHTML = "";

            getData(searchURL, function (data) {
                data = data.drinks;

                // Returns a random selection of cocktails if no results found for particular ingredients

                if (data.includes("None")) {

                    resultList.innerHTML = `<p class="fs-2">Sorry, no drinks were found with <strong>${ingredientsSpaced}</strong>. Here's a random selection of cocktails instead.</p>
                    <p class="fs-3">(Click on a drink image to see the full recipe.)</p>`;

                    getData(randomSelectionURL, function (data) {
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
                                    for (let i = 0; i < drinkIngredients.length; ++i) {
                                        let li = document.createElement("li");
                                        li.innerText = drinkIngredients[i];
                                        list.appendChild(li);
                                    }

                                });
                            });


                        });


                    });

                }

                else {

                    resultList.innerHTML = `<p class="fs-2">Here are all the cocktails you can make with <strong>${ingredientsSpaced}</strong>.</p>
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
                                for (let i = 0; i < drinkIngredients.length; ++i) {
                                    let li = document.createElement("li");
                                    li.innerText = drinkIngredients[i];
                                    list.appendChild(li);
                                }

                            });
                        });

                    });

                }

            });

        }

        // Create search string from inner text of selected spirit and ingredients

        let selectedSpirit = document.getElementsByClassName("spirit-selected")[0].innerText;
        let selectedIngs = document.getElementsByClassName("ing-selected");

        // Check at least one additional ingredient has been selected

        if (selectedIngs.length < 1) {
            noIngAlert();
        }

        else {

            let ingString = selectedSpirit;

            for (let i of selectedIngs) {

                ingString += "," + i.innerText;

            }

            // Create spaced, grammatical list for results page

            let ingStringSpaced = selectedSpirit;

            for (let i of selectedIngs) {

                ingStringSpaced += ", " + i.innerText;

            }

            // Replace final comma with "and" - code from: https://stackoverflow.com/questions/29985085/replace-final-comma-in-a-string-with-and

            ingStringSpaced = ingStringSpaced.replace(/,(?=[^,]+$)/, " and ");
            
            writeResults(ingString, ingStringSpaced);

            searchIngredientsToResults();
        }

    });


    $("#show-c-search").click(mainMenuToCocktailSearch);

    // Add autocomplete functionality to search form

    let cocktailNames = getCocktailNames();

    $("#search-input").autocomplete({

        source: cocktailNames,

        /* Force selection from autocomplete list, otherwise set value to blank string
        (Code from: https://itecnote.com/tecnote/jquery-autocomplete-how-to-force-selection-from-list-keyboard/) */

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
            noInputAlert();
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

                    for (let i = 0; i < drinkIngredients.length; ++i) {
                        let li = document.createElement("li");
                        li.innerText = drinkIngredients[i];
                        list.appendChild(li);
                    }

                    cocktailSearchToResults();

                });
            });



        }

    }

    searchForm.addEventListener("submit", searchName);

    $("#c-search-back").click(cocktailSearchBack);

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

                for (let i = 0; i < drinkIngredients.length; ++i) {
                    let li = document.createElement("li");
                    li.innerText = drinkIngredients[i];
                    list.appendChild(li);
                }

            });
        });

        mainMenuToResults();

    });

    // Return to main menu on button click

    returnToMainMenu();

});