jQuery(document).ready(function($) {
    "use strict";



    /**-------------------------------------------------
     *Fixed Header
     *----------------------------------------------------**/
    if ($('.header').length > 0) {
        var previousScroll = 0,
            headerOrgOffset = $('.header').offset().top;

        if ($(window).width() > 1200) {
            $(window).scroll(function() {
                var currentScroll = $(this).scrollTop();
                if (currentScroll > headerOrgOffset) {
                    if (currentScroll > previousScroll) {
                        $('.navbar-sticky').removeClass('sticky fade_down_effect');
                    } else {
                        $('.navbar-sticky').addClass('sticky fade_down_effect');
                    }
                } else {
                    $('.navbar-sticky').removeClass('sticky fade_down_effect');
                }
                previousScroll = currentScroll;
            });

        }
    }


    /* ----------------------------------------------------------- */
    /*  Mobile Menu
    /* ----------------------------------------------------------- */
    $('.dropdown > a').on('click', function(e) {
        e.preventDefault();
        if ($(window).width() > 991) {
            location.href = this.href;
        }
        var dropdown = $(this).parent('.dropdown');
        dropdown.find('>.dropdown-menu').slideToggle('show');
        $(this).toggleClass('opened');
        return false;
    });



    /* ----------------------------------------------------------- */
    /*  Back to top
    /* ----------------------------------------------------------- */

    $(window).on('scroll', function() {
        if ($(window).scrollTop() > $(window).height()) {
            $(".BackTo").fadeIn('slow');
        } else {
            $(".BackTo").fadeOut('slow');
        }

    });
    $("body, html").on("click", ".BackTo", function(e) {
        e.preventDefault();
        $('html, body').animate({
            scrollTop: 0
        }, 800);
    });


    /*==========================================================
          Side Offset menu open
       ======================================================================*/

    if ($('.navSidebar-button').length > 0) {
        $('.navSidebar-button').on('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            $('.info-group').addClass('isActive');
        });
    }
    if ($('.close-side-widget').length > 0) {
        $('.close-side-widget').on('click', function(e) {
            e.preventDefault();
            $('.info-group').removeClass('isActive');
        });
    }
    $('body').on('click', function(e) {
        $('.info-group').removeClass('isActive');
        $('.cart-group').removeClass('isActive');
    });
    $('.xs-sidebar-widget').on('click', function(e) {
        e.stopPropagation();
    });


    /*==========================================================
                review rating circle
    ======================================================================*/
    $(function() {
        $('.review-chart').easyPieChart({
            scaleColor: "",
            lineWidth: 3,
            lineCap: 'butt',
            barColor: '#bc906b',
            trackColor: "rgba(0,0,0, .30)",
            size: 35,
            animate: 35
        });
    });
    /*==========================================================
                    learn press user setting frontend 
        ======================================================================*/
    if ($('.social_repeater').length) {
        $('.social_repeater').repeater();
    }

    /*==========================================================
                    Instructor Follow 
    ======================================================================*/
    if ($('.turitor-follow-instructor').length) {
        $('.turitor-follow-instructor').on('click', function() {

            var user_id = $(this).data('user-id');
            var follow_ele = $(this);
            var login = Boolean(turitor_obj.logged_in);

            if (login) {

                $.ajax({
                    url: turitor_obj.ajax_url,
                    type: 'POST',
                    data: { "action": "instructor_follow", 'instructor_id': user_id },
                    success: function(response) {

                        $(follow_ele).text('Following');
                    },

                });
            } else {
                var login_text = "<div class='turitor_user_not_loggedin'>" + turitor_obj.message_login + "</div>";
                $(follow_ele).parent().append(login_text);
            }


        });
    }

    /*==========================================================
                  Trending course archive 
    ======================================================================*/

    if ($('.turitor_trending_course').length > 0) {
        var items = parseInt($('.turitor_trending_course').data('count'));
        var autoslide = Boolean($('.turitor_trending_course').data('autoplay'));
        var navShow = Boolean($('.turitor_trending_course').data('nav'));
        var dot_nav_show = Boolean($('.turitor_trending_course').data('dot'));

        $('.turitor_trending_course').owlCarousel({
            items: items || 1,
            loop: false,
            autoplay: autoslide,
            nav: navShow,
            dots: dot_nav_show,
            autoplayHoverPause: true,
            mouseDrag: true,
            smartSpeed: 1100,
            margin: 30,
            navText: ['<i class="tsicon tsicon-left_arrow">', '<i class="tsicon tsicon-right_arrow">'],
            responsive: {
                0: {
                    items: 1,
                    nav: false,
                },
                600: {
                    items: 2,
                },
                768: {
                    items: 2,
                },
                1000: {
                    nav: navShow,
                    items: items || 1,
                }
            }
        });

    }

    /*==========================================================
                   Course category filter
        ======================================================================*/

    if ($(".archive-cat-title").length > 0) {
        $(".archive-cat-title").click(function() {
            $(".course-category-filter").slideToggle("slow", function() {});
        });
    }

    if ($(".archive-skill-title").length > 0) {
        $(".archive-skill-title").click(function() {
            $(".course-skill-filter").slideToggle("slow", function() {});
        });
    }


   /*==========================================================
        login Rgister popup
    ======================================================================*/
    
    if ($('.ts-login-popup').length > 0 ) {
        $('.ts-login-popup').on('click',function(e){
            e.preventDefault();
            $('body').toggleClass('ts-ld-modal');
        });  
        $('.ld-modal-closer.ld-icon.ld-icon-delete').on('click',function(){
            $('body').removeClass('ts-ld-modal');
        }); 
    }


    /*==========================================================
                   Gallery popup
        ======================================================================*/



    if ($('.ts-gallery-popup').length > 0) {
        $('.ts-gallery-popup').magnificPopup({
            type: 'image',
            mainClass: 'mfp-with-zoom',
            gallery: {
                enabled: true
            },
            zoom: {
                enabled: true, // By default it's false, so don't forget to enable it

                duration: 300, // duration of the effect, in milliseconds
                easing: 'ease-in-out', // CSS transition easing function

                opener: function(openerElement) {
                    return openerElement.is('img') ? openerElement : openerElement.find('img');
                }
            }
        });
    }

    /*==========================================================
                  Course shape
        ======================================================================*/
        if ($('.single-course, .tutor-course').length > 0) {
            $(".single-course .course-shap, .tutor-course .course-shap").each(function() {
                var img = $(this);
                var attributes = img.prop("attributes");
                var imgURL = img.attr("src");
                $.get(imgURL, function(data) {
                    var svg = $(data).find('svg');
                    svg = svg.removeAttr('xmlns:a');
                    $.each(attributes, function() {
                        svg.attr(this.name, this.value);
                    });
                    img.replaceWith(svg);
                });
            });
    
        }


    /*==========================================================
                  Preloader
 ======================================================================*/
    $(window).on('load', function() {

        setTimeout(() => {
            $('#preloader').addClass('loaded');
        }, 1000);

    });
    // preloader close
    $('.preloader-cancel-btn').on('click', function(e) {
        e.preventDefault();
        if (!($('#preloader').hasClass('loaded'))) {
            $('#preloader').addClass('loaded');
        }
    });


    /*==========================================================
                     Loadmore
    ======================================================================*/


    $('body').on('click', '.loadmore', function() {
        var _self = $(this);
        var paged = parseInt(_self.attr('data-paged'));
        var posts_per_page = _self.attr('data-posts_per_page');
        var order = _self.attr('data-order');
        var cat_id = _self.attr('data-cat_id');

        var data = {
            'action': 'load_posts_by_ajax',
            'paged': paged,
            'posts_per_page': posts_per_page,
            'order': order,
            'cat_id': cat_id,
            'security_nonce': turitor_obj.security
        };

        $.post(turitor_obj.ajax_url, data, function(response) {
            if ($.trim(response) != '') {
                $('.course-single-wrap').append(response);
                paged++;
                console.log(paged);
                _self.attr('data-paged', paged);
            } else {
                $('.loadmore').hide();
            }
        });
    });


    
        // Sticky sidebar

        if(turitor_obj.blog_sticky_sidebar == 'yes' && $('#sidebar').length>0){
               
            var top = $('#sidebar').offset().top - parseFloat($('#sidebar').css('marginTop').replace(/auto/, 0));
            var footTop = null;
            if($('.newsletter-area').length>0){
                 footTop = $('.newsletter-area').offset().top - parseFloat($('.newsletter-area').css('marginTop').replace(/auto/, 0));
            } else if($('.ts-footer').length>0){
                footTop = $('.ts-footer').offset().top - parseFloat($('.ts-footer').css('marginTop').replace(/auto/, 0));
           }
            else{
                footTop = $('.copy-right').offset().top - parseFloat($('.copy-right').css('marginTop').replace(/auto/, 0));  
            }
           
    
            var maxY = footTop - $('#sidebar').outerHeight();
    
            $(window).scroll(function(evt) {
               var y = $(this).scrollTop();
    
               if($(window).width() > 991)
               {
                if (y > top) {
    
                    if (y < maxY) {
                          $('#sidebar').addClass('fixed').removeAttr('style');
                    } else {
                          
      
                          $('#sidebar').removeClass('fixed').css({
                            
                             top: (maxY - top) + 'px',
                             position: 'relative',
                          });
                    }
                 } else {
      
                  $('#sidebar').removeClass('fixed');
                 }
               }
             
            });
    
      }

});