/* ----------------------- BEGIN THIRD PARTY PLUGINS ----------------------- */

/*!
 * HTML5 Placeholder jQuery Plugin v1.8.2
 * @link http://github.com/mathiasbynens/Placeholder-jQuery-Plugin
 * @author Mathias Bynens <http://mathiasbynens.be/>
 */
(function(f){var e='placeholder' in document.createElement('input'),a='placeholder' in document.createElement('textarea');if(e&&a){f.fn.placeholder=function(){return this};f.fn.placeholder.input=f.fn.placeholder.textarea=true}else{f.fn.placeholder=function(){return this.filter((e?'textarea':':input')+'[placeholder]').bind('focus.placeholder',b).bind('blur.placeholder',d).trigger('blur.placeholder').end()};f.fn.placeholder.input=e;f.fn.placeholder.textarea=a}function c(h){var g={},i=/^jQuery\d+$/;f.each(h.attributes,function(k,j){if(j.specified&&!i.test(j.name)){g[j.name]=j.value}});return g}function b(){var g=f(this);if(g.val()===g.attr('placeholder')&&g.hasClass('placeholder')){if(g.data('placeholder-password')){g.hide().next().attr('id',g.removeAttr('id').data('placeholder-id')).show().focus()}else{g.val('').removeClass('placeholder')}}}function d(h){var l,k=f(this),g=k,j=this.id;if(k.val()===''){if(k.is(':password')){if(!k.data('placeholder-textinput')){try{l=k.clone().attr({type:'text'})}catch(i){l=f('<input>').attr(f.extend(c(this),{type:'text'}))}l.removeAttr('name').data('placeholder-password',true).data('placeholder-id',j).bind('focus.placeholder',b);k.data('placeholder-textinput',l).data('placeholder-id',j).before(l)}k=k.removeAttr('id').hide().prev().attr('id',j).show()}k.addClass('placeholder').val(k.attr('placeholder'))}else{k.removeClass('placeholder')}}f(function(){f('form').bind('submit.placeholder',function(){var g=f('.placeholder',this).each(b);setTimeout(function(){g.each(d)},10)})});f(window).bind('unload.placeholder',function(){f('.placeholder').val('')})}(jQuery));

/**
* hoverIntent r5 // 2007.03.27 // jQuery 1.1.2+
* <http://cherne.net/brian/resources/jquery.hoverIntent.html>
* 
* @param  f  onMouseOver function || An object with configuration options
* @param  g  onMouseOut function  || Nothing (use configuration options object)
* @author    Brian Cherne <brian@cherne.net>
*/
(function($){$.fn.hoverIntent=function(f,g){var cfg={sensitivity:7,interval:100,timeout:0};cfg=$.extend(cfg,g?{over:f,out:g}:f);var cX,cY,pX,pY;var track=function(ev){cX=ev.pageX;cY=ev.pageY;};var compare=function(ev,ob){ob.hoverIntent_t=clearTimeout(ob.hoverIntent_t);if((Math.abs(pX-cX)+Math.abs(pY-cY))<cfg.sensitivity){$(ob).unbind("mousemove",track);ob.hoverIntent_s=1;return cfg.over.apply(ob,[ev]);}else{pX=cX;pY=cY;ob.hoverIntent_t=setTimeout(function(){compare(ev,ob);},cfg.interval);}};var delay=function(ev,ob){ob.hoverIntent_t=clearTimeout(ob.hoverIntent_t);ob.hoverIntent_s=0;return cfg.out.apply(ob,[ev]);};var handleHover=function(e){var p=(e.type=="mouseover"?e.fromElement:e.toElement)||e.relatedTarget;while(p&&p!=this){try{p=p.parentNode;}catch(e){p=this;}}if(p==this){return false;}var ev=jQuery.extend({},e);var ob=this;if(ob.hoverIntent_t){ob.hoverIntent_t=clearTimeout(ob.hoverIntent_t);}if(e.type=="mouseover"){pX=ev.pageX;pY=ev.pageY;$(ob).bind("mousemove",track);if(ob.hoverIntent_s!=1){ob.hoverIntent_t=setTimeout(function(){compare(ev,ob);},cfg.interval);}}else{$(ob).unbind("mousemove",track);if(ob.hoverIntent_s==1){ob.hoverIntent_t=setTimeout(function(){delay(ev,ob);},cfg.timeout);}}};return this.mouseover(handleHover).mouseout(handleHover);};})(jQuery);



