var search = "chicken";
var app_id = "2d0cdeda";
var api_key = "5a09930cb72b211827aef4fbbdb035b5";
queryURL = "https://api.edamam.com/search?q=" + search + "&app_id=" + app_id + "&app_key=" + api_key;
$.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response) {
      console.log(response);
      })



            // $(document).ready(function () {
            //     $('.sidenav').sidenav();
            // });

