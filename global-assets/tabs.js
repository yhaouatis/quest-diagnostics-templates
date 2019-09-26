var TabUI = function() {

  var self = this;
  self.$tabs = $('#tabbed-block');

  self.init = function() {

    self.$articles = self.$tabs.find('div.article');

    var $tab_nav = self.$tabs.find('div.tab-nav');
    var $a = $tab_nav.find('a');

    $a.click(function(e) {
      var target = $(this).attr('href');
      $a.removeClass('is-active');
      self.$articles.hide();
      $tab_nav.find('a[href="' + target + '"]').addClass('is-active');
      $(target).show();
      e.preventDefault();
// Chang3es for expant/collapse issue
   //  _gaq.push(['_trackPageview',location.pathname + location.search  + target]);
    });

    $a.first().click();

    self.pageBreak();
  }

  self.pageBreak = function() {

    var wrapContent = function($brk) {
      var $next = $brk.nextAll();
      var $block = $('<div class="block" />');
      $block.html($next.clone(true));
      $next.remove();
      $block.insertAfter($brk);
      var $more = $block.find('div.read-more')
      if ($more.length) {
        wrapContent($more.first());
      }
    }

    self.$articles.each(function() {
      var $page_breaks = $(this).find('div[style*="always"]');
      $page_breaks.removeAttr('style').addClass('read-more').html('Read More').click(function() {
        var $this = $(this);
        $this.siblings('div.block').show();
        $this.remove();
      });
      wrapContent($page_breaks.first());
    });

  }

  if (self.$tabs.length) {
    self.init();
  }
};


$(document).ready(function() {
  new TabUI();
});



var expandImage = function() {

  var self = this;

  self.init = function() {

    $('img.exp-image').each(function() {
      $img = $(this);
      $img.after('<p class="exp-image-link"><a href="' + $img.attr('src') + '" target="_blank">View Larger</a></p>');
    });

  }

  self.init();

};

$(document).ready(function() {
  new expandImage();
});
















