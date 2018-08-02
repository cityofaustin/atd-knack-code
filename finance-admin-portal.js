function changeFieldColor(field, color_map){
  var child_field = $(field).find('.kn-detail-body');
  var value = child_field.text()
  if (color_map[value]) {
    console.log(color_map[value]);
    $(child_field).css({'background-color' : color_map[value].background_color, 'color': color_map[value].color });
  }
}

var colorMapOne = {
   "Not Submitted" : { "background_color" : "#ff9b9c", "color" : "#fff" },
   "Returned" : { "background_color" : "#E41A1C", "color" : "#fff" },
   "Rejected" : { "background_color" : "#6a6565", "color" : "#fff" },
   "Cancelled" : { "background_color" : "#adadad", "color" : "#fff" },
   "Waiting for Approval": { "background_color" : "#377eb8", "color" : "#fff" },
    "Purchase Review" : { "background_color" : "#99d8c9", "color" : "#fff" },
    "Budget Review" : { "background_color" : "#41ae76", "color" : "#fff" },
    "Processing | Purchasing" : { "background_color" : "#006d2c", "color" : "#fff" },
    "Processing | Accounts Payable" : { "background_color" : "#006d2c", "color" : "#fff" },
    "Closed" : { "background_color" : "#ffffff", "color" : "#fff" },
}

$(document).on('knack-scene-render.any', function() {
  //  work orders signs/markings status
  changeFieldColor('.field_17', colorMapOne);
  
});
  

$(document).on('knack-page-render.scene_1', function(event, page) {
  //  Create landing page buttons
    $('<div/>', {
      id: 'all',
    }).appendTo('#view_167');

    $('<div/>', {
      id: 'create',
    }).appendTo('#view_167');
    
    $('<div/>', {
      id: 'review',
    }).appendTo('#view_167');

    $('<div/>', {
      id: 'my',
    }).appendTo('#view_167');

    $("#all").append("<a class='big-button' href='https://atd.knack.com/finance-admin#purchase-requests/'><div class='big-button-container'><span><i class='fa fa-archive'></i></span><span> All Purchase Requests </span></div></a>");
    $("#create").append("<a class='big-button' href='https://atd.knack.com/finance-admin#new-purchase-requests/'><div class='big-button-container'><span><i class='fa fa-plus-circle'></i></span><span> New Purchase Request </span></div></a>");
    $("#review").append("<a class='big-button' href='https://atd.knack.com/finance-admin#reviews/'><div class='big-button-container'><span><i class='fa fa-check-square-o'></i></span><span> Review Purchase Requests </span></div></a>");
    $("#my").append("<a class='big-button' href='https://atd.knack.com/finance-admin#my-purchase-requests/'><div class='big-button-container'><span><i class='fa fa-male'></i></span><span> My Purchase Requests </span></div></a>");
});


