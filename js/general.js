/******* Run functions when document is ready ********/
$(document).ready(function() {
    dropMenu();
    $('[bg-img]').bgImage();
    openRegPanel();
    mobileMenu();
    initMainSlider();
    deleteCoverImg();
    bounceOffer();
});

/******* Run functions when document resize **********/
$(window).resize(function() {

});


/*****************************************************/
/******************* FUNCTIONS ***********************/
/*>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>*/

/**************** Offer bounced effect ***************/
var bounceOffer = function() {
    if ($('.header-offer').length) {
        setInterval(function() {
            $(".header-offer span").effect("bounce", {
                distance: 10,
                times: 3
            }, "slow");
        }, 5000);
    }
};
/************ drop menu ******************************/
var dropMenu = function() {
    var $trigger = $('[trigger]');
    var $drop = $('[dropdown]');
    // on click on dropdown icon in header
    $trigger.on('click', function(e) {
        // because of previous line, mobile menu doesn't close on click so the below has been added
        if ($(".mob_menu").hasClass("mob_menu_active")) {
            $('.mob_menu').removeClass("mob_menu_active");
          }

        // remove active styling of other triggers and dropdowns
        var $data = $(this).attr("trigger");
        $drop.not('[dropdown= ' + $data + ']').removeClass("active");
        $trigger.not($(this)).removeClass("active");

        $(document).find('[dropdown= ' + $data + ']').toggleClass("active");
        $(document).find('[dropdown= ' + $data + ']').find("input[autofocus]").focus();

        // remove active styling if already present on click (closing the menu)
        if ($(this).hasClass("active")) {
            $(this).removeClass("active");
        } else {
            $(this).toggleClass("active");
        }
        return false;
    });

    // hide drop down on screen click
     $('html').click(function() {
        $(".drop-content").removeClass("active");
        $(".drop-trigger").removeClass("active");
    });
};

/*********** set images as bg of container and fill 100%, hide image ****/
$.fn.bgImage = function() {
    var $element = $(this);
    $element.each(function() {
        var $img = $(this).find('img.hidden-img'),
            $src = $img.attr('src');

        $img.hide();

        if (!$img.length || $src === "" || $src === undefined) {
            $(this).css({
                'background-image': 'url("")'
            });
        } else
            $(this).css({
                'background-image': 'url("' + $src + '")'
            });
    });
};

/******** open login/registration panel ******************/
var openRegPanel = function() {
    //********************
    if ($("[data-tab]").length) {
        var e = $("[data-tab]");
        e.click(function() {
            var a = $(this);
            t = a.data("tab");
            a.addClass("active");
            $("[data-tab-id]").hide();
            $('[data-tab-id="' + t + '"]').show();
            if (t != "register") {
                e.removeClass("active");
                a.addClass("active");
            }
        });
    }
    //*********************
    if ($("#artistButton").length) {
        var f = $("#artistButton");
        f.click(function() {
            $("#artistProfession").show();
        });
    }
    //*********************
    if ($("#supportButton").length) {
        var fs = $("#supportButton");
        fs.click(function() {
            $("#artistProfession").hide();
        });
    }
    //*********************
    if ($("[data-popup]").length) {
        var a;
        var t = $("[data-popup]");
        t.click(function() {
            var e = $(this);
            var m = e.data("tab");
            var t = e.data("popup");
            if (m == "register") {
                $('[data-tab="login"]').removeClass("active");
                $('[data-tab="registerSelect"]').addClass("active");
                $("#artistProfession").show();
            } else {
                $('[data-tab="login"]').addClass("active");
                $('[data-tab="registerSelect"]').removeClass("active");
            }
            a = $('[data-popup-id="' + t + '"]');
            $("[data-popup-id]").hide();
            a.show();
          /*  $("body, html").css({
                overflow: "hidden"
            }); */
            a.click(function(e) {
                if (e.target === this) {
                    $(this).fadeOut("fast");
                //    $("body, html").attr("style", "");
                }
            });
        });
    }
    //*************************
    var closeIcon = $("#closeLoginPopup");
    closeIcon.click(function() {
        $("[data-popup-id]").hide();
      });
    };

