/** codeAwesome.com.ve scripts by codeAwesome
*	v1.0
*/

(function ($, window) {
	'use strict';

/*---- global variables & constants ----*/
	var FORM_CONTROL = '.form-control',
		BTN_SEND = '#send',
		REGEX_NAME = /^[a-zA-Z0-9 ñáéíóú]*$/,
		REGEX_MAIL = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/,
		FORM_XS = '#contact-form',
		FORM_FOCUSOUT = "contact-form",
		FORM_FOCUSIN = "contact-form-focus",
		FORM_HIDE = "hidden",
		$htmlBody = $('html, body');

/*---- document ready & window resize ----*/

	$(document).ready(function () {

		setTimeout(activeAnimations, 2000);
		contactUsInSm();
		viewXs();

	});

	$(window).resize(function () {

		contactUsInSm();
		viewXs();

	});
    
/*---------- header controller ----------*/

	/*-- camera instance & config --*/
	$('.camera_wrap').camera({
		height: '40%',
		loader: 'pie',
		thumbnails: true
	});

	/*-- remove the focus to the tags "a" --*/
	$('.nav-pills > li > a').focus(function () { $(this).blur(); });

	/*-- slide scroll to href --*/
	$('a[href*="#"]').click(slideScrollAnimation);


/*--------- services controller ---------*/

	/*-- flipCarousel instance & config --*/
	$('.flip-img').flipcarousel();

/*--------- contactUS controller --------*/

	/*-- disabled #send button --*/
	$(BTN_SEND).prop('disabled', true);

	/* send mail onclick event */
	$(BTN_SEND).click(sendEmail);

	/*-- input animation onfocusIn event --*/
	$(FORM_CONTROL).focusin(function () {
		var $this = $(this);

		$this.addClass("active");
		$this.siblings('label').addClass("active");
	});

	/*-- input animation onfocusOut event --*/
	$(FORM_CONTROL).focusout(function () {
		var $this = $(this);

		if (!$this.val().trim()) {
			$this.removeClass("active");
			$this.siblings('label').removeClass("active");
		}
	});

	/*-- input validation onkeyUp event --*/
	$(FORM_CONTROL).on('keyup change', validateInput);

/*----- button.backTop onclick event -----*/
	$('.backTop').click(function () { $htmlBody.animate({ scrollTop: 0 }); });

/*-------------- functions ---------------*/

	function slideScrollAnimation() {

		if (location.pathname.replace(/^\//, "") === this.pathname.replace(/^\//, "") &&
			location.hostname === this.hostname) {

			var $target = $(this.hash),
				targetOffset = "";

			$target = ($target.length && $target) || $('[name=' + this.hash.slice(1) + ']');

			if ($target.length) {

				targetOffset = $target.offset().top;

				$htmlBody.animate({scrollTop: targetOffset}, 1000);

				return false;
			}
		}
	}

	function animationIn(element, animation, offset) {
        $(element).waypoint(function () {
            $(element).toggleClass("animated " + animation);
            this.destroy();
        }, {
            offset: offset,
            triggerOnce: true
        });
    }

	function activeAnimations() {

		/*-- backTop --*/
		$('header .main-container').waypoint(function (direction) {
			if (direction === "down") {
				$('.backTop').removeClass("fadeOutDown");
				$('.backTop').addClass("animated").addClass("fadeInUp");
			} else {
				$('.backTop').removeClass("fadeInUp").removeClass("slideInDown");
				$('.backTop').addClass("animated").addClass("fadeOutDown");
			}
		}, {
			offset: function () {
				return -$('header .main-container').height();
			}
		});

		$('footer:eq(0)').waypoint(function (direction) {
			if (direction === "down") {
				$('.backTop').css('bottom', $('footer').outerHeight() + 5);
                $('.backTop').removeClass("slideInDown").removeClass("fadeInUp");
                $('.backTop').addClass("slideInUp");
			} else {
                $('.backTop').css('bottom', '15px');
				$('.backTop').removeClass("slideInUp");
                $('.backTop').addClass("slideInDown");
			}
		}, {
			offset: '95%'
		});

		/* whoAreWe */
		animationIn('.vision', "slideInLeft", '60%');
		animationIn('.mision', "slideInRight", '60%');
		animationIn('.our-developers .section-subtitle', "fadeInDown", '60%');
		animationIn('.our-developers .img-circle:eq(0)', "flip", '60%');
		animationIn('.our-developers .img-circle:eq(1)', "flip", '60%');
		animationIn('.our-developers .img-description:eq(0)', "flipInX", '80%');
		animationIn('.our-developers .img-description:eq(1)', "flipInX", '80%');

		/* services */
		animationIn('.title-services', "bounceInLeft", '85%');
		animationIn('.service-item:eq(0)', "bounceInLeft", '75%');
		animationIn('.service-item:eq(1)', "zoomInUp", '75%');
		animationIn('.service-item:eq(2)', "lightSpeedIn", '75%');
		animationIn('#flip-carousel', "flipInY", '80%');

		/* contactUs */
		animationIn('#contactUs .text-left', "slideInUp", '75%');
		animationIn('.contact-method:eq(0)', "rollIn", '80%');
		animationIn('.contact-method:eq(1)', "rollIn", '80%');
	}

	function formValid(form) {
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

		if (formValid(form))
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

		if (valid && formValid(form)) {

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
						text: "Espere mientras se envia su mensaje",
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
	
	function contactUsInSm() {
        if (window.innerWidth >= 768 && window.innerWidth < 992) {
            $('.contact-method .form-control:eq(0)').attr('placeholder', "Nombre");
            $('.contact-method .form-control:eq(1)').attr('placeholder', "Correo");
            $('.contact-method .form-control:eq(2)').attr('placeholder', "Mensaje");
            $('.contact-method ul.contact').addClass("row");
            $('.contact-method ul.contact li').addClass("col-sm-3");
        } else {
            $('.contact-method .form-control').attr('placeholder', "");
            $('.contact-method ul.contact').removeClass("row");
            $('.contact-method ul.contact li').removeClass();
        }
    }
    
	function templateXs(){
		var $form = '#contact-form';
		var $elements = '.form-control';
		var $classes = {
			focusOut: "contact-form",
			focusIn: "contact-form-focus",
			hide: "hidden"
		}
        
        $('.fa-times').touchend(function(){
            $('.instruccions')
                .removeClass('fadeInLeft')
                .addClass('fadeOutLeft');
            $('#menu-xs').removeClass('hidden');
            $('#fp-nav').show();
        });
        
        $('.close-instruccions').touchend(function(){
            setTimeout(function(){
                $('.fa-times').touchend();
            },200);
        })
        
		/*-- fullpage instance & config --*/
		$(this).fullpage({
			sectionsColor: ['#1e6f63', '#fff', '#FFA042', '#f5f5f5', '#2e3031'],
			scrollingSpeed: 1000,
			navigation: true,
			navigationPosition: 'right',
			continuousVertical: false,
			slidesNavigation: true,
			controlArrows: false,
            onLeave: function(index, nextIndex, direction){
                if (direction=='down' && $(".instruccions").hasClass('fadeInLeft')){
                   return false;
                }
            }
		});
        
        $('#fp-nav').hide();

		/*-- flipCarousel instance XS & config --*/
		$('.flip-img').flipcarousel.destroy();
		$('.flip-img-xs').flipcarousel({
			itemsperpage: 1
		});

		/*-- to disabled #send button --*/
		$(BTN_SEND, FORM_XS).prop('disabled', true);

		/*-- to active form --*/
		$(FORM_CONTROL, FORM_XS).focusin(function () {
			$(FORM_XS)
				.removeClass(FORM_FOCUSOUT)
				.addClass(FORM_FOCUSIN)
				.find('.' + FORM_HIDE)
					.removeClass(FORM_HIDE);

			$.fn.fullpage.setAllowScrolling(false);
		});

		/*-- to unactive form --*/
		$(FORM_CONTROL, FORM_XS).focusout(onFocusOut);

		/*-- to validate form --*/
		$(FORM_CONTROL, FORM_XS).on('keyup change', validateInput);

		/*-- send form --*/
		$(BTN_SEND, FORM_XS).touchend(sendEmail);

		/*-- unactive form function --*/
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
        
        /*-- animation of instruccions --*/
        function instruccions(){
            $('.fa-hand-pointer-o')
                .removeClass('hidden')
                .addClass('hand-down-up');
            setTimeout(function(){
                $('.in-move')
                    .addClass('in-move-up-down');
                setTimeout(function(){
                    $('.fa-hand-pointer-o').css('bottom', '67vh');
                    $('.fa-hand-pointer-o')
                        .removeClass('hand-down-up')
                        .addClass('hand-up-down');
                },4000);
            }, 700);
            setTimeout(function(){
                $('.text-indication').html("Desplacece horizontalmente para moverse dentro de un área");
                $('.text-indication').toggleClass('animated fadeIn');
                $('.fa-hand-pointer-o').css({
                    'bottom': '40vh',
                    'right': '40vh'
                });
                $('.fa-hand-pointer-o')
                    .removeClass('hand-up-down')
                    .addClass('hand-left-right'); 
                setTimeout(function(){
                    $('.in-move').css('width', '0');
                    $('.in-move').css('height', '50vh');
                    $('.in-move')
                        .removeClass('in-move-up-down')
                        .addClass('in-move-left-right');
                    setTimeout(function(){
                        $('.fa-hand-pointer-o').css('right', '10vh');
                        $('.fa-hand-pointer-o')
                            .removeClass('hand-left-right')
                            .addClass('hand-right-left');
                        setTimeout(function(){
                            $('.text-indication')
                                .removeClass('fadeIn')
                                .addClass('fadeOutUp');
                            setTimeout(function(){
                                $('.text-indication').hide();
                                $('.animation').toggleClass('animated fadeOutUp');
                                $('.animation').hide();
                                $('.container-button').removeClass('hidden');
                            }, 500)
                        },4000)
                    }, 4000);
                }, 700);
            }, 8500);
        }
        setTimeout(function(){
            instruccions();
        }, 2000);

        $('.review-instruccions').touchend(function(){
            $('.container-button').addClass('hidden');
            $('.text-indication')
                .html("Desplacese verticalmente para cambiar de área")
                .removeClass('animated fadeOutUp')
                .show();
            $('.animation')
                .removeClass('animated fadeOutUp')
                .show();
            $('.in-move')
                .css({
                    'width':'100%',
                    'height':'0vh'
                })
                .removeClass('in-move-left-right');
            $('.fa-hand-pointer-o')
                .css({
                    'bottom':'30vh',
                    'right':'10vh'
                })
                .addClass('hidden')
                .removeClass('hand-right-left');
            instruccions();
        })

		/*-- move to slide --*/
		$('li', '#menu-xs').click(function () {
			var index = $(this).index() + 2;

			setTimeout(function () { $.fn.fullpage.moveTo(index); }, 200);
		});
	}

	function viewXs() {
		if (window.innerWidth < 768 && !$('body').attr('class')) {

			$('#fullpage').load("xs.html", templateXs);

		} else if (window.innerWidth >= 768 && $('body').attr('class')) {
			$('#fullpage').children().detach();
			$.fn.fullpage.destroy("all");
			$('body').removeAttr('class');

			$('.flip-img-xs').flipcarousel.destroy();
			$('.flip-img').flipcarousel();

		} else if (window.innerWidth < 768 && $('body').attr('class')) {
			$.fn.fullpage.reBuild();
		}
	}

})(jQuery, window);
