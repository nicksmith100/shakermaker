$(document).ready(function () {

    // Declare consts for API URLs

    const ingredientListURL = "https://www.thecocktaildb.com/api/json/v2/9973533/list.php?i=list";
    const ingredientSearchURL = "https://www.thecocktaildb.com/api/json/v2/9973533/filter.php?i=";
    const cocktailSearchURL = "https://www.thecocktaildb.com/api/json/v2/9973533/lookup.php?i=";
    const nameSearchURL = "https://www.thecocktaildb.com/api/json/v2/9973533/search.php?s=";
    const alcoholSearchURL = "https://www.thecocktaildb.com/api/json/v2/9973533/filter.php?a=";
    const randomSearchURL = "https://www.thecocktaildb.com/api/json/v2/9973533/random.php?";

    // Reveal header and menu after delay

    setTimeout(function () {
        $("#welcome").hide("drop", { direction: "up" }, function () {
            $("#header").show("drop", { direction: "up" });
            $("#main-menu").show("drop", { direction: "up" });
        });

    }, 3000);

    // Display instructions on button press

    $("#instructions-button").click(function () {
        $('#modal-instructions').modal("show");
    });

    // Link to API to get data based on API URL
    // Utilises code from "Working with external resources" lessons of CI course

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

    // Invoke getData function to pull full list of ingredients and push to array (fullIngArray)

    let fullIngs = [];

    getData(ingredientListURL, function (data) {
        data = data.drinks;
        data.forEach(function (item) {
            fullIngs.push(item.strIngredient1);
        });

    });

    //Select top spirits from full ingredients array - ensures names match those from API

    let topSpirits = [];

    setTimeout(function () {
        topSpirits.push(fullIngs[0], fullIngs[1], fullIngs[2], fullIngs[3], fullIngs[4], fullIngs[65], fullIngs[66], fullIngs[149], fullIngs[186], fullIngs[349], fullIngs[416], fullIngs[465]);
    }, 500);

    //Select top ingredients from full ingredients array - ensures ingredient names match those from API

    let topIngs = [];

    setTimeout(function () {
        topIngs.push(fullIngs[378], fullIngs[234], fullIngs[247], fullIngs[18], fullIngs[155], fullIngs[385], fullIngs[279], fullIngs[281], fullIngs[396], fullIngs[315], fullIngs[158], fullIngs[361], fullIngs[200], fullIngs[194], fullIngs[26], fullIngs[261], fullIngs[126], fullIngs[72], fullIngs[132], fullIngs[84], fullIngs[190], fullIngs[71], fullIngs[29], fullIngs[30], fullIngs[273], fullIngs[114], fullIngs[47], fullIngs[16], fullIngs[280], fullIngs[196]);
    }, 500);

    // Reveal "Select spirit" div on button click and create buttons from topSpirits array
    // Code for show and hide from: https://api.jqueryui.com/

    $("#show-i-search").click(function () {
        $("#main-menu").hide("drop", function () {
            $("#select-spirit").show("drop");
            $("#header").show("drop");
        }
        );

        for (let i = 0; i < topSpirits.length; i++) {
            document.getElementById("spirit-buttons").innerHTML += `
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
    });

    $("#s-search-back").click(function () {
        $("#select-spirit").hide("drop", function () {

            // Reset innerHTML of "spirit-buttons" to avoid potential duplication
            document.getElementById("spirit-buttons").innerHTML = "";

            $("#main-menu").show("drop");
        });
    });

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
                    document.getElementById("ing-buttons").innerHTML += `
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
            document.getElementById("ing-buttons").innerHTML = "";

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

            document.getElementById("result-list").innerHTML = "";

            getData(searchURL, function (data) {
                data = data.drinks;

                // Returns drinks based on just base spirit if no results found for particular ingredients

                if (data.includes("None")) {

                    document.getElementById("result-list").innerHTML = `<p class="fs-2">Sorry, no drinks were found with <strong>${ingStringSpaced}</strong>, but here are all the cocktails you can make with <strong>${selectedSpirit}</strong>. Click on a drink image to see the full recipe.</p>`;

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

                                    document.getElementById("result-list").innerHTML +=

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

                                    document.getElementById("result-list").onclick = function (event) {

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

                    document.getElementById("result-list").innerHTML = `<p class="fs-2">Here are all the cocktails you can make with <strong>${ingStringSpaced}</strong>. Click on a drink image to see the full recipe.</p>`;

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

                                document.getElementById("result-list").innerHTML +=

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


                                document.getElementById("result-list").onclick = function (event) {

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

                let searchInput = document.getElementById("search-input").value;

                if (!cocktailNames.includes(searchInput)) {
                    $('#modal-no-input-alert').modal("show");
                }

                else {
                    document.getElementById("result-list").innerHTML = `<p class="fs-2">Here's the recipe for <strong>${searchInput}</strong>.</p>`;

                    getData(nameSearchURL + searchInput, function (data) {
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

                            document.getElementById("result-list").innerHTML +=

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

            let searchForm = document.getElementById("search-form");
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

        document.getElementById("result-list").innerHTML = `<p class="fs-2">Here's a <strong>random cocktail</strong> for you to try!</p>`;

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

                document.getElementById("result-list").innerHTML +=

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
        $("#results").hide("drop", function () {
            $("#main-menu").show("drop");
            $("#results-back").fadeOut();
        });
    });

});

function isIntoView(elem) {
    var documentViewTop = $(window).scrollTop();
    var documentViewBottom = documentViewTop + $(window).height();

    var elementTop = $(elem).offset().top;
    var elementBottom = elementTop + $(elem).height();

    return ((elementBottom <= documentViewBottom) && (elementTop >= documentViewTop));
}