/************** open/close mobile menu ****************/
var mobileMenu = function() {
    $(".navigation_toggle").click(function(e) {
        $(".mob_menu").slideToggle( "slow");
    });


    // hide mobile menu when start scrolling
    $(window).on("scroll", function() {
      if ($(window).scrollTop() > 2) {
        if ($(".mob_menu").not(":hidden")) {
              $(".mob_menu").slideUp( "fast");
        }
      }
    });
};

/************ setup header slider ***********************/
var initMainSlider = function() {
    if ($('#header-slide').length) {
        $("#header-slide").owlCarousel({
            slideSpeed: 300,
            paginationSpeed: 400,
            singleItem: true,
            navigation: false,
            pagination: true,
            autoPlay: true,
            stopOnHover: true,
            transitionStyle: "fade"

        });
    }
};
/************ show subscribe form on click ***********************/
function showSubscribeForm() {
  if ($('#showSubscribeFormButton').length) {
    $('#showSubscribeFormButton').hide();
    $('.subscribe-form').slideDown( "slow", function() {
      $(this).show();
  });
  }
}

/*---------- PREVIEW PROFILE IMAGE ON SELECT ------------*/
function showMyProfile(fileInput) {
    if (fileInput.files && fileInput.files[0]) {
        var reader = new FileReader();
        reader.onload = function(e) {
            $('#profile-image-preview').css("background-image", "url(" + e.target.result + ")");
        };
        reader.readAsDataURL(fileInput.files[0]);
    }
}

/*---------- PREVIEW ID IMAGE ON SELECT ------------*/
function showMyID(fileInput) {
    if (fileInput.files && fileInput.files[0]) {
        var reader = new FileReader();
        reader.onload = function(e) {
            $('#id-image-preview').css("background-image", "url(" + e.target.result + ")");
        };
        reader.readAsDataURL(fileInput.files[0]);
    }
}

/*---------- PREVIEW COVER IMAGE ON SELECT ------------*/
function showMyImage(fileInput) {
    if (fileInput.files && fileInput.files[0]) {
        var reader = new FileReader();
        reader.onload = function(e) {
          if ($(".profile-cover_inner > img").not(":visible")) {
            $(".profile-cover_inner > img").show();
          }
            $('#cover-img').css('transform', 'translate3d(0px, 0px, 0px)');
            $('#cover-img').attr('src', e.target.result);
        };
        reader.readAsDataURL(fileInput.files[0]);
        $('.profile-cover_inner').css("background-image", "none");
    }
}

/*---------- COVER IMAGE DRAGGABLE ------------*/
$(document).ready(function() {
  /*--------- DRAG IMAGE -----------*/
  if ($('.profile-cover_wrapper').length) {
    Draggable.create("#cover-img", {
        type: "x,y",
        bounds: ".profile-cover_wrapper",
        edgeResistance: 0.0
    });
  }
});

/************ delete cover image on edit profile page ***********************/
var deleteCoverImg = function() {
  if ($('#deleteCoverImg').length) {
    $("#deleteCoverImg").click(function(e) {
      $(".profile-cover_inner > img").hide();
        e.preventDefault();
    });
  }
};

/************ show/hide secondary address feilds in edit profile pages ***********************/
$(document).ready(function() {

  if ($('#primaryAddress').length) {
    $("#primaryAddress").click(function(e) {
      if ($("#billingAddressRow").is(":visible")) {
        $("#billingAddressRow").hide();
      }
      if ($("#billingCountryStateRow").is(":visible")) {
        $("#billingCountryStateRow").hide();
      }
    });
    $("#billingAddress").click(function(e) {
      $("#billingCountryStateRow").show();
      $("#billingAddressRow").show();
    });
  }
});
