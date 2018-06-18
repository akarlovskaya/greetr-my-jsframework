// create a new object without 'new' key word and using shorthand call G$
var g = G$('Samantha', 'Smith');

console.log(g.firstName);

// call methods using chain
g.greet().setLang('es').greet(true);

//error Uncaught Invalid language
// g.setLang('fr').greet(true);

// greeting a User on click
$('#login').click(function(){
    $('#greeting-container').css('display','block');
    g.setLang($('#lang').val()).htmlSelector('#greeting', true);
});
