    /**
     * short the text excess of the long paragraphs and create a new slide with the text cutted.
     * @param {object} container - container parent of <p> which determines the maximum high of paragraph.
     */
    function createEllipsis(container) {
        var $container = $(container),
            $text = "",
            containerHeight = 0,
			text = "",
			newText = "",
            regex = new RegExp("[ ]+[.]");

        /**
         * [[Description]]
         * @param   {[[Type]]} $parent [[Description]]
         * @returns {[[Type]]} [[Description]]
         */
        function replaceText($parent) {
			var textHidden = "";

            if ($text.length > 0) {
                //replace any space with a "." for "."
				text = $text.text().replace(regex, ".");

                while ($text[0].scrollHeight > containerHeight) {
                    $text.text(function (index, text) {
                        return text.replace(/\W*\s(\S)*$/, "...");
                    });
                }

				newText = $text.text();

				if (text.length > newText.length) {
					text = text.substring(newText.length - 3);
                    //verify that text[0] start with "." or space
                    if (text[0] === "." || text[0] === " ") {
                        //remove any "." or space that is in the first two letters of text
                        textHidden = text.substring(0, 2).replace(/[. ]/g, "");
                        //verify that textHidden is empty,if so is because the first two letters of text are "." or space
                        if (textHidden.length === 0) {
                            //textHidden is equal to the first two letters of text
                            textHidden = text.substring(0, 2);
                            //text is equal to the same without the first two letters
                            text = text.substring(2);
                        } else {
                            //textHidden is equal to the first letters of text
                            textHidden = text.substring(0, 1);
                            //text is equal to the same without the first letters
                            text = text.substring(1);
                        }
                    }

					$parent.parent().parent().parent().after(
						'<div class="slide">\
							<div class="container">\
								<div class="xs-body">\
									<p class="next-text"> <span class="hidden">' + textHidden + '</span>' + text + '</p>\
								</div>\
							</div>\
						</div>'
					);
				}
            }
        }

		$.each($('.container > .xs-body:first-child'), function (k, element) {
			var content = element.childNodes[1].textContent,
				removeNode = element.parentNode.parentNode.parentNode,
				sibling = removeNode.previousSibling;

			$(removeNode).detach();
			$(sibling).children().children().children('.xs-body').children().text(function (i, text) {
                //replace any space with a "." for "."
				text = text.substr(0, text.length - 3).replace(regex, ".");
				return text + content;
			});
		});

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
