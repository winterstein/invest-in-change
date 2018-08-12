/* ------------------------------------------------
  Project:   Hortech - Responsive HTML5 Template
  Build:     Bootstrap 4.0.0
  Author:    ThemeHt
------------------------------------------------ */
/* ------------------------
    Table of Contents

  1. Predefined Variables
  2. Preloader
  3. Owl carousel
  4. Counter
  5. Skill
  6. Isotope
  7. Magnific Popup
  9. Scroll to top
  10. Scrolling Animation
  11. Fixed Header
  12. Background Color And Image
  13. FullScreen
  14. Accordian
  15. Contact Form
  16. HT Window load and functions
  16. Particles
  

------------------------ */

"use strict";


/*------------------------------------
  HT Predefined Variables
--------------------------------------*/
var $window = $(window),
    $document = $(document),
    $body = $('body'),
    $counter = $('.counter'),
    $fullScreen = $('.fullscreen-banner') || $('.section-fullscreen'),
    $halfScreen = $('.halfscreen-banner');


//Check if function exists
$.fn.exists = function () {
  return this.length > 0;
};


/*------------------------------------
  HT PreLoader
--------------------------------------*/
function preloader() {
   $("#load").fadeOut();
   $('#ht-preloader').delay(0).fadeOut('slow');
};

/*------------------------------------
  HT Owl Carousel
--------------------------------------*/
function owlcarousel() {
$('.owl-carousel-0').owlCarousel({
    loop: true,
    margin: 0,
    autoplay:true,
    autoplayTimeout:5000,
    responsiveClass: true,
    responsive: {
      0: {
        items: 1,
      },
      600: {
        items: 1,
      },
      1000: {
        items: 1,
        nav: true,
      }
    }
  })

$('.owl-carousel-1').owlCarousel({
    loop: true,
    margin: 30,
    responsiveClass: true,
    responsive: {
      0: {
        items: 1,
      },
      600: {
        items: 2,
      },
      1000: {
        items: 3,
        dots: true,
      }
    }
  })

$('.owl-carousel-2').owlCarousel({
    animateOut: 'slideOutDown',
    animateIn: 'flipInX',
    loop: true,
    margin: 0,
    responsiveClass: true,
    responsive: {
      0: {
        items: 1,
        dots: false,
      },
      600: {
        items: 1,
        dots: false,
      },
      1000: {
        items: 1,
        nav: true,
        dots: false,
      }
    }
  })

$('.owl-carousel-3').owlCarousel({
    loop: true,
    margin: 30,
    responsiveClass: true,
    responsive: {
      0: {
        items: 2,
        nav: true,
        dots: false,
      },
      600: {
        items: 3,
        nav: true,
        dots: false,
      },
      1000: {
        items: 4,
        nav: true,        
        dots: false,
      }
    }
  })

$('.owl-carousel-4').owlCarousel({
    center: true,
    loop:true,
    margin:30,
    dots: false,
    nav: true, 
    autoslide:true,
    responsive: {
      0: {
        items: 1,
      },
      600: {
        items: 3,

      },
      1000: {
        items: 5,               
      }
    }
})

$('.owl-carousel-5').owlCarousel({
    animateOut: 'slideOutDown',
    animateIn: 'flipInX',
    loop: true,
    margin: 30,
    responsiveClass: true,
    responsive: {
      0: {
        items: 1,
        dots: false,
      },
      600: {
        items: 1,
        dots: false,
      },
      1000: {
        items: 2,
        nav: true,
        dots: false,
      }
    }
  })

}


/*------------------------------------
  HT Counter
--------------------------------------*/
function counter() {
  if ($counter.exists()) {
    $counter.each(function () {
      var $elem = $(this);                 
        $elem.appear(function () {
          $elem.find('.count-number').countTo();
      });                  
    });
  }
}


/*------------------------------------
  HT Skill
--------------------------------------*/  
function skill() {
 $("#htskills").skill();
};


/*------------------------------------
  HT Isotope
--------------------------------------*/ 
function isotope() {
// init Isotope
var $grid = $('.grid').isotope({
  itemSelector: '.grid-item',
  layoutMode: 'fitRows',
});

// filter functions
var filterFns = {
  // show if number is greater than 50
  numberGreaterThan50: function() {
    var number = $(this).find('.number').text();
    return parseInt( number, 10 ) > 50;
  },
  // show if name ends with -ium
  ium: function() {
    var name = $(this).find('.name').text();
    return name.match( /ium$/ );
  }
};

// bind filter button click
$('.portfolio-filter').on( 'click', 'button', function() {
  var filterValue = $( this ).attr('data-filter');
  // use filterFn if matches value
  filterValue = filterFns[ filterValue ] || filterValue;
  $grid.isotope({ filter: filterValue });
});


// change is-checked class on buttons
$('.portfolio-filter').each( function( i, buttonGroup ) {
  var $buttonGroup = $( buttonGroup );
  $buttonGroup.on( 'click', 'button', function() {
    $buttonGroup.find('.is-checked').removeClass('is-checked');
    $( this ).addClass('is-checked');
  });
});
}


