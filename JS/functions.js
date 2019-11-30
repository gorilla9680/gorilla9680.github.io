$(document).ready(function(){

  $('div.see-more').click(function() {
      $('html,body').animate({
          scrollTop: $("#scroll-here").offset().top},
          700);
  });

});
