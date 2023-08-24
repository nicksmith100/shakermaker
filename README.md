# ShakerMaker Website

![ShakerMaker logo](readme_images/logo_static.png)

This project creates a web-based cocktail finder application called ShakerMaker, allowing users to search cocktail recipes using a variety of methods. It is designed to be responsive and accessible on a range of devices, making it easy to navigate for users.

[View the live project here](https://nicksmith100.github.io/shakermaker/)

![ShakerMaker website displayed on various devices](readme_images/responsive_screens.png)


## Table of Contents

1. [Project Goals](#project-goals)
2. [Research](#research)
3. [User Stories](#user-stories)
4. [Design](#design)
5. [Features](#features)
6. [Testing](#testing)
7. [Tecnologies Used](#technologies-used)
8. [Deployment](#deployment)
9. [Credits](#credits)


## Project Goals

### Purpose

A web-based cocktail finder application which allows users to search cocktail recipes using a variety of methods.

### Client Goals

This project aims to demonstrate and embed my understanding of JavaScript as part of my personal development. As such there is no specific client, but I have built it with the following goals in mind from a client perspective:

- Create a fun and engaging site which provides users with information about cocktails while generating interest in the topic
- Provide a cocktail finder service which returns results based on selected ingredients 
- Provide a cocktail search service which returns results based on cocktail name
- Provide a random cocktail service which returns a random cocktail recipe

### User Goals

Detailed user stories are provided in the **User Stories** section below, but the primary goals of the user are to:

- Find cocktail recipes
- Understand and use the different search methods offered by the site
   
## Research

### Cocktail recipes

Before embarking on the project I wanted to be sure that I could obtain cocktail recipes from a reliable source, having little knowledge of the subject myself. After some research I discovered [TheCocktailDB](https://www.thecocktaildb.com/) - an open, crowd-sourced database of drinks and cocktails from around the world with a [free JSON API](https://www.thecocktaildb.com/api.php). I conducted some intial testing and determined that the full version of the API would provide the necessary functionality to satisfy the project goals outlined above. (See **JavaScript Functionality** section below for more details.)

### Popular ingredients

From my initial testing of the API it became clear that there were a vast number of ingredients provided by the database, such that listing them all for selection would detract from the user experience. I resolved to include only the 12 most popular spirits and the 30 most popular additional ingredients, using the list provided on this website as a guide: [Difford's Guide - Top 100 Cocktail Ingredients](https://www.diffordsguide.com/encyclopedia/1045/cocktails/top-100-cocktail-ingredients).

### Existing cocktail recipe finder websites

I researched existing cocktail recipe finder websites to determine what was already available to potential users of my site. Results included:

- [Difford's Guide - Cocktail Finder](https://www.diffordsguide.com/cocktails/search): A well-presented and sophisticated search engine offering various ways to search, including multiple ingredient dropdowns and the option to search by keyword. The site offers maximum functionality but arguably risks overwhelming less experienced cocktail makers.
- [Cocktail Builder](https://www.cocktailbuilder.com/): Offers a "shopping list" of ingredients, allowing the user to select which ones they have and which they don't. The site provides a live update of cocktails which can be made with the selected ingredients, as well as other cocktails which have one or more ingredients missing. The site offers good functionality with a simple interface and straightforward results, but the styling is quite basic.
- [Epicurious Interactive Cocktail Cabinet](https://www.epicurious.com/recipes-menus/cocktail-recipe-finder-article): Provides an excellent, user-friendly interface with images of spirits and other ingredients to be selected. As ingredients are selected, the interface adapts to indicate which other ingredients remain available for selection using a spider-diagram effect, indicating how many recipes exist with the selected ingredients. Clicking on a recipe title and image opens a new tab with the recipe, seemingly to drive traffic to other parts of the website, which arguably detracts from the user experience.

## User Stories

Based on the research and project goals outlined above, I envisage the site being visited by casual cocktail makers with no expert knowledge, as well as more experienced cocktail makers who know what cocktail they are looking for but wish to confirm the ingredients and method. User stories may differ depending on the experience of the user and whether they are a first-time or returning visitor. 

A. As a casual cocktail maker I want to:
1. Find out what cocktails I can make with the ingredients I have available.
2. Search for cocktails I have heard of and/or tried previously.
3. Discover cocktails I am not already aware of.
  
B. As an experienced cocktail maker I want to:  
1. Remind myself of cocktails which can be made with the ingredients I have available.
2. Search for a particular cocktail recipe to confirm the ingredients and method.
3. Discover cocktails I am not already aware of.
4. Revisit cocktails I have not made recently and may have forgotten about.

C. As a first-time visitor (regardless of experience) I want to:
1. Understand what the site offers
2. Learn how to use the site to find cocktail recipes
3. Easily navigate throughout the site to find the information I need

D. As a returning visitor (regardless of experience) I want to: 
1. Use the site to find various cocktail recipes
2. Explore different methods for finding cocktail recipes

## Design

### Wireframes

Wireframes were created using the Figma platform: [Figma - ShakerMaker](https://www.figma.com/file/kkJOk17MsggqClsHPMeO5I/Shaker-Maker?type=design&node-id=0%3A1&mode=design&t=gZj3N4u4m5Y8Abjo-1).

<details><summary>Desktop wireframes</summary>

  ![Desktop wireframes](readme_images/desktop_wireframes.png)

</details>

<details><summary>Mobile wireframes</summary>

  ![Mobile wireframes](readme_images/mobile_wireframes.png)

</details>
<br>

Based on prior experience I decided that desktop and mobile wireframes would be sufficient to keep the overall layout of the site on track, the expectation being that [Bootstrap's grid system](https://getbootstrap.com/docs/5.3/layout/grid/) would provide the responsiveness required at different device breakpoints in between (see **Layout and Styling** section below).

While the overall structure of the site stays true to the wireframes, there are some notable differences in the final layout which came about for design and user experience reasons:

- For design purposes I opted to provide a welcome screen with an animated version of the logo, which disappears after 2 seconds and gives way to the main site.
- I added a header, to provide a space for the logo to maintain consistent branding throughout the user experience, and to provide a space for additional buttons (see below).
- To aid the user experience I added to the header an "Instructions" button, and a "Back to menu" button which appears on the results screen.
- To provide a fun, additional search option I added a random cocktail finder.

### Layout and Styling

The site uses the [Bootstrap 5.3 Grid system](https://getbootstrap.com/docs/5.3/layout/grid/) to ensure it is fully responsive on all device and viewport sizes. Bootstrap 5.3 uses the following [breakpoints](https://getbootstrap.com/docs/5.3/layout/breakpoints/), the shorthand references for which are used throughout the rest of this document:

| Breakpoint        | Shorthand   | Dimensions |
|-------------------|-------------|------------|
| Extra small       | xs          | <576px     |
| Small             | sm          | ≥576px     |
| Medium            | md          | ≥768px     |
| Large             | lg          | ≥992px     |
| Extra large       | xl          | ≥1200px    |
| Extra extra large | xxl         | ≥1400px    |

In addition, the site uses the following specific components from the Bootstrap library:
- [Form classes](https://getbootstrap.com/docs/5.3/forms/overview/) for the cocktail search form.
- [Modal plugin](https://getbootstrap.com/docs/5.3/components/modal/) to display instructions and various alerts.  
- [Spacing](https://getbootstrap.com/docs/5.3/utilities/spacing/) and [typography](https://getbootstrap.com/docs/5.3/content/typography/) utility classes throughout, ensuring the layout and font are appropriate to the device in use. 
- [Display property](https://getbootstrap.com/docs/5.3/utilities/display/) to toggle the visibility of some components at certain breakpoints, in particular:
    -  In the header, hiding the strapline "Find your perfect cocktail" on xs viewports.
    -  On the spirit selection page, displaying images within the buttons on sm viewports and above.

### Imagery

- **Logo**: A neon representation of a cocktail glass on a black backgound, with the name of the site also represented in neon-style lettering. It is provided in bright colours to replicate a typical sign of a cocktail bar. On the welcome screen an animated version of the logo is displayed for a few seconds, while a static version is used in the header to avoid distracting the user. The logo was created using a template by Carla Moreno on the Canva website: [Orange and Blue Neon Drinks Bar Animated Logo](https://www.canva.com/templates/EAFCXIroTmk-orange-and-blue-neon-drinks-bar-animated-logo/).

  <details><summary>Animated logo</summary>
  
  ![Animated logo](readme_images/logo_animated.gif)
  
  </details>
  
  <details><summary>Static logo</summary>
  
  ![Static logo](readme_images/logo_static.png)
  
  </details>
  <br>

- **Spirit selection**: Images of relevant spirit bottles are shown on the spirit selection buttons for sm breakpoints and above, provided by [TheCocktailDB API](https://www.thecocktaildb.com/api.php).

- **Cocktail images**: Images of the cocktails themselves are shown on the results page, again provided by [TheCocktailDB API](https://www.thecocktaildb.com/api.php). Since the database is crowd-sourced, these images are submitted by users of the database.

- **404 image**: Carries an image of an empty cocktail glass with an associated message.
       
### Colour Scheme

The colour scheme of the site builds on the main logo, utilising the five fluorescent colours for the various buttons, maintaining the cocktail bar aesthetic.
- **Background**: The site is set on a black (#000000) background which provides the necessary contrast for the bright colours.
- **Primary buttons**: Utilise the orange colour (#f56d1c) from the logo, transitioning to blue (#1498e5) when hovered over, using an ease-in-out transition for a smooth effect.
- **Other buttons**: Use the other colours from the logo - yellow (#dfc706), green (#719d02) and pink (#e01c80). 

<details><summary>Colour scheme palette</summary>

![Website colour scheme palette](readme_images/palette.png)

</details>

### Typography

- #### Logo

  The font used in the logo is Neoneon. This was available directly on [Canva](https://www.canva.com/) where the logo was created, and was chosen to complement the neon sign which forms the logo. More information about the font can be found on [Dafont](https://www.dafontfree.co/neoneon-font/), where it is described as "reproducing the 80s style of neon signage".

  <details><summary>Neoneon font</summary>

  ![Neoneon font](readme_images/neoneon.png)

  </details>
  
- #### Main heading

  The main heading "Find your perfect cocktail" uses Exo, imported from [Google Fonts](https://fonts.google.com/specimen/Exo), with Sans Serif as the fallback font. Exo is a stylish but clear font with a rounded form which complements the Neoneon font used in the logo.

  <details><summary>Exo font</summary>

  ![Exo font](readme_images/exo.png)

  </details>

- #### Other headings, buttons and text

   The rest of the site uses Oswald, imported from [Google Fonts](https://fonts.google.com/specimen/Oswald), with Sans Serif as the fallback font. This is a simple, modern font which ensures that everything can be read clearly while working well with the overall site aesthetic.

  <details><summary>Oswald font</summary>

  ![Oswald font](readme_images/oswald.png)

  </details>

- #### Icons

  [Bootstrap Icons](https://icons.getbootstrap.com/) have been used for the main menu buttons, utilised as classes in the `<i>` tag.

  <details><summary>Menu icons</summary>

  ![Shopping basket icon](readme_images/basket.png)
  ![Magnifying glass icon](readme_images/search.png)
  ![Dice icon](readme_images/dice.png)

  </details>
  
- #### Favicon

   The favicon is simply "SM" in the Neoneon font, generated using [Favicon Generator](https://www.favicon-generator.org/). This proved more effective than trying to use the main logo as a favicon, as the detail of it was lost at such a small size.

  <details><summary>Favicon</summary>

  ![Oswald font](readme_images/favicon.png)

  </details>

## Features

### Scope

- #### Minimum Viable Product

  To be viable as a cocktail search tool, the website **must have**:
  1. At least one method for searching and returning cocktail recipes.
  2. A source of cocktail recipes to provide reliable results.
  3. An intuitive workflow with supporting guidance.
         
- #### Additional Features (in scope)

  To provide a good user experience and meet the stated client goals, the website **should have**:
  1. Options to find cocktails by popular ingredients, name or random selection.
  2. Images of cocktails provided alongside recipes.
   
- #### Future Ideas (not currently in scope)
  
   To provide a better user experience and better meet the stated client goals, the website also **could have**:
   1. The ability to select any ingredient when searching by ingredient (not limited to most popular ingredients).
   2. A cocktail quiz which allows users to guess which ingredients are included in a given cocktail.
   3. An option to select "non-alcoholic" at the spirit selection stage when searching by ingredients.

### Page Elements and Interaction

The website is presented as a single page with elements which are displayed or hidden based on user interaction, in line with the scope outlined above. All pages utilise Bootstrap's [Grid system](https://getbootstrap.com/docs/5.3/layout/grid/), ensuring that the page is fully responsive to viewport size.

- #### Welcome page

  The site displays an animated version of the logo for 2 seconds, before automatically giving way to the header and main menu.

- #### Header

  Apart from the welcome page, all pages include a header with a static version of the logo on the left-hand side and a button menu on the right-hand side. The button menu initially includes only an "Instructions" button, which on being pressed displays a modal offering guidance on how to use the various search options. The header also includes a heading "Find your perfect cocktail", which is hidden for xs viewports.
         
  <details><summary>Header (lg)</summary>
      
  ![Header (lg)](readme_images/header_lg.png)

  </details>
    
  <details><summary>Header (md)</summary>
      
  ![Header (md)](readme_images/header_md.png)

  </details>
    
  <details><summary>Header (sm)</summary>
      
  ![Header (xs)](readme_images/header_xs.png)

  </details>
    
- #### Main menu

  The main menu provides three large buttons displaying different search options, with appropriate [Bootstrap icons](https://icons.getbootstrap.com/):
  - Search by ingredients (with a shopping basket icon)
  - Look up cocktail (with a magnifying glass icon)
  - Surprise me (with a dice icon)

  <br>
  <details><summary>Main menu (lg)</summary>
         
  ![Main menu (lg)](readme_images/menu_lg.png)

  </details>

  <details><summary>Main menu (md)</summary>
         
  ![Main menu (md)](readme_images/menu_md.png)

  </details>
      
  <details><summary>Main menu (xs)</summary>
         
  ![Main menu (xs)](readme_images/menu_xs.png)

  </details>
      

      
- #### Search by ingredients
  - ##### Select a Spirit
        
    Selecting "Search by ingredients" takes the user to a spirit selection page, allowing the user to select one of 12 spirits. The spirit selection buttons are presented with images of spirit bottles on sm viewports and above, and as simple text buttons on xs viewports. The background of the button turns from yellow to green when selected. Navigation buttons at the bottom of the page allow the user to proceed or go back. An alert modal is displayed if the user tries to proceed with no spirit button selected.

    <details><summary>Spirit selection (lg)</summary>

    ![Spirit selection (lg)](readme_images/spirit_select_lg.png)

    </details>

    <details><summary>Spirit selection (xs)</summary>

    ![Spirit selection (xs)](readme_images/spirit_select_xs.png)

    </details>
    
    <details><summary>No spirit alert</summary>

    ![No spirit alert](readme_images/no_spirit_alert.png)

    </details>

  - ##### Select additional ingredients
    
    The next page allows the user to select 1-3 additional ingredients. The buttons are presented as simple text buttons on all viewports, the background of the button turning from yellow to green when selected. Buttons at the bottom of the page allow the user to search based on the selected ingredients or go back. An alert modal is displayed if the user tries to proceed with no ingredient button selected, or if the user attempts to select more than three additional ingredients.

    <details><summary>Ingredients selection (lg)</summary>

    ![Ingredients selection (lg)](readme_images/ing_select_lg.png)

    </details>

    <details><summary>Ingredients selection (xs)</summary>

    ![Ingredients selection (xs)](readme_images/ing_select_xs.png)

    </details>
    
    <details><summary>No ingredient alert</summary>

    ![No ingredient alert](readme_images/no_ing_alert.png)

    </details>

    <details><summary>Max ingredients alert</summary>

    ![Max ingredients alert](readme_images/max_ing_alert.png)

    </details>

  - ##### Results

    The results page displays all cocktails matching the selected ingredients, as names and images. As multiple results are expected, recipes are initially hidden but can be revealed by clicking on the photograph. Positioning of recipes is dependent on device size, with the direction of the reveal animation adjusted accordingly. The results page also includes an additional "Back to menu" button in the header.

    <details><summary>Search by ingredients - results (lg)</summary>

    ![Search by ingredients - results - desktop](readme_images/ing_results_lg.png)

    </details>

    <details><summary>Search by ingredients - results (xs)</summary>

    ![Search by ingredients - results - mobile](readme_images/ing_results_xs1.png)
    ![Search by ingredients - results - mobile](readme_images/ing_results_xs2.png)

    </details>
    <br>

    If no exact matches are found then the user is informed and presented with a selection of popular cocktails instead.

    <details><summary>Search by ingredients - no results (lg)</summary>

    ![Search by ingredients - no results (lg)](readme_images/ing_no_results_lg.png)

    </details>

    <details><summary>Search by ingredients - no results (xs)</summary>

    ![Search by ingredients - no results (lg)](readme_images/ing_no_results_xs.png)

    </details>
   

- #### Look up cocktail
  - ##### Search form

    Selecting "Look up cocktail" displays a simple form, allowing the user to enter the name of a cocktail. The form forces selection from an autocomplete list, ensuring that only cocktails which exist in the database can be entered into the form, preventing nil results. Buttons beneath the form allow the user to search or go back.

    <details><summary>Look up cocktail (lg)</summary>

    ![Look up cocktail (lg)](readme_images/lookup_lg.png)
    
    </details>

    <details><summary>Look up cocktail (xs)</summary>
    
    ![Look up cocktail (xs)](readme_images/lookup_xs.png)

    </details>
 
  - ##### Results

    The results page displays the cocktail(s) matching the search term, as name(s) and image(s). As usually only a single result is expected, the recipe is automatically revealed as the results page is revealed. Positioning of the recipe is dependent on device size, with the direction of the reveal animation adjusted accordingly. The results page also includes an additional "Back to menu" button in the header.

    <details><summary>Look up cocktail - results (lg)</summary>

    ![Look up cocktail - results (lg)](readme_images/lookup_results_lg.png)
    
    </details>

    <details><summary>Look up cocktail - results (xs)</summary>
    
    ![Look up cocktail (xs)](readme_images/lookup_results_xs.png)

    </details>

- #### Random search (Surprise me!)

  Selecting "Surprise me!" takes the user straight to the results page, where they are presented with a random cocktail, displayed as a name and image. As only a single result is provided, the recipe is automatically revealed as the results page is revealed. Positioning of the recipe is dependent on device size, with the direction of the reveal animation adjusting accordingly. The results page also includes an additional "Back to menu" button in the header.

  <details><summary>Random result (lg)</summary>

  ![Random result (lg)](readme_images/random_result_lg.png)
    
  </details>

  <details><summary>Random result (xs)</summary>
    
  ![Random result (xs)](readme_images/random_result_xs.png)

  </details>

- #### Database Error Modal

  An alert modal is displayed if the database cannot be reached or returns an error. This includes a "Close page" button which closes the whole page rather than just the modal itself.

  <details><summary>Database error modal</summary>
    
  ![Database error modal](readme_images/db_error_modal.png)

  </details>

- #### 404 page

  A 404 page is provided in the event that the user browses to a page which does not exist. It depicts an empty cocktail glass with associated text.

  <details><summary>404 page (lg)</summary>
    
  ![404 page (lg)](readme_images/404_lg.png)

  </details>

  <details><summary>404 page (xs)</summary>
    
  ![404 page (xs)](readme_images/404_xs.png)

  </details>    

### JavaScript Functionality

- #### Presentation and navigation

   - The [jQuery](https://jquery.com/) [show and hide methods](https://www.w3schools.com/jquery/jquery_hide_show.asp) have been used to allow various page elements to be revealed and hidden. The [Drop effect](https://www.tutorialspoint.com/jquery/effect-drop.htm) is used in most cases to add style to the transitions.
     
   - The [jQuery](https://jquery.com/) [fadeIn](https://api.jquery.com/fadeout/) and [fadeOut](https://api.jquery.com/fadeout/) effects have been applied to the "Back to menu" button in the header.
   
   - EventListeners have been used to add functionality to various elements, including buttons and cocktail images (where necessary to allow the reveal of recipes). 

- #### API and associated functionality

  The site utilises [TheCocktailDB API](https://www.thecocktaildb.com/api.php) to provide all information regarding cocktails. In particular:

   - ##### Search by ingredients
     - An XML HttpRequest is used to pull a full list of ingredients from the API. A function selects a subset of these ingredients to provide the list of spirits available for selection, and creates the associated buttons (including images for sm viewports and above). A similar process is used to create the list of additional ingredients available for selection and the associated buttons.
     - The properties of selected buttons are read to create a search string which is submitted to the API to get results, each in the form of a cocktail name, a photograph and a unique ID.
     - The unique ID of each cocktail is submitted to the API to get the list of ingredients and method which form the recipe.
     - If no matches are found then the API's in-built functionality is used to provide a list of popular cocktails instead.

   - ##### Look up cocktail 
     - An XML HttpRequest is used to pull a full list of cocktail names from the API, pushing them to an array.
     - The search form includes an [autocomplete function from jQuery UI](https://jqueryui.com/autocomplete/) which uses the array of cocktail names as its basis, avoiding nil results.
     - The search term is submitted to the API to get the details of the cocktail.

   - ##### Random search (Surprise me!)
      - The API's in-built functionality is used to get details of a random cocktail.

## Testing

### Automated testing

- #### HTML validation with [W3C Markup Validator](https://validator.w3.org/)

  | **Error/Warning**         | **Offending code**           | **Fix**                                                                              |
  |---------------------------|-----------------------------|--------------------------------------------------------------------------------------|
  | Warning: Sections lacking headings | Various sections throughout | - Change welcome screen from ```<section>``` to ```<div>```<br>- Add ```<h2>``` headings to all other sections |


  The current HTML returns **no errors or warnings**.

- #### CSS validation with [W3C CSS Validator](https://jigsaw.w3.org/css-validator/)

  | **Error/Warning**         | **Offending code**           | **Fix**                                                                              |
  |---------------------------|-----------------------------|--------------------------------------------------------------------------------------|
  | Warning: Vendor extensions | ```-moz-transition```<br>```-webkit-transition``` | Delete vendor extensions (since they are obsolete anyway) |  
  
  The current CSS returns **no errors or warnings**.

- #### JavaScript validation using [JSHint](https://jshint.com/)

  | **Error/Warning**                                                                                                                       | **Offending code**                                                                                                                          | **Fix**                                                                                                                                                                                                                                |
  |-----------------------------------------------------------------------------------------------------------------------------------------|---------------------------------------------------------------------------------------------------------------------------------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
  | Unnecessary semicolons                                                                                                                  | 5 lines, throughout code                                                                                                                    | Remove unnecessary semicolons                                                                                                                                                                                                          |
  | Creating global 'for' variable                                                                                                          | 5 lines, e.g. ```for (i of indices)```                                                                                                      | Declare variables with "let", e.g. ```for (let i of indices)```                                                                                                                                                                        |
  | Undefined variables                                                                                                                     | Throughout, e.g. ```for (i = 0; i < topIngs.length; i++)```                                                                                 | Declare variables with "let", e.g. ```for (let i = 0; i < topIngs.length; i++)```                                                                                                                                                      |
  | Function declarations should not be placed in blocks. Use a function expression or move the statement to the top of the outer function. | ```writeResults()``` function, within ```$("#i-search-button").click(function () {})``` block                                               | ```writeResults()``` function moved to top of outer function                                                                                                                                                                           |
  | Functions declared within loops referencing an outer scoped variable may lead to confusing semantics. (ingArray, i)                     | Line 247:<br>  ``` getData(ingredientListURL, function (data) { data = data.drinks; ingArray.push(data[i].strIngredient1); }); ```              | I am satisfied that the code is semantically clear, so no change made (noting this is only a warning, not an error).                                                                                                                   |
  | Functions declared within loops referencing an outer scoped variable may lead to confusing semantics. (maxIngredientsAlert)             | Line 366:<br>  ``` i.addEventListener("click", function () {  [...]  if (this.classList.contains("btn-yellow")) { maxIngredientsAlert(); }  ``` | Can be resolved by replacing the call to ```maxIngredientsAlert()``` with the contents of the function. However, this would appear to be more confusing semantically, so no change made (noting this is only a warning, not an error). |
  
  The current JavaScript returns **no errors** and **no warnings** apart from those acknowledged above.

- #### Accessibility using [Lighthouse accessibility](https://developer.chrome.com/docs/lighthouse/accessibility/)

  Lighthouse audit scores (accessed through Chrome DevTools) show that the site is fully accessible and complies with best practices.

  <details><summary>Lighthouse scores</summary>

  ![Lighthouse scores](readme_images/lighthouse.png)

  </details>

### Manual Testing

- #### User stories

  The site was tested against the user stories as follows:

  | **User Goal**                                                                          | **How it is achieved**                                                                                                                                                                                                                                                                                                                                                           |
  |----------------------------------------------------------------------------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
  | _A. As a casual cocktail maker I want to:_                                             |                                                                                                                                                                                                                                                                                                                                                                                  |
  | 1. Find out what cocktails I can make with the ingredients I have available.           | The "Search by ingredients" function allows the user to select a base spirit and up to three additional ingredients, providing a list of cocktails which include those ingredients.                                                                                                                                                                                              |
  | 2. Search for cocktails I have heard of and/or tried previously.                       | The "Look up cocktail" function allows the user to search for cocktails by name, and the autocomplete functionality means that cocktails can be found with partial matches if the user does not remember the exact name.                                                                                                                                                         |
  | 3. Discover cocktails I am not already aware of.                                       | The "Surprise me!" function returns a random cocktail. In addition, if a search by ingredients does not match any results then a selection of popular cocktails are returned instead.                                                                                                                                                                                            |
  | _B. As an experienced cocktail maker I want to:_                                       |                                                                                                                                                                                                                                                                                                                                                                                  |
  | 1. Remind myself of cocktails which can be made with the ingredients I have available. | The "Search by ingredients" function allows the user to select a base spirit and up to three additional ingredients, providing a list of cocktails which include those ingredients. |
  | 2. Search for a particular cocktail recipe to confirm the ingredients and method.      | The "Look up cocktail" function allows the user to search for cocktails by name.                                                                                                                                                                                                                                                                                                 |
  | 3. Discover cocktails I am not already aware of.                                       | The "Surprise me!" function returns a random cocktail. In addition, if a search by ingredients does not match any results then a selection of popular cocktails are returned instead.                                                                                                                                                                                            |
  | 4. Revisit cocktails I have not made recently and may have forgotten about.            | As above. In addition, when looking up cocktails by name, the autocomplete feature allows for partial matches, allowing the user to browse by cocktail types (e.g. "martini", "sour").                                                                                                                                                                                          |
  | _C. As a first-time visitor (regardless of experience) I want to:_                     |                                                                                                                                                                                                                                                                                                                                                                                  |
  | 1. Understand what the site offers                                                     | The user is presented with a clear, intuitive menu. If in any doubt, instructions are available at the click of a button.                                                                                                                                                                                                                                                        |
  | 2. Learn how to use the site to find cocktail recipes                                  | Instructions are available at the click of a button which fully explain how each search option works. The "Search by ingredients" and "Look up cocktail" options also include helpful cues and reminders to guide the user through the process.                                                                                                                                  |
  | 3. Easily navigate throughout the site to find the information I need                  | Navigation is intuitive and the site includes helpful cues and reminders to guide the user through the process of searching for cocktails. The "Instructions" button is clear, and a "Return to menu" button is presented on the results page, making it easy to start again.                                                                                                    |
  | _D. As a returning visitor (regardless of experience) I want to:_                      |                                                                                                                                                                                                                                                                                                                                                                                  |
  | 1. Use the site to find various cocktail recipes                                       | The database provides access to 627 cocktail recipes, allowing for a wide range of cocktail recipes to be discovered. The intuitive navigation makes repeated searching easy.                                                                                                                                                                                                    |
  | 2. Explore different methods for finding cocktail recipes                              | The site provides three very different options for finding cocktail recipes. The simple interface and clear instructions make it easy to explore these different methods.|

- #### Feature testing

  

- #### Browser and device compatibility

  The Website was fully tested on the following browsers and devices, checking that all features and links worked correctly:

  | Browser        | Version                                  | Device                                      | Operating Sytem       | Results                                                        |
  |----------------|------------------------------------------|---------------------------------------------|-----------------------|----------------------------------------------------------------|
  | Firefox        | 113.0.2 (64-bit)                         | Dell Latitude E6420 laptop                  | Windows 10 Home       | Fully functional                                               |
  | Google Chrome  | 113.0.5672.127 (Official Build) (64-bit) | Dell Latitude E6420 laptop                  | Windows 10 Home       | Minor issue with form warnings - see **Known Bugs**            |
  | Google Chrome  | 113.0.5672.127 (Official Build) (64-bit) | Microsoft Surface Pro 7 256GB               | Windows 10 Enterprise | Minor issue with form warnings - see **Known Bugs**            |
  | Google Chrome  | 113.0.5672.162                           | Xiaomi Mi 10 Lite 5G                        | Android 12            | Minor issue with form warnings - see **Known Bugs**            |
  | Google Chrome  | 113.0.5672.163                           | Huawei HONOR 20 Lite                        | Android 10            | Minor issue with form warnings - see **Known Bugs**            |
  | Microsoft Edge | 114.0.1823.37 (Official build) (64-bit)  | Dell Latitude E6420 laptop                  | Windows 10 Home       | Minor issue with form warnings - see **Known Bugs**            |
  | Microsoft Edge | 112.0.1722.39 (Official build) (64-bit)  | Microsoft Surface Pro 7 256GB               | Windows 10 Enterprise | Minor issue with form warnings - see **Known Bugs**            |
  | Safari         | 16.5                                     | Apple iPad (9th generation) running         | iPadOS 16.5           | Minor issue with touch input on galleries - see **Known Bugs** |
  | Safari         | 16.3.1                                   | Apple iPad Pro (12.9-inch) (4th generation) | iPadOS 16.3.1         | Minor issue with touch input on galleries - see **Known Bugs** |

### Fixed Bugs

- The quotes in the box overlaid on the hero image in the main page would not vertically centre using standard CSS such as automatic margins. This was fixed using the `translateY` function of the CSS property `transform` as detailed here: [How to vertically center a bootstrap carousel caption](https://stackoverflow.com/questions/27279865/how-to-vertically-center-a-bootstrap-carousel-caption).
- The dropdown selecter in the booking form had the `required` attribute, but was allowing the form to be submitted even if a value had not been selected. This was fixed by ensuring that the "Please select" option had an empty value, as detailed here: [Applying the required attribute to select fields](https://stackoverflow.com/questions/6048710/can-i-apply-the-required-attribute-to-select-fields-in-html).  

### Known Bugs

- On Google Chrome and Microsoft Edge browsers, if a required form field is not populated and the field is off screen when "Submit" is pressed, the browser jumps back to that field and highlights it, but does **not** display a warning to the user that the field must be filled in. This error does not occur on Firefox or Safari browsers. Despite extensive investigation, I have been unable to find the cause of this bug, and cannot determine if it is due to any fault in the code. This could be circumvented by separating the form into separate pages, but that is beyond the scope of this project.
- On touch devices, the image carousels do not react to swipe actions unless they have already been interacted with using the next button. Searching relevant forums suggests that adding `data-touch="true"` to the carousel div should solve this, but it does not. It appears that a workable solution may require JavaScript which is beyond the scope of this project.
- The Booking page returns a minor warning concerning two `<h1>` elements. Only one `<h1>` element is actually displayed at any one time, and the second one as been given the attribute `aria-hidden="true"` to avoid being read by screen readers, but the error remains. Oddly, the error is not returned on the other pages which all include the same code. As this is only a minor warning and not an error, it has not been investigated further at this stage.

## Technologies Used

### Languages
- [HTML](https://html.spec.whatwg.org/multipage/)
  - Standard markup language for web pages
- [CSS](https://www.w3.org/Style/CSS/)
  - Adding style to HTML
- [JavaScript](https://www.w3schools.com/js/)
  - Adding interactive elements

### Frameworks
- [Bootstrap 5.3](https://getbootstrap.com/docs/5.3/getting-started/introduction/)
  - Overall layout and styling, and specific components as described above

### Libraries
- [jQuery](https://jquery.com/)
  - Show and hide functionality
- [jQuery UI](https://jqueryui.com/)
  - Autocomplete on search form
- [Google Fonts](https://fonts.google.com)
  - Exo and Oswald fonts
- [Bootstrap icons](https://icons.getbootstrap.com/)
  - Icons on main menu buttons

### APIs
- [TheCocktailDB API](https://www.thecocktaildb.com/api.php)
  - All cocktail information including spirit names, ingredient names and results (including cocktail photographs)

### Platforms
- [Github](https://github.com/)
  - Storing code and deployment
- [CodeAnywhere](https://app.codeanywhere.com/)
  - IDE used for majority of project development
- [Gitpod](https://gitpod.io/)
  - IDE used to finalise project (due to technical issues with CodeAnywhere)

### Other Tools
- [Figma](https://www.figma.com/)
  - Wireframes
- [Coolors](https://coolors.co/)
  - Colour palette
- [Favicon Generator](https://www.favicon-generator.org/)
  - Website favicon
- [Am I Responsive](https://ui.dev/amiresponsive)
  - Montage of different devices displaying the site
- [Canva](https://www.canva.com/)
  - Creation of main logo
- [Unsplash](https://unsplash.com/)
  - 404 image
- [Fix the photo](https://fixthephoto.com/uk/online-gimp.html)
  - Image editing
  

## Deployment

### GitHub Pages

The project was deployed to GitHub Pages using the following steps.

1. Log in to GitHub and locate the [GitHub Repository](https://github.com/nicksmith100/shakermaker/)
2. At the top of the Repository (not top of page), locate the "Settings" Button on the menu.
3. In the menu on the left-hand side, under "Code and automation", select "Pages".
4. Under "Source", click the dropdown which says "None" and select "main", then click "Save".
5. Refresh the page if it does not do so automatically.
6. A link to the published site will appear at the top of the page.

## Credits

### Code

- [Bootstrap 5.3](https://getbootstrap.com/docs/5.3/layout/grid/): Bootstrap Library used throughout the project, to make the site responsive using the Bootstrap Grid System, and specific components as outlined above.
- [Code Institute - adding hover CSS](https://github.com/Code-Institute-Solutions/resume-miniproject-bootstrap4/tree/master/07-adding-hover-css): Used to provide ease-in-out transition on navigation links, social links and buttons.
- [How to vertically center a bootstrap carousel caption](https://stackoverflow.com/questions/27279865/how-to-vertically-center-a-bootstrap-carousel-caption): Used to vertically centre quotes in box overlaid on hero image on homepage.
- [CSS fade-in effect](https://blog.hubspot.com/website/css-fade-in): For fade-in effect used on primary images.
- [W3 CSS animations](https://www.w3schools.com/css/css3_animations.asp): Used to adapt the above fade-in effect to provide a fade-out effect on image gallery captions.
- [Applying the required attribute to select fields](https://stackoverflow.com/questions/6048710/can-i-apply-the-required-attribute-to-select-fields-in-html): Used to ensure the dropdown selecter in the booking form operates as a required field.

### Content

- (API)
- All other content was written by the developer.

### Media

- Logo
- Spirit bottle images
- 404 image    

### Acknowledgements

- My Mentor Rory Patrick Sheridan for many helpful pointers, including providing an [example README](https://github.com/Ri-Dearg/horizon-photo/blob/master/README.md) which has provided a useful template for this document.
- Our Cohort Facilitator Iris Smok for providing helpful guidance on project requirements throughout.
- 
