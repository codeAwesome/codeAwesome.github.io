(function($, window){
    
	/*----- header -----*/

	$('.camera_wrap').camera({
		height: '40%',
		loader: 'pie',
		thumbnails: true
	});

	/* remove the focus to the tags "a" */
	$('.nav-pills > li > a').focus(function(){ $(this).blur(); });

	/* slide scroll href */
	$('a[href*="#"]').click(function() {

		if ( location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'')
			&& location.hostname == this.hostname ) {

			var $target = $(this.hash);

			$target = $target.length && $target || $('[name=' + this.hash.slice(1) +']');

			if ($target.length) {

				var targetOffset = $target.offset().top;

				$('html,body').animate({scrollTop: targetOffset}, 500);

				return false;

			}
		}
	});

	/*----- services -----*/
	$('.flip-img').flipcarousel();

	/*----- contactUS -----*/
	$('#send').prop('disabled', true);

	$('#send').click(enviarEmail);

	$(".form-control").focusin(function(){

		$(this).addClass("active");
		$(this).siblings("label").addClass("active");
	});

	$(".form-control").focusout(function(){

		var input = $(this);

		if( !input.val().trim() ){
			input.removeClass("active");
			input.siblings("label").removeClass("active");
		}
	});

	$(".form-control").on('keyup change', validarInput);

	function enviarEmail(){

		var validate = true;
		var inputs = $("input.form-control, textarea.form-control");

		inputs.each(function(k, nodo){
			validate = validate && validarInput($(nodo));
		});

		if(validate){

			$.ajax({
				url: "https://formspree.io/codeawesomepro@gmail.com",
				method: "POST",
				data: {
					message: $("#message").val(),
					_replyto: $("#correo").val(),
					name: $("#name").val(),
					_subject: "correo de usuario de codeawesome.com.ve"
				},
				dataType: "json",
				beforeSend:function(){
					swal({
						title:"Enviando...",
						text:"Espere mientras se envia su mensaje",
						imageUrl: "../pic/cargando.gif",
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

			$('input, textarea', '.contact-method').val("").removeClass('active valid');
			$('label', '.contact-method').removeClass('active valid');
			$('#send').prop('disabled', true);
		}
	}

	function validarInput(nodo){
		var email = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
		var name = /^[a-zA-Z0-9 ñáéíóú]*$/;
		var nodo = nodo instanceof jQuery ? nodo : $(this);
		var label = nodo.siblings("label");

		nodo.removeClass("error valid");
		label.removeClass("empty invalid valid");

		if( !nodo.val().trim() ){

			nodo.addClass("error");
			label.addClass("empty");
			$('#send').prop('disabled', true);

			return false;

		} else {
			if ( nodo.is(':text') && !name.test(nodo.val()) ){
				nodo.addClass("error");
				label.addClass("empty");

				return false;
			}

			if( nodo.attr("type") == "email" && !email.test(nodo.val()) ){

				nodo.addClass("error");
				label.addClass("invalid");
				$('#send').prop('disabled', true);

				return false;
			}
		}

		nodo.addClass("valid");
		label.addClass("valid");

		if($('#name').hasClass('valid') && $('#correo').hasClass('valid') && $('#message').hasClass('valid') )
			$('#send').prop('disabled', false);

		return true;
	}

	/*----- backTop -----*/
	$('.backTop').click(function(){
		$('html, body').animate({ scrollTop: 0 });
	});

})(jQuery, window);

(function($, window){

	$(document).ready(function(){
		setTimeout(documentReday, 2000);
	});
	
	function documentReday(){
		/* backTop */
		$('header .main-container').waypoint(function(direction){
			if(direction=='down'){
				$('.backTop').removeClass('fadeOutDown');
				$('.backTop').addClass('animated').addClass('fadeInUp');
			} else {
				$('.backTop').removeClass('fadeInUp').removeClass('slideInDown');
				$('.backTop').addClass('animated').addClass('fadeOutDown');
			}
		},{
			offset:function(){
				return -$('header .main-container').height();
			}
		});

		$('footer:eq(0)').waypoint(function(direction){
			if(direction=='down'){
				$('.backTop').css('bottom', $('footer').outerHeight()+5);
                $('.backTop').removeClass('slideInDown').removeClass('fadeInUp');
                $('.backTop').addClass('slideInUp');
			} else {
                $('.backTop').css('bottom', '15px');
				$('.backTop').removeClass('slideInUp');
                $('.backTop').addClass('slideInDown');
			}
		},{
			offset:'95%'
		});

		/* whoAreWe */
		animationIn('.vision', 'slideInLeft', '60%');
		animationIn('.mision', 'slideInRight', '60%');
		animationIn('.our-developers .section-subtitle', 'fadeInDown', '60%');
		animationIn('.our-developers .img-circle:eq(0)', 'flip', '60%');
		animationIn('.our-developers .img-circle:eq(1)', 'flip', '60%');
		animationIn('.our-developers .img-description:eq(0)', 'flipInX', '80%');
		animationIn('.our-developers .img-description:eq(1)', 'flipInX', '80%');

		/* services */
		animationIn('.title-services', 'bounceInLeft', '85%');
		animationIn('.service-item:eq(0)', 'bounceInLeft', '75%');
		animationIn('.service-item:eq(1)', 'zoomInUp', '75%');
		animationIn('.service-item:eq(2)', 'lightSpeedIn', '75%');
		animationIn('#flip-carousel', 'flipInY', '80%');

		/* contactUs */
		animationIn('#contactUs .text-left', 'slideInUp', '75%');
		animationIn('.contact-method:eq(0)', 'rollIn', '80%');
		animationIn('.contact-method:eq(1)', 'rollIn', '80%');
	}
	
	function animationIn(element, animation, offset){
        $(element).waypoint(function(){
            $(element).toggleClass('animated ' + animation);
            this.destroy();
        }, {
            offset: offset,
            triggerOnce: true
        });
    }
	
})(jQuery, window);


/****** fullpage xs format ******/
(function($, window){
	
	$(document).ready(viewXs);
	
	$(window).resize(viewXs);
	
	function viewXs(){
		if( window.innerWidth < 768 && !$('body').attr('class') ){
			
			$('#fullpage').load('../xs.html', function(){
				$(this).fullpage({
					sectionsColor: ['#FFF', '#FFA042', 'whitesmoke'],
					scrollingSpeed: 1000,
					navigation: true,
					navigationPosition: 'right',
				});
			});
			
		} else if( window.innerWidth >= 768 && $('body').attr('class') ) {
			$('#fullpage').children().detach();
			$.fn.fullpage.destroy('all');
			$('body').removeAttr('class');
		} else {
			$.fn.fullpage.reBuild();
		}
	}

})(jQuery, window);
