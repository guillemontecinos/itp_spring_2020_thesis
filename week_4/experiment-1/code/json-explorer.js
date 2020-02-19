// $.getJSON("./guillemon24.json", function(json) {
//     console.log(json); // this will show the info it in firebug console
// });


fetch("./guillemon24.json")
  .then(response => response.json())
  .then(json => console.log(json));