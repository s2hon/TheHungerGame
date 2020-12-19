//User Preference(left column)
var selectOne = '';
var choiceOne = ['breakfast', 'lunch', 'dinner', 'snack'];
var selectTwo = '';
var choiceTwo = ['balanced', 'high-protein', 'low-fat', 'low-carb'];
var choiceThree = [];
var para = [];
var selectThree = '';
var search = '';
var recipeIngre = [];

$(document).ready(function () {
    //event listener for health type
    $('input[type=checkbox]').change(function () {
        if ($(this).is(':checked')) {
            $(this).attr('checked', 'checked');
            choiceThree.push($(this).siblings('span').text());
        }
    });

    //event listener for being unchecked (health type)
    $('input[type=checkbox]').change(function () {
        if (!$(this).is(':checked')) {
            $(this).removeAttr('checked', 'checked');
            var remove = $(this).siblings('span').text();
            choiceThree.splice($.inArray(remove, choiceThree), 1);
        }
    });

    //submit button
    $('.submitBtn').on('click', function () {
        if ($('select.mealType').val() !== null && $('select.dietType').val() !== null) {
            mealIn = $('select.mealType').val();
            selectOne = choiceOne[mealIn - 1]
            typeIn = $('select.dietType').val();
            selectTwo = "&diet=" + choiceTwo[typeIn - 1] + "&";
        }
        else if ($('select.mealType').val() > 0 && $('select.dietType').val() !== null) {
            mealIn = $('select.mealType').val();
            selectOne = choiceOne[mealIn - 1]
            selectTwo = '';
        }
        else if ($('select.mealType').val() !== null && $('select.dietType').val() > 0) {
            selectOne = choiceOne[Math.floor(Math.random() * (4))];
            typeIn = $('select.dietType').val();
            selectTwo = "&diet=" + choiceTwo[typeIn - 1];
        }
        else {
            selectOne = choiceOne[Math.floor(Math.random() * (4))];
            selectTwo = '';
        }

        if (choiceThree.length !== null) {
            for (i = 0; i < choiceThree.length; i++) {
                para.push("&health=" + choiceThree[i].toLowerCase());
            }
            selectThree = para.toString().replace(",", "");
            search = selectTwo + selectThree;

            // run main function
            getRecipe();
        }
        else if (choiceThree.length !== null) {
            getRecipe();
        }
    });

    //shopping cart button
    $(".goShopping").on("click", function() {
        window.location.href = "./shoppingCart.html";   
    });

    //main
    console.log(search);
    function getRecipe() {
        queryURL = "https://api.edamam.com/search?q=" + selectOne + "&app_id=" + process.env.APP_ID + "&app_key=" + process.env.API_KEY + search;
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {
            console.log(response)
            //reset search variables
            selectOne = '';
            selectTwo = '';
            choiceThree = [];
            para = [];
            selectThree = '';
            search = '';
            //generating a random index number between 0 and length of response hits array

            var randomIndex = Math.floor((Math.random() * response.hits.length));   
            $("#filler").hide();

            $("#recipe").show();
            $(".card-image").attr("src", response.hits[randomIndex].recipe.image);
            $(".card-title").text(response.hits[randomIndex].recipe.label);
            $(".calories-text").text(" Total Calories per Serving: " + Math.floor(response.hits[randomIndex].recipe.calories / response.hits[randomIndex].recipe.yield));
            $(".health-label").text(response.hits[randomIndex].recipe.healthLabels);
            //  list and forloop for ingredients 
            var forList = response.hits[randomIndex].recipe.ingredients;
            console.log(forList);
            for (var i = 0; i < forList.length; i++) {
                $(".ingredient-list").append("<li>"+response.hits[randomIndex].recipe.ingredients[i].text+"</li>");
                recipeIngre.push(response.hits[randomIndex].recipe.ingredients[i].text);
            };

            // on click wil take you to a page with directions
            $(document).on('click', '.recipe-button', function () {
                window.open(response.hits[randomIndex].recipe.url);
            });

            $(document).on("click", ".cart-button ", function () {
                window.location.href = 'shoppingCart.html';
            });



            // creating an on click to next recipe
            // $(document).on('click', '.next-button', function (event) {
            //     recipeEl.empty();
            //     randomIndex++;
            //     // create content again
            //     var cardImgEl = $("<div>");
            //     cardImgEl.addClass("card-image");
            //     var img = $("<img>");
            //     //   Grabbing random response hit and adding img link to image element
            //     img.attr("src", response.hits[randomIndex].recipe.image);
            //     var title = $("<span>");
            //     title.addClass("card-title");
            //     title.text(response.hits[randomIndex].recipe.label);
            //     //   Grabbing random response hit and adding recipe name as title to img element
            //     cardImgEl.append(img).append(title);
            //     recipeEl.append(cardImgEl);
            //     var cardContentEl = $("<div>");
            //     var ingredientEl = $("<ul>");
            //     cardContentEl.addClass("card-content");
            //     // creating element to store health label
            //     var healthLabelList = $("<div>").addClass("health-label");
            //     // element to store calories
            //     var caloriesEl = $("<div>").addClass("calories-text");
            //     caloriesEl.text(" Total Calories per Serving: " + Math.floor(response.hits[randomIndex].recipe.calories / response.hits[randomIndex].recipe.yield));
            //     // printing health label to card
            //     healthLabelList.text(response.hits[randomIndex].recipe.healthLabels);
            //     cardContentEl.append(healthLabelList);
            //     // print calories to card
            //     cardContentEl.append(caloriesEl);
            //     cardContentEl.append(cartButtonEl);
            //     // printing ingredient to card
            //     cardContentEl.append(ingredientEl);


            //     cardContentEl.append(recipebtn);
            //     cardContentEl.append(nextButtonEl);
            //     recipeEl.append(cardContentEl);
            //     var forList = response.hits[randomIndex].recipe.ingredients;
            //     console.log(forList);
            //     //     //  list and forloop for ingredients 
            //     for (var i = 0; i < forList.length; i++) {
            //         var ingredientList = $("<li>");
            //         console.log(response.hits[randomIndex].recipe.ingredients[i].text);
            //         ingredientList.text(response.hits[randomIndex].recipe.ingredients[i].text);
            //         ingredientEl.append(ingredientList);
            //         console.log(ingredientList[i]);
            //     };
            //     // on click wil take you to a page with directions
            //     $(document).on('click', '.recipe-button', function () {
            //         window.open(response.hits[randomIndex].recipe.url);
            //     });
            // });
            // var forList = response.hits[randomIndex].recipe.ingredients;
            // console.log(forList);
            // //     //  list and forloop for ingredients 
            // for (var i = 0; i < forList.length; i++) {
            //     var ingredientList = $("<li>");
            //     console.log(response.hits[randomIndex].recipe.ingredients[i].text);
            //     recipeIngre.push(response.hits[randomIndex].recipe.ingredients[i].text);
            //     ingredientList.text(response.hits[randomIndex].recipe.ingredients[i].text);
            //     ingredientEl.append(ingredientList);
            //     //calledIngredientlist = window.localStorage.ingredientList( ,, );
            //     //we need to make a variable in global area "var = calledIngredientlist"
            //     // then we have access to it grab it by using "let page" line 85
            // }
            var shoppingCartList = localStorage.setItem("ingredients", JSON.stringify(recipeIngre));
        });
    };
});


//right column
document.addEventListener('DOMContentLoaded', function () {
    var elems = document.querySelectorAll('.sidenav');
    var instances = M.Sidenav.init(elems, { edge: 'right' });
});
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

// Add geolocate control to the map.
map.addControl(
    new mapboxgl.GeolocateControl({
        positionOptions: {
            enableHighAccuracy: true
        },
        trackUserLocation: true
    })
);

var geocoder = new MapboxGeocoder({
    accessToken: mapboxgl.accessToken,
    mapboxgl: mapboxgl
});
//  places search bar outside of map
document.getElementById('geocoder').appendChild(geocoder.onAdd(map));
