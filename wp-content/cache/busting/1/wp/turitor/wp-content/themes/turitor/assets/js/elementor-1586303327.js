( function ($, elementor) {
	"use strict";


    var Turitor = {

        init: function () {
            
            var widgets = {
            'turitor-course.default': Turitor.Course_filter_mixcontent,
				'turitor-testimonial.default': Turitor.Testimonial,
            'turitor-main-slider.default': Turitor.Main_Slider,
            'turitor-service-slider.default': Turitor.Service_Slider,
            'turitor-campus-slider.default': Turitor.Campus_Slider,
				'turitor-course-category.default': Turitor.Course_Category,
				'turitor-instructor.default': Turitor.turitor_instructor,
				'turitor-team.default': Turitor.Team_filter_mixcontent,
	            
            };
            $.each(widgets, function (widget, callback) {
                elementor.hooks.addAction('frontend/element_ready/' + widget, callback);
            });
           
      },
      /*==========================================================
        Course filter tab
      ============================================================*/
      Course_filter_mixcontent: function ($scope) {

         var $container = $scope.find('#mixcontent');
         
         $container.mixItUp({
            animation: {
                effects: 'fade translateX(50%)',
                reverseOut: true,
                duration: 1000
            },
            load: {
                filter: 'all'
            }
        });	

        var $container1 = $scope.find('.course-shap');
        if ($container1.length > 0) {
           $container1.each(function () {
              var img = $(this);
              var attributes = img.prop("attributes");
              var imgURL = img.attr("src");
              $.get(imgURL, function (data) {
                  var svg = $(data).find('svg');
                  svg = svg.removeAttr('xmlns:a');
                  $.each(attributes, function () {
                      svg.attr(this.name, this.value);
                  });
                  img.replaceWith(svg);
              });
          });
          
        }


      },
         /*==========================================================
        campus slider 
      ============================================================*/
      Campus_Slider: function ($scope) {

         var $container = $scope.find('.campus-slider');

         var controls= JSON.parse($container.attr('data-controls'));
        
         var navShow = Boolean(controls.show_nav?true:false);
         var autoslide = Boolean(controls.auto_nav_slide?true:false);
         var dot_nav_show = Boolean(controls.dot_nav_show?true:false);
         var ts_slider_speed = parseInt(controls.ts_slider_speed);
         var count_show = parseInt(controls.count_show);
       
         if ($container.length > 0) {
            $container.owlCarousel({
               items: count_show,
               loop: true,
               autoplay: autoslide,
               nav: navShow,
               // animateOut: 'fadeOut',
               dots: dot_nav_show,
               autoplayTimeout: ts_slider_speed,
               autoplayHoverPause: true,
               mouseDrag: false,
               smartSpeed: 1100,
               navText: ['<i aria-hidden="true" class="icon icon-left-arrow"></i>', '<i aria-hidden="true" class="icon icon-right-arrow"></i>'],
               responsive: {
                  0: {
                     items: 1,
                     nav: false,
                  },
                  600: {
                     items: 1,
                     nav: false,
                  },
                  1000: {
                     nav: navShow,
                  }
               }
         
            });
         }
     }, 
     /*==========================================================
        service slider 
      ============================================================*/
      Service_Slider: function ($scope) {

         var $container = $scope.find('.service-slider');

         var conrol_data = $container.attr('data-controls');
         // var autoslide = true;
         var autoslide = false;
         var dot_nav_show = true;
         var count_show = 4;
         var navShow = true;
         var slide_gap = 30;
         var ts_slider_speed = 1000;
         if(conrol_data){
            var controls= JSON.parse($container.attr('data-controls'));
            var navShow = Boolean(controls.show_nav?true:false);
            var autoslide = Boolean(controls.auto_nav_slide?true:false);
            var dot_nav_show = Boolean(controls.dot_nav_show?true:false);
            var ts_slider_speed = parseInt(controls.ts_slider_speed);
            var count_show = parseInt(controls.count_show);
            var slide_gap = parseInt(controls.slide_gap);
         }

       
         if ($container.length > 0) {
            $container.owlCarousel({
               items: count_show,
              loop: false,
               autoplay: autoslide,
               nav: navShow,
               // animateOut: 'fadeOut',
               dots: dot_nav_show,
               autoplayTimeout: ts_slider_speed,
               autoplayHoverPause: true,
               mouseDrag: false,
               smartSpeed: 1100,
               margin: slide_gap,
               
               navText: ['<i aria-hidden="true" class="icon icon-left-arrow"></i> ', '<i aria-hidden="true" class="icon icon-right-arrow"></i>'],
               responsive: {
                  0: {
                     items: 1,
                     nav: false,
                  },
                  600: {
                     items: 2,
                     nav: false,
                  },
                  1000: {
                     nav: navShow,
                  }
               }
         
            });
         }
     },  
	   /*==========================================================
        Testimonial slider Classic
      ============================================================*/
      Testimonial: function ($scope) {
 
   
         if ($('.testimonial-carousel').length > 0) {
      
            var testimonial = $scope.find('.testimonial-carousel');
            var controls = testimonial.data('controls'); 
            var auto_loop = Boolean(controls.auto_loop=='yes'?true:false);
            var auto_play = Boolean(controls.auto_play=='yes'?true:false);
            var dot = Boolean(controls.dot=='yes'?true:false);
            var nav = Boolean(controls.nav=='yes'?true:false);
            var gapping = parseInt(controls.gapping);
            var slider_count = parseInt(controls.slider_count);

        
            testimonial.owlCarousel({
               items: slider_count,
               mouseDrag: true,
               loop: auto_loop,
               touchDrag: true,
               autoplay:auto_play,
               dots: dot,
               center: true,
               autoplayTimeout: 5000,
               margin: gapping,
               navText: ['<i class="tsicon tsicon-left-arrow2">', '<i class="tsicon tsicon-right-arrow2">'],

               nav: nav,
               autoplayHoverPause: true,
               smartSpeed: 1000,
               responsive: {
                  0: {
                     items: 1,
                     nav: false,
                  },
                  600: {
                     items: 2,
                     nav: false,
                  },
                  1000: {
                     items: slider_count,
                  
                  }
               }
            });
           
         }
    
         
        },
		
		// Main Slider
      Main_Slider: function ($scope) {

         var $container = $scope.find('.main-slider-style1');
         var conrol_data = $container.attr('data-controls');
         
         var autoslide = true;
         var navShow = true;
         var dot_nav_show = true;
         var ts_slider_speed = 5000;
         
         if(conrol_data){
            var controls = JSON.parse($container.attr('data-controls'));
            navShow = Boolean(controls.show_nav?true:false);
            autoslide = Boolean(controls.auto_nav_slide?true:false);
            dot_nav_show = Boolean(controls.dot_nav_show?true:false);
            ts_slider_speed = parseInt(controls.ts_slider_speed);
         }
         
         if ($container.length > 0) {
            $container.owlCarousel({
               items: 1,
               loop: true,
               autoplay: autoslide,
               nav: navShow,
               dots: dot_nav_show,
               autoplayTimeout: ts_slider_speed,
               autoplayHoverPause: true,
               mouseDrag: false,
               smartSpeed: 1100,
               navText: ['<i class="tsicon tsicon-left-arrow2">', '<i class="tsicon tsicon-right-arrow2">'],
               responsive: {
                  0: {
                     items: 1,
                     nav: false,
                  },
                  600: {
                     items: 1,
                     nav: false,
                  },
                  1000: {
                     nav: navShow,
                  }
               }
         
            });
         }

         var $container2 = $scope.find('.main-slider-style3');
         var conrol_data = $container2.attr('data-controls');
         
         var autoslide = true;
         var navShow = true;
         var dot_nav_show = true;
         var ts_slider_speed = 5000;
         
         if(conrol_data){
            var controls = JSON.parse($container2.attr('data-controls'));
            navShow = Boolean(controls.show_nav?true:false);
            autoslide = Boolean(controls.auto_nav_slide?true:false);
            dot_nav_show = Boolean(controls.dot_nav_show?true:false);
            ts_slider_speed = parseInt(controls.ts_slider_speed);
           
         }

         if ($container2.length > 0) {
            $container2.owlCarousel({
               items: 1,
               loop: true,
               autoplay: autoslide,
               nav: navShow,
               animateIn: 'fadeIn',
               animateOut: 'fadeOut',
               dots: dot_nav_show,
               autoplayTimeout: ts_slider_speed,
               autoplayHoverPause: true,
               mouseDrag: false,
               smartSpeed: 1100,
               navText: ['<i class="tsicon tsicon-left-arrow2">', '<i class="tsicon tsicon-right-arrow2">'],
               responsive: {
                  0: {
                     items: 1,
                     nav: false,
                  },
                  600: {
                     items: 1,
                     nav: false,
                  },
                  1000: {
                     nav: navShow,
                  }
               }
         
            });
         }
     },

		// instructor  Slider
      turitor_instructor: function ($scope) {

         var $container = $scope.find('.instructor-slider');

         var controls_data = $container.attr('data-controls');
         
         var navShow = false;
         var autoslide = true;
         var dot_nav_show = true;
         var ts_slider_speed = 800;
         var ts_slider_count = 3;

            if(controls_data){
               var controls= JSON.parse($container.attr('data-controls'));
               var navShow = Boolean(controls.show_nav?true:false);
               var autoslide = Boolean(controls.auto_nav_slide?true:false);
               var dot_nav_show = Boolean(controls.dot_nav_show?true:false);
               var ts_slider_speed = parseInt(controls.ts_slider_speed);
               var ts_slider_count = parseInt(controls.ts_slider_count);
            }

            
         
         if ($container.length > 0) {
            $container.owlCarousel({
               items: ts_slider_count,
               loop: false,
               autoplay: autoslide,
               nav: navShow,
               dots: dot_nav_show,
               autoplayTimeout: ts_slider_speed,
               autoplayHoverPause: true,
               mouseDrag: false,
               margin: 30,
               smartSpeed: 1100,
               navText: ['<i class="tsicon tsicon-left-arrow2">', '<i class="tsicon tsicon-right-arrow2">'],
               responsive: {
                  0: {
                     items: 1,
                     nav: false,
                  },
                  600: {
                     items: 2,
                     nav: false,
                  },
                  1000: {
                     nav: navShow,
                     items: ts_slider_count,
                  }
               }
         
            });
         }
     },

     	// course category dot shape svg
        Course_Category: function ($scope) {
         var $container1 = $scope.find('.course-dot-shape');
         if ($container1.length > 0) {
            $container1.each(function () {
               var img = $(this);
               var attributes = img.prop("attributes");
               var imgURL = img.attr("src");
               $.get(imgURL, function (data) {
                   var svg = $(data).find('svg');
                   svg = svg.removeAttr('xmlns:a');
                   $.each(attributes, function () {
                       svg.attr(this.name, this.value);
                   });
                   img.replaceWith(svg);
               });
           });
           
         }

        },


        Team_filter_mixcontent: function ($scope) {

         var $container = $scope.find('#mixcontent');
         
         $container.mixItUp({
            animation: {
                effects: 'fade translateX(50%)',
                reverseOut: true,
                duration: 1000
            },
            load: {
                filter: 'all'
            }
        });	
        
        
        var $container1 = $scope.find('.team-shap-1');
        if ($container1.length > 0) {
           $container1.each(function () {
              var img = $(this);
              var attributes = img.prop("attributes");
              var imgURL = img.attr("src");
              $.get(imgURL, function (data) {
                  var svg = $(data).find('svg');
                  svg = svg.removeAttr('xmlns:a');
                  $.each(attributes, function () {
                      svg.attr(this.name, this.value);
                  });
                  img.replaceWith(svg);
              });
          });
          
        }

        var $container2 = $scope.find('.team-shap-2');
        if ($container2.length > 0) {
           $container2.each(function () {
              var img = $(this);
              var attributes = img.prop("attributes");
              var imgURL = img.attr("src");
              $.get(imgURL, function (data) {
                  var svg = $(data).find('svg');
                  svg = svg.removeAttr('xmlns:a');
                  $.each(attributes, function () {
                      svg.attr(this.name, this.value);
                  });
                  img.replaceWith(svg);
              });
          });
          
        }
		
      },
   
    };
    $(window).on('elementor/frontend/init', Turitor.init);
}(jQuery, window.elementorFrontend) ); 

