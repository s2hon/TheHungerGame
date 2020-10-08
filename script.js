//check box (left column)
var dietary = [];
var search = '';

//event listener for being checked
$('input[type=checkbox]').change(function () {
    if ($(this).is(':checked')) {
        $(this).attr('checked', 'checked');
        dietary.push($(this).siblings('span').text());
    }
});

//event listener for being unchecked
$('input[type=checkbox]').change(function () {
    if (!$(this).is(':checked')) {
        $(this).removeAttr('checked', 'checked');
        var remove = $(this).siblings('span').text();
        dietary.splice($.inArray(remove, dietary), 1);
    }
});

//submit button
$('.submitBtn').on('click', function () {
    console.log(dietary);
    dietary = dietary.toString().toLowerCase().replace(/ +/g, '');
    search = dietary.replace(',', '&');
    //run main function
    getRecipe();
});

//main
console.log(search);
function getRecipe() {
    var app_id = "2d0cdeda";
    var api_key = "5a09930cb72b211827aef4fbbdb035b5";
    queryURL = "https://api.edamam.com/search?q=" + search + "&app_id=" + app_id + "&app_key=" + api_key;
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        console.log(response);
        //   generating a random index number between 0 and length of response hits array
        
            var randomIndex = Math.floor((Math.random() * response.hits.length));
            var recipeEl = $("#recipe");
            recipeEl.empty();
            var cardImgEl = $("<div>");
            cardImgEl.addClass("card-image");
            var img = $("<img>");
            //   Grabbing random response hit and adding img link to image element
            img.attr("src", response.hits[randomIndex].recipe.image);
            var title = $("<span>");
            title.addClass("card-title");
            title.text(response.hits[randomIndex].recipe.label);
            //   Grabbing random response hit and adding recipe name as title to img element
            cardImgEl.append(img).append(title);
            recipeEl.append(cardImgEl);
            var cardContentEl = $("<div>");
            var ingredientEl = $("<ul>");
            cardContentEl.addClass("card-content");
            // creating element to store health label
            var healthLabelList = $("<div>").addClass("health-label");
            // element to store calories
            var caloriesEl = $("<div>").addClass("calories-text");
            caloriesEl.text(" Total Calories per Serving: " + Math.floor(response.hits[randomIndex].recipe.calories / response.hits[randomIndex].recipe.yield));
            // printing health label to card
            healthLabelList.text(response.hits[randomIndex].recipe.healthLabels);
            cardContentEl.append(healthLabelList);
            // print calories to card
            cardContentEl.append(caloriesEl);
            // printing ingredient to card
            cardContentEl.append(ingredientEl);
            // create element to go to recipe page
            var recipebtn = $("<button>").addClass("btn recipe-button waves-effect waves-light").text("Click to View Directions!");
            var nextButtonEl = $("<button>").addClass("btn next-button waves-effect waves-light").text("Next");

            cardContentEl.append(recipebtn);
            cardContentEl.append(nextButtonEl);
            recipeEl.append(cardContentEl);
        

        // on click wil take you to a page with directions
        $(document).on('click', '.recipe-button', function () {
            window.open(response.hits[randomIndex].recipe.url);
        });

    

        // creating an on click to next recipe
        $(document).on('click', '.next-button', function (event) {
            recipeEl.empty();
            randomIndex++;
            // create content again
            var cardImgEl = $("<div>");
            cardImgEl.addClass("card-image");
            var img = $("<img>");
            //   Grabbing random response hit and adding img link to image element
            img.attr("src", response.hits[randomIndex].recipe.image);
            var title = $("<span>");
            title.addClass("card-title");
            title.text(response.hits[randomIndex].recipe.label);
            //   Grabbing random response hit and adding recipe name as title to img element
            cardImgEl.append(img).append(title);
            recipeEl.append(cardImgEl);
            var cardContentEl = $("<div>");
            var ingredientEl = $("<ul>");
            cardContentEl.addClass("card-content");
            // creating element to store health label
            var healthLabelList = $("<div>").addClass("health-label");
            // element to store calories
            var caloriesEl = $("<div>").addClass("calories-text");
            caloriesEl.text(" Total Calories per Serving: " + Math.floor(response.hits[randomIndex].recipe.calories / response.hits[randomIndex].recipe.yield));
            // printing health label to card
            healthLabelList.text(response.hits[randomIndex].recipe.healthLabels);
            cardContentEl.append(healthLabelList);
            // print calories to card
            cardContentEl.append(caloriesEl);
            // printing ingredient to card
            cardContentEl.append(ingredientEl);
            // create element to go to recipe page
            var recipebtn = $("<button>").addClass("btn recipe-button waves-effect waves-light").text("Click to View Directions!");
            var nextButtonEl = $("<button>").addClass("btn next-button waves-effect waves-light").text("Next");

            cardContentEl.append(recipebtn);
            cardContentEl.append(nextButtonEl);
            recipeEl.append(cardContentEl);
            var forList = response.hits[randomIndex].recipe.ingredients;
            console.log(forList);
            //     //  list and forloop for ingredients 
            for (var i = 0; i < forList.length; i++) {
                var ingredientList = $("<li>");
                console.log(response.hits[randomIndex].recipe.ingredients[i].text);
                ingredientList.text(response.hits[randomIndex].recipe.ingredients[i].text);
                ingredientEl.append(ingredientList);
                // store them to local storage
                var shoppingList = localStorage.setItem("ingredients", ingredientList);
            }
     // on click wil take you to a page with directions
     $(document).on('click', '.recipe-button', function () {
        window.open(response.hits[randomIndex].recipe.url);
    });
        });
        var forList = response.hits[randomIndex].recipe.ingredients;
        console.log(forList);
        //     //  list and forloop for ingredients 
        for (var i = 0; i < forList.length; i++) {
            var ingredientList = $("<li>");
            console.log(response.hits[randomIndex].recipe.ingredients[i].text);
            ingredientList.text(response.hits[randomIndex].recipe.ingredients[i].text);
            ingredientEl.append(ingredientList);
            // store them to local storage
           
           //calledIngredientlist = window.localStorage.ingredientList( ,, );
           //we need to make a variable in global area "var = calledIngredientlist"
           // then we have access to it grab it by using "let page" line 85
        }
       
            var  shoppingList = localStorage.setItem("ingredients",JSON.stringify(ingredientList[i]));
        }

    )

    
    
};



//right column
document.addEventListener('DOMContentLoaded', function () {
    var elems = document.querySelectorAll('.sidenav');
    var instances = M.Sidenav.init(elems, { edge: 'right' });
    })


//side bar
document.addEventListener('DOMContentLoaded', function () {
    var elems = document.querySelectorAll('.sidenav');
    var instances = M.Sidenav.init(elems, { edge: 'right' });
});
// map box
mapboxgl.accessToken = 'pk.eyJ1IjoiamFjb2JuODgiLCJhIjoiY2tmeWRlcWl6MWx0dDJybXQ5NXRjazF2dSJ9.h9KXyaFyrcjkG9NRwU6a4A';
var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v11',
    center: [-97.739, 30.265],
    zoom: 12
});
map.addControl(
    new MapboxGeocoder({
        accessToken: mapboxgl.accessToken,
        mapboxgl: mapboxgl
    })
);
var geocoder = new MapboxGeocoder({
    accessToken: mapboxgl.accessToken,
    mapboxgl: mapboxgl
});
//  places search bar outside of map
document.getElementById('geocoder').appendChild(geocoder.onAdd(map));
