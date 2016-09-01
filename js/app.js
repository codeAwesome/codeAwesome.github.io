(function($, window){

/*---- document ready & window resize ----*/

	$(document).ready(function(){

		setTimeout(activeAnimations, 2000);
		contactUsInSm();
		viewXs();

	});

	$(window).resize(function(){

		contactUsInSm();
		viewXs();

	});
    
/*---------- header controllers ----------*/

	/*-- camera instance & config --*/
	$('.camera_wrap').camera({
		height: '40%',
		loader: 'pie',
		thumbnails: true
	});

	/*-- remove the focus to the tags "a" --*/
	$('.nav-pills > li > a').focus(function(){ $(this).blur(); });

	/*-- slide scroll to href --*/
	$('a[href*="#"]').click(slideScrollAnimation);


/*--------- services controllers ---------*/

	/*-- flipCarousel instance & config --*/
	$('.flip-img').flipcarousel();

/*--------- contactUS controllers --------*/

	/*-- disabled #send button --*/
	$('#send').prop('disabled', true);

	/* send mail onclick event */
	$('#send').click(sendEmail);

	/*-- input animation onfocusIn event --*/
	$('.form-control').focusin(function(){

		$(this).addClass("active");
		$(this).siblings('label').addClass("active");
	});

	/*-- input animation onfocusOut event --*/
	$('.form-control').focusout(function(){

		var input = $(this);

		if( !input.val().trim() ){
			input.removeClass("active");
			input.siblings('label').removeClass("active");
		}
	});

	/*-- input validation onkeyUp event --*/
	$('.form-control').on('keyup change', validateInput);

	/*-- button.backTop onclick event --*/
	$('.backTop').click(function(){ $('html, body').animate({ scrollTop: 0 }); });

/*-------------- functions ---------------*/

	function slideScrollAnimation() {

		if ( location.pathname.replace(/^\//, "") == this.pathname.replace(/^\//, "")
			&& location.hostname == this.hostname ) {

			var $target = $(this.hash);

			$target = $target.length && $target || $('[name=' + this.hash.slice(1) +']');

			if ($target.length) {

				var targetOffset = $target.offset().top;

				$('html, body').animate({scrollTop: targetOffset}, 500);

				return false;

			}
		}
	}

	function animationIn(element, animation, offset){
        $(element).waypoint(function(){
            $(element).toggleClass("animated " + animation);
            this.destroy();
        }, {
            offset: offset,
            triggerOnce: true
        });
    }

	function activeAnimations(){

		/*-- backTop --*/
		$('header .main-container').waypoint(function(direction){
			if(direction == "down"){
				$('.backTop').removeClass("fadeOutDown");
				$('.backTop').addClass("animated").addClass("fadeInUp");
			} else {
				$('.backTop').removeClass("fadeInUp").removeClass("slideInDown");
				$('.backTop').addClass("animated").addClass("fadeOutDown");
			}
		},{
			offset:function(){
				return -$('header .main-container').height();
			}
		});

		$('footer:eq(0)').waypoint(function(direction){
			if(direction == "down"){
				$('.backTop').css('bottom', $('footer').outerHeight()+5);
                $('.backTop').removeClass("slideInDown").removeClass("fadeInUp");
                $('.backTop').addClass("slideInUp");
			} else {
                $('.backTop').css('bottom', '15px');
				$('.backTop').removeClass("slideInUp");
                $('.backTop').addClass("slideInDown");
			}
		},{
			offset:'95%'
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

	function formValid($content){
		var $valid = true;

		$('.form-control', $content).each(function(){
			$valid = $valid && $(this).hasClass("valid");
		})

		return $valid;
	}

	function validateInput(nodo){
		var email = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
		var name = /^[a-zA-Z0-9 ñáéíóú]*$/;
		var nodo = nodo instanceof jQuery ? nodo : $(this);
		var label = nodo.siblings('label');
		var $form = nodo[0].form;

		nodo.removeClass("error valid");
		label.removeClass("empty invalid valid");

		if( !nodo.val().trim() ){

			nodo.addClass("error");
			label.addClass("empty");
			$('#send', $form).prop('disabled', true);

			return false;

		} else {
			if ( nodo.is(':text') && !name.test(nodo.val()) ){
				nodo.addClass("error");
				label.addClass("empty");

				return false;
			}

			if( nodo.attr('type') == "email" && !email.test(nodo.val()) ){

				nodo.addClass("error");
				label.addClass("invalid");
				$('#send', $form).prop('disabled', true);

				return false;
			}
		}

		nodo.addClass("valid");
		label.addClass("valid");

		if( formValid($form) ) $('#send', $form).prop('disabled', false);

		return true;
	}

	function sendEmail(){

		var $valid = true;
		var $form = $(this)[0].form;
		var inputs = $('.form-control', $form);

		inputs.each(function(k, nodo){
			$valid = $valid && validateInput($(nodo));
			$(nodo).blur();
		});

		if( $valid && formValid($form) ){

			$.ajax({
				url: "https://formspree.io/codeawesomepro@gmail.com",
				method: "POST",
				data: {
					message: $("#message", $form).val(),
					_replyto: $("#correo", $form).val(),
					name: $("#name", $form).val(),
					_subject: "correo de usuario de codeawesome.com.ve"
				},
				dataType: "json",
				beforeSend:function(){
					swal({
						title:"Enviando...",
						text:"Espere mientras se envia su mensaje",
						imageUrl: "pic/cargando.gif",
						showConfirmButton: false
					});
				},
				success: function(){
					swal({
						title:"Excelente!",
						text:"Su correo ha sido enviado con éxito, nos esforzaremos por responder en la máxima brevedad posible",
						type: "success",
						timer:7000
					});

					$('.form-control', $form).val("").removeClass('active valid');
					$('label', $form).removeClass('active valid');
					$('#send', $form).prop('disabled', true);
				},
				error: function(){
					swal({
						title:"Error!",
						text:"Algo salió mal, por favor verifique su conexión de internet",
						type:"error",
						timer:7000
					});
				}
			});
		}

		return false;
	}
	
	function contactUsInSm(){
        if(window.innerWidth >= 768 && window.innerWidth < 992){
            $('.contact-method .form-control:eq(0)').attr('placeholder', "Nombre");
            $('.contact-method .form-control:eq(1)').attr('placeholder', "Correo");
            $('.contact-method .form-control:eq(2)').attr('placeholder', "Mensaje");
            $('.contact-method ul.contact').addClass("row");
            $('.contact-method ul.contact li').addClass("col-sm-3");
        }else{
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

		/*-- fullpage instance & config --*/
		$(this).fullpage({
			//
			sectionsColor: ['#1e6f63', '#fff', '#FFA042', '#f5f5f5', '#2e3031'],
			scrollingSpeed: 1000,
			navigation: true,
			navigationPosition: 'right',
			continuousVertical: false,
			slidesNavigation: true,
			controlArrows: false,
		});

		/*-- flipCarousel instance XS & config --*/
		$('.flip-img').flipcarousel.destroy();
		$('.flip-img-xs').flipcarousel({
			itemsperpage: 1,
		});

		/*-- to disabled #send button --*/
		$('#send', $form).prop('disabled', true);

		/*-- to active form --*/
		$($elements , $form).focusin(function(){
			$($form)
				.removeClass($classes.focusOut)
				.addClass($classes.focusIn)
				.find('.hidden')
					.removeClass($classes.hide);

			$.fn.fullpage.setAllowScrolling(false);
		});

		/*-- to unactive form --*/
		$($elements, $form).focusout(onFocusOut);

		/*-- to validate form --*/
		$('.form-control', $form).on('keyup change', validateInput);

		/*-- send form --*/
		$('#send', $form).touchend(sendEmail);

		/*-- unactive form function --*/
		function onFocusOut(){
			$($form)
				.removeClass($classes.focusIn)
				.addClass($classes.focusOut)
				.find('#send')
					.addClass($classes.hide)
				.siblings('#back')
					.addClass($classes.hide);

			$.fn.fullpage.setAllowScrolling(true);

			return false;
		}
	}

	function viewXs(){
		if( window.innerWidth < 768 && !$('body').attr('class') ){

			$('#fullpage').load("xs.html", templateXs);

		} else if( window.innerWidth >= 768 && $('body').attr('class') ) {
			$('#fullpage').children().detach();
			$.fn.fullpage.destroy("all");
			$('body').removeAttr('class');

			$('.flip-img-xs').flipcarousel.destroy();
			$('.flip-img').flipcarousel();

		} else if( window.innerWidth < 768 && $('body').attr('class') ){
			$.fn.fullpage.reBuild();
		}
	}

})(jQuery, window);
