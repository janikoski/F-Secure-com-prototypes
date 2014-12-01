
$(window).ready(function() {
	/*
	* BACKGROUND IMAGE REPLACEMENT:
	* Replace the background images for all the elements with the .element-bg-image-class. 
	* The new image is taken from the HTML IMG element, so that custom CSS classes are not
	* required when ever a background image is needed.
	*
	*/

	// Loop through all the elements with the .element-bg-image class
	$(".element-bg-image").each(function() {
		// Get the image URL from the IMG element
		var new_image = $(this).attr('src');

		// Set the new background
		$(this).parent().css("background-image",'url('+new_image+')');
		            
		// Hide the original background image
		$(this).hide();
	});


	/*
	* COMPARISON TABLE COLLAPSIBLE ELEMENT
	* Attach the click event function to the header.
	*
	*/
	$(".comparison-header-link").click(function (event) {
		event.preventDefault();

		$header = $(this);
		$content =  $header.next().find(".comparison-content-container");
		$icon = $header.find(".icon");

		$content.slideToggle("fast", function(){

			if( $icon.is(".icon-inverted-plus")){
				$icon.removeClass("icon-inverted-plus");
				$icon.addClass("icon-inverted-minus");
			}else{
				$icon.addClass("icon-inverted-plus");
				$icon.removeClass("icon-inverted-minus");
			}
		});
	});

	$('.play-video').click(function() {
	    playVideo();
	  });

});


// THE VIDEO STUFF

function playVideo() {
  var device = navigator.userAgent.toLowerCase();
  var ios = device.match(/(iphone|ipod|ipad)/);
  if (ios) {
     $(".video-overlay").css({
     '-webkit-transform': 'rotateX(90deg)',
     'height': 0,
     'display': 'block'
     });
     }

  videojs('hero-video').ready(function () {
    var player = this;
/*
    $('#hero-video').css({
      'height': $(window).innerHeight() - 55,
      'margin-top' : '55px'
    }); */

    player.play();
    player.currentTime(0);

    $('.video-overlay .video-close').click(function (e) {
      player.pause();
      //$('.video-overlay').fadeOut();
    if (ios) {
      $('.video-overlay').css({
      '-webkit-transform': 'rotateX(90deg)',
      'height': 0
      });
    }
    
    else {
      $('.video-overlay').fadeOut();
    }
    });
  });

  //$('.hero-video-overlay').fadeIn();
  if (ios) {
    $('.video-overlay').css({
        '-webkit-transform': 'rotateX(0deg)',
        'height': ''
      });
  }
  
  else {
    $('.video-overlay').fadeIn();
  }
}


/*
* STICKY HEADERS FOR COMPARISON PAGE:
* Calculates the top and bottom coordinates of all the .comparison-section classes and compares those with the scroll position.
* If the scroll position is between the top and bottom coordinates, the content of the .comparison-header-row is copied to the 
* #comparison-sticky-navi div, which is fixed to the top of the screen. When the scroll position is either larger than the 
* .comparison-section bottom, or less than .comparison-section top, the sticky navi is hidden.
*/
stickyHeader = function(){
	var displayStickyHeader = false;
	var currentScroll = $(window).scrollTop();
	var tempSectionTop;
	var tempHeaderHeight;
	var tempSectionBottom;
	var tempFontColor;
	var index = 0;

	$(".comparison-section").each(function() {	
		tempContainer = $(this).find(".comparison-content-container");
		tempFontColor = tempContainer.css("color");
		tempSectionTop = $(this).position().top;
		tempHeaderHeight = $(this).find(".comparison-header-row").innerHeight();
		tempSectionBottom = tempSectionTop + $(this).innerHeight() - (tempHeaderHeight * 2);
		console.log(tempSectionTop, tempSectionBottom, currentScroll);
		if(tempContainer.css("display") != "none" && currentScroll > tempSectionTop && currentScroll < tempSectionBottom){
			displayStickyHeader = true;		
			if($("#comparison-sticky-navi").css("display") == "none"){
				$("#comparison-sticky-navi .container .row").html($(this).find(".comparison-header-row").html());
				$("#comparison-sticky-navi .container .row").css("color", tempFontColor);
			}
		}
		index++;
	});
	if(displayStickyHeader == true){
		$("#comparison-sticky-navi").show();
	}else{
		$("#comparison-sticky-navi").hide();
	}
}


window.onscroll = stickyHeader;

