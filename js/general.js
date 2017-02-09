/******* Run functions when window is loaded ********/
$(window).load(function(){
  masonryEventWorks();
});

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
    scrollRecentViews();
    rightLeftArrows();
    createDatePickers();
    calcRelatedEventsWidth();
    calcRelatedEventsSliderWidth();
    calcViewEventsHeight();
    calcViewFollowsHeight();
    calcViewGalleriesHeight();
    openTab();
    calcViewInvitesHeight();
    addImagesSelect();
    lightenYourPrice();
    checkReqPrice();
    yearSpinner();
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
    if ($('#art-templates').length) {
      if ($(window).width() <= 1000 ) {
        $('#art-templates').hide();
        $('#art-templates').removeClass("large-padding-bottom-y");
        $('#add-art-not-avail').show();
      }
      else if ($(window).width() > 1000 ) {
        $('#art-templates').show();
        $('#art-templates').addClass("large-padding-bottom-y");
        $('#add-art-not-avail').hide();
      }
    }
  setTimeout(function () {
    getRecentViewsSliderCoeff();
    resetRecentViews();
    scrollRecentViews();
  }, 500);
  if ($('.related-events-max-four').length) {
    calcRelatedEventsWidth();
  }
  if ($('.related-events-over-four').length) {
    calcRelatedEventsSliderWidth();
  }
  calcViewEventsHeight();
  calcViewFollowsHeight();
  calcViewGalleriesHeight();
  calcViewInvitesHeight();
});
/******* Run functions when document orientation changed (handheld devices) **********/
$(window).on("orientationchange",function(){

  setTimeout(function () {
    getRecentViewsSliderCoeff();
    resetRecentViews();
    scrollRecentViews();
  }, 500);
  if ($('.related-events-max-four').length) {
    calcRelatedEventsWidth();
  }
  if ($('.related-events-over-four').length) {
    calcRelatedEventsSliderWidth();
  }
  calcViewEventsHeight();
  calcViewFollowsHeight();
  calcViewGalleriesHeight();
  calcViewInvitesHeight();
});

