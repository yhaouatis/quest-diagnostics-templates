jQuery.fn.center = function () {
	this.css("position","fixed");
	this.css("top", ( $(window).height() - this.outerHeight() ) / 2 + "px");
	this.css("left", ( $(window).width() - this.outerWidth() ) / 2 + "px");
    return this;
}

jQuery.jwbox = {
	lightbox	:	null,
	player	: null,
	toggle	: function(context) {
		if (!$.jwbox.lightbox) {
				$.jwbox.lightbox = $(".jwbox_hidden", context);
				$.jwbox.center();
				$("#jwbox_background").fadeIn("fast");
				$.jwbox.lightbox.css("display","block")
				$.jwbox.center();
				$("#jwbox_background").fadeTo(0, 0.8);
				$("object", context).each(function(){
					$.jwbox.player = document.getElementById(this.id);
					try{
						
						$.jwbox.player.sendEvent("PLAY");
					}catch (err){}					
				});
		} else if ((context.className == 'jwbox_content')) {
		} else {
			try {
				
				$.jwbox.player.sendEvent("STOP");
				$.jwbox.player = null;
			} catch (err){;
			}
			$.jwbox.lightbox.css("display","none");
			$.jwbox.lightbox = null;
			if(document.getElementById("some_class_name")){
			var currTabElem = document.getElementById("some_class_name"); 
			var previousID = currTabElem.getAttribute("previousID"); 
			currTabElem.setAttribute("id", previousID); 
			}
			$("#jwbox_background").fadeOut("fast");
		}
	},
	center	: function() {
		if ($.jwbox.lightbox) {
			$.jwbox.lightbox.center();
		}
	}
}

$(document).keyup(function(event){
    if (event.keyCode == 27 && $.jwbox.lightbox) {
		$.jwbox.toggle($("#jwbox_background"));
    }
});

$(document).ready(function () {
	$("body").append('<div id="jwbox_background">&nbsp;</div>');
	$(".jwbox").click(function () {$.jwbox.toggle(this); return false;});
	$("#jwbox_background").click(function () {$.jwbox.toggle(this); return false;});
	$(".jwbox_content").click(function () {$.jwbox.toggle(this); return false;});
	$(window).resize(function() {$.jwbox.center();});
});