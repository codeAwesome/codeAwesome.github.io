(function($, window){
	
	/*----- loading tamplates into index -----*/
	
	$('header').load('partials/header.tpl.html', function(){
		
		/*----- remove the focus to the tags "a" -----*/
		$('.nav-pills > li > a').focus(function(){
			$(this).blur();
		});

		/*----- slide scroll href -----*/
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
	});
	
	$('.orbit').load('partials/orbit.tpl.html', function(){
		$(document).foundation();
	});

	$('#whoAreWe').load('partials/whoAreWe.tpl.html', function(){
        animationIn('.whoAreWe', 'zoomIn', '75%');
        animationIn('.vision', 'slideInLeft', '30%');
        animationIn('.mision', 'slideInRight', '50%');
        animationIn('.our-developers .section-subtitle', 'fadeInDown', '60%');
        animationIn('.our-developers .img-circle:eq(0)', 'flip', '60%');
        animationIn('.our-developers .img-circle:eq(1)', 'flip', '60%');
        animationIn('.our-developers .img-description:eq(0)', 'flipInX', '80%');
        animationIn('.our-developers .img-description:eq(1)', 'flipInX', '80%');
    });

	$('#services').load('partials/services.tpl.html', function(){
		$('.flip-img').flipcarousel();

        animationIn('.title-services', 'bounceInLeft', '85%');
        animationIn('.service-item:eq(0)', 'bounceInLeft', '75%');
        animationIn('.service-item:eq(1)', 'zoomInUp', '75%');
        animationIn('.service-item:eq(2)', 'lightSpeedIn', '75%');
        animationIn('#flip-carousel', 'flipInY', '80%');
	});

	$('#contactUs').load('partials/contactUs.tpl.html', function(){

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

	});

	$('footer').load('partials/footer.tpl.html');

	/*----- end loading tamplates into index -----*/
	
	function animationIn(element, animation, offset){
        $(element).waypoint(function(){
            $(element).toggleClass(animation + ' animated');
            this.destroy();
        }, {
            offset:offset,
            triggerOnce: true
        });
    }

})(jQuery, window);
