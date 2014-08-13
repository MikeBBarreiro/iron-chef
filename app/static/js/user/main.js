(function(){
  'use strict';

  $(document).ready(function(){
    $('form').submit(addRecipe);
    $('.blue').click(hide);
    $('#show').click(show);
  });
  function addRecipe(e){
    console.log('adding new recipe');
    console.log(e);
    var data = $('form').serialize(),
        type = $('form').attr('method'),
        url = $('form').attr('action');


    $.ajax({url:url, type:type, data:data, dataType:'html', success:function(html){
//Allows the recipes to fade in!
      var $recipe = $(html);
      $recipe.css('display', 'none');
      $('#recipes').prepend($recipe);
      $recipe.fadeIn(2000);
    }});
    console.log(data, type, url);

    e.preventDefault();
  }

  function hide(){
    $('form').fadeOut();
  }
  function show(){
    $('form').fadeIn();
  }

})();

