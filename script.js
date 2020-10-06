//check box (left column)
var dietary = [];
var search = '';

//event listener for being checked
$('input[type=checkbox]').change(function(){
  if($(this).is(':checked')) {
    $(this).attr('checked','checked');
    dietary.push($(this).siblings('span').text());
  } 
});

//event listener for being unchecked
$('input[type=checkbox]').change(function(){
  if(!$(this).is(':checked')) {
    $(this).removeAttr('checked','checked');
    var remove = $(this).siblings('span').text();
    dietary.splice( $.inArray(remove, dietary), 1);
  } 
});

//submit button
$('.submitBtn').on('click', function(){
  console.log(dietary);
  dietary = dietary.toString().toLowerCase().replace(/ +/g, '');
  search = dietary.replace(',','&');
  //run main function
  getReciepe();
});
  
//main
console.log(search);
function getReciepe(){
  var app_id = "2d0cdeda";
  var api_key = "5a09930cb72b211827aef4fbbdb035b5";
  queryURL = "https://api.edamam.com/search?q=" + search + "&app_id=" + app_id + "&app_key=" + api_key;
  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response) {
      console.log(response);
      })
};



            

//right column
document.addEventListener('DOMContentLoaded', function() {
  var elems = document.querySelectorAll('.sidenav');
  var instances = M.Sidenav.init(elems, {edge:'right'});
});

// $(document).ready(function () {
            //     $('.sidenav').sidenav();
            // });

