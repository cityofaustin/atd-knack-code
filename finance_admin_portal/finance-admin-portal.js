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
    "Unpaid" : { "background_color" : "#ff9b9c", "color" : "#fff", 'icon': null },
    "Paid" : { "background_color" : "#41ae76", "color" : "#fff", 'icon': null },
    "Submitted to Accounts Payable" : { "background_color" : "#f5901f", "color" : "#fff", 'icon': null },
}

$(document).on('knack-scene-render.scene_4', function() {
  //  work orders signs/markings status
  changeFieldColor('.field_17', colorMapOne);
  insertIcon('.field_17', colorMapOne);
  
});
  



function customButton(div_id, view_id, url, fa_icon, button_label, button_class, container_class, callback) {
  // create a custom button
  
    $("<div/>", {
      id: div_id,
    }).appendTo("#" + view_id);
    
  $("#" + div_id).append("<a class='" + button_class + "' href='" + url + "'><div class='" + container_class + "'><span><i class='fa fa-" + fa_icon + "'></i></span><span> " + button_label + "</span></div></a>");

  if(callback) callback();
}



$(document).on('knack-view-render.view_167', function(event, page) {
  // create large button on the home page
    customButton(
        "all",
        "view_167",
        "https://atd.knack.com/finance-purchasing#purchase-requests/",
        "archive",
        "All Purchase Requests",
        "big-button",
        "big-button-container"
    );

    customButton(
        "create",
        "view_167",
        "https://atd.knack.com/finance-purchasing#new-purchase-requests/",
        "plus-circle",
        "New Purchase Request",
        "big-button",
        "big-button-container"
    );

    customButton(
        "review",
        "view_167",
        "https://atd.knack.com/finance-purchasing#reviews/",
        "check-square-o",
        "Review Purchase Requests",
        "big-button",
        "big-button-container"
    );

    customButton(
        "my",
        "view_167",
        "https://atd.knack.com/finance-purchasing#my-purchase-requests/",
        "male",
        "My Purchase Requests",
        "big-button",
        "big-button-container"
    );

});

$(document).on('knack-page-render.scene_68', function(event, page) {
  // render Review Details page
  
  //  Create big PR details button and hide the small link
  customButton(
      "viewPR",
      "view_247",
      "https://atd.knack.com/finance-purchasing#purchase-requests/",
      "list-alt",
      "View Request Details",
      "big-button",
      "big-button-container"
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
    $('.kn-sso-container').hide();

    $('.login_form').hide();

    $('h2.kn-title').hide();
    
    var url ="https://atd.knack.com/finance-purchasing#" + page_name + "/auth/COACD";

    customButton(
      'caocd-button-login',
      view_id, url,
      'sign-in',
      'Sign-In',
      "big-button",
      "big-button-container"
    );

    customButton(
      'non-coacd-button-login',
      view_id,
      "javascript:void(0)",
      'lock',
      'Non-COA Sign-In',
      "small-button",
      "small-button-container",
      function(divId='non-coacd-button-login') {
        setClickEvent(
          divId,
          showHideElements,
          ".login_form",
          ".small-button-container,.big-button-container"
        );
      });
}

function setClickEvent(divId, func, param1, param2) {
  // TODO make these args less weird
  $("#" + divId).click(function(){
    func(param1, param2);
  })
}

function showHideElements(showSelector, hideSelector) {
  $(showSelector).show();
  $(hideSelector).hide();
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
        'view_322' : 'commodity-codes',
        'view_31' : 'reviews',
        'view_387' : 'invoice-details',
        'view_379' : 'add-invoice',
        'view_77' : 'my-purchase-requests'
    }

    if (page.key in views) {
        customLoginButton(page.key, views[page.key]);    
    }
    
});


// replace "Add New Option" with custom text
$(document).on('knack-page-render.any', function(event, view) {

  var addNew = $("#kn-input-field_217")
    .find(".kn-add-option")
    .html("<i class='fa fa-plus-circle'></i> Add New Vendor | ")
    .removeClass('kn-add-option')
    .detach();

  $("#kn-input-field_217").find(".kn-instructions").find("a").before(addNew);

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
    var redirectUrl = "https://atd.knack.com/finance-purchasing#purchase-requests/purchase-request-details/";
    
    // grab ID of purchase request and append it to redirect URL
    console.log(record.field_20_raw);

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
        'field_357_raw'
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


//  redirect to invoice details when invoice created
//  (mysteriously unable to accomplish this with form submit rule)
$(document).on('knack-form-submit.view_285', function(event, view, record) {
  var _id = record.id;  // newly created invoice id
  var id_pr = record.field_316_raw[0].id; // id of the connected purchase request

  // manually create url of invoice details
  var url = 'https://atd.knack.com/finance-purchasing#purchase-requests/purchase-request-details/' + id_pr + '/view-invoice-details/' + _id;
  window.location = url;
});


/**
 * detect IE
 * returns version of IE or false, if browser is not Internet Explorer
 * https://stackoverflow.com/questions/19999388/check-if-user-is-using-ie-with-jquery
 */
function detectIE() {
    var ua = window.navigator.userAgent;

    var msie = ua.indexOf('MSIE ');
    if (msie > 0) {
        // IE 10 or older => return version number
        return parseInt(ua.substring(msie + 5, ua.indexOf('.', msie)), 10);
    }

    var trident = ua.indexOf('Trident/');
    if (trident > 0) {
        // IE 11 => return version number
        var rv = ua.indexOf('rv:');
        return parseInt(ua.substring(rv + 3, ua.indexOf('.', rv)), 10);
    }

    var edge = ua.indexOf('Edge/');
    if (edge > 0) {
       // Edge (IE 12+) => return version number
       return parseInt(ua.substring(edge + 5, ua.indexOf('.', edge)), 10);
    }

    // other browser
    return false;
}

$(document).on('knack-scene-render.scene_1', function() {
  if (detectIE()) {
    alert("You are using Microsoft Internet Explorer or Edge to view this page. We recommend using Firefox or Chrome. Contact your system administrator for assistance.");
  }
});
