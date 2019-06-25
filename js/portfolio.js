(function($) {
  "use strict"; 

  // Sulkee sivulla olevan menupalkin
  $(".menu-toggle").click(function(e) {
    e.preventDefault();
    $("#sidebar-wrapper").toggleClass("active");
    $(".menu-toggle > .fa-bars, .menu-toggle > .fa-times").toggleClass("fa-bars fa-times");
    $(this).toggleClass("active");
  });

  // Smooth scrolling using jQuery easing
  $('a.js-scroll-trigger[href*="#"]:not([href="#"])').click(function() {
    if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
      if (target.length) {
        $('html, body').animate({
          scrollTop: target.offset().top
        }, 1000, "easeInOutExpo");
        return false;
      }
    }
  });

  // Sulkee responsiivisen menupalkin, kun jotakin menun linkkiä napsautetaan
  $('#sidebar-wrapper .js-scroll-trigger').click(function() {
    $("#sidebar-wrapper").removeClass("active");
    $(".menu-toggle").removeClass("active");
    $(".menu-toggle > .fa-bars, .menu-toggle > .fa-times").toggleClass("fa-bars fa-times");
  });

  // "Selaa ylös" -painike ilmestyy
  $(document).scroll(function() {
    var scrollDistance = $(this).scrollTop();
    if (scrollDistance > 100) {
      $('.scroll-to-top').fadeIn();
    } else {
      $('.scroll-to-top').fadeOut();
    }
  });

})(jQuery); 



  // KARTTA

  // Poistetaan käytöstä kartan vieritys
  // Poistetaan "scroll zooming" 
  var onMapMouseleaveHandler = function(event) {
    var that = $(this);
    that.on('click', onMapClickHandler);
    that.off('mouseleave', onMapMouseleaveHandler);
    that.find('iframe').css("pointer-events", "none");
  }
  var onMapClickHandler = function(event) {
    var that = $(this);
    // Poistetaan klikkaus käytöstä, kunnes käyttäjä poistuu kartan alueelta
    that.off('click', onMapClickHandler);
    // Voi vierittää zoomilla
    that.find('iframe').css("pointer-events", "auto");
    // Mouse leave event
    that.on('mouseleave', onMapMouseleaveHandler);
  }

  // Kartan zoomaus hiirellä käyttöön, kun käyttäjä klikkaa karttaa
  $('.map').on('click', onMapClickHandler);

  // asetetaan näkymä suoraan jyväskylään
  var mymap = L.map('mapid').setView([62.240278, 25.744444], 13);

  L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoieXVyaWFoYW5pIiwiYSI6ImNqanljZTFrMTBjMGEza25kMjBlZGZkdXYifQ.gxDr4e24ngDBS2ZmLueSuw', {
      attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
      maxZoom: 18,
      id: 'mapbox.streets'
  }).addTo(mymap);

  // Jyväskylän keskusta
  var marker = L.marker([62.2426436,25.747378]).addTo(mymap);
  // JAMK
  var markerr = L.marker([62.2417018,25.7573064]).addTo(mymap);

  // popupit
  marker.bindPopup("<b>Jyväskylä centrum<b>");
  markerr.bindPopup("<b>JAMK<br>Piippukatu 2, 40100 Jyväskylä<b>");

  var popup = L.popup();

  // random valittu kohta kartalta
  function onMapClick(e) {
      popup
          .setLatLng(e.latlng)
          .setContent("You clicked the map at " + e.latlng.toString())
          .openOn(mymap);
  }

  mymap.on('click', onMapClick);

  // MESSAGE ALERT

    	function messageSended() {
      		alert("Message succesfully sended!");
  	}


// lightbox

lightbox.option({
    'wrapAround': true,
    'resizeDuration': 200
})
   