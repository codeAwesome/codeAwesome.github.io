/** codeAwesome.com.ve scripts by codeAwesome
*	v1.0
*/

(function ($, window) {
	'use strict';

/*----------- global constants -----------*/
	var REGEX_NAME      = /^[a-zA-Z0-9 ñáéíóú]*$/,
		REGEX_MAIL      = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/,
		FORM_CONTROL    = '.form-control',
		BTN_SEND        = '#send',
		MAIN            = '#main-wrapper',
		MOBILE_TITLE    = '.xs-title',
		MOBILE_BODY     = '.xs-body',
		FORM_XS         = '#contact-form',
		FORM_FOCUSOUT   = "contact-form",
		FORM_FOCUSIN    = "contact-form-focus",
		FORM_HIDE       = "hidden",
		URL_DESKTOP     = "partials/desktop.html",
		URL_MOBILE      = "partials/mobile.html",
		FULLPAGE_CONFIG = {
			sectionsColor: ['#1e6f63', '#fff', '#FFA042', '#f5f5f5', '#2e3031'],
			scrollingSpeed: 1000,
			navigation: true,
			navigationPosition: 'right',
			continuousVertical: true,
			slidesNavigation: true,
			controlArrows: false,
			onLeave: function (index, nextIndex, direction) {
				if ($('.instruccions').css('display') != 'none') {
					return false;
				}

				if (index === 1) {
					$('#slides').superslides('stop');
				}

				if (nextIndex === 1) {
					$('#slides').superslides('start');
				}
			},
			afterLoad: function (k, index) {
				var $nav = $('#fp-nav');

				if (index === 1) {
					$nav.hide();
				} else {
					$nav.show();
				}
			},
            onSlideLeave: function(anchorLink, index, slideIndex, direction, nextSlideIndex){
                if(index === 3 && nextSlideIndex === 2){
                    $('.flex-img img:eq(1)').addClass('bounceInfinite');
                    infiniteAnimation('callout.bounce', '.flex-img img:eq(1)', 1000, 'bounceInfinite');
                } else if (index === 3 && slideIndex === 2){
                    $('.flex-img img:eq(1)').removeClass('bounceInfinite');
                }
            }
		},
		$htmlBody = $('html, body'),
		$main     = $(MAIN);

/*---- document ready & window resize ----*/

	$(document).ready(function () {
		/*-- load the template appropriate for the window width --*/
		loadingView(window.innerWidth);
	});

	$(window).resize(function () {
		loadingView(window.innerWidth);
	});

/*-------------- functions ----------------*/
	function slideScrollAnimation() {

		if (location.pathname.replace(/^\//, "") === this.pathname.replace(/^\//, "") &&
			location.hostname === this.hostname) {

			var $target = $(this.hash),
				targetOffset = "";

			$target = ($target.length && $target) || $('[name=' + this.hash.slice(1) + ']');
			if ($target.length) {
				targetOffset = $target.offset().top;
                $('#'+$target[0].id).velocity('scroll', {
                    container : $("body"),
                    duration : targetOffset*1.63});
			} else {
                return false;
            }
		}
	}

	function animationIn(element, animation, offset) {
        $(element).waypoint(function () {
            $(element).velocity(animation, {duration:1000});
            this.destroy();
        }, {
            offset: offset,
            triggerOnce: true
        });
    }
    
    function infiniteAnimation(animation, element, duration, classSwitch) {
        if ($(element).hasClass(classSwitch) || classSwitch == undefined){
            $(element).velocity(animation, {duration : duration, complete : function(){
                infiniteAnimation(animation, element, duration, classSwitch);
            }});
        } else {
            $(element).velocity('stop');
        }
    }

	function activateAnimations() {

		/*-- backTop --*/
		$('header .main-container').waypoint(function (direction) {
			if (direction === "down") {
                $('.backTop').velocity('transition.slideUpIn');
			} else {
                $('.backTop').velocity('transition.slideDownOut');
			}
		}, {
			offset: function () {
				return -$('header .main-container').height();
			}
		});

		$('footer:eq(0)').waypoint(function (direction) {
			if (direction === "down") {
				$('.backTop').css('bottom', $('footer').outerHeight() + 5);
                $('.backTop').velocity('transition.slideDownIn');
			} else {
                $('.backTop').css('bottom', '15px');
				$('.backTop').velocity('transition.slideDownIn');
			}
		}, {
			offset: '95%'
		});

		/* whoAreWe */
		animationIn('.vision', "transition.slideLeftBigIn", '60%');
		animationIn('.mision', "transition.slideRightBigIn", '60%');
		animationIn('.our-developers .section-subtitle', "transition.fadeIn", '60%');
		animationIn('.our-developers .img-circle:eq(0)', "transition.whirlIn", '60%');
		animationIn('.our-developers .img-circle:eq(1)', "transition.whirlIn", '60%');
		animationIn('.our-developers .img-description:eq(0)', "transition.flipXIn", '80%');
		animationIn('.our-developers .img-description:eq(1)', "transition.flipXIn", '80%');

		/* services */
		animationIn('.title-services', "transition.bounceLeftIn", '85%');
		animationIn('.service-item:eq(0)', "transition.bounceLeftIn", '40%');
		animationIn('.service-item:eq(1)', "transition.expandIn", '40%');
		animationIn('.service-item:eq(2)', "transition.bounceRightIn", '40%');
		animationIn('#flip-carousel', "fadeIn", '70%');
        infiniteAnimation('callout.bounce', '.service-item img.second', 1000);

		/* contactUs */
		animationIn('#contactUs .text-left', "transition.slideUpIn", '75%');
		animationIn('.contact-method:eq(0)', "transition.slideLeftBigIn", '80%');
		animationIn('.contact-method:eq(1)', "transition.slideRightBigIn", '80%');
	}

	function activateSmForm(vw) {
		var contactWrapper = '.contact-method',
			pleaceholder = $(FORM_CONTROL, contactWrapper).attr('placeholder');

		if ((vw >= 768 && vw <= 991) && typeof pleaceholder === 'undefined') {

            $(FORM_CONTROL, contactWrapper).eq(0).attr('placeholder', "Nombre");
            $(FORM_CONTROL, contactWrapper).eq(1).attr('placeholder', "Correo");
            $(FORM_CONTROL, contactWrapper).eq(2).attr('placeholder', "Mensaje");
            $('ul.contact', contactWrapper).addClass("row");
            $('ul.contact li', contactWrapper).addClass("col-sm-3");

        } else if (vw > 991 && typeof pleaceholder !== 'undefined') {

            $(FORM_CONTROL, contactWrapper).removeAttr('placeholder');
            $('ul.contact', contactWrapper).removeClass("row");
            $('ul.contact li', contactWrapper).removeClass();

		}
	}

	function validateForm(form) {
		var valid = true;

		$(FORM_CONTROL, form).each(function () {
			valid = valid && $(this).hasClass("valid");
		});

		return valid;
	}

	function validateInput($nodo) {
		$nodo = $nodo instanceof jQuery ? $nodo : $(this);
		var $label = $nodo.siblings('label'),
			form = $nodo[0].form,
			value = $nodo.val();

		$nodo.removeClass("error valid");
		$label.removeClass("invalid valid");

		if (!$.trim(value) || ($nodo.is(':text') && !REGEX_NAME.test(value)) ||
			($nodo.attr('type') === "email" && !REGEX_MAIL.test(value))) {

			$nodo.addClass("error");
			$label.addClass("invalid");
			$(BTN_SEND, form).prop('disabled', true);

			return false;
		}

		$nodo.addClass("valid");
		$label.addClass("valid");

		if (validateForm(form))
			$(BTN_SEND, form).prop('disabled', false);

		return true;
	}

	function sendEmail() {
		var valid = true,
			form = $(this)[0].form,
			$elements = $(FORM_CONTROL, form);

		$elements.each(function (k, nodo) {
			valid = valid && validateInput($(nodo));
			$(nodo).blur();
		});

		if (valid && validateForm(form)) {

			$.ajax({
				url: "https://formspree.io/codeawesomepro@gmail.com",
				method: "POST",
				data: {
					message: $elements.eq(2).val(),
					_replyto: $elements.eq(1).val(),
					name: $elements.eq(0).val(),
					_subject: "correo de usuario de codeawesome.com.ve"
				},
				dataType: "json",
				beforeSend: function () {
					swal({
						title: "Enviando...",
						text: "Espere mientras se envía su mensaje",
						imageUrl: "pic/cargando.gif",
						showConfirmButton: false
					});
				},
				success: function () {
					swal({
						title: "Excelente!",
						text: "Su correo ha sido enviado con éxito, nos esforzaremos por responder en la máxima brevedad posible",
						type: "success",
						timer: 7000
					});

					$elements.val("").removeClass("active valid");
					$('label', form).removeClass("active valid");
					$(BTN_SEND, form).prop('disabled', true);
				},
				error: function () {
					swal({
						title: "Error!",
						text: "Algo salió mal, por favor verifique su conexión de internet",
						type: "error",
						timer: 7000
					});
				}
			});
		}

		return false;
	}

	function runIntructions() {
        /** creation of cookie **/
        Cookies.set('instruccions', true);

        /** elements of DOM **/
        var $nav = $('#fp-nav'),
            $buttonIgnoreSeccond = $('.button-ingore-instruccions:eq(1)'),
            $description = $('.instruccions h2'),
            $divAnimation = $('.animation'),
            $elementsAnimated = $('.animation, .instruccions h2'),
        /** class **/
            HORIZONTAL_CLASS="horizontal"

        $('instruccions').show();
        $nav.hide();
        $('#menu-xs').addClass(FORM_HIDE);

        /** Evento llamado para cerrar las instrucciones **/
        $('.close-instruccions, .button-ingore-instruccions:eq(0)').touchend(function () {
            setTimeout(function () {
                $('.instruccions').velocity('transition.fadeOut', {complete : function() {
                    $(this).css('display', 'none');
                }});
                $('#menu-xs').removeClass(FORM_HIDE);
                $nav.show();
                /*-- superslides --*/
		        $('#slides').superslides({'play': 6000});
            }, 200);
        });
        
        
        /** cambio de instrucciones **/
        $buttonIgnoreSeccond.touchend(function() {
            setTimeout(function() {
                if(!$divAnimation.hasClass(HORIZONTAL_CLASS)) {
                    $buttonIgnoreSeccond.html('Anterior');
                    $elementsAnimated
                        .velocity('transition.fadeOut', {complete : function() {
                            $divAnimation.addClass(HORIZONTAL_CLASS);
                            $description.html("Delice horizontalmente para moverse dentro de una sección");
                        }})
                        .velocity('transition.fadeIn');
                } else {
                    $buttonIgnoreSeccond.html('Siguiente');
                    $elementsAnimated
                        .velocity('transition.fadeOut', {complete : function() {
                            $divAnimation.removeClass(HORIZONTAL_CLASS);
                            $description.html("Deslice verticalmente para cambiar de sección");
                        }})
                        .velocity('transition.fadeIn');
                }
            }, 200);
        });
	}

    function createEllipsis(container) {
        var $container = $(container),
            $text = "",
            containerHeight = 0,
			text = "",
			newText = "";

        function replaceText($parent) {
            if ($text.length > 0) {
				text = $text.text();

                while ($text[0].scrollHeight > containerHeight) {
                    $text.text(function (index, text) {
                        return text.replace(/\W*\s(\S)*$/, "...");
                    });
                }

				newText = $text.text();

				if (text.length > newText.length) {
					text = text.substring(newText.length - 3);
					$parent.parent().parent().after(
						'<div class="slide">\
							<div class="container">\
								<div class="xs-body service-body">\
									<p class="next-text">' + text + '</p>\
								</div>\
							</div>\
						</div>'
					);
				}
            }
        }

        if ($container.length > 1) {
            $container.each(function () {
                var $this = $(this);
                containerHeight = $this.height();
                $text = $this.find("p");

                replaceText($this);
            });

        } else {
            containerHeight = $container.height();
            $text = $container.find("p");

            replaceText($container);
        }

    }

/*--------- Controller templates ----------*/
	function mobileCtrl() {

//		$(window).on("orientationchange", function(event) {
//			console.log(event.orientation)
//		});

		/*-- initialize fullpage --*/
		$(MAIN).fullpage(FULLPAGE_CONFIG);

		/*-- hyphenate the text of all "p" elements into the ".xs-body" elements --*/
        $(MOBILE_BODY).find('p').hyphenate('es');

		/*--  short the text excess of the long paragraphs and create a new slide with the text cutted --*/
		createEllipsis(MOBILE_BODY);

        /*-- destroy fullpage instance --*/
        $.fn.fullpage.destroy('all');

        /*-- crate a new fullpage instance with the new slides --*/
        $(MAIN).fullpage(FULLPAGE_CONFIG);

		/*-- execute intructions --*/
        if (!Cookies.get('instruccions')){
            $('.instruccions').show();
            runIntructions();
        } else {
            $('#slides').superslides({'play': 6000});
        }

		$('#slides').on('swipeleft', function () {
			$('#slides').superslides('stop');
			$('#slides').superslides('animate', 'next');
			$('#slides').superslides('start');
		});

		$('#slides').on('swiperight', function () {
			$('#slides').superslides('stop');
			$('#slides').superslides('animate', 'prev');
			$('#slides').superslides('start');
		});

		/*-- move to slide selected onclick header nav tag --*/
		$('li', '#menu-xs').click(function () {
			var index = $(this).index() + 2;

			setTimeout(function () { $.fn.fullpage.moveTo(index); }, 200);
		});

		/*-- flipCarousel instance & config --*/
		$('.flip-img-xs').flipcarousel({itemsperpage: 1});

		/*-- disable #send button --*/
		$(BTN_SEND, FORM_XS).prop('disabled', true);

		/*-- activate form --*/
		$(FORM_CONTROL, FORM_XS).focusin(function () {
			$(FORM_XS)
				.removeClass(FORM_FOCUSOUT)
				.addClass(FORM_FOCUSIN)
				.find('.' + FORM_HIDE)
					.removeClass(FORM_HIDE);

			$.fn.fullpage.setAllowScrolling(false);
		});

		/*-- deactivate form --*/
		$(FORM_CONTROL, FORM_XS).focusout(onFocusOut);

		/*-- validate form --*/
		$(FORM_CONTROL, FORM_XS).on('keyup change', validateInput);

		/*-- send form --*/
		$(BTN_SEND, FORM_XS).touchend(sendEmail);

		/*-- deactivate form function --*/
		function onFocusOut() {
			$(FORM_XS)
				.removeClass(FORM_FOCUSIN)
				.addClass(FORM_FOCUSOUT)
				.find(BTN_SEND)
					.addClass(FORM_HIDE)
				.siblings('#back')
					.addClass(FORM_HIDE);

			$.fn.fullpage.setAllowScrolling(true);

			return false;
		}

	}

	function tabAndDesktopCtrl() {
        
    /*-- hyphenate the text of all "p" elements --*/
		$('p').hyphenate('es');
        
	/*--------- activate animations ---------*/
		setTimeout(activateAnimations, 2000);

	/*-- activate tablet styles for contactUS --*/
		activateSmForm(window.innerWidth);

	/*---------- header controller ----------*/

		/*-- camera instance & config --*/
		$('.camera_wrap').camera({
			height: '40%',
			thumbnails: true,
            fx: 'simpleFade'
		});

		/*-- remove the focus to the "a" tags --*/
		$('.nav-pills > li > a').focus(function () { $(this).blur(); });

		/*-- slide scroll toward workshop selected --*/
		$('a[href*="#"]').click(slideScrollAnimation);

	/*--------- services controller ---------*/

		/*-- flipCarousel instance & config --*/
		$('.flip-img').flipcarousel();

	/*--------- contactUS controller --------*/

		/*-- disable #send button --*/
		$(BTN_SEND).prop('disabled', true);

		/* send mail onclick event */
		$(BTN_SEND).click(sendEmail);

		/*-- activate input animation onfocusIn event --*/
		$(FORM_CONTROL).focusin(function () {
			var $this = $(this);

			$this.addClass("active");
			$this.siblings('label').addClass("active");
		});

		/*-- activate input animation onfocusOut event --*/
		$(FORM_CONTROL).focusout(function () {
			var $this = $(this);

			if (!$this.val().trim()) {
				$this.removeClass("active");
				$this.siblings('label').removeClass("active");
			}
		});

		/*-- validate inputs onkeyUp event --*/
		$(FORM_CONTROL).on('keyup change', validateInput);

	/*----- button.backTop onclick event -----*/
		$('.backTop').click(function () {
            $htmlBody.velocity('scroll',{ offset : 0, duration : $(this).offset().top*0.97});
        });
	}

/*--------------- builder -----------------*/
	function loadingView(vw) {
		var hasClass = $htmlBody.attr('class');

		/*-- loading mobile template & controller --*/
		if (vw < 768 && !hasClass) {
			$main.load(URL_MOBILE, mobileCtrl);
		}

		/*-- re-build fullpage onWindowResize event --*/
		if (vw < 768 && hasClass) {
			$.fn.fullpage.reBuild();
		}

		/*-- loading tabAndDesktop template & controller --*/
		if (vw >= 768 && !hasClass && !$main.html()) {
			$main.load(URL_DESKTOP, tabAndDesktopCtrl);
		}

		/*-- destroy mobile tamplate and loading tabAndDesktop template onWindowResize event --*/
		if (vw >= 768 && hasClass) {
			$main.html("");
			$.fn.fullpage.destroy("all");
			$htmlBody.removeAttr('style class');
			$main.load(URL_DESKTOP, tabAndDesktopCtrl);
		}

		/*-- activate tablet styles for contactUS --*/
		activateSmForm(vw);
	}

})(jQuery, window);