/*
 * Superfish v1.4.8 - jQuery menu widget
 * Copyright (c) 2008 Joel Birch
 *
 * Dual licensed under the MIT and GPL licenses:
 * 	http://www.opensource.org/licenses/mit-license.php
 * 	http://www.gnu.org/licenses/gpl.html
 *
 * CHANGELOG: http://users.tpg.com.au/j_birch/plugins/superfish/changelog.txt
 */
/* *** DP EDIT superfish code looks for nested uls, selectors changed to find divs, class added to menu wrapping element when menu is active *** */

var $nav_main = $('#nav-main');

;(function($){
	$.fn.superfish = function(op){

		var sf = $.fn.superfish,
			c = sf.c,
			$arrow = $(['<span class="',c.arrowClass,'"> &#187;</span>'].join('')),
			over = function(){
				var $$ = $(this), menu = getMenu($$);
				clearTimeout(menu.sfTimer);
				$$.showSuperfishUl().siblings().hideSuperfishUl();
				/* *** BEGIN DP EDIT *** */
				$nav_main.addClass('is-open');
				/* *** END DP EDIT *** */
			},
			out = function(){
				var $$ = $(this), menu = getMenu($$), o = sf.op;
				clearTimeout(menu.sfTimer);
				menu.sfTimer=setTimeout(function(){
					o.retainPath=($.inArray($$[0],o.$path)>-1);
					$$.hideSuperfishUl();
					if (o.$path.length && $$.parents(['li.',o.hoverClass].join('')).length<1){over.call(o.$path);}
					/* *** BEGIN DP EDIT *** */
					$nav_main.removeClass('is-open');
					/* *** END DP EDIT *** */
				},o.delay);	
			},
			getMenu = function($menu){
				var menu = $menu.parents(['ul.',c.menuClass,':first'].join(''))[0];
				sf.op = sf.o[menu.serial];
				return menu;
			},
			addArrow = function($a){ $a.addClass(c.anchorClass).append($arrow.clone()); };
			
		return this.each(function() {
			var s = this.serial = sf.o.length;
			var o = $.extend({},sf.defaults,op);
			o.$path = $('li.'+o.pathClass,this).slice(0,o.pathLevels).each(function(){
				
				/* *** BEGIN DP EDIT *** */
				// $(this).addClass([o.hoverClass,c.bcClass].join(' '))
				// 	.filter('li:has(ul)').removeClass(o.pathClass);
				$(this).addClass([o.hoverClass,c.bcClass].join(' '))
					.filter('li:has(div.menu)').removeClass(o.pathClass);
				/* *** END DP EDIT *** */
				
			});
			sf.o[s] = sf.op = o;
			
			/* *** BEGIN DP EDIT *** */
			// $('li:has(ul)',this)[($.fn.hoverIntent && !o.disableHI) ? 'hoverIntent' : 'hover'](over,out).each(function() {
			// 	if (o.autoArrows) addArrow( $('>a:first-child',this) );
			// })
			// .not('.'+c.bcClass)
			// 	.hideSuperfishUl();
			$('li:has(div.menu)',this)[($.fn.hoverIntent && !o.disableHI) ? 'hoverIntent' : 'hover'](over,out).each(function() {
				if (o.autoArrows) addArrow( $('>a:first-child',this) );
			})
			.not('.'+c.bcClass)
				.hideSuperfishUl();			
			/* *** END DP EDIT *** */
					
			var $a = $('a',this);
			$a.each(function(i){
				var $li = $a.eq(i).parents('li');
				$a.eq(i).focus(function(){over.call($li);}).blur(function(){out.call($li);});
			});
			o.onInit.call(this);
			
		}).each(function() {
			var menuClasses = [c.menuClass];
			if (sf.op.dropShadows  && !($.browser.msie && $.browser.version < 7)) menuClasses.push(c.shadowClass);
			$(this).addClass(menuClasses.join(' '));
		});
	};

	var sf = $.fn.superfish;
	sf.o = [];
	sf.op = {};
	sf.IE7fix = function(){
		var o = sf.op;
		if ($.browser.msie && $.browser.version > 6 && o.dropShadows && o.animation.opacity!=undefined)
			this.toggleClass(sf.c.shadowClass+'-off');
		};
	sf.c = {
		bcClass     : 'sf-breadcrumb',
		menuClass   : 'sf-js-enabled',
		anchorClass : 'sf-with-ul',
		arrowClass  : 'sf-sub-indicator',
		shadowClass : 'sf-shadow'
	};
	sf.defaults = {
		hoverClass	: 'sfHover',
		pathClass	: 'overideThisToUse',
		pathLevels	: 1,
		delay		: 800,
		animation	: {opacity:'show'},
		speed		: 'normal',
		autoArrows	: false,
		dropShadows : false,
		disableHI	: false,		// true disables hoverIntent detection
		onInit		: function(){}, // callback functions
		onBeforeShow: function(){},
		onShow		: function(){},
		onHide		: function(){}
	};
	$.fn.extend({
		hideSuperfishUl : function(){
			var o = sf.op,
				not = (o.retainPath===true) ? o.$path : '';
			o.retainPath = false;
			
			/* *** BEGIN DP EDIT *** */
			// var $ul = $(['li.',o.hoverClass].join(''),this).add(this).not(not).removeClass(o.hoverClass)
			// 		.find('>ul').hide().css('visibility','hidden');
			var $ul = $(['li.',o.hoverClass].join(''),this).add(this).not(not).removeClass(o.hoverClass)
					.find('>div').hide().css('visibility','hidden');
			/* *** END DP EDIT *** */
					
			o.onHide.call($ul);
			return this;
		},
		showSuperfishUl : function(){
			var o = sf.op,
				sh = sf.c.shadowClass+'-off',
				
				/* *** BEGIN DP EDIT *** */
				// $ul = this.addClass(o.hoverClass)
				// 	.find('>ul:hidden').css('visibility','visible');
				$ul = this.addClass(o.hoverClass)
					.find('>div:hidden').css('visibility','visible');
				/* *** END DP EDIT *** */
					
			sf.IE7fix.call($ul);
			o.onBeforeShow.call($ul);
			$ul.animate(o.animation,o.speed,function(){ sf.IE7fix.call($ul); o.onShow.call($ul); });
			return this;
		}
	});
})(jQuery);

