$(document).on("knack-scene-render.scene_1", function(event, scene) {
  // Name values object
  var name = {
    first: $("input#first").val(),
    last: $("input#last").val()
  };

  var errorMessageHtml =
    '<div class="kn-message kn-message-custom is-error"><a class="close delete"></a><span class="kn-message-body"><p><strong>First & Last Name are required</strong></p></span></div>';

  // Watch for a change on name field values
  $("input#first").on("keyup", function(e) {
    name.first = e.target.value;
  });
  $("input#last").on("keyup", function(e) {
    name.last = e.target.value;
  });

  $(".kn-submit button[type=submit]").on("click", function() {
    // Reset previously added error messaging UI
    $(".kn-message-custom").remove();
    $("input#first").removeClass("input-error");
    $("input#last").removeClass("input-error");

    if (name.first === "") {
      $("input#first").addClass("input-error");
    }
    if (name.last === "") {
      $("input#last").addClass("input-error");
    }

    if (name.first === "" || name.last === "") {
      $("form").prepend(errorMessageHtml);
      return false;
    } else {
      return true;
    }
  });
});
