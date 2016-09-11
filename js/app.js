/** codeAwesome.com.ve scripts by codeAwesome
*	v1.0
*/

(function ($, window) {
	'use strict';

/*---- global variables & constants ----*/
	var REGEX_NAME    = /^[a-zA-Z0-9 ñáéíóú]*$/,
		REGEX_MAIL    = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/,
		FORM_CONTROL  = '.form-control',
		BTN_SEND      = '#send',
		MAIN          = '#main-wrapper',
		MOBILE_TITLE  = '.xs-title',
		MOBILE_BODY   = '.xs-body',
		FORM_XS       = '#contact-form',
		FORM_FOCUSOUT = "contact-form",
		FORM_FOCUSIN  = "contact-form-focus",
		FORM_HIDE     = "hidden",
		$htmlBody     = $('html, body');


/*---- document ready & window resize ----*/

	$(document).ready(function () {

		loadingView(window.innerWidth);
		setTimeout(activeAnimations, 2000);
		contactUsInSm();

	});

	$(window).resize(function () {

		loadingView(window.innerWidth);
		contactUsInSm();

	});

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
    
	function runIntructions() {
        /** elements of DOM **/
        var $nav=$('#fp-nav'),
            $containerButton=$('.container-button'),
            $buttonIgnore=$('.button-ingore-instruccions'),
            $inMove=$('.in-move'),
            $firstTextIndication=$('.animation > .description > .text-indication.animated'),
            $firstDescription=$('.animation > .description:eq(0)'),
            $seccondDescription=$('.animation > .description:eq(1)'),
            $divAnimation=$('.animation'),
            $hand=$('i.fa-hand-pointer-o:eq(0)'),
        /** class of animations**/
            MOVE_UP_DOWN="in-move-up-down",
            ANIMATION_TEXT_RIGHT_LEFT="text-right-left",
            ANIMATION_TEXT_RIGHT_LEFT_2="text-right-left-2",
            CATEDBLUE_COLOR="catedblue",
            ANIMATION_HAND_LEFT_RIGHT="hand-left-right",
            ANIMATION_FADE_OUT="fadeOut",
            ANIMATION_FADE_IN="fadeIn",
            ANIMATION_HAND_DOWN_UP="hand-down-up",
            ANIMATION_HAND_UP_DOWN="hand-up-down",
            ANIMATION_HAND_RIGHT_LEFT="hand-right-left"

        $nav.hide();

        /** Evento llamado para cerrar las instrucciones **/
        $('.close-instruccions, .button-ingore-instruccions').touchend(function () {
            setTimeout(function () {
                $('.instruccions').addClass(ANIMATION_FADE_OUT);
                $('#menu-xs').removeClass(FORM_HIDE);
                $nav.show();
            }, 200);
        });

		setTimeout(animation, 3300);


        /** Evento para repetir las instrucciones**/
        $('.review-instruccions').touchend(function () {
            setTimeout(function () {
                /* inicializacion de los elementos a como estaban antes de ejecutarse la animacion*/
                $containerButton.addClass(FORM_HIDE);

                $buttonIgnore.show();

                $inMove
                    .css({'width': '100%', 'height': '0vh'})
                    .removeClass(MOVE_UP_DOWN);

                $firstTextIndication
                    .html("Deslice verticalmente para cambiar de sección")
                    .css('color', 'black');

                $firstDescription.removeClass(ANIMATION_TEXT_RIGHT_LEFT);
                $seccondDescription.removeClass(ANIMATION_TEXT_RIGHT_LEFT_2);

                $divAnimation
                    .removeClass(CATEDBLUE_COLOR)
                    .show();

                $hand
                    .css({'bottom': '40vh', 'right': '10vh'})
                    .addClass(FORM_HIDE)
                    .removeClass(ANIMATION_HAND_LEFT_RIGHT);

                /** se llama nuevamente a la animacion **/
                setTimeout(animation, 3300);
            }, 200);
        });

        /** cambia propiedades del texto q se muestra al inicio de la animacion **/
        function changeTextIndication() {
            $firstTextIndication
                .removeClass(ANIMATION_FADE_OUT)
                .css('color', 'white')
                .html("Sección 1.1");
        }

        /*-- create animation --*/
        function animation() {
            /** muestra el texto inicial con animacion de entrada y salida **/
            $firstTextIndication
                .removeClass(ANIMATION_FADE_IN)
                .addClass(ANIMATION_FADE_OUT);

            /** setTimeout de 1700ms para darle tiempo de que termine la animacion del texto**/
            setTimeout(function () {

                /** cambia propiedades del texto inicial **/
                changeTextIndication();

                /** cambia el background del div .animation**/
                $divAnimation.addClass(CATEDBLUE_COLOR);

                /** activa animacion de la mano de abajo hacia arriba**/
                $hand
                    .removeClass(FORM_HIDE)
                    .addClass(ANIMATION_HAND_DOWN_UP);

                /** setTimeout de 700ms para darle tiempo de que termine la animacion de la mano**/
                setTimeout(function () {

                    /** activa animacion del div .in-move que esta dentro del div .animation:
                        * el div .in-move tiene bottom 0
                        * en la animacion se va aumentando su height hasta que el div padre .animation ya no es visible
                        *una vez que esta en su altura maxima se detiene un momento
                        *luego vuelve a tener de altura 0vh haciendo invisible otra vez y haciendose visible nuevamente su div padre .animation
                    **/
                    $inMove
                        .addClass(MOVE_UP_DOWN);

                    /** setTimeout de 4000ms para darle tiempo de que la animacion del .in-move vaya por la mitad justo cuando .in-move alcanza su altura maxima **/
                    setTimeout(function () {

                        /** activa animacion de la mano de arriba hacia abajo se ejecuta a mitad de animacion .in-move**/
                        $hand
                            .css('bottom', '67vh')
                            .removeClass(ANIMATION_HAND_DOWN_UP)
                            .addClass(ANIMATION_HAND_UP_DOWN);

                        /** setTimeout de 5000ms para darle tiempo de que la animacion del .in-move haya finalizado **/
                        setTimeout(function () {

                            /** cambio de background de .animation pasa de catedblue a white **/
                            $divAnimation.removeClass(CATEDBLUE_COLOR);

                            /** cambio de propiedades del texto inicial y activacion de animacion de entrada **/
                            $firstTextIndication
                                .css('color', 'black')
                                .addClass(ANIMATION_FADE_IN)
                                .html("Deslice horizontalmente para moverse dentro de una sección");

                            /** setTimeout de 2300ms para darle tiempo de que el usuario note la animacion de entrada y lea la indicacion**/
                            setTimeout(function () {

                                /** activacion de animacion de salida para texto inicial **/
                                $firstTextIndication
                                    .removeClass(ANIMATION_FADE_IN)
                                    .addClass(ANIMATION_FADE_OUT);

                                /** setTimeout de 1400ms para darle tiempo de que termine la animacion de salida del texto**/
                                setTimeout(function () {
                                    /** Cambia propiedades del texto inicial**/
                                    changeTextIndication();

                                    /** cambio del background del div .animation pada de blanco a catedblue **/
                                    $divAnimation.addClass(CATEDBLUE_COLOR);

                                    /** activa animacion de movimiento de mano de derecha a izquierda **/
                                    $hand
                                        .css({'bottom': '40vh', 'right': '10vh'})
                                        .removeClass(ANIMATION_HAND_UP_DOWN)
                                        .addClass(ANIMATION_HAND_RIGHT_LEFT);

                                    /** setTimeout de 700ms para darle tiempo de que termine la animacion de la mano**/
                                    setTimeout(function () {

                                        /** activa animacion de los dos div .description:
										*	dentro del div .animation hay dos div .description que son hijos directos, estos div tienen textos de indicaciones.
										*	ambos tienen posicion absoluta para que solo se mostrara uno de ellos, al segundo inicialmente se le asigna un margin-left de 80% puesto que .animation tiene overflow hidden $seccondDescription hasta el momento permanece oculto
										*	$firstDescription que es el primer div .description es el que tiene el texto 'Sección 1.1' y $seccondDescription tiene el texto 'Sección 1.2'
										*	al agregar la clase de animacion a $firstDescription este pasa de estar visible con un margin-left de 0% a estar invisible con un margin-left de -80% desplazandose asi de derecha a izquierda.
										*	al agregar la clase de animacion a $seccondDescription este pasa de estar invisible con un margin-left de 80% a estar visible con un margin-left de 0% desplazandose asi de derecha a izquierda.
										*	ambas animaciones ocurren simultaneamente
										*	una vez que las animaciones van por la mitad ya cuando $firstDescription tiene un margin-left de -80% y $seccondDescription uno de 0% ambos se detienen un momento corto
										*	luego ambos vuelven a sus estados iniciales es decir $firstDescription llega a tener margin-left de 0% y $seccondDescription margin-left de 80% haciendo asi un desplazamiento de izquierda a derecha
                                        */
                                        $firstDescription.addClass(ANIMATION_TEXT_RIGHT_LEFT);
                                        $seccondDescription.addClass(ANIMATION_TEXT_RIGHT_LEFT_2);
                                        /** setTimeout de 4000ms para darle tiempo de que la animacion de los .description vaya por la mitad**/
                                        setTimeout(function () {

                                            /** activa animacion de la mano de izquierda a derecha justo cuando la animacion de los .description va por la mitad es decir cuando $firstDescription tiene un margin-left de -80% y $seccondDescription un margin-left de 0%**/
                                            $hand
                                                .css('right', '40vh')
                                                .removeClass(ANIMATION_HAND_RIGHT_LEFT)
                                                .addClass(ANIMATION_HAND_LEFT_RIGHT);

                                            /** setTimeout de 4000ms para darle tiempo de que la animacion de los .description termine**/
                                            setTimeout(function () {

                                                /** oculta el div .animation **/
                                                $divAnimation.hide();

                                                /** muestra los botones repetir y continuar **/
                                                $containerButton.removeClass(FORM_HIDE);

                                                /** oculta boton de saltar animacion **/
                                                $buttonIgnore.hide();

                                            }, 4000);
                                        }, 4000);
                                    }, 700);
                                }, 1400);
                            }, 2300);
                        }, 5000);
                    }, 4000);
                }, 700);
            }, 1700);
        }
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

				if (text.length > newText.length ) {
					text = text.substring(newText.length-3);
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

/*-------------- templates ---------------*/
	function templateXs() {

		$(MAIN).fullpage();

		$(MOBILE_BODY).find('p').addClass("hyphenate");

		/*-- hyphenate words --*/
		Hyphenator.run();

		/*-- short longe text and replace whit ellipsis --*/
        createEllipsis(MOBILE_BODY);
		$.fn.fullpage.destroy('all');

		/*-- fullpage instance & config --*/
		$(MAIN).fullpage({
			sectionsColor: ['#1e6f63', '#fff', '#FFA042', '#f5f5f5', '#2e3031'],
			scrollingSpeed: 1000,
			navigation: true,
			navigationPosition: 'right',
			continuousVertical: false,
			slidesNavigation: true,
			controlArrows: false,
            onLeave: function (index, nextIndex, direction) {
                if (direction === "down" && !$('.instruccions').hasClass("fadeOut"))
					return false;
            },
			afterLoad: function (k, index) {
				var $nav = $('#fp-nav');

				if (index === 1) $nav.hide();
				else $nav.show();
			}
		});

		/*-- camnera instace xs && config --*/
		$('#camera-xs').camera({height: '40%'});

		/*-- to execute "intructions" animation --*/
        runIntructions();

		/*-- header nav for move to slide --*/
		$('li', '#menu-xs').click(function () {
			var index = $(this).index() + 2;

			setTimeout(function () { $.fn.fullpage.moveTo(index); }, 200);
		});

		/*-- flipCarousel instance XS & config --*/
		$('.flip-img-xs').flipcarousel({itemsperpage: 1});

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

	}

	function templateTabAndDesktop() {
	/*---------- header controller ----------*/

		/*-- camera instance & config --*/
		$('.camera_wrap').camera({
			height: '40%',
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
	}

/*------------- constructor --------------*/
	function loadingView(vw) {
		if (vw < 768 && !$('body').attr('class')) {
			$(MAIN).load("partials/mobile.html", templateXs);
		}

		if (vw < 768 && $('body').attr('class')) {
			$.fn.fullpage.reBuild();
		}

		if (vw >= 768 && !$('body').attr('class')) {
			$(MAIN).load("partials/desktop.html", templateTabAndDesktop);
		}

		if (vw >= 768 && $('body').attr('class')) {
			$(MAIN).html("");
			$.fn.fullpage.destroy("all");
			$('body').removeAttr('class');

			$(MAIN).load("partials/desktop.html", templateTabAndDesktop);

		}

	}

})(jQuery, window);
