(function(){
  'use strict';

  $(document).ready(function(){
    $('form').submit(addRecipe);
  });
  function addRecipe(e){
    console.log('adding new recipe');
    console.log(e);
    var data = $('form').serialize(),
        type = $('form').attr('method'),
        url = $('form').attr('action');

    $.ajax({url:url, type:type, data:data, dataType:'html', success:function(html){
      $('#recipes').prepend(html);
    }});
    console.log(data, type, url);

    e.preventDefault();
  }

})();

