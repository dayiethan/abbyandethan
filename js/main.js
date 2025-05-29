/*global $, jQuery, alert*/
$(document).ready(function() {

  'use strict';

  // ========================================================================= //
  //  // NAVBAR SETUP
  // ========================================================================= //
  
  // Navbar height for offset calculations
  const navbarHeight = $('#navbar').outerHeight();

  // Function to set active nav link based on scroll position
  function setActiveNavLink() {
    const scrollPos = $(document).scrollTop();
    const offset = navbarHeight + 10;
    
    $('#navbar .nav-menu li a').each(function() {
      const currLink = $(this);
      const refElement = $(currLink.attr("href"));
      
      if (refElement.length && 
          refElement.offset().top <= scrollPos + offset && 
          refElement.offset().top + refElement.outerHeight() > scrollPos + offset) {
        $('#navbar .nav-menu li a').removeClass("active");
        currLink.addClass("active");
      }
    });
  }

  // Navbar toggle for mobile
  $('.responsive').on('click', function() {
    $('#navbar .nav-menu').toggleClass('show');
  });

  // Close mobile menu when clicking links
  $('#navbar .nav-menu li a').on('click', function() {
    if ($(window).width() < 992) {
      $('#navbar .nav-menu').removeClass('show');
    }
  });

  // ========================================================================= //
  //  //SMOOTH SCROLL
  // ========================================================================= //

  $(document).on("scroll", onScroll);

  // Update to only target navbar links
  $('#navbar .nav-menu li a[href^="#"]').on('click', function(e) {
    e.preventDefault();
    $(document).off("scroll");

    // Remove active class from all links
    $('#navbar .nav-menu li a').removeClass('active');
    // Add active class to clicked link
    $(this).addClass('active');

    const target = this.hash;
    const $target = $(target);
    
    $('html, body').stop().animate({
      scrollTop: $target.offset().top - navbarHeight + 2
    }, 500, 'swing', function() {
      window.location.hash = target;
      $(document).on("scroll", onScroll);
    });
  });

  function onScroll(event) {
    setActiveNavLink();
  }

  // Set active nav link on page load
  setActiveNavLink();

  // ========================================================================= //
  //  //NAVBAR SHOW - HIDE
  // ========================================================================= //

  $(window).scroll(function() {
    const scroll = $(window).scrollTop();
    if (scroll > 200) {
      $("#navbar").css('background', 'rgba(255, 255, 255, 0.97)');
      $("#navbar").css('box-shadow', '0 2px 15px rgba(0, 0, 0, 0.1)');
    } else {
      $("#navbar").css('background', 'rgba(255, 255, 255, 0.9)');
      $("#navbar").css('box-shadow', 'none');
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
        enabled: true,
        duration: 300,
        easing: 'ease-in-out',
        opener: function(openerElement) {
          return openerElement.is('img') ? openerElement : openerElement.find('img');
        }
      }
    });
  };

  // Call the functions
  magnifPopup();

  // ===== Countdown Section =====
  const startDate = new Date('2021-07-30T00:00:00');
  const daysCountEl = document.getElementById('daysCount');
  const annivCountEl = document.getElementById('annivCountdown');

  // Helper: compute full years/months/days difference
  function getYMDDiff(start, end) {
    const sy = start.getFullYear(), sm = start.getMonth(), sd = start.getDate();
    const ey = end.getFullYear(), em = end.getMonth(), ed = end.getDate();

    let years = ey - sy;
    let months = em - sm;
    let days = ed - sd;

    if (days < 0) {
      months--;
      const prevMonth = (em - 1 + 12) % 12;
      const prevYear = em === 0 ? ey - 1 : ey;
      const daysInPrevMonth = new Date(prevYear, prevMonth + 1, 0).getDate();
      days += daysInPrevMonth;
    }
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
    const d = Math.floor(remMs / (1000 * 60 * 60 * 24));
    const h = String(Math.floor((remMs / (1000 * 60 * 60)) % 24)).padStart(2, '0');
    const m = String(Math.floor((remMs / (1000 * 60)) % 60)).padStart(2, '0');
    const s = String(Math.floor((remMs / 1000) % 60)).padStart(2, '0');

    annivCountEl.textContent = `${d} days ${h}:${m}:${s}`;
  }

  // Initialize and update every second
  updateCountdown();
  setInterval(updateCountdown, 1000);

  // ---- Memories Map ----
  const map = L.map('memories-map', { zoomControl: false }).setView([34.0522, -118.2437], 4);

  // Modern Light Basemap
  L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
    attribution: '&copy; OpenStreetMap & CartoDB',
    maxZoom: 18,
  }).addTo(map);

  // Controls
  L.control.zoom({ position: 'bottomright' }).addTo(map);
  L.control.scale({ imperial: false, metric: true, position: 'bottomleft' }).addTo(map);

  // Custom heart icon
  const heartIcon = L.divIcon({
    html: '<i class="fas fa-heart"></i>',
    className: 'custom-div-icon',
    iconSize: [30, 42],
    iconAnchor: [15, 42],
    popupAnchor: [0, -40]
  });

  // Memory locations
  const memories = [
    { coords: [43.06589494223367, -89.45838150517925], popup: 'Where we first met! (Van Hise Elementary)' },
    { coords: [43.06876951007411, -89.4269846243648], popup: 'Where we first started dating! (West High School)' },
    { coords: [37.828523394482566, -122.26840535463208], popup: 'Our first home together!' },
  ];

  memories.forEach(({ coords, popup }) => {
    const marker = L.marker(coords, { icon: heartIcon })
      .addTo(map)
      .bindPopup(`<strong>${popup}</strong>`);

    marker.on('click', () => {
      const currentZoom = map.getZoom();
      const maxZoom     = map.getMaxZoom();

      // 1) Convert this marker’s latlng to screen pixels
      const thisPoint  = map.latLngToContainerPoint(marker.getLatLng());

      // 2) Count how many memories fall within 30px of that click
      const closeBy = memories.filter(m => {
        const p = map.latLngToContainerPoint(m.coords);
        return thisPoint.distanceTo(p) < 30;
      }).length;

      if (closeBy > 1 && currentZoom < maxZoom - 1) {
        // zoom in two levels (you can tweak the +2)
        map.setView(marker.getLatLng(), currentZoom + 8, { animate: true });
      } else {
        // just show the popup
        marker.openPopup();
      }
    });
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

});