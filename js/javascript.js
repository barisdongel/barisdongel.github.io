
var TxtRotate = function(el, toRotate, period) {
  this.toRotate = toRotate;
  this.el = el;
  this.loopNum = 0;
  this.period = parseInt(period, 10) || 2000;
  this.txt = '';
  this.tick();
  this.isDeleting = false;
};

TxtRotate.prototype.tick = function() {
  var i = this.loopNum % this.toRotate.length;
  var fullTxt = this.toRotate[i];

  if (this.isDeleting) {
    this.txt = fullTxt.substring(0, this.txt.length - 1);
  } else {
    this.txt = fullTxt.substring(0, this.txt.length + 1);
  }

  this.el.innerHTML = '<span class="wrap">'+this.txt+'</span>';

  var that = this;
  var delta = 300 - Math.random() * 100;

  if (this.isDeleting) { delta /= 2; }

  if (!this.isDeleting && this.txt === fullTxt) {
    delta = this.period;
    this.isDeleting = true;
  } else if (this.isDeleting && this.txt === '') {
    this.isDeleting = false;
    this.loopNum++;
    delta = 500;
  }

  setTimeout(function() {
    that.tick();
  }, delta);
};

window.onload = function() {
  var elements = document.getElementsByClassName('txt-rotate');
  for (var i=0; i<elements.length; i++) {
    var toRotate = elements[i].getAttribute('data-rotate');
    var period = elements[i].getAttribute('data-period');
    if (toRotate) {
      new TxtRotate(elements[i], JSON.parse(toRotate), period);
    }
  }
  // INJECT CSS
  var css = document.createElement("style");
  css.type = "text/css";
  css.innerHTML = ".txt-rotate > .wrap { border-right: 0.08em solid #666 }";
  document.body.appendChild(css);
};

$(document).ready(function(){
    $('.customer-logos').slick({
        slidesToShow: 6,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 1500,
        arrows: false,
        dots: false,
        pauseOnHover: false,
        responsive: [{
            breakpoint: 768,
            settings: {
                slidesToShow: 4
            }
        }, {
            breakpoint: 520,
            settings: {
                slidesToShow: 3
            }
        }]
    });
});

jQuery(document).ready(function($) {

  var feedbackSlider = $('.feedback-slider');
  feedbackSlider.owlCarousel({
    items: 1,
    nav: true,
    dots: true,
    autoplay: true,
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    navText: ["<i class='fa fa-long-arrow-left'></i>", "<i class='fa fa-long-arrow-right'></i>"],
    responsive:{

      // breakpoint from 767 up
      767:{
        nav: true,
        dots: false
      }
    }
  });

  feedbackSlider.on("translate.owl.carousel", function(){
    $(".feedback-slider-item h3").removeClass("animated fadeIn").css("opacity", "0");
    $(".feedback-slider-item img, .feedback-slider-thumb img, .customer-rating").removeClass("animated zoomIn").css("opacity", "0");
  });

  feedbackSlider.on("translated.owl.carousel", function(){
    $(".feedback-slider-item h3").addClass("animated fadeIn").css("opacity", "1");
    $(".feedback-slider-item img, .feedback-slider-thumb img, .customer-rating").addClass("animated zoomIn").css("opacity", "1");
  });
  feedbackSlider.on('changed.owl.carousel', function(property) {
    var current = property.item.index;
    var prevThumb = $(property.target).find(".owl-item").eq(current).prev().find("img").attr('src');
    var nextThumb = $(property.target).find(".owl-item").eq(current).next().find("img").attr('src');
    var prevRating = $(property.target).find(".owl-item").eq(current).prev().find('span').attr('data-rating');
    var nextRating = $(property.target).find(".owl-item").eq(current).next().find('span').attr('data-rating');
    $('.thumb-prev').find('img').attr('src', prevThumb);
    $('.thumb-next').find('img').attr('src', nextThumb);
    $('.thumb-prev').find('span').next().html(prevRating + '<i class="fa fa-star"></i>');
    $('.thumb-next').find('span').next().html(nextRating + '<i class="fa fa-star"></i>');
  });
  $('.thumb-next').on('click', function() {
    feedbackSlider.trigger('next.owl.carousel', [300]);
    return false;
  });
  $('.thumb-prev').on('click', function() {
    feedbackSlider.trigger('prev.owl.carousel', [300]);
    return false;
  });
  
}); //end ready

  jQuery(document).ready(function($) {
            "use strict";
            //  TESTIMONIALS CAROUSEL HOOK
            $('#customers-testimonials').owlCarousel({
                loop: true,
                center: true,
                items: 3,
                margin: 0,
                autoplay: true,
                dots:true,
                autoplayTimeout: 8500,
                smartSpeed: 450,
                responsive: {
                  0: {
                    items: 1
                  },
                  768: {
                    items: 2
                  },
                  1170: {
                    items: 3
                  }
                }
            });
          });
