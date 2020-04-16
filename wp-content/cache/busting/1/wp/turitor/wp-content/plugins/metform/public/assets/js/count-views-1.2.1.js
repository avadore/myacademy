jQuery(document).ready(function($) {
    'use strict'
    var forms = $('.metform-form-content');
    if(forms.length > 0){
        forms.each(function(i, v){
            var nonce = $(this).attr('data-nonce'),
            post_url = rest_api.end_point+'views/',
            form_id = $(this).attr('data-form-id');

            $.ajax({
                url: post_url+form_id,
                type: 'POST',
                headers: {
                    'X-WP-Nonce': nonce
                },
                success: function (response) {
                    //console.log(response);
                }
            });
        });
    }
});