var checkDeviceForAddProducts = function() {
  if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
    if ($('#productTemplates').length) {
      $('#productTemplates').html("");
      $('#productTemplates_notAvail').show();
    }
    if ($('#art-templates').length) {
      $('#art-templates').html("");
      $('#art-templates').removeClass("large-padding-bottom-y");
      $('#add-art-not-avail').show();
    }
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
        $(".share-content").removeClass("active");
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
    var closeNotes = $("#close-notifications");
    closeNotes.click(function() {
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

/*---------- PREVIEW EVENT IMAGE ON SELECT ------------*/
function showEventPhoto(fileInput) {
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
            input = document.getElementById('event-img-file-input');
            getOrientation(input.files[0], function(orientation) {

                if ([5, 6, 7, 8].indexOf(orientation) > -1) {
                    $('#event-photo-rotator').attr('src', binImg);
                    var c = document.getElementById("event-Photo-Slice");
                    c.width = $('#event-photo-rotator').height();
                    c.height = $('#event-photo-rotator').width();
                    var ctx = c.getContext("2d");
                    ctx.transform(0, 1, -1, 0, $('#event-photo-rotator').height(), 0);
                    ctx.drawImage(document.getElementById('event-photo-rotator'), 0, 0);
                    urlRot = c.toDataURL();
                    // set Base64 string in src of positioner
                    $('.event-photo-preview').css("background-image", "url(" + urlRot + ")");
                } else {
                    // set Base64 string in src of positioner
                    $('.event-photo-preview').css("background-image", "url(" + binImg + ")");
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

/*---------- PREVIEW PROFILE IMAGE ON SELECT ------------*/
function showOriginalArt(fileInput) {
    if (fileInput.files && fileInput.files[0]) {
        // DODAO Zoran za proveru velicine i extenzije slike START
        var imgSize = Math.round((fileInput.files[0].size / 1024) / 1024);
        var imgExtSplit = fileInput.files[0].type.split("/");
        var imgExt = imgExtSplit[1];
        if (imgExt === 'jpeg') {
            imgExt = 'jpg';
        }
        if (imgSize > 10) {
            $('#size-error').show();
            $('#' + fileInput.id).val('');
            return false;
        }
        if (imgExt !== 'jpg' && imgExt !== 'png') {
            $('#ext-error').show();
            $('#' + fileInput.id).val('');
            return false;
        }
        // DODAO Zoran END
        var reader = new FileReader();
        reader.onload = function(e) {

            // get orientation
            binImg = e.target.result;
            input = document.getElementById('art-input');
            getOrientation(input.files[0], function(orientation) {

                if ([5, 6, 7, 8].indexOf(orientation) > -1) {
                    $('#original-art-rotator').attr('src', binImg);
                    var c = document.getElementById("original-art-slice");
                    c.width = $('#original-art-rotator').height();
                    c.height = $('#original-art-rotator').width();
                    var ctx = c.getContext("2d");
                    ctx.transform(0, 1, -1, 0, $('#original-art-rotator').height(), 0);
                    ctx.drawImage(document.getElementById('#original-art-rotator'), 0, 0);
                    urlRot = c.toDataURL();
                    // set Base64 string in src of positioner
                    $('#original-art-preview').css("background-image", "url(" + urlRot + ")");
                } else {
                    // set Base64 string in src of positioner
                    $('#original-art-preview').css("background-image", "url(" + binImg + ")");
                }
            });
        };
        reader.readAsDataURL(fileInput.files[0]);
    }
}

/*---------- remove art from add product ------------*/
function removeArt() {
  $('#original-art-preview').css("background-image", "none");
  $('#art-input').val('');
}
/*---------- hide size error in add product when click on cancel in error------------*/
function hideSizeError() {
  $('#size-error').hide();
}

/*---------- hide extension error in add product when click on cancel in error------------*/
function hideExtError() {
  $('#ext-error').hide();
}

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
            if ($("#billingAddressCityRow").is(":visible")) {
                $("#billingAddressCityRow").hide();
            }
        });
        $("#billingAddress").click(function(e) {
            $("#billingCountryStateRow").show();
            $("#billingAddressRow").show();
            $("#billingAddressCityRow").show();
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

/************ returns coefficient for scrollRecentViews ******************************/

var getRecentViewsSliderCoeff = function() {
  var coeff;
  var numItems = $(".product-show > .column-4").length;

  if ($(window).width() <= 999 && $(window).width() >= 510) {
    coeff = numItems - 3;
  }
  else if ($(window).width() <= 509) {
    coeff = numItems - 2;
  }
  else {
    coeff = numItems - 5;
  }

  return coeff;
};

/************ resets product-show left position for scrollRecentViews when orientation changed or resize ******************************/
var resetRecentViews = function() {
  $(".product-show").css("left", 0);
};

/************ returns move value for right and left button clicks ******************************/
var getRecentViewMove = function() {
  var a = $(".product-show > .column-4").outerWidth(true) + "px";
  return a;
}
/************ returns sliderLimit value for right and left button clicks ******************************/
var getRecentViewSliderLimit = function() {
  var b = -($(".product-show > .column-4").outerWidth(true) * getRecentViewsSliderCoeff());
  return b;
}

var scrollRecentViews = function() {
  var numItems = $(".product-show > .column-4").length;


  var view = $(".product-view-container");
  var show = $(".product-show");
  var productBox = $(".product-show > .column-4");
  var productBox_margin_right = parseInt(productBox.css("margin-right")) + 2;
  var productBox_margin_left = parseInt(productBox.css("margin-left"));
  show.css("width", (productBox.outerWidth(true) * numItems) + "px");
  var move = productBox.outerWidth(true) + "px";
  var sliderLimit = -(productBox.outerWidth(true) * getRecentViewsSliderCoeff());

};

var rightLeftArrows = function() {
  /************ scrolls recent views to the right ******************************/
  if ($(".right-arrow").length) {
    $(".right-arrow").click(function(){
      var show = $(".product-show");
      var currentPosition = parseInt(show.css("left"));
      if (currentPosition >= getRecentViewSliderLimit()) show.stop(false,true).animate({left:"-="+ getRecentViewMove()},{ duration: 400})
    });
  }

  /************ scrolls recent views to the left ******************************/
  if ($(".left-arrow").length) {
    $(".left-arrow").click(function(){
      var show = $(".product-show");
      var currentPosition = parseInt(show.css("left"));
      if (currentPosition < 0) {
        show.stop(false,true).animate({left:"+="+ getRecentViewMove()},{ duration: 400});

        if (show.position().left >= 0) {
          show.stop(false,true).animate({left:0},{ duration: 400});
        }
      }
    });

      }

};

/************ date and time pickers for create new event ******************************/
var createDatePickers = function() {

  if ($('#start-date').length) {
    $( "#start-date" ).datepicker();
  }
  if ($('#end-date').length) {
    $( "#end-date" ).datepicker();
  }
  if ($('#start-time').length) {
    $( "#start-time" ).timepicker({ 'timeFormat': 'h:i A' });
  }
  if ($('#end-time').length) {
    $( "#end-time" ).timepicker({ 'timeFormat': 'h:i A' });
  }
};
/************ set up masonry layout for artworks featured in event ******************************/
var masonryEventWorks = function() {
  if ($('.events-works-wrapper').length) {
    $('.events-works-wrapper').masonry({
      // options
      itemSelector: '.event-work-container',
      columnWidth: '.event-work-container',
      gutter: 25
    });
  }
};

/**
 * Determine the mobile operating system.
 * This function returns one of 'iOS', 'Android', 'Windows Phone', or 'unknown'.
 *
 * @returns {String}
 */
function getMobileOperatingSystem() {
  var userAgent = navigator.userAgent || navigator.vendor || window.opera;

      // Windows Phone must come first because its UA also contains "Android"
    if (/windows phone/i.test(userAgent)) {
        return "Windows Phone";
    }

    if (/android/i.test(userAgent)) {
        return "Android";
    }

    if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
        return "iOS";
    }

    return "unknown";
}
/************ calc width of related event slider for mobile portrait view ******************************/
var calcRelatedEventsSliderWidth = function() {
  if ($('.related-events-over-four').length) {
    if ($(window).width() <= 509) {

      if (getMobileOperatingSystem() == "Android" || getMobileOperatingSystem() == "Windows Phone") {
        $('.product-show .column-4.profile-event').css('width', '198px');
        $('.related-events-over-four .product-view-container').css('width', '218px');
      }
      else if (getMobileOperatingSystem() == "iOS") {
        $('.product-show .column-4.profile-event').css('width', '178px');
        $('.related-events-over-four .product-view-container').css('width', '198px');
      }
      else {
        $('.product-show .column-4.profile-event').css('width', '198px');
        $('.related-events-over-four .product-view-container').css('width', '218px');
      }
    }else if ($(window).width() >= 509 && $(window).width() < 1000) {

      $('.product-show .column-4.profile-event').css('width', '205px');
      $('.related-events-over-four .product-view-container').css('width', '428.5px');
    }
    else if ($(window).width() >= 1000 && $(window).width() <= 1600) {

      $('.product-show .column-4.profile-event').css('width', '180px');
      $('.related-events-over-four .product-view-container').css('width', '778.5px');
    }
    else if ($(window).width() > 1600) {

      $('.product-show .column-4.profile-event').css('width', '274px');
      $('.related-events-over-four .product-view-container').css('width', '1155px');
    }

  }
};
/************ calc width of related events wrapper if there are 4 or less related events ******************************/
var calcRelatedEventsWidth = function() {
    if ($('.related-events-max-four').length) {
        if ($(window).width() >= 1000) {
            var relatedEventsWidth = 0;

            $('.related-events-max-four .column-4.profile-event').each(function(index) {
                relatedEventsWidth = relatedEventsWidth + $(this).outerWidth(true);
            });
            $('.related-events-max-four').css("width", relatedEventsWidth);
        }
        else {
          $('.related-events-max-four').css("width", "100%");
        }
    }
};
/************ calculate height of events wrapper ******************************/
var calcViewEventsHeight = function() {
  if ($('.view-current-events').length) {
    var numEvents = $('.profile-event').length;
    var eventHeight = $('.profile-event').outerHeight(true);
    var eventsWidth = $('.view-current-events').outerWidth(true);
    $('.view-current-events-scroll').css("width", eventsWidth + 18);
    if (numEvents <= 4) {
      $('.view-current-events').css("height", eventHeight);
      $('.view-current-events-scroll').css("height", eventHeight);
    }
    else if (numEvents > 4 && numEvents <= 8) {
      $('.view-current-events').css("height", eventHeight*2);
      $('.view-current-events-scroll').css("height", eventHeight*2);
    }
    else if (numEvents >= 9) {
      $('.view-current-events').css("height", eventHeight*3);
      $('.view-current-events-scroll').css("height", eventHeight*3);
    }
    if (numEvents > 12) {
      bounceDownArrow();
    }
  }
};

/************ calc height of followings wrapper ******************************/
var calcViewFollowsHeight = function() {
  if ($('.view-follows').length) {

    var numFollows = $('.follow-item-col').length;
    var followsHeight = $('.follow-item-col').outerHeight(true);
    var followsWidth = $('.view-follows').outerWidth(true);
    $('.view-follows-scroll').css("width", followsWidth + 18);

    if (numFollows <= 5) {
      $('.view-follows').css("height", followsHeight);
      $('.view-follows-scroll').css("height", followsHeight);
    }
    else if (numFollows > 5 && numFollows <= 10) {
      $('.view-follows').css("height", followsHeight*2);
      $('.view-follows-scroll').css("height", followsHeight*2);
    }
    else if (numFollows > 10 && numFollows <= 15) {
      $('.view-follows').css("height", followsHeight*3);
      $('.view-follows-scroll').css("height", followsHeight*3);
    }
    else if (numFollows > 15 && numFollows <= 20) {
      $('.view-follows').css("height", followsHeight*4);
      $('.view-follows-scroll').css("height", followsHeight*4);
    }
    else if (numFollows >= 21) {
      $('.view-follows').css("height", followsHeight*4);
      $('.view-follows-scroll').css("height", followsHeight*4);
      bounceDownArrow();
    }
    // bounce arrow for mobile view
    if (numFollows > 5 && $(window).width() < 1000 && $(window).width() > 509) {
      bounceDownArrow();
    }
    else if (numFollows > 4 && $(window).width() < 509) {
      bounceDownArrow();
    }
  }

};
/************ calculate height of galleries wrapper ******************************/
var calcViewGalleriesHeight = function() {
  if ($('.view-galleries').length) {
    var numGalls = $('.view-box-gallery').length;
    var eventHeight = $('.view-box-gallery').outerHeight(true);
    var eventsWidth = $('.view-galleries').outerWidth(true);
    $('.view-galleries-scroll').css("width", eventsWidth + 18);
    if (numGalls <= 3) {
      $('.view-galleries').css("height", eventHeight);
      $('.view-galleries-scroll').css("height", eventHeight);
    }
    else if (numGalls > 3 && numGalls <= 6) {
      $('.view-galleries').css("height", eventHeight*2);
      $('.view-galleries-scroll').css("height", eventHeight*2);
    }
    else if (numGalls > 7) {
      $('.view-galleries').css("height", eventHeight*3);
      $('.view-galleries-scroll').css("height", eventHeight*3);
    }
    if (numGalls > 9) {
      bounceDownArrow();
    }
  }
};

/************ switch between tabs on invites page ******************************/
var openTab = function() {

  if ($('.tab-bar').length) {
    $('.tab-bar li').first().addClass( "active-tab" );
    $('.view-invites-received').hide();

    $('.tab-bar li').click(
      function() {
        $(this).addClass( "active-tab" );
        $(this).siblings().removeClass( "active-tab" );
        if ($(this).attr('id') == "sent-inv") {
          $('.view-invites-sent').show();
          $('.view-invites-received').hide();
        }
        else if ($(this).attr('id') == "rec-inv") {
          $('.view-invites-sent').hide();
          $('.view-invites-received').show();
        }
      });
  }
};


/************ calculate height of invites wrappers ******************************/
var calcViewInvitesHeight = function() {

  if ($('.view-invites-sent').length) {
    var numInvitesSent = $('.view-invites-sent .artist-invite').length;

    if ($('.view-invites-sent').is(':visible')) {
      var invitesSentHeight = $('.view-invites-sent .artist-invite').outerHeight(true);
      var invitesSentWidth = $('.view-invites-sent').outerWidth(true);
    }
    else {
      var invitesSentHeight = $('.view-invites-received .artist-invite').outerHeight(true);
      var invitesSentWidth = $('.view-invites-received').outerWidth(true);
    }

      $('.view-invites-sent-scroll').css("width", invitesSentWidth + 18);

    if (numInvitesSent <= 5) {
      for (i = 1; i < 5; i++) {
        if (numInvitesSent == i) {
          $('.view-invites-sent').css("height", invitesSentHeight*i );
          $('.view-invites-sent-scroll').css("height", invitesSentHeight*i );
        }
      }
    }
    else {
      $('.view-invites-sent').css("height", invitesSentHeight*5);
      $('.view-invites-sent-scroll').css("height", invitesSentHeight*5);
      bounceDownArrow();
    }
  }

  if ($('.view-invites-received').length) {

    var numInvitesRecd = $('.view-invites-received .artist-invite').length;

    if ($('.view-invites-received').is(':visible')) {
      var invitesRecdHeight = $('.view-invites-received .artist-invite').outerHeight(true);
      var invitesRecdWidth = $('.view-invites-received').outerWidth(true);
    }
    else {
      var invitesRecdHeight = $('.view-invites-sent .artist-invite').outerHeight(true);
      var invitesRecdWidth = $('.view-invites-sent').outerWidth(true);
    }
      $('.view-invites-received-scroll').css("width", invitesRecdWidth + 18);
    if (numInvitesRecd <= 5) {
      for (i = 1; i < 5; i++) {
        if (numInvitesSent == i) {
          $('.view-invites-received').css("height", invitesRecdHeight*i);
          $('.view-invites-received-scroll').css("height", invitesRecdHeight*i);
        }
      }
    }
    else {
      $('.view-invites-received').css("height", invitesRecdHeight*5);
      $('.view-invites-received-scroll').css("height", invitesRecdHeight*5);
      bounceDownArrowRecd();
    }
  }
};

/************ bounce downwards arrow to indicate scrolling possible ******************************/
var bounceDownArrow = function() {
  if ($('.down-arrow').length) {
    $('.events-wrapper').hover(
      function() {
        $('.down-arrow').addClass( "active" );
      }, function() {
        $('.down-arrow').removeClass( "active" );
      }
    );
    $('.follows-wrapper').hover(
      function() {
        $('.down-arrow').addClass( "active" );
      }, function() {
        $('.down-arrow').removeClass( "active" );
      }
    );
    $('.galleries-wrapper').hover(
      function() {
        $('.down-arrow').addClass( "active" );
      }, function() {
        $('.down-arrow').removeClass( "active" );
      }
    );
    $('.view-invites-sent').hover(
      function() {
        $('.down-arrow').addClass( "active" );
      }, function() {
        $('.down-arrow').removeClass( "active" );
      }
    );
    if ($(window).width() < 1000) {
        $('.down-arrow').addClass( "active" );
    }
    else {
      $('.down-arrow').removeClass( "active" );
    }
  }
};

/************ for invites sent ******************************/
var bounceDownArrowSent = function() {
  $('.view-invites-sent').hover(
    function() {
      $('.down-arrow.sent-arrow').addClass( "active" );
    }, function() {
      $('.down-arrow.sent-arrow').removeClass( "active" );
    }
  );
};

/************ for invites received ******************************/
var bounceDownArrowRecd = function() {
  $('.view-invites-received').hover(
    function() {
      $('.down-arrow.recd-arrow').addClass( "active" );
    }, function() {
      $('.down-arrow.recd-arrow').removeClass( "active" );
    }
  );
};

var addImagesSelect = function() {
  if ($('#select-artists').length) {
    $("#select-artists").msDropDown();
  }
};

var lightenYourPrice = function() {
  $(".your-price").keyup(function(){
       if ($(this).val() !== ''){
           $(this).css('background-color', '#fff')
       } else {
           $(this).css('background-color', '#2d2d2d')
       }
   });
};

var checkReqPrice = function() {
    $('#req-price').click(function() {
        var cb1 = $('#req-price').is(':checked');
        $('#prod-your-price, #prod-rec-price, #prod-your-profit').prop('disabled', (cb1));
    });
};

var yearSpinner = function() {
  if ($('#product-year').length) {
    var spinner = $( "#product-year" ).spinner({ min: new Date().getFullYear() - 100, max: new Date().getFullYear() });
  }
};
