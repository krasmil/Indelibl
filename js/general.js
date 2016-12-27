/******* Run functions when document is ready ********/
$(document).ready(function() {
    dropMenu();
    checkDeviceForAddProducts();
    $('[bg-img]').bgImage();
    openRegPanel();
    mobileMenu();
    dashMenu();
    initMainSlider();
    dragCoverImg();
    showAdditionalAddress();
    deleteCoverImg();
    bounceOffer();
    saveNewCoverPic();
    artistMenu();
    productTemplateOverlay();
});

/******* Run functions when document resize **********/
$(window).resize(function() {
    if ($('#productTemplates').length) {
      if ($(window).width() <= 1000 ) {
        $('#productTemplates').hide();
        $('#productTemplates_notAvail').show();
      }
      else if ($(window).width() > 1000 ) {
        $('#productTemplates').show();
        $('#productTemplates_notAvail').hide();
      }
  }
});

var checkDeviceForAddProducts = function() {
  if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {

    $('#productTemplates').html("");
    $('#productTemplates_notAvail').show();
  }
};
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

/************** open/close dashboard mobile menu ****************/
var dashMenu = function() {
  if ($('.navigation_toggle_dots').length) {
    $(".navigation_toggle_dots").click(function(e) {
      // hide main menu if it is open
      if ($(".mob_menu").is(":visible")) {
        $(".mob_menu").slideUp("fast");
      }
      // set z-index of profile pic so that it doesn't cover menu
      if ($(".dashboard_menu").is(":visible")) {
          setTimeout(function() {
              $(".userprofile_img").css("z-index", "1100");
          }, 600);
      } else {
          $(".userprofile_img").css("z-index", "0");
      }

      $(".dashboard_menu").slideToggle("slow");
    });
  }
};

