// to include navbar.html with script
$.get("navbar.html", function(data){
    $("#nav-placeholder").replaceWith(data);
});

// to avoid reloading the current page multiple times
$('.navbar li a').click(function (event){
    event.preventDefault();
    $('body,html').animate({
      scrollTop: $($(this).attr('href')).offset().top - 100},2000);
  });