/* ----------------------- END THIRD PARTY PLUGINS ----------------------- */



/* ----------------------- BEGIN DP SLIDER PLUGIN (CAROUSELS) ----------------------- */
(function($){
	$.fn.slider = function(options) {
		/* default settings for sliders */
		var defaults = {
			anim: 'fade',/* animation type */
			delay: 0,/* delay before transitioning in the new slide */
			fade: 500,/* duration of fade in and fade out */
			hold: 5000/* "hold" time (how long a slide stays on screen before autoplaying to the next slide) */
		};
		
		return this.each(function() {
			var $this = $(this);
			if ($this.find('.slides > li').length <= 1) {
				/*no need to do anything if not enough slides*/
				return;
			}
			
			var settings = $.extend({}, defaults, options);/* merge the defaults and any passed options into settings (without overriding the defaults) */
			settings.anim = $this.data('anim') || settings.anim;/* override the settings with the slider's data-anim attribute */
			if (settings.anim === 'fade') {
				/* initial setup css for fade animation */
				$this.find('.slides > li').hide();/* hide all slides */
				$this.find('.slides > li.active').show();/* show the current slide */
				$this.find('.slides .slidetext, .slides .slidebg').css({
					/* show all slidetext/bg (even though they are shown, they'll be covered up due to z-index)*/
					'display':'block',
					'height':'auto',
					'width':'auto'
				});
			}
			$this.bind('slider:slideIt', function(e, curr, next) {
				curr = $(curr);
				next = $(next);
				/* grab the current text/bg image and the new text/bg image*/
				var curr_text = curr.find('.slidetext');
				var curr_img = curr.find('.slidebg');
				var next_text = next.find('.slidetext');
				var next_img = next.find('.slidebg');
				if (settings.anim === 'fade') {
					/* fade out the old slide, fade in the new */
					curr.css({'z-index':'1'}).fadeOut(settings.fade);
					next.css({'z-index':'2'}).delay(settings.delay).fadeIn(settings.fade,function(){
						/* move active class from current slide to new */
						curr.removeClass('active');
						next.addClass('active');
						$this.trigger('slider:autoplay');/* autoplay to the next slide when everything is done (autoplay function will determine if user has/hasn't interacted with the slider) */
					});
				} else if (settings.anim === 'slide') {
					/* slide the new slide into view */
					var idx = next.index();
					curr.parent().animate({'margin-left':(-705*idx) + 'px'},settings.fade,function(){
						/* move active class from current slide to new */
						curr.removeClass('active');
						next.addClass('active');
						$this.trigger('slider:autoplay');/* autoplay to the next slide when everything is done (autoplay function will determine if user has/hasn't interacted with the slider) */
					});
				}
				/* move the active class from the old dot to the new */
				$this.find('.slidernav li.active').removeClass('active');
				var idx = next.index();/* grab the index of the new slide */
				$this.find('.slidernav li:eq(' + idx + ')').addClass('active');/* mark the slidernav link that corresponds (same index as slide) to the new slide as current */
				
			});
			
			$this.delegate('.slidernext, .sliderprev','click',function(e){
				e.preventDefault();
				$this.trigger('slider:stopAutoplay');/* stop the autoplay when the user clicks a next/prev arrow */
				/* user clicks next/prev arrows (find the current slide, and show the next (or first if at end) or the prev (or last if at beginning) slide */
				var curr = $this.find('.slides .active');/* grab the current slide */
				var next;
				if ($(this).hasClass('slidernext')) {
					/* if next, grab next (or first) */
					next = curr.next();
					if (!next.length) {
						next = $this.find('.slides > li:first');
					}
				} else {
					/* if prev, grab prev (or last) */
					next = curr.prev();
					if (!next.length) {
						next = $this.find('.slides > li:last');
					}
				}
				$this.trigger('slider:slideIt',[curr, next]);/* show the new slide */
			});
			
			$this.delegate('.slidernav a','click',function(e){
				e.preventDefault();
				$this.trigger('slider:stopAutoplay');/* stop the autoplay when the user clicks a next/prev arrow */
				/* user clicks slidernav link (dots, etc) - find the associated slide and show it */
				var li = $(this).parent();
				if (!li.hasClass('active')) {/* don't do anything if the slide is already active */
					var idx = li.index();/* get the index of the clicked dot */
					var curr = $this.find('.slides .active');/* grab the current slide */
					var next = $this.find('.slides > li:eq(' + idx + ')');/* grab the slide at the same index as the clicked dot */
					$this.trigger('slider:slideIt',[curr, next]);/* show the new slide */
				}
			});
			
			if ($this.index('.slider') === 0) {/* if more than one instance on page, only autoplay the first */
				$this.bind('slider:stopAutoplay',function() {
					/* clear the autoplay timeout */
					var autoplay_to = $this.data('slider:autoplay_to');
					clearTimeout(autoplay_to);
					autoplay_to = null;
					$this.data('slider:autoplay_to',autoplay_to);
				});
				
				$this.bind('slider:autoplay',function() {
					var autoplay_to = $this.data('slider:autoplay_to');
					if (autoplay_to) {
						var curr = $this.find('.slides .active');/* grab the current slide */
						next = curr.next();/* get the next slide (or the first if the current is the last) */
						if (!next.length) {
							next = $this.find('.slides > li:first');
						}
						var hold = curr.data('hold') || settings.hold;/* if the slide has a data-hold attribute, use that to override the default hold time */
						autoplay_to = setTimeout(function(){
							/* show the new slide (after a delay - based on "hold" time) */
							$this.trigger('slider:slideIt',[curr, next]);/* show the new slide */
						}, hold);
					}
					$this.data('slider:autoplay_to',autoplay_to);
				});
				
				$this.data('slider:autoplay_to',true);/* autoplay timeout (normal holds the actual timeout object, but we set it to true so the first run works)*/
				$this.trigger('slider:autoplay');/* trigger the first autoplay */
			}
		});
	};
})(jQuery);
/* ----------------------- END DP SLIDER PLUGIN (CAROUSELS) ----------------------- */

