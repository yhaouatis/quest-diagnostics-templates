$(window).load(function(){
	var autoIframe = function($iframe) {
		/* remove all height/width from iframe (inline styling and height/width attributes) - need to clear both because of crossbrowser issues */
		$iframe.css({'height':'','width':''}).attr('height','').attr('width','');
		/* grab the actual iframe dom element (not the jquery object wrapper) and manually set the width/height (need to set it manually and not with jquery because of crossbrowser issues)*/
		var iframe = $iframe.get(0);
		iframe.style.height = (iframe.contentWindow.document.body.scrollHeight + 35) + 'px';
		iframe.style.width = iframe.contentWindow.document.body.scrollWidth + 'px';
	};
	$('iframe.auto').each(function(){
		/* loop thru all iframes with the "auto" class and automatically resize them */
		autoIframe($(this));
		/* bind to the iframe's load event (and resize everytime the iframe reloads - user navigating within iframe) */
		$(this).load(function(){
			autoIframe($(this));
		});
	});
});

$(document).ready(function(){
	/* BEGIN: alpha numeric menu */
	var sub = $('#alpha-numeric-sub');/* submenu (scrollable list of ajax'd content for each letter clicked) */
	var to;/* timeout for pseudo hoverIntent (can't use hoverIntent: SEE BELOW) */
	var current = $('#alpha-numeric .alpha li span');
	$(this).delegate('#alpha-numeric .alpha li','click',function(e){
		e.preventDefault();
		if (to) {
			/* if the menu is pending a fadeout, stop it */
			clearTimeout(to);
		}
		/* remove the 'open' class from any other li's, assign it to the clicked li (and grab the clicked li for later use) */
		$('#alpha-numeric .open').removeClass('open');
		 /* if clicked li is not the pages default letter, add 'inactive' class to default letter */
		if (!($(this).find('span').length)) {
			current.addClass('inactive'); 
		}		
		var t = $(this).addClass('open');
		var u = t.closest('ul').hasClass('num') ? 'ajax/tc_numeric.html' : 'ajax/tc_alpha.html';/* this should be dynamic at some point (i.e. tc_alpha.html?letter=A) */
		$.ajax({
			url: u,
			success: function(html) {
				/* insert ajax'd data, reset scroll to top */
				sub.html(html).show().scrollTop(0);
				/* calculate position of submenu based on clicked li's position and submenu's width (and don't let it overhang the right of the ul) */
				var pos = t.position();
				var left = pos.left - 1;
				var top = pos.top + t.outerHeight();
				var right = left + sub.outerWidth();
				/* don't let the submenu overhang the right of the ul */
				var ul = t.closest('ul');
				var overright = right - (ul.position().left + ul.outerWidth());
				if (overright > 0) {
					left -= overright;
				}
				/* show the submenu (and reset it's opacity - to avoid fadeIn/fadeOut bugs cross-browser) */
				sub.css({
					'left': left + 'px',
					'opacity':'',
					'top': top + 'px'
				});
				sub.scrollIntoView(35);/* scroll the page so the submenu is within the viewport */
			}
		});
	}).delegate('#alpha-numeric-sub, #alpha-numeric .open','mouseleave',function(){
		/* 
		NOTE: This recreates a pseudo hover intent effect 
		- the hoverIntent plug-in can't be used because it binds directly to the selected element, rather than using delegate on a parent element (as a result, when the "open" class moves from li to li, the hoverIntent doesn't work -- without rebinding each time)
		- also, more efficient to bind one listener to the document rather than binding (and rebinding) listeners to each li.
		*/
		/* user mouseouts of submenu or "open" li, close the submenu (after a slight delay) */
		to = setTimeout(function(){
			sub.stop().fadeOut(500,function(){
				$('#alpha-numeric .open').removeClass('open');
				current.removeClass('inactive');
			});
		},1000);
	}).delegate('#alpha-numeric-sub, #alpha-numeric .open','mouseenter',function(){
		/* if user hovers back over submenu or "open" li, cancel the close */
		clearTimeout(to);
	});
	/* END: ordering info browse by letter (or number) menu */
	
	/* BEGIN: test guides menu */
	$tg_browse = $('#tg-browse-wrap');
	if ($tg_browse.length) {
		$this = $tg_browse;
		var all_menus = $this.find('div.menu');/* grab all the dropdown/flyout menus */
		var all_filters = $this.find('div.filter');/* grab the top level filters */
		var scrolled = false;
		$this.delegate('div.title', 'click', function() {
			/* when user clicks any title (the text inside the filter)
				- hide all menus (and their flyouts)
				- move the active class from the old element to the new
				- slide down the new menu (and scroll the menu into view) */
			this_title = $(this);
			all_filters.removeClass('active');
			all_menus.hide();
			all_menus.find('li > ul').hide();
			all_menus.find('.active').removeClass('active');
			this_title.parent('div.filter').addClass('active');
			this_title.siblings('div.menu').slideDown(function(){
				$('#tg-menu').scrollIntoView(10);/* scroll the page so the dropdown menu is within the viewport */
			});
		});
		$(document).delegate('body', 'click', function() {
			/* close menus if user clicks outside */
			if (all_menus.is(':visible')) {
				all_menus.slideUp();
				all_filters.removeClass('active');
			}
		}).delegate('#tg-browse-wrap div.filter', 'click', function(e) {
			/* stop the event from bubbling up to the body (so the menu stays open if the user clicks inside) */
			e.stopPropagation();
		});
		var $tg_f_cond = $('#tg-filter-condition');
		if ($tg_f_cond.length) {/* by condition flyouts */
			$tg_f_cond.delegate('.flyout', 'click', function(e) {
				/* user clicks menu item with submenu */
				e.preventDefault();
				this_sp = $(this);
				sib_lis = this_sp.parent('li').siblings('li');
				sib_lis.find('ul').hide();/* hide any other flyouts */
				sib_lis.find('.active').removeClass('active');/* remove active class from old flyouts */
				this_sp.addClass('active')
				.siblings('ul').show();/* add active class to new flyout, show it */
			});
		}
	}
	/* END: test guides menu */
	
	
	/* test center v1.1 */
	var $find_test_guide_nav = $('.find-test-guide-nav');
	if ($find_test_guide_nav.length) {
		$find_test_guide_nav.delegate('.has-flyout', 'click', function(e) {
			e.preventDefault();
			/* cancel any pending closes of the flyout menu */
			clearTimeout(flyoutTO);
			/* hide the main flyout */
			var $flyout = $find_test_guide_nav.find('.flyout');
			$flyout.hide();
			$flyout.find('.active').removeClass('active');
			/* unmark the flyout link */
			$find_test_guide_nav.find('.has-flyout-open').removeClass('has-flyout-open');
			/* mark the clicked link as current, grab it's respective flyout menu */
			var $newflyout = $(this).addClass('has-flyout-open').closest('li').find('.flyout');
			/* make sure the new menu is in the default state */
			$newflyout.find('.level, .col').hide();
			$newflyout.find('.col1').show();
			$newflyout.find('.bdy-inner').css({'margin-left':'0'});
			/* show the new menu */
			$newflyout.show();
			$newflyout.scrollIntoView(20); /* scroll the page so the menu is within the viewport */
			/* click outside of flyout will close it */
			$(document).bind('click.tcflyout', function(event) {
				target = $(event.target);
				if (!target.parents().hasClass("flyout")) {
					flyoutClose();
				}
			});
			e.stopPropagation();
			
		});
		/* close the flyout if user isn't interacting with it anymore */
		var flyoutTO;
		$find_test_guide_nav.delegate('.flyout, .has-flyout-open', 'mouseleave', function() {
			flyoutTO = setTimeout(function(){
				flyoutClose();
			},3000);
		}).delegate('.flyout, .has-flyout-open', 'mouseenter', function() {
			clearTimeout(flyoutTO);
		});
		
		/* fade out the flyout */
		var flyoutClose = function()
		{
		   	$find_test_guide_nav.find('.flyout').fadeOut(500,function(){
				/* reset the flyout to the default state */
				$find_test_guide_nav.find('.level, .col').hide();
				$find_test_guide_nav.find('.col1').show();
			});
			$find_test_guide_nav.find('.has-flyout-open').removeClass('has-flyout-open');
			$(document).unbind('click.tcflyout');
		}
		
		$find_test_guide_nav.delegate('.col a[data-next]', 'click', function(e) {			
			/* grab the col div (and the columns index) */
			var $col = $(this).closest('.col');
			var col_idx = $col.index();
			/* grab all future columns */
			var $cols = $col.nextAll();
			e.preventDefault();
			/* grab the flyout */
			var $flyout = $(this).closest('.flyout');
			/* grab the breadcrumbs (and the one at the same index as the column) */
			var $crumbs = $flyout.find('.hdr .level');
			var $crumb = $($crumbs.get(col_idx));
			/* show all crumbs and arrows */
			$crumbs.show().find('.arrow').show();
			/* hide future crumbs */
			$crumb.nextAll().hide();
			/* hide the current crumb's arrow, update the current crumb's text */
			$crumb.find('.arrow').hide();
			$crumb.find('.crumb').text($(this).text());
			/* remove the active class from any other links in this column, mark the clicked link as active */
			$col.find('.active').removeClass('active');
			$(this).addClass('active');
			/* remove the active class from any links in any future columns */
			$cols.find('.active').removeClass('active');
			/* hide all future columns, show the next column */
			$cols.hide();
			var $next_col = $col.next().show();
			/* grab the next subset's id */
			var next_subset = $(this).data('next');
			/* NOTE: this if check is temporary and is only in place because some of the menus aren't finalized yet, when finalized all items will have the data-next attribute */
			if (next_subset) {
				/* hide all future subsets of data */
				$col.nextAll().find('.subset').hide();
				/* show the next subset that corresponds to the clicked link */
				var selected_subset = $next_col.find('.subset[data-id="' + next_subset + '"]')
				var selected_subset_lnks = selected_subset.find('li a[href]');
				// if the next column contains only one link, open it 
				if (selected_subset_lnks.length == 1) {
					  window.location = selected_subset_lnks.eq(0).attr('href');					                    
				} else {
					selected_subset.show();
				}
			}
			/* grab the old center column index (index of the column in the center of menu viewport) */
			var old_idx = $flyout.data('center_col');
			/* set the new viewport margin to an invalid number (used to check if animating will be necessary) */
			var m = -1;
			if (col_idx > old_idx && $col.next().length) {
				/* if the new column is after the current center column index (and there's another column after the new one), slide viewport to reveal next column */
				m = ($col.outerWidth() * (col_idx - 1));
			} else if (col_idx < old_idx) {
				/* if the new column is before the current center column, slide viewport to reveal it */
				m = ($col.outerWidth() * (col_idx));
			}
			/* animate the viewport if necessary */
			if (m !== -1) {
				$flyout.find('.bdy-inner').animate({
					'margin-left':'-' + m + 'px'
				},500);
			}
			/* calculate the new center column index (used for next time) */
			var center_col;
			if (col_idx === 0) {
				/* if the current column is the first column, the center column is the next column */
				center_col = 1;
			} else if (!$col.next().length) {
				/* if the current column isn't the last column, the center column is the previous column */
				center_col = col_idx - 1;
			} else {
				/* if the current column has columns on either side, it's the center column */
				center_col = col_idx;
			}
			/* store it away */
			$flyout.data('center_col',center_col);
		});
		
		$find_test_guide_nav.delegate('.level .crumb', 'click', function(e) {
			e.preventDefault();
			/* grab the level div, and the flyout menu */
			var $level = $(this).closest('.level');
			var $flyout = $level.closest('.flyout');
			/* grab all the columns in the flyout */
			var $cols = $flyout.find('.col');
			/* grab the column at the same index as the breadcrumb */
			var $col = $($cols.get($level.index()));
			/* find the active link in the column and "click" it (will trigger necessary show/hide/recenter logic) */
			$col.find('.active').trigger('click');
		});
	}
	
	var $algorithm = $('.algorithm');
	if ($algorithm.length) {
		$(window).load(function() {
			var hidden_el = $('<div class="hidden" />');
			var imgs = '';
			$algorithm.find('.more a.larger').each(function(){
				img = '<img src="' + $(this).attr('href') + '" width="1" height="1" alt="">';
				imgs += img;				
			});
			hidden_el.html(imgs)
			.appendTo($('body'));								
		});
		$algorithm.delegate('.larger','click',function(e) {
			e.preventDefault();
			var dl = $(this).closest('.algorithm').find('.download').attr('href');
			var html = '';
			html += '<div class="section algorithm-modal">';
			html += '<div class="chrome">';
			html += '<a href="#" class="close">Close</a>';
			html += '<div class="more"><a href="' + dl + '">Download PDF</a></div>';
			html += '</div>';
			html += '<img src="' + $(this).attr('href') + '">';
			html += '</div>';
			$.fancybox({
				content: html,
				padding: 0,
				margin: 0,
				showCloseButton: false,
				onComplete: function() {
					$('.algorithm-modal').delegate('.close','click',function(e) {
						e.preventDefault();
						$.fancybox.close();
					});
				}
			});
		});
	}
});