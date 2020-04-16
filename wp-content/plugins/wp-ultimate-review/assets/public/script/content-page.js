
/*Ratting script*/
jQuery(document).ready(function(){
  
  jQuery('#xs_review_stars li').on('mouseover', function(){
    var onStar = parseInt(jQuery(this).data('value'), 10); // The star currently mouse on
   jQuery(this).parent().children('li.star-li').each(function(e){
      if (e < onStar) {
        jQuery(this).addClass('hover');
      }
      else {
        jQuery(this).removeClass('hover');
      }
    });
    
  }).on('mouseout', function(){
    jQuery(this).parent().children('li.star-li').each(function(e){
      jQuery(this).removeClass('hover');
    });
  });
  
  
  jQuery('#xs_review_stars li').on('click', function(){
    var onStar = parseInt(jQuery(this).data('value'), 10); // The star currently selected
    var stars = jQuery(this).parent().children('li.star-li');
    
    for (i = 0; i < stars.length; i++) {
      jQuery(stars[i]).removeClass('selected');
    }
    
    for (i = 0; i < onStar; i++) {
      jQuery(stars[i]).addClass('selected');
    }
    
	var displayId = jQuery(this).parent().parent().children('input#ratting_review_hidden');
	displayId.val(onStar);
	
	var msg = "";
    if (onStar > 1) {
        msg = "<strong>" + onStar + "</strong>";
    }
    else {
        msg = "<strong>" + onStar + " </strong>";
    }
    responseMessage(msg);
    
  });
  
  
});


function responseMessage(msg) {
  jQuery('#review_data_show').fadeIn(200);  
  jQuery('#review_data_show').html("<span>" + msg + "</span>");
}


/*Slider range*/
jQuery(document).ready(function(){
	
	var sliderReview = jQuery("#xs_review_range");
	var outputReview = jQuery("#review_data_show");
	if(sliderReview.length > 0){
		outputReview.html( sliderReview.val() );
		sliderReview.on('change', function(){
			outputReview.html( jQuery(this).val() );
		});
	}
	
});

