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
    
	function runIntructions() {
		/**	observaciones
		*	usaremos comillas sencillas '' solo para selectores, palabras clave y asignacion de valores, de lo contratrio se usaran comillas dobles "" para todo lo demas mayormente para identificar cadenas, urls y clases y cosas asi;
		*	debes usar constantes en los valores que se repiten y no van a variar a lo largo del programa para no estar escribiendo lo mismo a cada rato, eso mantiene mas ordenado el codigo y lo hace mas seguro;
		*	los selectores jQuery no deben duplicarse, puedes aplicar varias instrucciones a un mismo selector como ej:
			$(selector)
				.instrucion1
				.instruccion2
		si no puedes usar ese metodo agregas el selector a una variable para luego reutilizarlo, las variables con objetos jQuery van presedidas por un $ ej:
			var $miVariable = $(miSelector);
			$miVariable.instruccion1;
		*	cuando una intruccion es muy larga la almacenas en una funcion y luego se lo pasas como callback al evento donde la necesitas ej:
			$(selector).click(miFunc);

			function myFunc() {
				instruccion larga
			}
		donde sea que puedas agregar una funcion anonima tambien puedes enviar una funcion declarada como callback, la idea es minimizar el uso de funciones anonimas y mas si van a estar anidadas
		*	si un objeto no tiene mas de 3 key y cabe horizontalmente aprovecha el espacio horizontal y escribelo asi ej:
			$('.fa-hand-pointer-o').css({'bottom': '40vh', 'right': '40vh'});
		*	por ultimo siempre que vayas a escribir un codigo que se dedique a algo en especifico escribelo en una funcion, eso le permite crear su propio ambito y no tener coliciones con otra pieza de codigo, luego ejecutas la funcion donde lo necesites como lo hice en este caso
		*/

        $('.fa-times').touchend(function () {
            $('.instruccions')
                .removeClass("fadeInLeft")
                .addClass("fadeOutLeft");

            $('#menu-xs').removeClass(FORM_HIDE);
            $('#fp-nav').show();
        });
        
        $('.close-instruccions').touchend(function () {
            setTimeout(function () {
                $('.fa-times').touchend();
            }, 200);
        });

		setTimeout(animation, 2000);

        $('.review-instruccions').touchend(function () {

            $('.container-button').addClass(FORM_HIDE);

            $('.text-indication')
                .html("Desplacese verticalmente para cambiar de área")
                .removeClass("animated fadeOutUp")
                .show();

            $('.animation')
                .removeClass("animated fadeOutUp")
                .show();

            $('.in-move')
                .css({'width': '100%', 'height': '0vh'})
                .removeClass("in-move-left-right");

            $('.fa-hand-pointer-o')
                .css({'bottom': '30vh', 'right': '10vh'})
                .addClass(FORM_HIDE)
                .removeClass("hand-right-left");

            animation();
        });

		$('#fp-nav').hide();

        /*-- create animation --*/
        function animation() {

            $('.fa-hand-pointer-o')
                .removeClass(FORM_HIDE)
                .addClass("hand-down-up");

            setTimeout(function(){
                $('.in-move')
                    .addClass("in-move-up-down");

                setTimeout(function(){
                    $('.fa-hand-pointer-o').css('bottom', '67vh');

                    $('.fa-hand-pointer-o')
                        .removeClass("hand-down-up")
                        .addClass("hand-up-down");

                },4000);
            }, 700);

            setTimeout(function(){
                $('.text-indication').html("Desplacece horizontalmente para moverse dentro de un área");

                $('.text-indication').toggleClass('animated fadeIn');

                $('.fa-hand-pointer-o').css({'bottom': '40vh', 'right': '40vh'});

                $('.fa-hand-pointer-o')
                    .removeClass("hand-up-down")
                    .addClass("hand-left-right");

                setTimeout(function(){
					//esto debes unirlo como en los de arriba
                    $('.in-move').css('width', '0');
                    $('.in-move').css('height', '50vh');
					//---------------------------------

                    $('.in-move')
                        .removeClass("in-move-up-down")
                        .addClass("in-move-left-right");

                    setTimeout(function(){
                        $('.fa-hand-pointer-o').css('right', '10vh');
                        $('.fa-hand-pointer-o')
                            .removeClass("hand-left-right")
                            .addClass("hand-right-left");

                        setTimeout(function(){
                            $('.text-indication')
                                .removeClass("fadeIn")
                                .addClass("fadeOutUp");

                            setTimeout(function(){
                                $('.text-indication').hide();
                                $('.animation').toggleClass("animated fadeOutUp");
                                $('.animation').hide();
                                $('.container-button').removeClass(FORM_HIDE);
                            }, 500)
                        },4000)
                    }, 4000);
                }, 700);
            }, 8500);
        }

	}

	function templateXs(){

		/*-- to execute "intructions" animation --*/
		runIntructions();

		/*-- header nav for move to slide --*/
		$('li', '#menu-xs').click(function () {
			var index = $(this).index() + 2;

			setTimeout(function () { $.fn.fullpage.moveTo(index); }, 200);
		});
        
		/*-- fullpage instance & config --*/
		$(this).fullpage({
			sectionsColor: ['#1e6f63', '#fff', '#FFA042', '#f5f5f5', '#2e3031'],
			scrollingSpeed: 1000,
			navigation: true,
			navigationPosition: 'right',
			continuousVertical: false,
			slidesNavigation: true,
			controlArrows: false,
            onLeave: function (index, nextIndex, direction) {
                if (direction === "down" && $('.instruccions').hasClass("fadeInLeft"))
                	return false;
            }
		});

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
