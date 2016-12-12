/******* Run functions when document is ready ********/
$(document).ready(function() {
    dropMenu();
    $('[bg-img]').bgImage();
    openRegPanel();
    mobileMenu();
    initMainSlider();
});

/******* Run functions when document resize **********/
$(window).resize(function() {

});


/*****************************************************/
/******************* FUNCTIONS ***********************/
/*>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>*/

/************ drop menu ******************************/
var dropMenu = function() {
    var $trigger = $('[trigger]');
    var $drop = $('[dropdown]');
    // on click on dropdown icon in header
    $trigger.on('click', function(e) {

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
                    $("body, html").attr("style", "");
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
        if ($("#mob_menu").is(":visible")) {
            $("#mob_menu").hide();
        } else {
            $("#mob_menu").show();
        }
        e.preventDefault();
    });

    // hide mobile menu when start scrolling
    $('.main-container').scroll(function() {
        if ($("#mob_menu").is(":visible")) {
            $('#mob_menu').hide($('.main-container').scrollTop() > 2);
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
