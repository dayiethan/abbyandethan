/*global $, jQuery, alert*/
$(document).ready(function() {

  'use strict';

  // ========================================================================= //
  //  //SMOOTH SCROLL
  // ========================================================================= //


  $(document).on("scroll", onScroll);

  $('a[href^="#"]').on('click', function(e) {
    e.preventDefault();
    $(document).off("scroll");

    $('a').each(function() {
      $(this).removeClass('active');
      if ($(window).width() < 768) {
        $('.nav-menu').slideUp();
      }
    });

    $(this).addClass('active');

    var target = this.hash,
        menu = target;

    target = $(target);
    $('html, body').stop().animate({
      'scrollTop': target.offset().top - 80
    }, 500, 'swing', function() {
      window.location.hash = target.selector;
      $(document).on("scroll", onScroll);
    });
  });


  function onScroll(event) {
    if ($('.home').length) {
      var scrollPos = $(document).scrollTop();
      $('nav ul li a').each(function() {
        var currLink = $(this);
        var refElement = $(currLink.attr("href"));
      });
    }
  }

  // ========================================================================= //
  //  //NAVBAR SHOW - HIDE
  // ========================================================================= //


  $(window).scroll(function() {
    var scroll = $(window).scrollTop();
    if (scroll > 200 ) {
      $("#main-nav, #main-nav-subpage").slideDown(700);
      $("#main-nav-subpage").removeClass('subpage-nav');
    } else {
      $("#main-nav").slideUp(700);
      $("#main-nav-subpage").hide();
      $("#main-nav-subpage").addClass('subpage-nav');
    }
  });

  // ========================================================================= //
  //  // RESPONSIVE MENU
  // ========================================================================= //

  $('.responsive').on('click', function(e) {
    $('.nav-menu').slideToggle();
  });

  // ========================================================================= //
  //  Typed Js
  // ========================================================================= //

  var typed = $(".typed");

  $(function() {
    typed.typed({
      strings: ["7/30/2021", "I Love You"],
      typeSpeed: 125,
      loop: true,
    });
  });


  // ========================================================================= //
  //  Owl Carousel Services
  // ========================================================================= //


  $('.services-carousel').owlCarousel({
      autoplay: true,
      loop: true,
      margin: 20,
      dots: true,
      nav: false,
      responsiveClass: true,
      responsive: { 0: { items: 1 }, 768: { items: 2 }, 900: { items: 4 } }
    });

  // ========================================================================= //
  //  magnificPopup
  // ========================================================================= //

  var magnifPopup = function() {
    $('.popup-img').magnificPopup({
      type: 'image',
      removalDelay: 300,
      mainClass: 'mfp-with-zoom',
      gallery: {
        enabled: true
      },
      zoom: {
        enabled: true, // By default it's false, so don't forget to enable it

        duration: 300, // duration of the effect, in milliseconds
        easing: 'ease-in-out', // CSS transition easing function

        // The "opener" function should return the element from which popup will be zoomed in
        // and to which popup will be scaled down
        // By defailt it looks for an image tag:
        opener: function(openerElement) {
          // openerElement is the element on which popup was initialized, in this case its <a> tag
          // you don't need to add "opener" option if this code matches your needs, it's defailt one.
          return openerElement.is('img') ? openerElement : openerElement.find('img');
        }
      }
    });
  };


  // Call the functions
  magnifPopup();

   // ===== Countdown Section =====
  const startDate    = new Date('2021-07-30T00:00:00');
  const daysCountEl  = document.getElementById('daysCount');
  const annivCountEl = document.getElementById('annivCountdown');

  // Helper: compute full years/months/days difference
  function getYMDDiff(start, end) {
    const sy = start.getFullYear(), sm = start.getMonth(), sd = start.getDate();
    const ey = end.getFullYear(),   em = end.getMonth(),   ed = end.getDate();

    let years  = ey - sy;
    let months = em - sm;
    let days   = ed - sd;

    // If days negative, borrow from previous month
    if (days < 0) {
      months--;
      const prevMonth = (em - 1 + 12) % 12;
      const prevYear  = em === 0 ? ey - 1 : ey;
      const daysInPrevMonth = new Date(prevYear, prevMonth + 1, 0).getDate();
      days += daysInPrevMonth;
    }
    // If months negative, borrow from years
    if (months < 0) {
      years--;
      months += 12;
    }

    return { years, months, days };
  }

  function updateCountdown() {
    const now = new Date();

    // 1) Years-Months-Days Together
    const { years, months, days } = getYMDDiff(startDate, now);
    daysCountEl.textContent =
      `${years} year${years !== 1 ? 's' : ''} ` +
      `${months} month${months !== 1 ? 's' : ''} ` +
      `${days} day${days !== 1 ? 's' : ''}`;

    // 2) Next Anniversary countdown (X days HH:MM:SS)
    let year = now.getFullYear();
    let nextAnniv = new Date(`${year}-07-30T00:00:00`);
    if (nextAnniv <= now) {
      nextAnniv.setFullYear(year + 1);
    }
    const remMs = nextAnniv - now;
    const d  = Math.floor(remMs / (1000 * 60 * 60 * 24));
    const h  = String(Math.floor((remMs / (1000 * 60 * 60)) % 24)).padStart(2, '0');
    const m  = String(Math.floor((remMs / (1000 * 60)) % 60)).padStart(2, '0');
    const s  = String(Math.floor((remMs / 1000) % 60)).padStart(2, '0');

    annivCountEl.textContent = `${d} days ${h}:${m}:${s}`;
  }

  // Initialize and update every second
  updateCountdown();
  setInterval(updateCountdown, 1000);

  // ---- Memories Map ----
  const map = L.map('memories-map').setView([34.0522, -118.2437], 4);
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors',
    maxZoom: 18,
  }).addTo(map);

  // array of memory locations: [lat, lng] + popup text
  const memories = [
    { coords: [34.0522, -118.2437], popup: 'Where we first met (LA)' },
    { coords: [40.7128, -74.0060], popup: 'Our NYC weekend getaway' },
    // add more as desired
  ];

  memories.forEach(({ coords, popup }) => {
    L.marker(coords)
      .addTo(map)
      .bindPopup(`<strong>${popup}</strong>`);
  });


});

// ========================================================================= //
//  Porfolio isotope and filter
// ========================================================================= //
$(window).load(function(){

  var portfolioIsotope = $('.portfolio-container').isotope({
    itemSelector: '.portfolio-thumbnail',
    layoutMode: 'fitRows'
  });

  $('#portfolio-flters li').on( 'click', function() {
    $("#portfolio-flters li").removeClass('filter-active');
    $(this).addClass('filter-active');

    portfolioIsotope.isotope({ filter: $(this).data('filter') });
  });

})