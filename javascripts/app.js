
jQuery.extend({
  randomColor: function() {
    return '#' + Math.floor(Math.random()*256*256*256).toString(16);
  }
});

(function(removeClass) {
  jQuery.fn.removeClass = function(value) {
    if(value && typeof value.test === 'function') {
      for(var i = 0; i < this.length; i++) {
        var elem = this[i];
        if( elem.nodeType === 1 && elem.className ) {
          var classNames = elem.className.split(/\s+/);
          for(var n = 0; n < classNames.length; n++) {
            if(value.test(classNames[n])) {
              classNames.splice(n, 1);
            }
          }
          elem.className = jQuery.trim(classNames.join(" "));
        }
      }
    } else {
      removeClass.call(this, value);
    }

    return this
  }
})(jQuery.fn.removeClass);

jQuery(document).ready(function() {
  jQuery('html').removeClass('no-js');
});

jQuery(document).foundation();


(function($) {
  "use strict";
  $(document).ready(function() {

    $('video').each(function() {
      this.muted = true;
    });

    $('.fadeinleft, .fadeinright, .fadein, .popin').appear(function() {
      var delay = $(this).data('delay');
      var that = this;

      setTimeout(function() {
        $(that).addClass('appear');
      }, delay)

    });

    // $('.popin').each(function() {
    //   $(this).addClass('appear');
    // });

    var navUpdatePending = false;
    var nav = $('.contain-to-grid.sticky').first();
    var previousScroll = $(window).scrollTop();
    var navIsCompact = previousScroll >= 48;

    nav.toggleClass('is-compact', navIsCompact);

    function desktopNavigationIsActive() {
      return window.matchMedia('(min-width: 60em)').matches;
    }

    function updateNavigationState() {
      var scroll = $(window).scrollTop();
      var isScrollingDown = scroll > previousScroll;

      // Expand well before Foundation releases the fixed header at the top.
      // Direction-aware thresholds keep the state stable when scrolling
      // reverses near either boundary.
      if (!desktopNavigationIsActive()) {
        navIsCompact = false;
        nav.removeClass('is-compact');
      } else if (!navIsCompact && isScrollingDown && scroll >= 48) {
        navIsCompact = true;
        nav.addClass('is-compact');
      } else if (navIsCompact && !isScrollingDown && scroll <= 120) {
        navIsCompact = false;
        nav.removeClass('is-compact');
      }

      previousScroll = scroll;
      navUpdatePending = false;
    }

    $(window).on('scroll', function() {
      if (!navUpdatePending) {
        navUpdatePending = true;
        window.requestAnimationFrame(updateNavigationState);
      }
    });

    updateNavigationState();

    $('.toggle-topbar > a').on('click.navigationState', function() {
      var toggle = $(this);

      // Foundation handles the expansion; synchronize accessibility state
      // after its delegated click handler has updated the top bar.
      window.setTimeout(function() {
        toggle.attr('aria-expanded', toggle.closest('.top-bar').hasClass('expanded') ? 'true' : 'false');
      }, 0);
    });

    $('form#contact_form').validate({
      messages: { },
      submitHandler: function(form) {
        $.ajax({
          type: 'POST',
          url: 'send.php',
          data: $(form).serialize(),
          success: function(data) {
            if(data.match(/success/)) {
              $(form).trigger('reset');
              $('#thanks').show().fadeOut(5000);
            }
          }
        });
        return false;
      }
    });

    if($('.masonry-container').length > 0) {

      $('.masonry-container').each(function() {
        var that = $(this);

        // initialize Masonry after all images have loaded
        $(that).imagesLoaded(function() {

          setTimeout(function() {
            window.msnry = new Masonry($(that)[0], {
              itemSelector: '.mod',
              // columnWidth: '.mod',
              gutter: 30
            });

            // window.msnry.layout();

          }, 10);

        });

      });
    }


    // onepage nav scroll
    if ( $("nav.top-bar.onepage").length > 0 ) {
      $('.top-bar-section a[href=#top]').closest('li').addClass('active');

      var ctx = $("nav.top-bar.onepage");

      // var headerHeight = ctx.height();
      // $(window).scroll(function() {
      //   headerHeight = ctx.height();
      //   console.log(headerHeight);
      // });
      var headerHeight = 59;

      // use to mark whether the scrolling is caused by clicking
      var clickScrolling = false;
      // cache for current anchor id
      var currentAnchorId;

      $('.top-bar-section a', ctx).click(function(event) {
        $('.top-bar-section a', ctx).closest('li').removeClass('active');
        $(this).closest('li').addClass('active');
        clickScrolling = true;
        // console.log($(this).attr('href').offset());
        try {
          if ( $(this).attr('href') == '#top' ) {
            var distance = 0
          } else {
            var distance = $($(this).attr('href')).offset().top - headerHeight + 'px';
          }

          // console.log(distance);

          $('html, body').stop().animate({
            scrollTop: distance
          }, { duration: 1200, easing: "easeInOutExpo", complete: function() { clickScrolling = false; } });
          event.preventDefault();
        } catch(e) {}
      });


      // hightlight nav when scrolling
      var anchors = $('.top-bar-section a', ctx).map(function() {
        var anchor = $($(this).attr('href'));
        if(anchor.length) { return anchor; }
      });

      $(window).scroll(function() {
        if(clickScrolling) return false;

        var fromTop = $(this).scrollTop();
        var passedAnchors = anchors.map(function() {
          // add 1 to make the current nav change 1px before it should when scrolling top to bottom
          if(fromTop + headerHeight + 1 >= $(this).offset().top)
            return this;
        });
        // get the last anchor in the passedAnchors as the current one
        var currentAnchor = passedAnchors[passedAnchors.length - 1];
        if(currentAnchor) {
          if(currentAnchorId !== currentAnchor.attr('id')) {
            currentAnchorId = currentAnchor.attr('id');
            $('.top-bar-section a', ctx).closest('li').removeClass('active');
            $('.top-bar-section a[href=#'+currentAnchorId+']', ctx).closest('li').addClass('active');
          }
        }

      });


    }


  });
})(jQuery);
(function($) {
  Tc.Module.BarGraph = Tc.Module.extend({
    init: function($ctx, sandbox, modId) {
      this._super($ctx, sandbox, modId);
    },
    dependencies: function() {
      // this.require('jquery.ui.core.js', 'plugin', 'onBinding');
    },
    onBinding: function() {
      var $ctx = this.$ctx;


      $(".bars", $ctx).each(function() {
        $('> li > .highlighted', $(this)).each(function() {
          $(this).appear(function() {
            var percent = $(this).attr("data-percent");
            // $bar.html('<p class="highlighted"><span class="tip">'+percent+'%</span></p>');
            // http://stackoverflow.com/questions/3363035/jquery-animate-forces-style-overflowhidden
            $(this).animate({
              'width': percent + '%'
            }, 1700, function() { $(this).css('overflow', 'visible'); });
          });
        });
      });

    }
  })
})(Tc.$);
(function($) {
  Tc.Module.BlogPost = Tc.Module.extend({
    init: function($ctx, sandbox, modId) {
      this._super($ctx, sandbox, modId);
    },
    dependencies: function() {
      // this.require('slick.min.js', 'plugin', 'onBinding');
    },
    onBinding: function() {
      var $ctx = this.$ctx;

      if($ctx.find('img, .images').length == 0) {
        $ctx.addClass('no-media');
      }

      $('.images', $ctx).slick({
        autoplay: true,
        pauseOnHover: false,
        dots: true,
        speed: 1500,
        arrows: false
      });

    }
  })
})(Tc.$);
(function($) {
  Tc.Module.BoxedSlider = Tc.Module.extend({
    init: function($ctx, sandbox, modId) {
      this._super($ctx, sandbox, modId);
    },
    dependencies: function() {
      // this.require('slick.min.js', 'plugin', 'onBinding');
    },
    onBinding: function() {
      var $ctx = this.$ctx;

      $('.slides', $ctx).slick({
        autoplay: true,
        pauseOnHover: false,
        dots: true,
        speed: 1500,
        arrows: false
      });

    }
  })
})(Tc.$);
(function($) {
  Tc.Module.BoxedTextSlider = Tc.Module.extend({
    init: function($ctx, sandbox, modId) {
      this._super($ctx, sandbox, modId);
    },
    dependencies: function() {
      // this.require('slick.min.js', 'plugin', 'onBinding');
    },
    onBinding: function() {
      var $ctx = this.$ctx;


      $('.boxes', $ctx).slick({
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        pauseOnHover: false,
        responsive: [
          {
            breakpoint: 1024,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 1
            }
          },
          {
            breakpoint: 568,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1
            }
          }
        ]
      });

    }
  })
})(Tc.$);
(function($) {
  Tc.Module.CallToAction = Tc.Module.extend({
    init: function($ctx, sandbox, modId) {
      this._super($ctx, sandbox, modId);
    },
    dependencies: function() {
      // this.require('jquery.ui.core.js', 'plugin', 'onBinding');
    },
    onBinding: function() {
      var $ctx = this.$ctx;
    }
  })
})(Tc.$);
(function($) {
  Tc.Module.Clients = Tc.Module.extend({
    init: function($ctx, sandbox, modId) {
      this._super($ctx, sandbox, modId);
    },
    dependencies: function() {
      // this.require('slick.min.js', 'plugin', 'onBinding');
    },
    onBinding: function() {
      var $ctx = this.$ctx;

      var slides_to_show = $ctx.data('slides_to_show');

      $('.clients', $ctx).slick({
        slidesToShow: slides_to_show,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
        pauseOnHover: false,
        responsive: [
          {
            breakpoint: 767,
            settings: {
              slidesToShow: 3,
              slidesToScroll: 1
            }
          },
          {
            breakpoint: 480,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 1
            }
          }
        ]
      });

    }
  })
})(Tc.$);
(function($) {
  Tc.Module.DefaultSlider = Tc.Module.extend({
    init: function($ctx, sandbox, modId) {
      this._super($ctx, sandbox, modId);
    },
    dependencies: function() {
      // this.require('jquery.sequence-min.js', 'plugin', 'onBinding');
    },
    onBinding: function() {
      var $ctx = this.$ctx;

      var options = {
        nextButton: true,
        prevButton: true,
        autoPlay: true,
        autoPlayDelay: 3000,
        pauseButton: true,
        cycle: true,
        // preloader: true,
        animateStartingFrameIn: true,
        pagination: true,
        reverseAnimationsWhenNavigatingBackwards: true,
        preventDelayWhenReversingAnimations: true,
        fadeFrameWhenSkipped: false,
        swipeEvents: {
          left: "next",
          right: "prev"
        },
        pauseOnHover: false
      }

      var autostop = $('.sequence', $ctx).data('autostop') == 'on' ? true : false;
      var timeout = $('.sequence', $ctx).data('timeout');

      if ( timeout == '0' ) {
        options.autoPlay = false;
      } else {
        options.autoPlay = true;
        options.autoPlayDelay = parseInt(timeout);
      }

      if ( autostop ) {
        options.autoStop = true;
      } else {
        options.autoStop = false;
      }

      // console.log(options);

      var sequence = $(".sequence", $ctx).sequence(options).data("sequence");
      sequence.beforeCurrentFrameAnimatesOut = function() {
        var sequence = this;
        var removeStatic = function() {
          jQuery(".frame.static").removeClass('static');
          if ( !window.sequenceAutoStarted && sequence.settings.autoPlay ) {
            sequence.startAutoPlay(sequence.settings.autoPlayDelay);
            window.sequenceAutoStarted = true;
          }
        }
        setTimeout(removeStatic, 1000);

        // when the next frame is the last one
        if ( sequence.nextFrameID == sequence.frames.length && options.autoStop ) {
          // console.log(sequence.nextFrameID);
          sequence.stopAutoPlay();
        }

      }


    }
  })
})(Tc.$);
(function($) {
  Tc.Module.FullscreenSlider = Tc.Module.extend({
    init: function($ctx, sandbox, modId) {
      this._super($ctx, sandbox, modId);
    },
    dependencies: function() {
      // this.require('jquery.ui.core.js', 'plugin', 'onBinding');
    },
    onBinding: function() {
      var $ctx = this.$ctx;

      var fullscreen_slide = function() {
        $('.fullscreen_slideshow', $ctx).width($(window).width());
        if( $ctx.hasClass('force')) {
          $('.fullscreen_slideshow', $ctx).height($(window).height());
        } else {
          $('.fullscreen_slideshow', $ctx).height($(window).height() - $('.top-bar').height());
        }
      }

      fullscreen_slide();

      $(window).on('resize', fullscreen_slide);

      var options = {
        nextButton: true,
        prevButton: true,
        autoPlay: false,
        autoStop: true,
        autoPlayDelay: 3000,
        pauseButton: true,
        cycle: true,
        // preloader: true,
        animateStartingFrameIn: true,
        pagination: true,
        reverseAnimationsWhenNavigatingBackwards: true,
        preventDelayWhenReversingAnimations: true,
        fadeFrameWhenSkipped: false,
        swipeEvents: {
          left: "next",
          right: "prev"
        },
        pauseOnHover: false
      }

      var autostop = jQuery('.fullscreen_slideshow', $ctx).data('autostop') == 'on' ? true : false;
      var timeout = jQuery('.fullscreen_slideshow', $ctx).data('timeout');

      if ( timeout == '0' || !timeout ) {
        options.autoPlay = false;
      } else {
        options.autoPlay = true;
        options.autoPlayDelay = parseInt(timeout);
      }


      if ( autostop ) {
        options.autoStop = true;
      } else {
        options.autoStop = false;
      }

      var fullscreen = jQuery(".fullscreen_slideshow", $ctx).sequence(options).data("sequence");

      fullscreen.beforeCurrentFrameAnimatesOut = function() {
        var sequence = this;
        var removeStatic = function() {
          jQuery(".frame.static").removeClass('static');

          if ( !window.fullSequenceAutoStarted && sequence.settings.autoPlay ) {
            sequence.startAutoPlay(sequence.settings.autoPlayDelay);
            window.fullSequenceAutoStarted = true;
          }
        }
        setTimeout(removeStatic, 1000);
        // when the next frame is the last one
        if ( sequence.nextFrameID == sequence.frames.length && options.autoStop ) {
          sequence.stopAutoPlay();
        }
      }

    }
  })
})(Tc.$);
(function($) {
  Tc.Module.Gallery = Tc.Module.extend({
    init: function($ctx, sandbox, modId) {
      this._super($ctx, sandbox, modId);
    },
    dependencies: function() {
    },
    onBinding: function() {
      var $ctx = this.$ctx;

      function updateOverflowingProfiles() {
        $('.gallery > li', $ctx).each(function() {
          var card = $(this);
          var link = card.children('a');
          var overlay = link.find('.overlay');
          var info = link.find('.thumb-info');
          var heading = info.children('h3');
          var description = info.find('p').first().addClass('profile-description');

          if (description.length && !description.parent().hasClass('profile-description-window')) {
            description.wrap('<div class="profile-description-window"></div>');
          }

          var descriptionWindow = description.parent('.profile-description-window');
          description.removeClass('is-overflowing is-marquee-active');
          descriptionWindow.removeClass('is-overflowing').css('height', 'auto');
          info.removeClass('has-overflowing-description');

          var availableHeight = Math.max(overlay.innerHeight() - heading.outerHeight(true) - 40, 0);
          var fadeInset = Math.min(28, availableHeight * 0.12);
          var contentHeight = description.length ? description.outerHeight(true) + fadeInset : 0;
          var readableHeight = Math.max(availableHeight - (fadeInset * 2), 0);
          var shouldMarquee = contentHeight > readableHeight;
          var overflowDistance = shouldMarquee
            ? Math.max(contentHeight - (availableHeight - fadeInset), fadeInset)
            : 0;

          description.toggleClass('is-overflowing', shouldMarquee);
          descriptionWindow.toggleClass('is-overflowing', shouldMarquee);
          descriptionWindow.css('height', shouldMarquee ? availableHeight + 'px' : 'auto');
          info.toggleClass('has-overflowing-description', shouldMarquee);

          if (description.length) {
            description[0].style.setProperty('--marquee-inset', fadeInset + 'px');
            description[0].style.setProperty('--marquee-distance', overflowDistance + 'px');
            description[0].style.setProperty('--marquee-duration', Math.max(8, overflowDistance / 10) + 's');
          }
        });
      }

      $ctx.imagesLoaded(function() {
        updateOverflowingProfiles();
      });

      $('.gallery > li > a', $ctx)
        .on('mouseenter focusin', function() {
          var info = $(this).find('.profile-description.is-overflowing');

          if (info.length) {
            info.removeClass('is-marquee-active');
            info[0].offsetHeight;
            info.addClass('is-marquee-active');
          }
        })
        .on('mouseleave focusout', function() {
          $(this).find('.profile-description').removeClass('is-marquee-active');
        });

      $('.gallery > li > a', $ctx).on('click.peopleTouch', function(event) {
        var usesTouchNavigation = window.matchMedia('(hover: none), (pointer: coarse)').matches;
        var card = $(this).parent('li');

        if (!usesTouchNavigation || card.hasClass('touch-open')) {
          return;
        }

        event.preventDefault();
        card.siblings('.touch-open').removeClass('touch-open')
          .find('.profile-description').removeClass('is-marquee-active');
        card.addClass('touch-open');

        var description = card.find('.profile-description.is-overflowing');
        if (description.length) {
          description.removeClass('is-marquee-active');
          description[0].offsetHeight;
          description.addClass('is-marquee-active');
        }
      });

      var overflowResizeTimer;
      $(window).on('resize.peopleGallery', function() {
        clearTimeout(overflowResizeTimer);
        overflowResizeTimer = setTimeout(updateOverflowingProfiles, 120);
      });

      // $('img', $ctx).each(function() {
      //   $(this).css({
      //     'height': $(this).attr('height'),
      //     'width': $(this).attr('width')
      //   });
      // });

      // function pixelized_dimensions(resize) {
      //   $('.item > a', $ctx).css({
      //     width: '99%',
      //     height: 'auto'
      //   });

      //   if(resize) {
      //     $('.item > a', $ctx).css({
      //       width: Math.floor($('.item > a', $ctx).width()),
      //       height: Math.floor($('.item > a', $ctx).height())
      //     });
      //   }
      // }

      // pixelized_dimensions($.browser.mozilla);

      // if(!$.browser.msie) {
      //   var timer;
      //   $(window).resize(function() {
      //     clearTimeout(timer);
      //     timer = setTimeout(function() {
      //       pixelized_dimensions(true);
      //     }, 100);
      //   });
      // }

      $('.gallery-nav [data-cat]', $ctx).click(function() {
        var module = $(this).closest('.modGallery');
        var navigation = module.children('.gallery-nav');
        var gallery = module.children('ul.gallery');

        navigation.find('li').removeClass('current');
        navigation.find('[data-cat]').attr('aria-pressed', 'false');
        $(this).attr('aria-pressed', 'true').closest('li').addClass('current');

        var cat = $(this).attr('data-cat');
        navigation.find('.gallery-filter-select').val(cat);

        var items = gallery.children('li');
        var previousTimer = gallery.data('filter-timer');

        if (previousTimer) {
          clearTimeout(previousTimer);
        }

        items.css({ transition: '', transform: '', opacity: '' })
          .removeClass('is-filtering is-entering')
          .removeData('filter-position');

        items.not('.hidden').each(function() {
          $(this).data('filter-position', {
            left: this.offsetLeft,
            top: this.offsetTop
          });
        });

        items.addClass('is-filtering');

        var filterTimer = setTimeout(function() {
          items.each(function() {
            var item = $(this);
            var shouldShow = cat === 'all' || item.hasClass(cat);
            item.toggleClass('hidden', !shouldShow);
          });

          var visibleItems = items.not('.hidden');
          items.removeClass('is-filtering');

          visibleItems.each(function() {
            var previous = $(this).data('filter-position');
            var keyframes;

            if (previous) {
              var deltaX = previous.left - this.offsetLeft;
              var deltaY = previous.top - this.offsetTop;

              keyframes = [
                { transform: 'translate(' + deltaX + 'px, ' + deltaY + 'px)', opacity: 1 },
                { transform: 'translate(0, 0)', opacity: 1 }
              ];
            } else {
              keyframes = [
                { transform: 'scale(0.94)', opacity: 0 },
                { transform: 'scale(1)', opacity: 1 }
              ];
            }

            if (this.animate) {
              this.animate(keyframes, {
                delay: previous ? 0 : 70,
                duration: previous ? 460 : 320,
                easing: 'cubic-bezier(0.22, 1, 0.36, 1)',
                fill: 'backwards'
              });
            }

            $(this).removeData('filter-position');
          });

          gallery.removeData('filter-timer');
        }, 160);

        gallery.data('filter-timer', filterTimer);

        return false;

      });

      $('.gallery-filter-select', $ctx).on('change', function() {
        var navigation = $(this).closest('.gallery-nav');
        var category = this.value;

        navigation.find('[data-cat]').filter(function() {
          return $(this).attr('data-cat') === category;
        }).first().trigger('click');
      });

    }
  })
})(Tc.$);
(function($) {
  Tc.Module.IconText = Tc.Module.extend({
    init: function($ctx, sandbox, modId) {
      this._super($ctx, sandbox, modId);
    },
    dependencies: function() {
      // this.require('jquery.ui.core.js', 'plugin', 'onBinding');
    },
    onBinding: function() {
      var $ctx = this.$ctx;
    }
  })
})(Tc.$);
(function($) {
  Tc.Module.MasonryGallery = Tc.Module.extend({
    init: function($ctx, sandbox, modId) {
      this._super($ctx, sandbox, modId);
    },
    dependencies: function() {
      // this.require('jquery.ui.core.js', 'plugin', 'onBinding');
    },
    onBinding: function() {
      var $ctx = this.$ctx;

      var items = $('.gallery li', $ctx);
      items.each(function(index, value) {
        $(this).data('masonry-id', index);
      });

      var msnry = new Masonry($('.gallery')[0], { itemSelector: 'li', gutter: 0, isInitLayout: false });

      window.msnry = msnry;

      $('.gallery', $ctx).imagesLoaded( function() {
        // setTimeout(function() {})
        // console.log($('#main').width());
        // console.log($('body').width());
        // console.log($('.gallery').width());
        msnry.layout();
      });

      $('.gallery-nav ul li a', $ctx).click(function() {

        $('.gallery-nav ul li').removeClass('current');
        $(this).closest('li').addClass('current');

        var cat = $(this).attr('data-cat');

        var gallery = $('.gallery-nav').closest('.mod').find('ul.gallery');

        if (cat === 'all') {
          // var masonryItems = [];
          // $('.gallery li').each(function() {
          //   masonryItems.push(msnry.getItem($(this)[0]))
          // });

          // msnry.reveal(masonryItems);
          // TODO:
          // 1. remove all
          // 2. add all
          //

          // $('li', gallery).each(function() {
          //   msnry.remove($(this));
          // });

          var exists = $('.gallery li', $ctx);
          // console.log(exists);
          var elems = [];

          $(items).each(function() {
            var item = this;
            var skip = false;

            exists.each(function() {
              if ($(item).data('masonry-id') == $(this).data('masonry-id')) {
                skip = true;
              }
            });

            if (!skip) {
              ($('.gallery', $ctx)[0]).appendChild($(this)[0]);
              elems.push($(this)[0]);
            }
          });

          msnry.prepended(elems);

        } else {

          $('li', gallery).each(function() {
            if (!$(this).hasClass(cat)) {
              msnry.remove($(this));
            }
          });

          var exists = $('.gallery li', $ctx);
          var elems = [];

          $(items).each(function() {
            var item = this;
            var skip = false;

            exists.each(function() {
              if ($(item).data('masonry-id') == $(this).data('masonry-id')) {
                skip = true;
              }
            })

            if ( $(this).hasClass(cat) && !skip) {
              ($('.gallery', $ctx)[0]).appendChild($(this)[0]);
              elems.push($(this)[0]);
            }
          });

          msnry.appended(elems);

        }

        msnry.layout();

        // console.log(items);

        return false;

      });

    }
  })
})(Tc.$);
(function($) {
  Tc.Module.Milestone = Tc.Module.extend({
    init: function($ctx, sandbox, modId) {
      this._super($ctx, sandbox, modId);
    },
    dependencies: function() {
      // this.require('jquery.appear.js', 'plugin', 'onBinding');
    },
    onBinding: function() {
      var $ctx = this.$ctx;

      $ctx.appear(function() {
        $('strong', $ctx).countTo({
          speed: 1400
        });
      });

    }
  })
})(Tc.$);
(function($) {
  Tc.Module.PriceBox = Tc.Module.extend({
    init: function($ctx, sandbox, modId) {
      this._super($ctx, sandbox, modId);
    },
    dependencies: function() {
      // this.require('jquery.ui.core.js', 'plugin', 'onBinding');
    },
    onBinding: function() {
      var $ctx = this.$ctx;
    }
  })
})(Tc.$);
(function($) {
  Tc.Module.SectionHeader = Tc.Module.extend({    
    init: function($ctx, sandbox, modId) {
      this._super($ctx, sandbox, modId);
    },    
    dependencies: function() {
    },
    onBinding: function() {
      var $ctx = this.$ctx;
    }
  })
})(Tc.$);
(function($) {
  Tc.Module.TeamMember = Tc.Module.extend({
    init: function($ctx, sandbox, modId) {
      this._super($ctx, sandbox, modId);
    },
    dependencies: function() {
      // this.require('jquery.ui.core.js', 'plugin', 'onBinding');
    },
    onBinding: function() {
      var $ctx = this.$ctx;
    }
  })
})(Tc.$);
(function($) {
  Tc.Module.Testimonials = Tc.Module.extend({
    init: function($ctx, sandbox, modId) {
      this._super($ctx, sandbox, modId);
    },
    dependencies: function() {
      // this.require('slick.min.js', 'plugin', 'onBinding');
    },
    onBinding: function() {
      var $ctx = this.$ctx;

      var show_dots = true;

      if ($ctx.hasClass('simple')) {
        show_dots = false;
      }

      $('.items', $ctx).slick({
        autoplay: true,
        pauseOnHover: false,
        dots: show_dots,
        speed: 1500,
        arrows: false
      });

    }
  })
})(Tc.$);
var BibTexHash = new Hash(); function changeBibtexType(c, a) {
    var b = c.getParent("form"); b.getElements("input").each(function (f) {
        if (f.get("type") == "text" || f.get("type") == "hidden") {
            BibTexHash.set(f.get("name"), f.get("value"))
        }
    }); var d = "bibtex=" + c.options[c.selectedIndex].value + "&biblio_type=" + a + "&ajax=true"; if (BibTexHash.has("id")) {
        d += "&id=" + BibTexHash.get("id")
    } new Request.HTML({
        url: PREFIX + "bibwiki/fields", method: "get", data: d, update: $("TB_ajaxContent"), onComplete: function () {
            BibTexHash.each(function (f, e) {
                if ($(e)) {
                    $(e).set("value", f)
                }
            })
        }
    }).send()
}
