// var options = [
// 	{selector: '#experience', offset: 100, callback: 'addAnimatedClassFadeIn("#experience")' },
// ];
// scrollFire(options);

/* materialize inits */

(function($){
  $(function(){

    $('.button-collapse').sideNav();
    $('.scrollspy').scrollSpy();
    $('.slider').slider({full_width: true});
  });
})(jQuery);

/* standard JS functions */

/**
 * Adds the fadeInRight class to animate the element's entrance to the screen
 * @param {[type]} input [description]
 */
function addAnimatedClassFadeIn(input) {
	$(input).addClass('animated fadeInRight');
}

/**
 * Animates element to the specific width over a 1 second period
 * @param  {jQuery Object} elm 
 * @param  {integer} width [Final width of element that must be animated to]
 * @return {None}
 */
function grow(elm,width) {
    elm.animate({ width: width + '%' }, 1000, 'linear');
};

/**
 * Turns element clear
 * @param  {jQuery Object} elm [Element that will have it's opacity set to 0]
 * @return {None}
 */
function resetOpacity(elm) {
	elm.css('opacity', '0.0');
}

/**
 * [Sets a jQuery elements display CSS to the passed in value]
 * @param {jQuery Object} elm [Element that will have it's display CSS modified]
 * @param {string} displayType [String corresponding to CSS options for display: tag]
 */
function setDiplay(elm, displayType) {
	elm.css('display', displayType );
}

/**
 * [zeroOutWidth description]
 * @param  {jQuery Object} elm [Element that will have it's width reduced to 0]
 * @return {None}
 */
function zeroOutWidth(elm) {
	elm.animate({width: '0%'}, 500, 'linear'); //  css('width', '0%');
}

/* jQuery event handlers */

$(document).ready(function() {
	$('.blockquote-list').click(function(){
		$(this).slideUp();
	});
});

$(document).on('mousedown','.externalSite', function(){
	// alert($(this).siblings().find('.blockquote-list').attr('id'));
	// addAnimatedClassFadeIn($(this).siblings().find('.blockquote-list'));
	// var elm = $(this).siblings().find('.blockquote-list')
	// elm.height(elm.height()); // corrects jquery's guessing at height and causing a jump
	// elm.slideDown();
	var activate = '#' + $(this).attr('list-expand');
	if ($(activate).css('display') !== 'none') {
		$(activate).children().each(function() {
			$(this).removeClass('animated fadeInDown');
			$(this).addClass('animated fadeOutUp');
		});
		$(activate).slideUp();
	} else {
		$(activate).slideDown();
		$(activate).children().each(function() {
			$(this).removeClass('animated fadeOutUp')
			$(this).addClass('animated fadeInDown');
		});
	}
});

/**
 * Captures the click event for the 'type-toggle' class. Parses the id that the calling class should act upon. Handles showing and hiding
 * of particular elements
 */
$(document).on('mousedown', '.type-toggle', function(){
	var activates = $("#"+ $(this).attr('data-activates'));
	/* parse by skillBar class and correct if width not set to 0 */
	if (activates.attr('id') != 'skills') {
		$('.skillBar').each(function(){
			if ($(this).width() != 0) {
				zeroOutWidth($(this));
			}
		});
	}

	/*  */
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
		});
	}
});