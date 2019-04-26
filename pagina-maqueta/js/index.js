    
$(function(){
  	
    $('[data-toggle="tooltip"]').tooltip();

  $("a").click(function(event){
      if(this.hash !== "") {
          event.preventDefault();

          var gato = this.hash;

          $("html, body").animate({
              scrollTop: $(gato).offset().top-150
          }, 1500, function(){
              //window.location.hash = gato;
              //Pregunta: ¿Que hace esta linea?
          });
      }
  });


  $('[data-toggle="popover"]').popover();
<<<<<<< HEAD


=======
>>>>>>> d55169b03c081cc9f5c8c818dbd50290dd94d160
});