// var options = [
// 	{selector: '#experience', offset: 200, callback: 'addAnimatedClassFadeIn("#experience")' },
// ];
// scrollFire(options);

function addAnimatedClassFadeIn(input) {
	$(input).addClass('animated fadeInRight');
}

$(function() {
	var parentSize = $('.enlarge').parent().width() * .5;
    $('.enlarge').animate({ width: parentSize + '%' }, 1000, 'linear');
});

$(document).ready(function() {
	$('.blockquote-list').click(function(){
		$(this).slideUp();
	});
});

$(document).on('mouseenter','.company', function(){
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