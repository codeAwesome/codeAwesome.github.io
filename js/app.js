(function($, window){
	
	/*----- loading tamplates into index -----*/
	
	$('header').load('partials/header.tpl.html', function(){
		
		/*----- remove the focus to the tags "a" -----*/
		$('.nav-pills > li > a').focus(function(){
			$(this).blur();
		});
		
	});
	
	$('#whoAreWe').load('partials/whoAreWe.tpl.html');

	$('#services').load('partials/services.tpl.html');

	$('#contactUs').load('partials/contactUs.tpl.html');

	$('footer').load('partials/footer.tpl.html');

	/*----- end loading tamplates into index -----*/

	/*----- document ready function -----*/
	$(function(){
		
		/*----- slide scroll href -----*/
		$('a[href*="#"]').click(function() {

            if($(this).attr("href")=="#envio"){
                enviarEmail();
            }else{

                if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'')
                    && location.hostname == this.hostname) {

                        var $target = $(this.hash);

                        $target = $target.length && $target || $('[name=' + this.hash.slice(1) +']');

                        if ($target.length) {

                            var targetOffset = $target.offset().top;

                            $('html,body').animate({scrollTop: targetOffset}, 500);

                            return false;

                        }
                   }
            }
		});
        
        var enviarEmail=function(){
            validate=true
            inputs=$("input.form-control, textarea.form-control")
            inputs.each(function(key, value){
                validarInput($(value));
            });
            inputs.each(function(key, value){
                //console.log($(value)[0].classList);
                clases=$(value)[0].classList;
                $.each(clases, function(k, v){
                    if(v=="error" || v=="error-email"){
                        validate=false;
                    }
                })
            });
            if(validate){
                console.log("correo")
            }else{
                console.log("no correo")
            }
        }

        var validarEmail=function(email){
            expr = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
            return expr.test(email)
        }
        
        var validarInput=function(object){
            if(object.val().trim()==""){
                object.removeClass("active")
                $(object[0].labels[0]).removeClass("active");
                object.addClass("error")
                $(object[0].labels[0]).addClass("error");
            } else{
                if(object.attr("type")=="email"){
                    if (!validarEmail(object.val())){
                        object.addClass("error")
                        $(object[0].labels[0]).addClass("error-email");
                    }
                }
            }
        }
        
        $(".form-control").focusin(function(){
            $(this).addClass("active")
            $($(this)[0].labels[0]).addClass("active");
            $(this).removeClass("error");
            $($(this)[0].labels[0]).removeClass("error");
            $($(this)[0].labels[0]).removeClass("error-email");
        });
        
        $(".form-control").focusout(function(){
            validarInput($(this));
        });

	});

})(jQuery, window);