/* ----------------------- BEGIN DP OPEN/CLOSE PLUGIN ----------------------- */
(function($){
	$.fn.openClose = function(child, force) {
		return this.each(function() {
			if (force === 'open') {
				$(this).closest('li').addClass('open').find(child).slideDown();
			} else if (force === 'close') {
				$(this).closest('li').removeClass('open').find(child).slideUp();
			} else {
				$(this).closest('li').toggleClass('open').find(child).slideToggle();
			}
		});
	};
})(jQuery);
/* ----------------------- END DP OPEN/CLOSE PLUGIN ----------------------- */

/* ----------------------- BEGIN DP SCROLL INTO VIEW PLUGIN ----------------------- */

// script for Take Action expandable items:

  function changePlusMinus(x)
  {
    if (x.className == 'plus') {
    	setTimeout(function(){x.className=(x.className=="actions_plus")?"actions_minus":(x.className=="actions_minus")?"actions_plus":"actions_minus";});
	}
	else {
    	setTimeout(function(){x.className=(x.className=="actions_plus")?"actions_minus":(x.className=="actions_minus")?"actions_plus":"actions_minus";},400);
	}
  }
  
  /* slide open/close the action menu parent items (updated for rel 1.3 */
	
	$('.actions2 .parent > a').click(function(e) {
		e.preventDefault();
		//if (a == 1) {a = 2} else {a = 1}
		$(this).openClose('ul');
	});
	