/*------------------------------------
  HT Magnific Popup
--------------------------------------*/
function magnificpopup() {
$('.popup-gallery').magnificPopup({
    delegate: 'a.popup-img',
    type: 'image',
    tLoading: 'Loading image #%curr%...',
    mainClass: 'mfp-img-mobile',
    gallery: {
      enabled: true,
      navigateByImgClick: true,
      preload: [0,1] // Will preload 0 - before current, and 1 after the current image
    },
    image: {
      tError: '<a href="%url%">The image #%curr%</a> could not be loaded.',
      titleSrc: function(item) {
        return item.el.attr('title') + '<small>by Marsel Van Oosten</small>';
      }
    }
  });
if ($(".popup-youtube, .popup-vimeo, .popup-gmaps").exists()) {
           $('.popup-youtube, .popup-vimeo, .popup-gmaps').magnificPopup({
                disableOn: 700,
                type: 'iframe',
                mainClass: 'mfp-fade',
                removalDelay: 160,
                preloader: false,
                fixedContentPos: false
          });
      }
}


/*------------------------------------
  HT Scroll to top
--------------------------------------*/
function scrolltop() {
  var $goToTop = $('#scroll-top');
      $goToTop.hide();
      $window.scroll(function(){
        if ($window.scrollTop()>100) $goToTop.fadeIn();
        else $goToTop.fadeOut();
      });
    $goToTop.on("click", function () {
      $('body,html').animate({scrollTop:0},1000);
      return false;
  });
}


/*------------------------------------
  HT Scrolling Animation
--------------------------------------*/
function scrolling() {
    $('.nav-item a, .page-scroll').bind('click', function(event) {
        var $anchor = $(this);
    var hg = $('header').height();
    var scroll_h = $($anchor.attr('href')).offset().top - (hg+50);
        $('html, body').stop().animate({
            scrollTop: scroll_h
        }, 1200);
        event.preventDefault();
    });
};


/*------------------------------------
  HT Fixed Header
--------------------------------------*/
function fxheader() {
$(window).scroll(function(){
    if ($(window).scrollTop() >= 500) {
       $('#header-wrap').addClass('fixed-header');
    }
    else {
       $('#header-wrap').removeClass('fixed-header');
    }
 });
};


/*------------------------------------
  HT Background Color And Image
--------------------------------------*/
function databgcolor() {
    $('[data-bg-color]').each(function(index, el) {
     $(el).css('background-color', $(el).data('bg-color'));  
    });
};

function databgimg() {
    $('[data-bg-img]').each(function() {
     $(this).css('background-image', 'url(' + $(this).data("bg-img") + ')');
    });
};


/*------------------------------------
  HT FullScreen
--------------------------------------*/
function fullScreen() {
    if ($fullScreen.exists()) {
        $fullScreen.each(function () {
        var $elem = $(this),
        elemHeight = $window.height();
        if($window.width() < 768 ) $elem.css('height', elemHeight/ 1);
        else $elem.css('height', elemHeight);
        });
        }
        if ($halfScreen.exists()) {
        $halfScreen.each(function () {
        var $elem = $(this),
        elemHeight = $window.height();
        $elem.css('height', elemHeight / 2);
        });
    }
};


/*------------------------------------
  HT Accordian
--------------------------------------*/
function accordian() { 
  $(".card").on("show.bs.collapse hide.bs.collapse", function(e) {
    if (e.type=='show'){
      $(this).addClass('active');
    }else{
      $(this).removeClass('active');
    }
  });  
$('#accordion .card-header a').prepend('<span></span>');
}


// /*------------------------------------
//   HT Contact Form
// --------------------------------------*/
// function contactform() { 
//     $('#contact-form').validator();

//     // when the form is submitted
//     $('#contact-form').on('submit', function (e) {

//         // if the validator does not prevent form submit
//         if (!e.isDefaultPrevented()) {
//             var url = "php/contact.php";

//             // POST values in the background the the script URL
//             $.ajax({
//                 type: "POST",
//                 url: url,
//                 data: $(this).serialize(),
//                 success: function (data)
//                 {
//                     // data = JSON object that contact.php returns

//                     // we recieve the type of the message: success x danger and apply it to the 
//                     var messageAlert = 'alert-' + data.type;
//                     var messageText = data.message;

//                     // let's compose Bootstrap alert box HTML
//                     var alertBox = '<div class="alert ' + messageAlert + ' alert-dismissable"><button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>' + messageText + '</div>';
                    
//                     // If we have messageAlert and messageText
//                     if (messageAlert && messageText) {
//                         // inject the alert to .messages div in our form
//                         $('#contact-form').find('.messages').html(alertBox);
//                         // empty the form
//                         $('#contact-form')[0].reset();
//                     }
//                 }
//             });
//             return false;
//         }
//     })
// };


/*------------------------------------
  HT Window load and functions
--------------------------------------*/
$(document).ready(function() {
    owlcarousel(),
    counter(),
    magnificpopup(),
    scrolltop(),
    scrolling(),
    fxheader(),
    databgcolor(),
    databgimg(),           
    fullScreen(),
    accordian();
    // contactform();
});


$window.resize(function() {
    fullScreen();
});


$(window).on('load', function() {
    preloader(),
    skill(),
    isotope();
});

/*-----------------------------------------
 Particles
-------------------------------------------*/
// $(document).ready(function() {
//   $('#particles').particleground({
//     dotColor: '#555',
//     lineColor: 'rgba(255,255,255,0.1)'
//   });
// }); 
  
