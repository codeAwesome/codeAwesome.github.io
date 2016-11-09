/** codeamazing.com.ve scripts by codeamazing developers
*	v1.2
*/

(function ($, window) {
	'use strict';

/*----------- global constants -----------*/
	var REGEX_NAME       = /^[a-zA-Z0-9 ñáéíóú]*$/,
		REGEX_MAIL       = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/,
		FORM_CONTROL     = '.form-control',
		BTN_SEND         = '#send',
		MOBILE_TITLE     = '.xs-title',
		MOBILE_BODY      = '.xs-body',
		FORM_XS          = '#contact-form',
		FORM_FOCUSOUT    = "contact-form",
		FORM_FOCUSIN     = "contact-form-focus",
		FORM_HIDE        = "hidden",
		HORIZONTAL_CLASS = "horizontal",
		$htmlBody        = $('html, body');

/*-------------- functions ----------------*/
	/**
	 * move page toward the section selected.
	 * @returns {boolean} false, if don't find the section selected.
	 */
	function slideScrollAnimation() {

		if (location.pathname.replace(/^\//, "") === this.pathname.replace(/^\//, "") &&
			location.hostname === this.hostname) {

			var $target = $(this.hash),
				targetOffset = "";

			$target = ($target.length && $target) || $('[name=' + this.hash.slice(1) + ']');
			if ($target.length) {
				targetOffset = $target.offset().top;
                $('#' + $target[0].id).velocity('scroll', {
                    duration : targetOffset * 0.7
				});
			} else {
                return false;
            }
		}
	}

	/**
	 * activate animation with velocity.js and waypoints.js
	 * @param {string} element - CSS selector for the element to be animated
	 * @param {string} animation - animation name
	 * @param {string} offset - scroll position
	 */
	function animationIn(element, animation, offset) {
        $(element).waypoint(function () {
            $(element).velocity(animation, {duration: 1000});
            //It is destroyed to operate only once
            this.destroy();
        }, {
            offset: offset,
            triggerOnce: true
        });
    }
    
    /**
     * infinite animation using recursion
     * @param {string} animation - animation name
     * @param {object} element - jquery object to which the animation is applied
     * @param {integer} duration - animation duration
     * @param {string} classSwitch - class that allows stop animation, when this is eliminated
     */
    function infiniteAnimation(animation, element, duration, classSwitch) {
        if (element.hasClass(classSwitch) || classSwitch === undefined) {
            element.velocity(animation, {
				duration : duration,
                //when the animation ends, is called again to the same function
				complete : function () {
					infiniteAnimation(animation, element, duration, classSwitch);
				}
			});
        } else {
            // if classSwitch is removed, the animation is stopped
            element.velocity('stop');
        }
    }

	/**
	 * active all animations
	 */
	function activateAnimations() {
		var $backTop  = $('.backTop'),
			NAV_WRAP = 'header .nav-wrap';

        /**
         * animation of button backTop when the lower edge of the header is hidden or is visible
         * @param {string} direction - scroll direction
         */
		$(NAV_WRAP).waypoint(function (direction) {
			if (direction === "down") {
            //if the direction is down, the button backTop is displayed
                $backTop.velocity('transition.slideUpIn');
			} else {
                //if the direction is up, the button backTop is hidden
                $backTop.velocity('transition.slideDownOut');
			}
		}, {
            //returns the position of the lower edge of the header
			offset: function () {
				return -$(NAV_WRAP).height();
			}
		});
        
        /**
         * animation of button backTop when the upper edge of the footer is hidden or is visible
         * @param {string} direction - scroll direction
         */
		$('footer:eq(0)').waypoint(function (direction) {
			if (direction === "down") {
                //if the direction is down, obtains a higher bottom position than footer height
				$backTop.css('bottom', $('footer').outerHeight() + 5);
                $backTop.velocity('transition.slideDownIn');
			} else {
                //if the direction is up, obtains a bottom position equal to 15px
                $backTop.css('bottom', '15px');
				$backTop.velocity('transition.slideDownIn');
			}
		}, {
			offset: '95%'
		});

		/* whoAreWe */
		animationIn('.vision', "transition.slideLeftBigIn", '60%');
		animationIn('.mision', "transition.slideRightBigIn", '60%');
		animationIn('.our-developers h3', "transition.fadeIn", '60%');
		animationIn('.our-developers .img-circle:eq(0)', "transition.whirlIn", '60%');
		animationIn('.our-developers .img-circle:eq(1)', "transition.whirlIn", '60%');
		animationIn('.our-developers .img-description:eq(0)', "transition.flipXIn", '80%');
		animationIn('.our-developers .img-description:eq(1)', "transition.flipXIn", '80%');

		/* services */
		animationIn('.services-title', "transition.bounceLeftIn", '85%');
		animationIn('.services-item:eq(0)', "transition.bounceLeftIn", '40%');
		animationIn('.services-item:eq(1)', "transition.expandIn", '40%');
		animationIn('.services-item:eq(2)', "transition.bounceRightIn", '40%');
		animationIn('#flip-carousel', "fadeIn", '70%');

		/* contactUs */
		animationIn('#contactUs .text-left', "transition.slideUpIn", '75%');
		animationIn('.contact-method:eq(0)', "transition.slideLeftBigIn", '80%');
		animationIn('.contact-method:eq(1)', "transition.slideRightBigIn", '80%');

		//alignImagesSm(window.innerWidth);
	}

	/**
	 * activate tablet styles for contactUS when the viewport width be equivalent to sm.
	 * @param {integer} vw - viewport.width.
	 */
	function activateSmForm(vw) {
		var contactWrapper = '.contact-method',
			pleaceholder = $(FORM_CONTROL, contactWrapper).attr('placeholder'),
			$formElements = $(FORM_CONTROL, contactWrapper);

		if ((vw >= 768 && vw <= 991) && typeof pleaceholder === 'undefined') {

            $formElements.eq(0).attr('placeholder', "Nombre");
            $formElements.eq(1).attr('placeholder', "Correo");
            $formElements.eq(2).attr('placeholder', "Mensaje");

        } else if (vw > 991 && typeof pleaceholder !== 'undefined') {

            $(FORM_CONTROL, contactWrapper).removeAttr('placeholder');
		}
	}

	/**
	 * align vertically the images of services section when the viewport width be equivalent to sm.
	 * @param {integer} vw - viewport.width.
	 */
	function alignImagesSm(vw) {
        console.log("hola");
		var $svItems = $('.services-item');

		if (vw >= 768 && vw <= 991) {
			$.each($svItems, function (k, element) {
				var children = $(element).children(),
					imgHeight = 0,
					containerHeight = 0;

				/*-- asign the height of the child 2 to the child 1 --*/
				children.eq(0).css('height', children.eq(1).height() + 'px');
                
				/*-- align vertically the child 1 --*/
                alignImageVertically(children.eq(0));
			});

        } else if (vw > 991) {
			$.each($svItems, function (k, element) {
				var child = $(element).children(':eq(0)');

				child.css('height', "");
				child.children().css('marginTop', "");
			});
		}
	}
    
    /**
     * align vertically the elements of a container.
     * @param {object} container - father container of the elements to be aligned.
     */
    function alignImageVertically(container) {
        var containerHeight = container.height(),
			imgHeight = container.children().height();
        
        container.children().css('marginTop', ((containerHeight - imgHeight) / 2) + 'px');
    }
    
    /**
     * align vertically the elements children of 'ul.social-list'.
     */
    function alignSocialIcons() {
        $.each($('.social-list').children().children(), function (k, element) {
            alignImageVertically($(element));
        });
    }

	/**
	 * check that all inputs have the class "valid".
	 * @param   {object} form - <form> to test.
	 * @returns {boolean} true if all okay else false.
	 */
	function validateForm(form) {
		var valid = true;

		$(FORM_CONTROL, form).each(function () {
			valid = valid && $(this).hasClass("valid");
		});

		return valid;
	}

	/**
	 * validate the form inputs and asign the class "valid" or "error".
	 * @param   {object} $nodo - the element to test.
	 * @returns {boolean} true if all okay else false.
	 */
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

		if (validateForm(form)) {
			$(BTN_SEND, form).prop('disabled', false);
		}

		return true;
	}

	/**
	 * send the user mail.
	 * @returns {boolean} false, avoid the page reload.
	 */
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
				url: "https://formspree.io/codeamazinginc@gmail.com",
				method: "POST",
				data: {
					message: $elements.eq(2).val(),
					'_replyto': $elements.eq(1).val(),
					name: $elements.eq(0).val(),
					'_subject': "correo de usuario de codeamazing.com.ve"
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

					/*-- reset the form --*/
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

/*--------- template controllers  ----------*/
	/**
	 * mobile controller.
	 */
//	function mobileCtrl() {
//
//	/*---------- header controller ----------*/
//
//	/*--------- services controller ---------*/
//
//	/*--------- contactUS controller --------*/
//
//		/*-- disable 'button#send' --*/
//		$(BTN_SEND, FORM_XS).prop('disabled', true);
//
//		/*-- activate form --*/
//		$(FORM_CONTROL, FORM_XS).focusin(function () {
//			$(FORM_XS)
//				.removeClass(FORM_FOCUSOUT)
//				.addClass(FORM_FOCUSIN)
//				.find('.' + FORM_HIDE)
//					.removeClass(FORM_HIDE);
//
//			$.fn.fullpage.setAllowScrolling(false);
//		});
//
//		/*-- deactivate form --*/
//		$(FORM_CONTROL, FORM_XS).focusout(function () {
//			$(FORM_XS)
//				.removeClass(FORM_FOCUSIN)
//				.addClass(FORM_FOCUSOUT)
//				.find(BTN_SEND)
//					.addClass(FORM_HIDE)
//				.siblings('#back')
//					.addClass(FORM_HIDE);
//
//			$.fn.fullpage.setAllowScrolling(true);
//		});
//
//		/*-- validate form --*/
//		$(FORM_CONTROL, FORM_XS).on('keyup change', validateInput);
//
//		/*-- send form --*/
//		$(BTN_SEND, FORM_XS).touchend(sendEmail);
//	}

	/**
	 * tablet and desktop controller.
	 */
	function tabAndDesktopCtrl() {

		/*-- swiper carousel instance --*/
		var mySwiper =  new Swiper('.swiper-main', {
				autoHeight: true,
				loop: true,
				speed: 800,
				autoplay: 5000,
				paginationClickable: true,
				lazyLoading: true,
				pagination: '.swiper-pagination',
				nextButton: '.swiper-button-next',
				prevButton: '.swiper-button-prev',
				effect: 'coverflow',
				grabCursor: true,
				centeredSlides: true,
				slidesPerView: 'auto',
			}),
			swiperLang  = new Swiper('.swiper-lang-container', {
				loop: true,
				speed: 500,
				autoplay: 1000,
				pagination: '.swiper-pagination',
				mousewheelControl: true,
				effect: 'coverflow',
				grabCursor: true,
				centeredSlides: true,
				slidesPerView: 'auto',
				coverflow: {
					rotate: 50,
					stretch: 0,
					depth: 100,
					modifier: 1,
					slideShadows : false
				}
			});

		$('.swiper-wrapper-main').height($('html').width() * 0.4);

    	/*-- hyphenate the text of all <p> --*/
		$('p').hyphenate('es');
        
        /*-- activate animations after 2s --*/
		setTimeout(activateAnimations, 2000);

		activateSmForm(window.innerWidth);

		alignSocialIcons();

	/*---------- header controller ----------*/

		/*-- remove the focus to the <a> --*/
		$('.nav-pills > li > a').focusin(function () { $(this).blur(); });

		/*-- move page toward the section selected --*/
		$('a[href*="#"]').click(slideScrollAnimation);

	/*------------ button.backTop -----------*/
		$('.backTop').click(function () {
            $htmlBody.velocity('scroll', { offset : 0, duration : $(this).offset().top * 0.7 });
        });
	}

/*---- document ready & window resize ----*/
	$(document).ready(function () {
		var vw = window.innerWidth;

		if (vw >= 768) {
			location.hash = "";
			tabAndDesktopCtrl();
		}

//		centerSlidesNav();
//		createEllipsis(MOBILE_BODY);
		activateSmForm(vw);
		//alignImagesSm(vw);
        alignSocialIcons();
        
        //animation of service "paginas web animadas"
        infiniteAnimation('callout.bounce', $('.services-item:eq(1) img'), 1000);
        
        /*--------- contactUS controller --------*/

		/*-- disable 'button#send' --*/
		$(BTN_SEND).prop('disabled', true);

		/*-- send form --*/
		$(BTN_SEND).click(sendEmail);

		/*-- activate input --*/
		$(FORM_CONTROL).focusin(function () {
			var $this = $(this);

			$this.addClass("active");
			$this.siblings('label').addClass("active");
		});

		/*-- diactivate input --*/
		$(FORM_CONTROL).focusout(function () {
			var $this = $(this);

			if (!$this.val().trim()) {
				$this.removeClass("active");
				$this.siblings('label').removeClass("active");
			}
		});

		/*-- validate input --*/
		$(FORM_CONTROL).on('keyup change', validateInput);
	});

	$(window).resize(function () {
		var vw = window.innerWidth;

		activateSmForm(vw);
		//alignImagesSm(vw);
        alignSocialIcons();
	});

})(jQuery, window);
