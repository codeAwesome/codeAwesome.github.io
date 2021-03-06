/** codeamazing.com.ve scripts by codeamazing developers
*	v2.0
*/

(function ($, window) {
	'use strict';

/*----------- global constants -----------*/
	var REGEX_NAME       = /^[a-zA-Z0-9 ñáéíóú]*$/,
		REGEX_MAIL       = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/,
		FORM_CONTROL     = '.form-control',
		HIDE             = "hidden",
		HIDE_CLASS       = "." + HIDE,
		BTN_SEND         = '#send',
		HORIZONTAL_CLASS = "horizontal",
		$htmlBody        = $('html, body'),
        MAIN_SW = new Swiper('.swiper-main', {
            autoHeight: true,
            loop: true,
            speed: 800,
            autoplay: 5000,
            paginationClickable: true,
            lazyLoading: true,
            pagination: '.swiper-pag-main',
            nextButton: '.swiper-button-next',
            prevButton: '.swiper-button-prev',
            effect: 'coverflow',
            grabCursor: true,
            centeredSlides: true,
            slidesPerView: 'auto',
        }),
        SERVICES_SW = new Swiper('.swiper-lang-container', {
            loop: true,
            speed: 500,
            autoplay: 1000,
            mousewheelControl: true,
            effect: 'coverflow',
            grabCursor: true,
            centeredSlides: true,
            slidesPerView: 'auto',
            autoplayDisableOnInteraction: false,
            coverflow: {
                rotate: 50,
                stretch: 0,
                depth: 100,
                modifier: 1,
                slideShadows : false
            },
        });

/*-------------- functions ----------------*/
	/**
	 * move page toward the section selected.
	 * @returns {boolean} false, if don't find the section selected.
	 */
	function slideScrollAnimation() {

		if (location.pathname.replace(/^\//, "") === this.pathname.replace(/^\//, "") &&
			location.hostname === this.hostname) {

			var $target = $(this.hash),
				targetOffset = "",
                headerHeight = 0;

			$target = ($target.length && $target) || $('[name=' + this.hash.slice(1) + ']');
			if ($target.length) {
				targetOffset = $target.offset().top;
                if (window.innerWidth < 768) {
                    headerHeight = 60
                }
                $('html').velocity('scroll', {
                    duration : targetOffset * 0.7, offset: targetOffset - headerHeight
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
                if (window.innerWidth > 767){
                    $(element).velocity(animation, {duration: 1000});
                    //It is destroyed to operate only once
                    this.destroy();
                }
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
    
    /*
     * active animation of btnBackTop
    */
    function animationBtnBackTop() {
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
    }

	/**
	 * active all animations
	 */
	function activateAnimations() {
        
        animationBtnBackTop();

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
	}

	/**
	 * activate tablet styles for contactUS when the viewport width be equivalent to sm.
	 * @param {integer} vw - viewport.width.
	 */
	function tabletCtrl(vw) {
		var contactWrapper = '.contact-method',
			pleaceholder = $(FORM_CONTROL, contactWrapper).attr('placeholder'),
			$formElements = $(FORM_CONTROL, contactWrapper);

		if ((vw >= 768 && vw <= 991) && typeof pleaceholder === 'undefined') {

            $formElements.eq(0).attr('placeholder', "Nombre");
            $formElements.eq(1).attr('placeholder', "Correo");
            $formElements.eq(2).attr('placeholder', "Mensaje");

			$('.vision-img').siblings('blockquote').children(':eq(0)').before($('.vision-img').clone());
			$('.mision-img').siblings('blockquote').children(':eq(0)').before($('.mision-img').clone());
			$('.vision > .vision-img, .mision > .mision-img').hide();

        } else if (vw > 991 && typeof pleaceholder !== 'undefined') {

            $(FORM_CONTROL, contactWrapper).removeAttr('placeholder');
		}

		if ((vw < 768 || vw > 991) && $('.vision-img, .mision-img').is(':hidden')) {
			$('.vision-img, .mision-img').removeAttr('style');
			$('.vision blockquote').children(':eq(0)').detach();
			$('.mision blockquote').children(':eq(0)').detach();
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
	 * @returns {boolean} true if all okay else false.
	 */
	function validateForm() {
		var valid = true;

		$(FORM_CONTROL).each(function () {
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
			value = $nodo.val();

		$nodo.removeClass("error valid");
		$label.removeClass("invalid valid");

		if (!$.trim(value) || ($nodo.is(':text') && !REGEX_NAME.test(value)) ||
			($nodo.attr('type') === "email" && !REGEX_MAIL.test(value))) {

			$nodo.addClass("error");
			$label.addClass("invalid");
			$(BTN_SEND).prop('disabled', true);

			return false;
		}

		$nodo.addClass("valid");
		$label.addClass("valid");

		if (validateForm()) {
			$(BTN_SEND).prop('disabled', false);
		}

		return true;
	}

	/**
	 * send the user mail.
	 * @returns {boolean} false, avoid the page reload.
	 */
	function sendEmail(e) {
		var valid = true,
			$elements = $(FORM_CONTROL);

        e.preventDefault();
        
		$elements.each(function (k, nodo) {
			valid = valid && validateInput($(nodo));
			$(nodo).blur();
		});

		if (valid && validateForm()) {

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
					$('label').removeClass("active valid");
					$(BTN_SEND).prop('disabled', true);
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
	}
    
    /**
    * enable and disable autoplay of swiper
    */
    function enableSwiper(element, swiper) {
        
         /**
         * activation or desactivation of autoplay when the lower edge of .swiper-main is hidden or is visible
         */
		$(element).waypoint(function (direction) {
			if (direction === "down") {
            //if the direction is down, desactivate autoplay
                swiper.stopAutoplay();
			} else {
                //if the direction is up, activate autoplay
                swiper.startAutoplay();
			}
		}, {
            //returns the position of the lower edge of the .swiper-main
			offset: function () {
				return -$(element).height();
			}
		});
        
        $(element).waypoint(function (direction) {
			if (direction === "down") {
            //if the direction is down, desactivate autoplay
                swiper.startAutoplay();
			} else {
                //if the direction is up, activate autoplay
                swiper.stopAutoplay();
			}
		}, {
            //returns the position of the lower edge of the .swiper-main
			offset: function () {
				return 100;
			}
		});
    }

	function createSideNav() {
		if ($('.drag-target').length === 0) {

			//activate side-nav menu.
			$('.button-collapse').sideNav({
				menuWidth: 300,
				edge: 'right',
				closeOnClick: true, // Closes side-nav on <a> clicks, useful for Angular/Meteor
				draggable: true // Choose whether you can drag to open on touch screens
			});

			$('.drag-target').hammer({
			  prevent_default: false
			}).bind('panend', function(e) {
				var $overlay = $('#sidenav-overlay');

				if ($overlay.css('opacity') > 0 && $('.drag-target').width() === 10 ) {
					$overlay.detach();
				}
			});
		}
	}

/*---------------------- template controllers  -----------------------*/
	/**
	 * page controller.
	 */
	function init() {
		var vw = window.innerWidth;
        
        SERVICES_SW.stopAutoplay();
        
        enableSwiper('.swiper-main', MAIN_SW);
        enableSwiper('.swiper-lang-container', SERVICES_SW);
        
        //animation service image "paginas web animadas".
        infiniteAnimation('callout.bounce', $('.services-item:eq(1) img'), 1000);
        
        //activate scripts according to the viewport width.
		if (vw >= 768) {
            //update the height of MAIN_SW. 
            $('.swiper-wrapper-main').height($('html').width() * 0.4);
			
            activateAnimations();
            tabletCtrl(vw);
            
		} else if (vw < 768) {
            /*-------------------------- temporal -------------------------*/
            //update the height of MAIN_SW. 
            $('.swiper-wrapper-main, .swiper-wrapper-main > .swiper-slide')
                .height(document.getElementsByTagName('html')[0].clientHeight - 60);
            /*-------------------------- temporal -------------------------*/

			createSideNav();
        }
        
        $('.swiper-main').mouseover(function(){
            
            if ($(this).children(':hidden').length > 1) {
                $(this).children(':hidden').removeClass(HIDE);
            }
        });
        
        $('.swiper-main').mouseout(function(){
            
            if ($(this).children(':visible').length > 2) {
                $(this).children('.swiper-main-pager').addClass(HIDE);
            }
        });
        
    	//hyphenate the text of all <p>.
		$('p').hyphenate('es');

        alignSocialIcons();
        
		//remove the focus to the <a>.
		$('.nav-pills > li > a').focusin(function () { $(this).blur(); });

		//move page toward the section selected.
		$('.nav-pills > li > a[href*="#"], #slide-out li > a[href*="#"]').click(slideScrollAnimation);

        //.backTop button.
		$('.backTop').click(function () {
            $htmlBody.velocity('scroll', { offset : 0, duration : $(this).offset().top * 0.7 });
        });
        
		//disable 'button#send'.
		$(BTN_SEND).prop('disabled', true);

		//form submit function.
        document.querySelectorAll('form')[0]
            .addEventListener('submit', sendEmail, false);

		//activate focusin styles.
		$(FORM_CONTROL).focusin(function () {
			var $this = $(this);

			$this.addClass("active");
			$this.siblings('label').addClass("active");
		});

		//diactivate focusin styles.
		$(FORM_CONTROL).focusout(function () {
			var $this = $(this);

			if (!$this.val().trim()) {
				$this.removeClass("active");
				$this.siblings('label').removeClass("active");
			}
		});

		//validate input.
		$(FORM_CONTROL).on('keyup change', validateInput);
	}

/*------------------ document ready & window resize ------------------*/

	$(document).ready(function () {
		init();
	});

	$(window).resize(function () {
		var vw = window.innerWidth;
        
		tabletCtrl(vw);
        alignSocialIcons();
		
        if (vw < 768) {
			$('.vision, .mision, .services-item').removeAttr('style');
            
            /*-------------------------- temporal -------------------------*/
            //update the height of MAIN_SW. 
            $('.swiper-wrapper-main, .swiper-wrapper-main > .swiper-slide')
                .height(document.getElementsByTagName('html')[0].clientHeight - 60);
            /*-------------------------- temporal -------------------------*/

			createSideNav();

		} else {
            animationBtnBackTop();
            $('.vision, .mision, .our-developers h3, .our-developers .img-circle, .our-developers .img-description, .services-title, .services-item, #flip-carousel, #contactUs .row:first-child, .contact-method, .backTop').css('opacity', 1);
            
            //update the height of MAIN_SW. 
            $('.swiper-wrapper-main, .swiper-wrapper-main > div').height($('html').width() * 0.4);
		}   
	});

})(jQuery, window);
