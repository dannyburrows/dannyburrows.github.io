// var options = [
// 	{selector: '#experience', offset: 100, callback: 'addAnimatedClassFadeIn("#experience")' },
// ];
// scrollFire(options);

function addAnimatedClassFadeIn(input) {
	$(input).addClass('animated fadeInRight');
}

function grow(elm,width) {
    elm.animate({ width: width + '%' }, 1000, 'linear');
};

$(document).ready(function() {
	$('.blockquote-list').click(function(){
		$(this).slideUp();
	});
});

$(document).on('mousedown','.company', function(){
	// alert($(this).siblings().find('.blockquote-list').attr('id'));
	// addAnimatedClassFadeIn($(this).siblings().find('.blockquote-list'));
	var elm = $(this).siblings().find('.blockquote-list')
	elm.height(elm.height()); // corrects jquery's guessing at height and causing a jump
	elm.slideDown();
});

$(document).on('mousedown', '.type-toggle', function(){
	var activates = $("#"+ $(this).attr('data-activates'));
	$('.resumeSection').each(function(){
		if ($(this).attr('id') != activates.attr('id')) {
			$(this).removeClass('fadeIn');
			$(this).addClass('animated fadeOut');
			$(this).delay(800);
			$(this).slideUp();
		}
	});
	activates.slideDown();
	activates.removeClass('fadeOut');
	activates.delay(400);
	activates.addClass('animated fadeIn');
	/* move this out and to another function so i can call each piece individually */
	if (activates.attr('id') == 'skills') {
		$('.skillBar').each(function(){
			$(this).delay(1500);
			var skillPercent = $(this).attr('skill-percent'); // allows partial completion of columns
			grow($(this), skillPercent);
		})
	}
});

function hideAll() {
	$('.contact').fadeOut();
}

(function($){
  $(function(){

    $('.button-collapse').sideNav();
    $('.scrollspy').scrollSpy();
    $('.slider').slider({full_width: true});
  }); // end of document ready
})(jQuery); // end of jQuery name space