
$(document).ready(function(){
  $('.autoplay').slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2500,
    speed: 500,
    arrows: false,
    dots: true,
    adaptiveHeight: true,
    customPaging: function(slider, i) {
      // this example would render "tabs" with titles
      return '<span class="dot"></span>';
    },
  });
});

/* Toggle between showing and hiding the navigation menu links when the user clicks on the hamburger menu / bar icon */
function myFunction() {
  var x = document.getElementById("myLinks");
  if (x.style.display === "block") {
    x.style.display = "none";
  } else {
    x.style.display = "block";
  }
}