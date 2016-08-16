(function($, window){
	
	/*----- loading tamplates into index -----*/
	
	$('header').load('partials/header.tpl.html', function(){
		
		/*----- remove the focus to the tags "a" -----*/
		$('.nav-pills > li > a').focus(function(){
			$(this).blur();
		});
		
	});
	
	$('#whoAreWe').load('partials/whoAreWe.tpl.html');

	$('#services').load('partials/services.tpl.html');

	$('#contactUs').load('partials/contactUs.tpl.html');

	$('footer').load('partials/footer.tpl.html');

	/*----- end loading tamplates into index -----*/

	/*----- document ready function -----*/
	$(function(){
		
		/*----- slide scroll href -----*/
		$('a[href*="#"]').click(function() {

			if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'')
				&& location.hostname == this.hostname) {

					var $target = $(this.hash);

					$target = $target.length && $target || $('[name=' + this.hash.slice(1) +']');

					if ($target.length) {

						var targetOffset = $target.offset().top;

						$('html,body').animate({scrollTop: targetOffset}, 500);

						return false;

					}
			   }
		});
	});

})(jQuery, window);