/************** open/close mobile menu ****************/
var mobileMenu = function() {
    $(".navigation_toggle").click(function(e) {
        // hide dashboard menu if it is open
        if ($(".dashboard_menu").is(":visible")) {
          $(".dashboard_menu").slideUp("fast");
        }
        // set z-index of profile pic and camera so that they don't cover menu
        if ($(".mob_menu").is(":visible")) {
            setTimeout(function() {
                $(".camera").css("z-index", "1200");
                $(".userprofile_img").css("z-index", "1100");
            }, 600);
        } else {
            $(".camera").css("z-index", "0");
            $(".userprofile_img").css("z-index", "0");
        }
        $(".mob_menu").slideToggle("slow");
    });


    // hide mobile menus when start scrolling
    $(window).on("scroll", function() {
        if ($(window).scrollTop() > 2) {
          // hide dashboard menu on scroll and restore cover img z-index
          if ($(".dashboard_menu").not(":hidden")) {
              $(".dashboard_menu").slideUp("fast");
              setTimeout(function() {
                  $(".userprofile_img").css("z-index", "1100");
              }, 600);
            }

            if ($(".mob_menu").not(":hidden")) {
                $(".mob_menu").slideUp("fast");
                setTimeout(function() {
                    $(".camera").css("z-index", "1200");
                    $(".userprofile_img").css("z-index", "1100");
                }, 600);
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
        $('.subscribe-form').slideDown("slow", function() {
            $(this).show();
        });
    }
}

/*---------- PREVIEW PROFILE IMAGE ON SELECT ------------*/
function showMyProfile(fileInput) {
    if (fileInput.files && fileInput.files[0]) {
        // DODAO Zoran za proveru velicine i extenzije slike START
        var imgSize = Math.round((fileInput.files[0].size / 1024) / 1024);
        var imgExtSplit = fileInput.files[0].type.split("/");
        var imgExt = imgExtSplit[1];
        if (imgExt === 'jpeg') {
            imgExt = 'jpg';
        }
        if (imgSize > 5) {
            $('#size-error').show();
            $('#' + fileInput.id).val('');
            return false;
        }
        if (imgExt !== 'jpg' && imgExt !== 'png' && imgExt !== 'gif') {
            $('#ext-error').show();
            $('#' + fileInput.id).val('');
            return false;
        }
        // DODAO Zoran END
        var reader = new FileReader();
        reader.onload = function(e) {

            // get orientation
            binImg = e.target.result;
            input = document.getElementById('profile-img-file-input');
            getOrientation(input.files[0], function(orientation) {
                console.log(orientation);
                if ([5, 6, 7, 8].indexOf(orientation) > -1) {
                    $('#profileRotator').attr('src', binImg);
                    var c = document.getElementById("profile-Photo-Slice");
                    c.width = $('#profileRotator').height();
                    c.height = $('#profileRotator').width();
                    var ctx = c.getContext("2d");
                    ctx.transform(0, 1, -1, 0, $('#profileRotator').height(), 0);
                    ctx.drawImage(document.getElementById('profileRotator'), 0, 0);
                    urlRot = c.toDataURL();
                    // set Base64 string in src of positioner
                    $('#profile-image-preview').css("background-image", "url(" + urlRot + ")");
                } else {
                    // set Base64 string in src of positioner
                    $('#profile-image-preview').css("background-image", "url(" + binImg + ")");
                }
            });
        };
        reader.readAsDataURL(fileInput.files[0]);
    }
}

/*---------- PREVIEW ID IMAGE ON SELECT ------------*/
function showMyID(fileInput) {
    if (fileInput.files && fileInput.files[0]) {
        // DODAO Zoran za proveru velicine i extenzije slike START
        var imgSize = Math.round((fileInput.files[0].size / 1024) / 1024);
        var imgExtSplit = fileInput.files[0].type.split("/");
        var imgExt = imgExtSplit[1];
        if (imgExt === 'jpeg') {
            imgExt = 'jpg';
        }
        if (imgSize > 5) {
            $('#size-error').show();
            $('#' + fileInput.id).val('');
            return false;
        }
        if (imgExt !== 'jpg' && imgExt !== 'png' && imgExt !== 'gif') {
            $('#ext-error').show();
            $('#' + fileInput.id).val('');
            return false;
        }
        // DODAO Zoran END
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
        // DODAO Zoran za proveru velicine i extenzije slike START
        var imgSize = Math.round((fileInput.files[0].size / 1024) / 1024);
        var imgExtSplit = fileInput.files[0].type.split("/");
        var imgExt = imgExtSplit[1];
        if (imgExt === 'jpeg') {
            imgExt = 'jpg';
        }
        if (imgSize > 5) {
            $('#size-error').show();
            $('#' + fileInput.id).val('');
            return false;
        }
        if (imgExt !== 'jpg' && imgExt !== 'png' && imgExt !== 'gif') {
            $('#ext-error').show();
            $('#' + fileInput.id).val('');
            return false;
        }
        // DODAO Zoran END
        var reader = new FileReader();
        reader.onload = function(e) {
            // get orientation
            binImg = e.target.result;
            input = document.getElementById('cover-img-file-input');
            getOrientation(input.files[0], function(orientation) {
                console.log(orientation);
                if ([5, 6, 7, 8].indexOf(orientation) > -1) {
                    $('#rotator').attr('src', binImg);
                    var c = document.getElementById("cover-Photo-Slice");
                    c.width = $('#rotator').height();
                    c.height = $('#rotator').width();
                    var ctx = c.getContext("2d");
                    ctx.transform(0, 1, -1, 0, $('#rotator').height(), 0);
                    ctx.drawImage(document.getElementById('rotator'), 0, 0);
                    urlRot = c.toDataURL();
                    // set Base64 string in src of positioner
                    $('#cover-img').attr('src', urlRot);
                } else {
                    // set Base64 string in src of positioner
                    $('#cover-img').attr('src', binImg);
                }
            });
            $(".profile-cover").show();
            $(".profile-cover_inner > img").show();
            $(".profile-cover-save").hide();
            $('#cover-img').css('transform', 'translate3d(0px, 0px, 0px)');
            $('#cover-img').attr('src', e.target.result);
        };
        reader.readAsDataURL(fileInput.files[0]);
    }
}

/*---------- COVER IMAGE DRAGGABLE ------------*/
var dragCoverImg = function() {
    /*--------- DRAG IMAGE -----------*/
    if ($('.profile-cover_wrapper').length) {
        Draggable.create("#cover-img", {
            type: "x,y",
            bounds: ".profile-cover_wrapper",
            edgeResistance: 0.0
        });
    }
};

/************ delete cover image on edit profile page ***********************/
var deleteCoverImg = function() {
    if ($('#deleteCoverImg').length) {
        $("#deleteCoverImg").click(function(e) {
            $.post('php/page/delete_cover.php', {
                uid: $('#jsuid').val(),
                cover: 'images/cover_blank.png'
            }).done(function(data) {
                if (data === 'ok') {
                    location.reload();
                }
            });
        });
    }
};
/************ save croppped repositioned cover photo ***********************/
var saveNewCoverPic = function() {
    if ($('#saveProfile').length) {
        // check if cover img not empty
        if ($("#cover-img").attr("src") !== "") {

            // get cover img position in wrapping div
            var coverImg = document.getElementById('cover-img');
            var slice = coverImg.getBoundingClientRect();
            var sliceTop = slice.top;
            var sliceBottom = slice.bottom;
            var sliceLeft = slice.left;
            var sliceRight = slice.right;

            // get original cover image size
            var imgWidth = $("#cover-img").width();
            var imgHeight = $("#cover-img").height();

            // get transform matrix
            var imgTrans = $("#cover-img").css("transform");
            var matrix = new CSSMatrix(imgTrans);

            // get size of cover image parent element
            var wrapWidth = $('.profile-cover').width();
            var wrapHeight = $('.profile-cover').height();

            // clone visible part of cover image in invisible CANVAS
            var cover_canvas = document.getElementById("cover-Photo-Slice");
            cover_canvas.width = wrapWidth;
            cover_canvas.height = wrapHeight;
            var ctx = cover_canvas.getContext("2d");

            // the top parameter is defined by the y translate3d value (matrix.m42) after positioning new cover image
            ctx.drawImage(coverImg, sliceLeft, matrix.m42, imgWidth, imgHeight);

            // decode Canvas image to Base64 string and parse in src of visible image element
            var url = cover_canvas.toDataURL();
            $("#cover-img-save").attr("src", url);

            // show positioned and cropped cover image after save
            $('.profile-cover-save').show();
            // hide draggable image
            $('.profile-cover').hide();
        }
    }
};

// get image orientation
var getOrientation = function(file, callback) {
    var reader = new FileReader();
    reader.onload = function(e) {

        var view = new DataView(e.target.result);
        if (view.getUint16(0, false) != 0xFFD8) return callback(-2);
        var length = view.byteLength,
            offset = 2;
        while (offset < length) {
            var marker = view.getUint16(offset, false);
            offset += 2;
            if (marker == 0xFFE1) {
                if (view.getUint32(offset += 2, false) != 0x45786966) return callback(-1);
                var little = view.getUint16(offset += 6, false) == 0x4949;
                offset += view.getUint32(offset + 4, little);
                var tags = view.getUint16(offset, little);
                offset += 2;
                for (var i = 0; i < tags; i++)
                    if (view.getUint16(offset + (i * 12), little) == 0x0112)
                        return callback(view.getUint16(offset + (i * 12) + 8, little));
            } else if ((marker & 0xFF00) != 0xFF00) break;
            else offset += view.getUint16(offset, false);
        }
        return callback(-1);
    };
    reader.readAsArrayBuffer(file);
};

/************ show/hide secondary address feilds in edit profile pages ***********************/
var showAdditionalAddress = function() {

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
};

/************ artist dashboard menu ******************************/
var artistMenu = function() {
    var $trigger = $('[triggerLink]');
    // on hover menu item in dashboard menu
    $trigger.hover(function() {
      var $data = $(this).attr("triggerLink");
      var $popupLink =   $(document).find('[popLink= ' + $data + ']');
      $popupLink.toggleClass("active");

  });
};

/************ product template overlays ******************************/
var productTemplateOverlay = function() {
    var $trigger = $('[triggerOL]');
    // on hover over product template selection box
    $trigger.hover(function() {
      var $data = $(this).attr("triggerOL");
      var $overlay =   $(document).find('[overlay= ' + $data + ']');
    //  $overlay.fadeToggle( 400, "ease" );
      $overlay.fadeToggle(350);
  });
};