// end of script for Take Action expandable items

(function($){
	$.fn.scrollIntoView = function(extra) {
		return this.each(function() {
			/* scroll the window so the entire element is in view (bottom of element will be within a few pixels of bottom of window) */
			var win = $(window);
			var el = $(this);
			var el_bottom = el.offset().top + el.height();
			var win_h = win.height();
			/* scroll into view if the bottom of the element is below the bottom of the viewport (current scroll top + window height) */
			if (el_bottom > win.scrollTop() + win_h) {
				/* even though we have to get the current scrolltop from the window, we have to animate the html,body */
				$('html,body').animate({'scrollTop':el_bottom - win_h + extra},500);
			}
			/* scroll into view if the top of the element is above the top of the viewport */
			else if (win.scrollTop() > el.offset().top) {
				$('html,body').animate({'scrollTop':el.offset().top},500);
			}
		});
	};
})(jQuery);
/* ----------------------- END DP SCROLL INTO VIEW PLUGIN ----------------------- */

/* ----------------------- BEGIN DP CUSTOM EVENTS ----------------------- */
$(document).ready(function(){
	/* custom dropdowns */
	var $select = $('.selectbox');
	if ($select.length) {
		$select_ul = $select.children('ul');
		var focus_el =$('<input type="text" maxlength="2" class="focusable" />');  /* non-visible input for key events */
		var selectable = $select.parents().hasClass('tc-11-select-lab');
		if (selectable) { /* check if this is a select lab widget, if so enable keyboard selection */
			$select_ul.find('li').each(function() { /* store 1st 2 letters of text in data attribute */
				this_li = $(this);
				ref = this_li.text().substring(0,2).toLowerCase();
				this_li.attr('data-ref',ref);
			});
		}
		$select.delegate('span','click',function(e){
			var dd = $(this).next(); /* grab the custom select box's options */
			if (dd.is(':visible')) {
				dd.scrollTop(0).fadeOut(500); /* if the select box options are visible, fade them out (after resetting the scrollbar to the top) */
				focus_el.remove(); /* remove non-visible input for keyboard selection */
			} else {
				dd.scrollTop(0).fadeIn(500);/* if the select box options aren't visible, fade them in (after resetting the scrollbar to the top) */
				dd.scrollIntoView(10);/* scroll the page so the select box options are within the viewport */

				if (selectable)	{
					var pos = 0;
					focus_el.appendTo($select);
					focus_el.focus()
					.val('') /* reset */
					.keyup(function() {
						var val = focus_el.val().toLowerCase();
						var match = $select_ul.find('li[data-ref^="' + val + '"]').eq(0);  /* find first LI whose data matches input value */
						if (match.length) { /* scroll UL so matching LI is first in view */
							pos += match.position().top;
							$select_ul.scrollTop(pos);		
						} 
					});
				}
			}
			$(document).one('click',function() {
			    $select_ul.scrollTop(0).fadeOut(500);/* user clicks outside of custom select box, "close" it */		
				focus_el.remove();
			 });
			e.stopPropagation();
		});
		
	}
	
	/* custom form controls (don't use custom form controls if it's a cogix page or IE6) */
	if ($('.cogix-page').length === 0 && !($.browser.msie && $.browser.version === '6.0')) {
		$('select, :radio, :checkbox').uniform({
			'buttonClass':'button'
		});
		$selects = $('select');
		if ($selects.length) {
			/* detect support for text-overflow (not supported in FF6 and below) */
			var no_textoverflow = false;
			var s = document.documentElement.style;
			if (!('textOverflow' in s || 'OTextOverflow' in s)) {
				no_textoverflow = true;
			}
			/*add any classes on the select box to the parent element created by the uniform plugin (for setting widths, etc)*/
			$selects.each(function(){
				var this_select = $(this);
				var c = this_select.attr('className');
				var selector_el = this_select.closest('div.selector')
				selector_el.addClass(c);
				if (no_textoverflow) {
					selector_el.addClass('no-textoverflow');
				}
			});
		}
	}
	
	/* select a lab dropdown nav */
	var $select_confirm = $('#maincontent').find('div.select-confirm');
	$select_confirm.find('button').click(function(){
		val_href = $select_confirm.find('option:selected').val();
		if (val_href !== '') {
			window.location = val_href;
		}
	});
	
	/* superfish on main menu */
	$("#nav-main-list").superfish({
		animation: {height:'show'}
	});
	
	/* open/close "See More..." footer */
	$('#nav-footer-header').bind('click',function(e) {
		/* user clicks on footer, reveal it */
		e.preventDefault();
		$('#nav-footer-body').slideDown();
	});
	$('#nav-footer-wrap').hoverIntent({
		/* user shows intent to mouse out, slide it closed */
		over: function(){/* required by plugin */},
		timeout: 500,
		out: function() {
			$('#nav-footer-body').slideUp();
		}
	});
	
	/* slide open/close the action menu parent items */
	$('.actions .parent > a').click(function(e) {
		e.preventDefault();
		$(this).openClose('ul');
	});
	
	/* sliders (carousels) */
	$('.slider').slider();
	
	/* animate the special alert */
	$('#specialalert').slideDown(1000);
	
	/* bring up print dialog when user clicks on the print tool */
	$(this).delegate('#tools-print','click',function(e) {
		e.preventDefault();
		window.print();
	});
	
	/* expand/collapse all faq questions */
	$(this).delegate('#maincontent .faq .toggleall','click',function(e){
		e.preventDefault();
		if ($('.question.open').length) {
			$('.question').openClose('.answer', 'close');
		} else {
			$('.question').openClose('.answer', 'open');
		}
	});
	/* slide open/close the faq questions */
	$(this).delegate('#maincontent .faq h3, #maincontent .faq span.icon','click',function(e) {
		e.preventDefault();
		$(this).openClose('.answer');
	});
	
	/* contact us subpage nav */
	if ($('.contact-us .has-subpages').length) {
		$(this).delegate('.contact-us .has-subpages a','click',function(e) {
			/*
				NOTE: Mimicing current questdiagnostics.com functionality:
				- no e.preventDefault(), as the address bar should update each time the user clicks on a nav item
				- hash in nav item links/address bar should not match any ids on the page (so the viewport doesn't scroll to the top of the dom elements)
				- pages should not show up in the history, back and previous buttons will adjust the url, but will not toggle the sub pages
				- copy and paste url into new tab/window, page will load with that sub page open
			*/
			var t = $(this);
			$('.contact-us .has-subpages .selected').removeClass('selected');
			t.parent().addClass('selected');
			$('.subpage').hide();
			$(t.attr('href').replace('#','#subpage-')).show();
		});
		var hash = window.location.hash.split('#')[1];
		
		// add Contact Us jumplinks here
		
		if (hash == "feedback" 
		 || hash == "locations"
		 || hash == "billing"
		 || hash == "results"
		 || hash == "custserv"
		 || hash == "faq"
		 || hash == "getstarted"
		 || hash == "corpdepts")
		  {
			$('.contact-us .section-nav a[href=#' + hash + ']').trigger('click');
			}

	}
	
	/* colored hover boxes */
	$('.hover-boxes ol > li').hoverIntent({
		over: function() {
			$('.hover-boxes ol > li').removeClass('full').hide();
			$('.hover-boxes').removeClass().addClass('hover-boxes hover-boxes-' + $(this).attr('className'));
			$(this).addClass('full').show();
		},
		interval: 50,
		out: function() {
			$('.hover-boxes ol > li').show();
			$('.hover-boxes').removeClass().addClass('hover-boxes');
			$(this).removeClass('full');
		}
	});
	
	/* lab tests online search form */
	$(this).delegate('#lab-tests-online select','change',function(e) {
		window.open('http://labtestsonline.org' + $(this).val());
	});
		
	/* take action demo popup */
	$popup_demo = $('#popup-demo');
	if ($popup_demo.length) {
		$popup_demo.click(function(){
		url = $popup_demo.attr('href');
		newWindow = window.open(url,'popupWindow','toolbar=no,location=no,directories=no,status=no,menubar=no,scrollbars=yes,resizable=yes,copyhistory=no,width=670,height=500,screenX=150,screenY=150,top=150,left=150');
		newWindow.focus();
		return false;
		});
	}	
		
	/* careers tabs */
	if ($('#tabs.tabwrap').length) {
		var recenterTabs = function($li) {
			/* recenter tabs */
			var count = $('#tabs li').length;
			if (count > 6) {
				var index = $li.index();
				var margin;
				var w = - $('#tabs li:first').outerWidth() - 2;
				if (index < 3) {
					margin = 0;/* left align */
				} else if (index < count - 4) {
					margin = (w * (index - 2));/* center */
				} else {
					margin = (w * (count - 6));/* right align */
				}
				$('#tabs ul').animate({'margin-left':margin + 'px'}, 500);
			}
		}
		$(this).delegate('#tabs li a','click',function(e) {
			e.preventDefault();
			var $this = $(this);
			var $li = $this.closest('li');
			/* unmark the old current tab */
			$this.closest('ul').find('.curr').removeClass('curr');
			/* mark the new tab as current */
			$this.addClass('curr');
			/* hide the old tab content */
			$('#tabs .tabcontent-curr').removeClass('tabcontent-curr');
			/* show the new tab content (find the tabcontent with the same index as the clicked link's parent li)*/
			$('#tabs .tabcontent:eq(' + $li.index() + ')').addClass('tabcontent-curr');
			/* recenter tabs */
			recenterTabs($li);
		}).delegate('#tabs .prev, #tabs .next','click',function(e) {
			e.preventDefault();
			/* grab the current link, traverse up to the parent li */
			var $li = $('#tabs li .curr').closest('li');
			/* get the previous or next li */
			$li = $(this).hasClass('prev') ? $li.prev() : $li.next();
			if ($li.length) {
				/* trigger a click event on the link inside that li*/
				$li.find('a').trigger('click');
				/* recenter tabs */
				recenterTabs($li);
			}
		});
	}
	
	/* fancybox video */
	var $fancyvid = $('a.video');
	if ($fancyvid.length) {
		/* manually bind the click handler to each video instead of just calling $fancyvid.fancybox() because we need to do some manual setup */
		$fancyvid.each(function(){
			$(this).bind('click', function(e) {
				e.preventDefault();
				/* ajax in the video */
				$.ajax({
					'url': $(this).attr('href'),
					success: function(data) {
						/* find just the video div */
						var $vid = $(data).find('.video-js-box');
						var $video = $vid.find('video');
						/* find the video dimensions */
						var dimensions = {
							h: $video.height(),
							w: $video.width()
						};
						/* if the video tag is unsupported (will return 0 width/height), grab the dimensions from the flash fallback */
						if (dimensions.h === 0) {
							var $flash = $vid.find('object');
							dimensions.h = $flash.height();
							dimensions.w = $flash.width();
						}
						/* append the video div to the body */
						$('body').append($vid);
						/* initialize video with VideoJS (needs to happen before being inserted into fancybox to avoid FOUC) */
						$video.VideoJS();
						/* display the video div in a fancybox */
						$.fancybox({
							autoDimensions: false,
							content: $vid,
							height: dimensions.h,
							width: dimensions.w,
							onComplete: function() {
								$('#fancybox-content > div').css({'overflow':'hidden'});
							}
						});
					}
				})
			});
		});
	}
	
	/* fix for browsers without native placeholder attribute support */
	$placeholders = $('input[placeholder]');
	if ($placeholders.length) {
		$placeholders.placeholder();
	}


	var equalHeightHeading = function($el, h) {
		$el.each(function() {
			var height = 0;
			var $h = $(this).find(h);
			$h.each(function() {
				var $this = $(this);
      	if ($this.innerHeight() > height) {
        	height = $this.innerHeight();
       	}
			});
			$h.css('minHeight', height);
		});
	}

	var $maincontent = $('#maincontent');
	equalHeightHeading($maincontent.find('div.box-3-wrap'), 'div.kicker');
	equalHeightHeading($maincontent.find('div.box-3-wrap'), 'h2:first-child');
	equalHeightHeading($maincontent.find('div.box-3-wrap'), 'h3:first-child');
	equalHeightHeading($maincontent.find('div.box-2-688-wrap.full-width'), 'h2');
	equalHeightHeading($maincontent.find('div.box-2-688-wrap'), '.feature-menu h2');


	var disableImageLinkStyles = function($el) {
		$el.find('a:has(img)').css({
      'border': '0',
      'backgroundColor': 'transparent'
    })
	}

	disableImageLinkStyles($('.article div.col-main'));
	disableImageLinkStyles($('div.wysiwyg'));
	
});


