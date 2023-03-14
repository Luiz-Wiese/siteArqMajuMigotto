//NAVBAR-----------------------------

$(".navbar-toggler").click(function(){

    $(".collapse").slideToggle();
$(".collapse").addClass("col-md-6")

});

//PUBLICO ALVO----------------------------------

//FAQ----------------------------------
$(".pergunta").click(function(){

    $(this).toggleClass("perg-selec")
    $(".pergunta").not(this).removeClass("perg-selec")


    var resp = $(this).next()
    $(resp).slideToggle()
    $(".resposta").not(resp).slideUp()
    
});