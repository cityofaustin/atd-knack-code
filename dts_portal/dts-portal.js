
function changeFieldColor(field, color_map){
  var child_field = $(field).find('.kn-detail-body');
  var value = child_field.text()
  if (color_map[value]) {
    $(child_field).css({'background-color' : color_map[value].background_color, 'color': color_map[value].color });
  }
}


var colorMapOne = {
   'New' : { "background_color" : "#fb9a99", "color" : "#000" },
   'In Progress': { "background_color" : "#1f78b4", "color" : "#fff" },
}

$(document).on('knack-scene-render.any', function() {
  //  Set status color
  changeFieldColor('.field_91', colorMapOne);
  
})

function hideFieldIfNotRole(field_id, role_object_id) {
  //  function to hide a field based on if the user does not have a given role
  if ( !Knack.getUserRoles(role_object_id) ) {
    $('#' + field_id).hide();
  }
}

function hideViewIfNotRole(view_id, role_object_id) {
  //  function to hide a view based on if the user does not have a given role
  if ( !Knack.getUserRoles(role_object_id) ) {
    $('#' + view_id).hide();
  }
}

$(document).on('knack-view-render.view_76', function(event, page) {
  hideFieldIfNotRole('kn-input-field_91', 'object_5'); // status (defaults to new)
  hideFieldIfNotRole('kn-input-field_96', 'object_5'); // requester account (we set this automatically)
  hideFieldIfNotRole('kn-input-field_97', 'object_5'); // assigned to (set by editors only)
  hideFieldIfNotRole('kn-input-field_153', 'object_5'); // assigned to (set by editors only)
  hideFieldIfNotRole('kn-input-field_178', 'object_5'); // division (set automatically by logged-in account)
  hideFieldIfNotRole('kn-input-field_179', 'object_5'); // est. level of effort 
  hideFieldIfNotRole('kn-input-field_100', 'object_5'); // close date
  hideFieldIfNotRole('kn-input-field_107', 'object_5'); // request type
  hideFieldIfNotRole('kn-input-field_186', 'object_5'); // dataset
});


$(document).on('knack-view-render.view_114', function(event, page) {
  // hide "Assigned to Me" service request table
  hideViewIfNotRole('view_114', 'object_5');
});

  
function bigButton(div_id, view_id, url, fa_icon, button_label, callback) {
  // create a large button
  
    $("<div/>", {
      id: div_id,
    }).appendTo("#" + view_id);
    
  $("#" + div_id).append("<a class='big-button' href='" + url + "'><div class='big-button-container'><span><i class='fa fa-" + fa_icon + "'></i></span><span> " + button_label + "</span></div></a>");

  if(callback) callback();
}


function customLoginButton(view_id, page_name) {
  //  special logic to generate URL and clean-up sign in page brefore creating large button
    $('.kn-sso-container').hide();
    $('.login_form').hide();

    $('h2.kn-title').hide();
    
    var url ="https://atd.knack.com/dts#" + page_name + "/auth/COACD";

    bigButton('caocd-button-login', view_id, url, 'sign-in', 'Sign-In');

    bigButton('non-coacd-button-login', view_id, "javascript:void(0)", 'sign-in', 'Sign-In (Non-COA)', function(divId='non-coacd-button-login') {
      setClickEvent(divId, showHideElements, ".login_form", ".big-button-container");
    });

}


$(document).on('knack-view-render.any', function(event, page) {
    //  wrapper to create lare sign-in buttons
    // specify "rich text" form elements here
    // the rich text is created on the login page and is a placeholder
    // for the button div, and must link to the appropriate URL name setting
    var views = {
        'view_119' : 'datasets',
        'view_120' : 'applications',
        'view_122' : 'service-requests',
        'view_123' : 'edit-service-request',
        'view_124' : 'dts-team-portal',
        'view_125' : 'admin',
    }

    if (page.key in views) {
        customLoginButton(page.key, views[page.key]);    
    }
    
});

$(document).on('knack-view-render.view_127', function(event, page) {
  // create large button on the home page
    bigButton('service-requests', 'view_127', "https://atd.knack.com/dts#service-requests/", "phone-square", "Service Requests");
});

$(document).on('knack-view-render.view_128', function(event, page) {
    // create large button on the home page
    bigButton('data-inventory', 'view_128', "https://atd.knack.com/dts#datasets/", "database", "Data Inventory");
});

$(document).on('knack-view-render.view_146', function(event, page) {
  // create large button on the home page
    bigButton('team-trello', 'view_146', "https://trello.com/b/pNbgaKme/data-technology-services-operations", "trello", "Operations Board");
});
  $(document).on('knack-view-render.view_177', function(event, page) {
  // create large button on the home page
    bigButton('technician-equipment-tracker', 'view_177', "https://atd.knack.com/dts#technician-equipment-tracker/", "wrench", "Techncian Equipment Tracker");
  
});

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


$(document).on('knack-view-render.view_176', function(event, page) {
  // create large button on the home page
    bigButton(
        "all",
        "view_176",
        "https://atd.knack.com/dts#technician-equipment-tracker/",
        "wrench",
        "Technician Equipment Tracker"

    );

});
