	/**
	 * activate the usage instuctions for mobile devices.
	 */
	function runIntructions() {
		var $nav = $('#fp-nav'),
        	$buttonIgnoreSeccond = $('.button-ingore-instruccions:eq(1)'),
            $description = $('.instruccions h2'),
            $divAnimation = $('.animation'),
            $elementsAnimated = $('.animation, .instruccions h2');

		/** creation of cookie **/
        Cookies.set('instruccions', true);

        $('instruccions').show();
        $nav.hide();
        $('#menu-xs').addClass(FORM_HIDE);

        /** event to close the instructions **/
        $('.close-instruccions, .button-ingore-instruccions:eq(0)').touchend(function () {
            setTimeout(function () {
                $('.instruccions').velocity('transition.fadeOut', {complete : function () {
                    $(this).css('display', 'none');
                }});
                $('#menu-xs').removeClass(FORM_HIDE);
                $nav.show();
                /*-- superslides --*/
		        $('#slides').superslides({'play': 15000});
            }, 200);
        });


        /** change instruction **/
        $buttonIgnoreSeccond.touchend(function () {
            setTimeout(function () {
                if (!$divAnimation.hasClass(HORIZONTAL_CLASS)) {
                    $buttonIgnoreSeccond.html('Anterior');
                    $elementsAnimated
                        .velocity('transition.fadeOut', {complete : function () {
                            $divAnimation.addClass(HORIZONTAL_CLASS);
                            $description.html("Delice horizontalmente para moverse dentro de una sección");
                        }})
                        .velocity('transition.fadeIn');
                } else {
                    $buttonIgnoreSeccond.html('Siguiente');
                    $elementsAnimated
                        .velocity('transition.fadeOut', {complete : function () {
                            $divAnimation.removeClass(HORIZONTAL_CLASS);
                            $description.html("Deslice verticalmente para cambiar de sección");
                        }})
                        .velocity('transition.fadeIn');
                }
            }, 200);
        });
	}