/* feature grid - 'Innovations' */
$(document).ready(function(){
	$('#feature-grid').find('div.grid-item').addClass('hidden')
	.find('a[rel="slides"]').click(function(e) {
		e.preventDefault();
	});
});

$(window).load(function() {	
	$featgrid = $('#feature-grid');
	if ($featgrid.length) {	
		all_items = $featgrid.find('div.grid-item');
		
		Array.prototype.shuffle = function (){
			var i = this.length, j, temp;
			if ( i == 0 ) return;
			while ( --i ) {
				j = Math.floor( Math.random() * ( i + 1 ) );
				temp = this[i];
				this[i] = this[j];
				this[j] = temp;
			}
		};
		
		grid_ref = [];
		for (i=0; i<all_items.length; i++)
		{
			grid_ref.push(i);
		}
		grid_ref.shuffle();

		function revealGridItem() {
			all_items.eq(grid_ref.shift()).removeClass('hidden')
			.hide()
			.fadeIn(150, function() {
				if (grid_ref.length >=1) {
					revealGridItem();
				}
				else {
					$featgrid.addClass('loaded');
					initGrid();
				}
			});
		}

		revealGridItem();

		if ($.browser.msie && $.browser.version=="6.0")  { 
			$featgrid.find('div.reveal').hover(function() {
				$(this).addClass('hover');
			}, function() {
				$(this).removeClass('hover');
			});
		}	
		
		function initGrid() {
			$featgrid.delegate('div.reveal', 'hover', function(e){	
				if (e.type == 'mouseenter') {
					$(this).addClass('open')
					.find('img').fadeIn('fast');
				} else {
					$(this).removeClass('open')
					.find('img').hide();
				}
			});	
			$featgrid.find('a[rel="slides"]').fancybox({
				'cyclic' : true,
				'padding' : 0,
				'overlayOpacity' : 0.8,
				'overlayColor' : '#000',
				'changeFade' : 0,
				onStart	: function() {
					$('#fancybox-wrap').addClass('slidebox');
				}
			});
		}
	}
});

