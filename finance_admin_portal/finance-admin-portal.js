function changeFieldColor(fieldClass, color_map){
  var child_field = $(fieldClass).find('.kn-detail-body');
  var value = child_field.text()
  if (color_map[value]) {
    $(child_field).css({'background-color' : color_map[value].background_color, 'color': color_map[value].color });
  }
}


function insertIcon(fieldClass, icon_map){
  var child_field = $(fieldClass).find('.kn-detail-body');
  var value = child_field.text()
  var elem = $(".kn-detail" + fieldClass).find(".kn-detail-body").find("span")[0];

  $(elem).before("<span> <i class='fa fa-" + icon_map[value].icon + "'></i> </span>");
}


var colorMapOne = {
   "Not Submitted" : { "background_color" : "#ff9b9c", "color" : "#fff", 'icon': null },
   "Returned" : { "background_color" : "#ff9b9c", "color" : "#fff", 'icon': null },
   "Rejected" : { "background_color" : "#6a6565", "color" : "#fff", 'icon': null },
   "Cancelled" : { "background_color" : "#6a6565", "color" : "#fff", 'icon': null },
   "Waiting for Approval": { "background_color" : "#377eb8", "color" : "#fff", 'icon': null },
    "Purchase Review" : { "background_color" : "#41ae76", "color" : "#fff", 'icon': 'clipboard' },
    "Budget Review" : { "background_color" : "#41ae76", "color" : "#fff", 'icon': 'money' },
    "Processing | Purchasing" : { "background_color" : "#41ae76", "color" : "#fff", 'icon': 'cogs' },
    "Pending Invoice" : { "background_color" : "#f5901f", "color" : "#fff", 'icon': 'clock-o' },
    "Processing | Accounts Payable" : { "background_color" : "#41ae76", "color" : "#fff", 'icon': 'credit-card' },
    "Closed" : { "background_color" : "#ffffff", "color" : "#000", 'icon': 'check-circle' },
}

$(document).on('knack-scene-render.scene_4', function() {
  //  work orders signs/markings status
  changeFieldColor('.field_17', colorMapOne);
  insertIcon('.field_17', colorMapOne);
  
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
  
  //  Create big PR details button and hide the small link
  bigButton(
      "viewPR",
      "view_247",
      "https://atd.knack.com/finance-admin#purchase-requests/",
      "list-alt",
      "Request Details"
  );

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



function customLoginButton(view_id, page_name) {
  //  special logic to generate URL and clean-up sign in page brefore creating large button
    
    // remove default sso login container/button  
    $('.kn-sso-container').remove();

    var loginForm = $('.login_form').detach();
    
    // $('h2.kn-title').remove();
    $('.kn-description').html('<i>Click below to sign in with your City of Austin email address and password.</i>');
    
    var url ="https://atd.knack.com/finance-admin#" + page_name + "/auth/COACD";

    bigButton('big-button-login', view_id, url, 'sign-in', 'Sign-In with COACD');

    $("." + view_id).append(loginForm);

}


$(document).on('knack-view-render.any', function(event, page) {
    //  wrapper to create large sign-in buttons
    //  the views ojbect uses the view id of the login form element as each key
    //  and the page url of the login page's **chile page** as the value
    var views = {
        'view_39' : 'home',
        'view_5' : 'purchase-requests',
        'view_82' : 'purchasing-budget-review',
        'view_52' : 'account-administration',
        'view_322' : 'commodity-codes'
    }

    if (page.key in views) {
        customLoginButton(page.key, views[page.key]);    
    }
    
});


// --- Begin Item Copying ---
$(document).on('knack-view-render.view_315', function(event, view) {
    // automatically submit 'copy' form when modal renders
    $('button[type=submit]').submit();
});

$(document).on('knack-form-submit.view_315', function(event, view, record) {
    // Insert a copy of an item to the same purchase request
    var formUrl = "https://api.knack.com/v1/pages/scene_123/views/view_316/records/";

    // url where to redirect to on record insert success
    var redirectUrl = "https://atd.knack.com/finance-admin#purchase-requests/purchase-request-details/";
    
    // grab ID of purchase request and append it to redirect URL
    redirectUrl = redirectUrl + record.field_20_raw[0].id;

    console.log(redirectUrl);
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

    insertRecord(filtered, formUrl, redirectUrl);

});


function insertRecord(record, url, redirectUrl) {
    
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
          window.location = redirectUrl;
        }
    });

}
// --- End Item Copying ---
