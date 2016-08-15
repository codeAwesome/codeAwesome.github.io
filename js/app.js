(function($){
	
	console.log('stoy en app.js');
	
	$('#main-wrapper header').load('partials/header.tpl.html', function(){
		
		$('.nav-pills > li > a').focus(function(){
			$(this).blur();
		});
		
	});
	
	$('#whoAreWe').load('partials/whoAreWe.tpl.html');

	$('#services').load('partials/services.tpl.html');

	$('#contactUs').load('partials/contactUs.tpl.html');

	$('footer').load('partials/footer.tpl.html');

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

})($);
