function changeFieldColor(field, color_map){
  var child_field = $(field).find('.kn-detail-body');
  var value = child_field.text()
  if (color_map[value]) {
    $(child_field).css({'background-color' : color_map[value].background_color, 'color': color_map[value].color });
  }
}

var colorMapOne = {
   "Not Submitted" : { "background_color" : "#ff9b9c", "color" : "#fff" },
   "Returned" : { "background_color" : "#ff9b9c", "color" : "#fff" },
   "Rejected" : { "background_color" : "#6a6565", "color" : "#fff" },
   "Cancelled" : { "background_color" : "#6a6565", "color" : "#fff" },
   "Waiting for Approval": { "background_color" : "#377eb8", "color" : "#fff" },
    "Purchase Review" : { "background_color" : "#41ae76", "color" : "#fff" },
    "Budget Review" : { "background_color" : "#41ae76", "color" : "#fff" },
    "Processing | Purchasing" : { "background_color" : "#41ae76", "color" : "#fff" },
    "Pending Invoice" : { "background_color" : "#f5901f", "color" : "#fff" },
    "Processing | Accounts Payable" : { "background_color" : "#41ae76", "color" : "#fff" },
    "Closed" : { "background_color" : "#ffffff", "color" : "#fff" },
}

$(document).on('knack-scene-render.any', function() {
  //  work orders signs/markings status
  changeFieldColor('.field_17', colorMapOne);
  
});
  

function bigButton(div_id, view_id, url, fa_icon, button_label) {
  // create a large button
  
    $("<div/>", {
      id: div_id,
    }).appendTo("#" + view_id);
    
  $("#" + div_id).append("<a class='big-button' href='" + url + "'><div class='big-button-container'><span><i class='fa fa-" + fa_icon + "'></i></span><span> " + button_label + "</span></div></a>");

}


$(document).on('knack-view-render.view_167', function(event, page) {
  // create large button on the home page
    bigButton(
        "all",
        "view_167",
        "https://atd.knack.com/finance-admin#purchase-requests/",
        "archive",
        "All Purchase Requests"
    );

    bigButton(
        "create",
        "view_167",
        "https://atd.knack.com/finance-admin#new-purchase-requests/",
        "plus-circle",
        "New Purchase Request"
    );

    bigButton(
        "review",
        "view_167",
        "https://atd.knack.com/finance-admin#reviews/",
        "check-square-o",
        "Review Purchase Requests"
    );

    bigButton(
        "my",
        "view_167",
        "https://atd.knack.com/finance-admin#my-purchase-requests/",
        "male",
        "My Purchase Requests"
    );

});

$(document).on('knack-page-render.scene_68', function(event, page) {
  // render Review Details page
  
  //  Create landing page buttons and set button URL
    $('<div/>', {
      id: 'viewPR',
    }).appendTo('#view_247');
    $("#viewPR").append("<a class='big-button' href='https://atd.knack.com/finance-admin#purchase-requests/'><div class='big-button-container'><span><i class='fa fa-search'></i></span><span> View Request details </span></div></a>");
    hideDetailsLink("viewPR", "field_11");
  
  
  //  Remove unwanted select options from approval authority list
  $("option[value='8 | Budget Review']").remove();
  $("option[value='7 | Purchase Review']").remove();
});


function hideDetailsLink(dest_id, src_field) {
    var detailsUrl = $(".kn-link-page").attr("href");
    $("#" + dest_id).find("a").attr("href", detailsUrl);
    $(".kn-details-link." + src_field).remove();
}



// --- Begin Item Copying ---
$(document).on('knack-view-render.view_315', function(event, view) {
    // automatically submit 'copy' form when modal renders
    $('button[type=submit]').submit();
});

$(document).on('knack-form-submit.view_315', function(event, view, record) {
    // Insert a copy of an item to the same purchase request
    var url = 'https://api.knack.com/v1/pages/scene_123/views/view_316/records/';

    fields = [
        'field_36', // unit of measure
        'field_37', // part #
        'field_15', // description
        'field_16', // unit cost 
        'field_20_raw', // purchase request
        'field_189_raw', // department
        'field_105_raw', // fund
        'field_103_raw', // unit
        'field_104_raw', // object
    ];

    // reduce object to specified fields
    const filtered = Object.keys(record)
      .filter(key => fields.includes(key))
      .reduce((obj, key) => {
        var new_key = key.replace('_raw', '')
        obj[new_key] = record[key];
        return obj;
      }, {});

    console.log(filtered);

    insertRecord(filtered, url);

});


function insertRecord(record, url) {
    
    Knack.showSpinner();

    var user = Knack.getUserToken();

    var headers = {
        'X-Knack-Application-ID': '5b422c9b13774837e54ed814',
        'Authorization': user,
        'content-type':'application/json'
    };

    // insert the record
    $.ajax({
        url: url,
        type: 'POST',
        headers: headers,
        data:  JSON.stringify(record),
        success: function(response) {
          Knack.hideSpinner();
        }
    });

}
// --- End Item Copying ---
