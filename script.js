

// working on adjusting this section
var apiKey = "&apiKey=d040ece6f23a4172add75ae72ef7d27a";
var RecipeString = [];

  var spoonQueryURL =
    "https://api.spoonacular.com/recipes/findByIngredients?ingredients=" +
    RecipeString + "&number=100" + apiKey;
 
$.ajax({
    url: spoonQueryURL,
    method: "GET",
  }).then(function (response) {
    console.log(response);

    for (i = 0; i < response.length; i++) {
      var newRecipeObject = {
        id: response[i]["id"],
        title: response[i]["title"],
      };
      recipesObject.push(newRecipeObject);
    }
    // Using randomly generated number to form ajax search to get full recipe information
    randomRecipe.push(recipesObject[Math.floor(Math.random() * 100)]);
    var newid = randomRecipe[0]["id"];
    console.log(newid);
    var ingredientsURL =
      "https://api.spoonacular.com/recipes/" +
      newid +
      "/information?includeNutrition=false" +
      $.ajax({
    url: spoonQueryURL,
    method: "GET",
  }).then(function (response) {
    console.log(response);

    for (i = 0; i < response.length; i++) {
      var newRecipeObject = {
        id: response[i]["id"],
        title: response[i]["title"],
      };
      recipesObject.push(newRecipeObject);
    }
    // Using randomly generated number to form ajax search to get full recipe information
    randomRecipe.push(recipesObject[Math.floor(Math.random() * 100)]);
    var newid = randomRecipe[0]["id"];
    console.log(newid);
    var ingredientsURL =
      "https://api.spoonacular.com/recipes/" +
      newid +
      "/information?includeNutrition=false" +
      apiKey;
    $.ajax({
      url: ingredientsURL,
      method: "GET",
    }).then(function (response) {
      console.log(response);
      
    

      var title = $("<h5>").text(response.title);
      var totalMinutes = $("<p>").text(
        "Total Minutes: " + response.readyInMinutes + " minutes"
      );
      var imageEl = $("<img>").attr("src", response.image);
      var servings = $("<p>").text("Servings: " + response.servings);
      var ingredients = $("<div>");

      var ingredientsList = $("<ul>");
      // console.log(response.extendedIngredients[]);
      for (i = 0; i < response.extendedIngredients.length; i++) {
        var insListEl = $("<li>").text(
          response.extendedIngredients[i]["name"] +
            "," +
            " " +
            response.extendedIngredients[i]["amount"] +
            " " +
            response.extendedIngredients[i]["unit"]
        );
        ingredientsList.append(insListEl);
      }
      ingredients.append(ingredientsList);;
    $.ajax({
      url: ingredientsURL,
      method: "GET",
    }).then(function (response) {
      console.log(response);
     
    })

document.addEventListener('DOMContentLoaded', function() {
  var elems = document.querySelectorAll('.sidenav');
  var instances = M.Sidenav.init(elems, {edge:'right'});
});

    var elems = document.querySelectorAll('.sidenav');
    var instances = M.Sidenav.init(elems, options);
  });

  // Or with jQuery

  $(document).ready(function(){
    $('.sidenav').sidenav();
  });