$(document).ready(function(){
	$accrdnsldr = $('#accordion-slider');
	if ($accrdnsldr.length) {
		var viz = 3;
		var item_w = 261;
		var distance = viz * item_w;
		var all_bods = $accrdnsldr.find('div.body');
		all_bods.first().show();
		$accrdnsldr.find('div.header').first().addClass('open');
		$accrdnsldr.delegate('div.header', 'click', function() {
			var this_hdr = $(this);
			if (this_hdr.hasClass('open')) { return false; }
			all_bods.filter(':visible').slideUp();	
			$accrdnsldr.find('div.open').removeClass('open');
			this_hdr.addClass('open')
			.next().slideDown();
		});
		all_bods.each(function() {
			var this_bod = $(this);
			var this_caro = this_bod.find('ul');
			var these_lis = this_caro.find('li');
			var caro_l = these_lis.length;
			if (caro_l > viz ) { 
				this_caro.data('pos', 0);
				var prev_btn = $('<span class="btn prev inactive" />')
				.click(function() {
					if (prev_btn.hasClass('inactive')) { return false; }
					next_btn.removeClass('inactive');
					x = this_caro.data('pos')
					y = x - viz;
					this_caro.data('pos', y);
					if (y == 0) {
						prev_btn.addClass('inactive');
					}
					this_caro.animate({left: '+=' + distance + 'px'}, 1000);
				})	
				.appendTo(this_bod);
				var next_btn = $('<span class="btn next" />')
				.click(function() {
					if (next_btn.hasClass('inactive')) { return false; }
					prev_btn.removeClass('inactive');
					x = this_caro.data('pos')
					y = x + viz;
					this_caro.data('pos', y);
					if ((caro_l - y) <= viz) {
						next_btn.addClass('inactive');
					}
					this_caro.animate({left: '-=' + distance + 'px'}, 1000);
				})	
				.appendTo(this_bod);
			}
		});
		$accrdnsldr.find('.more a').fancybox({
			'cyclic' : true,
			'padding' : 0,
			'overlayOpacity' : 0.8,
			'overlayColor' : '#000',
			'changeFade' : 0,
			onStart	: function() {
				$('#fancybox-wrap').addClass('slidebox');
			}
		});
	}
});
/* ----------------------- END DP CUSTOM EVENTS ----------------------- */