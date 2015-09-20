
$(function(){
  var ANIMATION_DURATION = 200;
  
  $(".cards .card article").click(function(){
    
    var scrollTop = $(document.body).scrollTop();
    var scrollLeft = $(document.body).scrollLeft();
    
    var $card = $(this).parent();
    var $cardarticle = $card.find("article");
    
    var $overlaycard = $card.clone().css({opacity: 0});
    var $overlayarticle = $overlaycard.find("article");
    
    var $overlay = $("<div class='overlay'></div>")
      .append($overlaycard)
      .appendTo(document.body)
      .css({
        opacity: 0
      })
      .animate({
        opacity: 1
      }, ANIMATION_DURATION)
      .click(function(){
        $(this).remove();
        $card.removeClass("activated");
      }); 
    
    var $zoomcard = $card.clone();
    
    var $zoom = $("<div class='zoom'></div>")
      .append($zoomcard)
      .appendTo(document.body);

    $zoomcard
      .offset($cardarticle.offset())
      .width($card.width())
      .height($card.height())
      .animate({
        top: $overlayarticle.offset().top - scrollTop,
        left: $overlayarticle.offset().left - scrollLeft,
        width: $overlaycard.width(),
        height: $overlaycard.height()
      }, ANIMATION_DURATION, "swing", function() {
        console.log("Animation complete");
        $zoom.remove();
        $overlaycard.css({
          opacity: 1
        });
      });
    
    $card.addClass("activated");
    
  });
  
});