
$(function(){
  var ANIMATION_DURATION = 200;
  var FUDGE = 30;
  
  $('.cards .card article').click(function(){
    
    var $body = $(document.body);
    
    var scrollTop = $body.scrollTop();
    var scrollLeft = $body.scrollLeft();
    
    var $card = $(this).parent();
    var $cardarticle = $card.find('article');
    var $overlaycard = $card.clone().css({opacity: 0});
    var $overlayarticle = $overlaycard.find('article');
    var $zoomcard = $card.clone();

    var $overlay = $('<div class="overlay"></div>')
      .append($overlaycard)
      .appendTo(document.body)
      .css({
        opacity: 0
      })
      .animate({
        opacity: 1
      }, ANIMATION_DURATION);
    
    var $zoom = $('<div class="zoom"></div>')
      .append($zoomcard)
      .appendTo(document.body);

    // Zoom animation.
    $zoomcard
      .offset($cardarticle.offset())
      .width($card.width())
      .height($card.height() - FUDGE)
      .animate({
        top: $overlayarticle.offset().top - scrollTop,
        left: $overlayarticle.offset().left - scrollLeft,
        width: $overlaycard.width(),
        height: $overlaycard.height()
      }, ANIMATION_DURATION, 'swing', function() {
        $zoom.hide();
        $overlaycard.css({
          opacity: 1
        });
      });
    
    function unzoom() {
      $zoom.show();
      $overlaycard.remove();
      $overlay.animate({
        opacity: 0
      }, ANIMATION_DURATION);
      $zoomcard.animate({
        top: $cardarticle.offset().top - scrollTop,
        left: $cardarticle.offset().left - scrollLeft,
        width: $card.width(),
        height: $card.height() - FUDGE
      }, ANIMATION_DURATION, 'swing', function() {
        $overlay.remove();
        $zoom.remove();
        $card.removeClass('activated');
      });
    }
    
    $overlay.click(unzoom);
    
    // Overlay card doesn't invoke unzoom.
    $overlaycard
      .click(function(e){
        e.stopPropagation();
      });
    
    $('<button class="unzoom"><i class="fa fa-arrow-left"></i></button>')
      .appendTo($overlayarticle)
      .click(unzoom);
    
    $card.addClass('activated');
    
  });
  
});