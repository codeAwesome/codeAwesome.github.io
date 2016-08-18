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

	$('#whoAreWe').load('partials/whoAreWe.tpl.html');

	$('#services').load('partials/services.tpl.html');

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
        
        $(".form-control").keyup(validarInput);

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
                    datatype: "json",
                    done: function(){
						console.log("correo enviado");
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

})(jQuery, window);
