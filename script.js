
var cardBodyEl = $(".card-content");

var form = new FormData();
cardBodyEl.form.append("backgroundColor", "#ffffff");
cardBodyEl.form.append("fontColor", "#333333");
cardBodyEl.form.append("source", "spoonacular.com");
cardBodyEl.form.append("backgroundImage", "background1");
cardBodyEl.form.append("image", "The image.");
cardBodyEl.form.append("ingredients", "2 cups of green beans");
cardBodyEl.form.append("instructions", "cook the beans");
cardBodyEl.form.append("mask", "ellipseMask");
cardBodyEl.form.append("readyInMinutes", "60");
cardBodyEl.form.append("servings", "2");
cardBodyEl.form.append("title", "Pork tenderloin with green beans");

var settings = {
	"async": true,
	"crossDomain": true,
	"url": "https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/visualizeRecipe",
	"method": "POST",
	"headers": {
		"x-rapidapi-host": "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com",
		"x-rapidapi-key": "SIGN-UP-FOR-KEY",
		"content-type": "multipart/form-data"
	},
	"processData": false,
	"contentType": false,
	"mimeType": "multipart/form-data",
	"data": form
}

$.ajax(settings).done(function (response) {
	console.log(response);
});

    // for (var i = 0; i < response.list.length; i++) {
    //     if (i % 8 === 0) {
    //         current = response.list[i];
    //         var date = $("<div>");
    //         var body = $("<div class ='card-body'>");
    //         var currentIcon = current.weather[0].icon;
    //         var temp = $("<div>");
    //         var icon = $("<img>");
    //         var humidity = $("<div>");
    //         var forecastDay = $("<div class = 'col'>");
    //         var card = $("<div class = 'card bg-primary text-white'>");

    //         $("#forecast").append(forecastDay);
    //         forecastDay.append(card);
    //         card.append(body);

    //         console.log(current);
    //         body.append(date);
    //         body.append(temp);
    //         temp.text(current.main.temp + " ℉");
    //         body.append(icon);
    //         icon.attr("src", "http://openweathermap.org/img/w/" + currentIcon + ".png");
    //         body.append(humidity);
    //         humidity.text(current.main.humidity + "%");
    //         date.text(moment(current.dt_txt).format("ll"));

    //     }

