
function Confirm(title, msg, $true, $false, $link) { /*change*/
        var $content =  "<div class='dialog-ovelay'>" +
                        "<div class='dialog'>" +
                         //" <h3> " + title + " </h3> " +
                         "<i class='fa fa-close'></i>" +
                     "" +
                     "<div class='dialog-msg'>" +
                         " <p> " + msg + " </p> " +
                     "</div>" +
                     "<footer>" +
                         "<div class='controls'>" +
                         	 " <button class='button button-default cancelAction'>" + $false + "</button> " +
                             " &nbsp;<button class='button button-danger doAction'>" + $true + "</button> " +
                         "</div>" +
                     "</footer>" +
                  "</div>" +
                "</div>";
         $('body').append($content);
      $('.doAction').click(function () {
        window.open($link, "_blank"); /*new*/
        $(this).parents('.dialog-ovelay').fadeOut(500, function () {
          $(this).remove();
        });
      });
$('.cancelAction, .fa-close').click(function () {
        $(this).parents('.dialog-ovelay').fadeOut(500, function () {
          $(this).remove();
        });
      });
      
   }