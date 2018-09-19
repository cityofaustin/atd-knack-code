
//  ** Global Sign-In Form **
//  make "location" field invisible (but not hidden)
$(document).on('knack-view-render.view_8', function(event, view, data) {
  $("#kn-input-field_6").css({"background-color": "white", "color":"white", "position":"absolute", "right":0})
  $("#view_8-field_6").css({"border":"none", "color":"white"})
})


// ** LCRA Home Page **
$(document).on('knack-view-render.view_13', function(event, view, data) {

    $('<div/>', {
      id: 'sign-in',
    }).appendTo('#view_13');

    $('<div/>', {
      id: 'sign-out',
    }).appendTo('#view_13');
    
    // add url parameter so that location is set automatically 
    $("#sign-in").append("<a href='https://atd.knack.com/atd-visitor-log#sign-in/?view_8_vars=%7B%22field_6%22%3A%22LCRA%22%7D'><div class='big-button-container'><span><i class='fa fa-angle-double-right sign-in-icon'></i></span><span> Sign In </span></div></a>");
    $("#sign-out").append("<a href='https://atd.knack.com/atd-visitor-log#sign-out/'><div class='big-button-container'><span> Sign Out </span><span><i class='fa fa-angle-double-right sign-in-icon'></span></i></div></a>");

});


// ** LCRA Sign-Out **
$(document).on('knack-view-render.view_23', function(event, view, data) {

  // Redirect after 3 seconds
  window.setTimeout(function() {
      window.location.href = 'https://atd.knack.com/atd-visitor-log';
  }, 3000);
  
});


// ** Barton Oaks (Formerly Toomey Rd) Home Page **
$(document).on('knack-view-render.view_26', function(event, view, data) {

    $('<div/>', {
      id: 'sign-in',
    }).appendTo('#view_26');

    $('<div/>', {
      id: 'sign-out',
    }).appendTo('#view_26');
    
    // add url parameter so that location is set automatically 
    $("#sign-in").append("<a href='https://atd.knack.com/atd-visitor-log#sign-in/?view_8_vars=%7B%22field_6%22%3A%22Barton Oaks%22%7D'><div class='big-button-container'><span><i class='fa fa-angle-double-right sign-in-icon'></i></span><span> Sign In </span></div></a>");
    $("#sign-out").append("<a href='https://atd.knack.com/atd-visitor-log#sign-out-barton-oaks/'><div class='big-button-container'><span> Sign Out </span><span><i class='fa fa-angle-double-right sign-in-icon'></span></i></div></a>");

});


// ** Toomey Rd Sign-Out **
$(document).on('knack-view-render.view_31', function(event, view, data) {

  // redirect after 3 seconds
  window.setTimeout(function() {
      window.location.href = 'https://atd.knack.com/atd-visitor-log#home-barton-oaks/';
  }, 3000);
  
});


// ** Rio Grande Home Page **
$(document).on('knack-view-render.view_33', function(event, view, data) {

    $('<div/>', {
      id: 'sign-in',
    }).appendTo('#view_33');

    $('<div/>', {
      id: 'sign-out',
    }).appendTo('#view_33');
    
    // add url parameter so that location is set automatically 
    $("#sign-in").append("<a href='https://atd.knack.com/atd-visitor-log#sign-in/?view_8_vars=%7B%22field_6%22%3A%22Rio Grande%22%7D'><div class='big-button-container'><span><i class='fa fa-angle-double-right sign-in-icon'></i></span><span> Sign In </span></div></a>");
    $("#sign-out").append("<a href='https://atd.knack.com/atd-visitor-log#sign-out-rio-grande/'><div class='big-button-container'><span> Sign Out </span><span><i class='fa fa-angle-double-right sign-in-icon'></span></i></div></a>");

});


// ** Rio Grande Sign-Out **
$(document).on('knack-view-render.view_34', function(event, view, data) {

  // redirect after 3 seconds
  window.setTimeout(function() {
      window.location.href = 'https://atd.knack.com/atd-visitor-log#home-rio-grande/';
  }, 3000);
  
});


//  remove log out link and crumbtrail from all views
$(document).on('knack-page-render.any', function() {
    $(".kn-back-link").remove();
    $(".kn-current_user").remove();
    $(".kn-crumbtrail").remove();
});


$(document).on('knack-page-render.any', function(event, page) {

  // Convert name entry to upper case 
  //  This is required in addition to the uppercase css text transform, which is superficial
  $('.kn-input-name input').keyup(function(){
      this.value = this.value.toUpperCase();
  });


});
