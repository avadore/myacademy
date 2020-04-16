( function (jQuery, elementor) {
    "use strict";

    var ElementsKit_WidgetArea = {
        init: function () {
            elementor.hooks.addAction('frontend/element_ready/metform.default', function (scope) {

                if(typeof window.parent.jQuery === 'undefined'){
                    return;
                }

                var formTemplateSelectorOpenButton = scope.find('.formpicker_warper_edit');

                formTemplateSelectorOpenButton.off('click.metform').on('click.metform', function(){
                    var formTemplateSelector = window.parent.jQuery('#metform-open-content-editor'),
                    key = formTemplateSelectorOpenButton.attr('data-metform-formpicker-key');
                    var nonce = jQuery(this).attr('data-nonce');
                    formTemplateSelector.find('.metform-error').remove();
                    


                    var popupTab = formTemplateSelector.find('.metform-content-editor-radio');
                    popupTab.on('click', function(e){
                        var self = jQuery(this),
                            dataTarget = self.closest('li').data('target');
                            
                            formTemplateSelector.find('#'+ dataTarget).fadeIn().siblings().hide();
                    });
                    
                    
                    jQuery.ajax({
                        url: jQuery(this).attr('resturl') + (key || 0),
                        type: 'get',
                        headers: {
                            'X-WP-Nonce': nonce
                        },
                        dataType: 'html',
                        success: function (output) {
                            if(output){
                                
                                formTemplateSelector.find('.metform-content-editor-radio').first().trigger('click');
                                formTemplateSelector.find('.metform-open-content-editor-templates').html(output);
                            } else {
                                formTemplateSelector.find('.metform-content-editor-radio').last().trigger('click');
                                formTemplateSelector.find('.metform-open-content-editor-templates').parent().append("<p class='metform-error'>No forms were created yet!</p>")
                            }
                            
                        }
                    });

                    formTemplateSelector.show();
                });
        
                window.parent.jQuery('#metform-open-content-editor').off('click.metform').on('click.metform', '.metform-open-content-editor-button', function() {
                    
                    var iframeModal = window.parent.jQuery('.metform-dynamic-content-modal'),
                        iframe = iframeModal.find('#formpicker-control-iframe'),
                        iframeLoading = iframeModal.find('.dialog-lightbox-loading'),
                        modalContainer = iframeModal.find('.dialog-type-lightbox');


                    var conParent = jQuery(this).parents('.metform-open-content-inner'),
                        content_key = conParent.find('.metform-open-content-editor-templates').val(),
                        editorTabInput = conParent.find('.metform-content-editor-radio:checked').val(),
                        editorTamplateInput = conParent.find('.metform-template-radio:checked').val(),
                        editorTemplateName = conParent.find('.metform-template-input-con input').val();
                    var nonce = window.parent.jQuery('#metform-form-modalinput-settings').data('nonce');
                    
                        if(editorTabInput == 'saved'){
                            window.parent.jQuery('body').attr('data-metform-template-key', content_key);
                        }else{
                            jQuery.ajax({
                                url: jQuery(this).attr('resturl') + 'builder_form_id/' + editorTamplateInput +'?title=' + editorTemplateName,
                                type: 'GET',
                                headers: {
                                    'X-WP-Nonce': nonce
                                },
                                success: function (output) {
                                    window.parent.jQuery('body').attr('data-metform-template-key', output);
                                    conParent.find('.metform-template-input-con input').val('');
                                    conParent.find('.metform-template-radio').removeAttr('checked').first().attr('checked', 'checked');
                                    content_key = output;
                                },
                                async: false
                            });
                        }
                    
                    var url = jQuery(this).attr('resturl') + 'builder/' + content_key;

                    window.parent.jQuery('body').attr('data-metform-template-load', 'false');

                    modalContainer.show();
                    iframeModal.show();
                    iframeLoading.show();
                    iframe.contents().find('#elementor-loading').show();
                    iframe.css('z-index', '-1');
                    iframe.attr('src', url);

                    iframe.on('load', function() {
                        iframeLoading.hide();
                        iframe.show();
                        iframe.contents().find('#elementor-loading').hide();
                        iframe.css('z-index', '1');
                    });
                });

                window.parent.jQuery('#elementor-editor-wrapper').on('click', '#metform-inspactor-edit-button', function(){
                    console.log('dom found');
                    // trigger click.metform', '.metform-open-content-editor-button'
                });
                
                
                function metformClosingPopup(windowLoc){
                    windowLoc.jQuery('body').attr('data-metform-template-load', 'true');
                    windowLoc.jQuery('.metform-dynamic-content-modal').hide();
                    windowLoc.jQuery('#metform-open-content-editor').hide();
                }

                if(typeof window.parent.jQuery !== 'undefined'){
                    var iframeCloseButton = window.parent.jQuery('.metform-close-editor-modals');
                    iframeCloseButton.off('click.metform').on('click.metform', function() {

                        if(jQuery(this).hasClass('metform-editor-close')) {

                            var iframeModal = window.parent.jQuery('.metform-dynamic-content-modal'),
                                iframe = iframeModal.find('#formpicker-control-iframe'),
                                iframeWindow = (iframe[0].contentWindow || iframe[0].contentDocument),
                                saved = iframeWindow.jQuery('#elementor-panel-saver-button-publish').hasClass('elementor-disabled');

                            if(!saved){

                                if(confirm("Leaving? Changes you made may not be saved.")) {

                                    iframeWindow.jQuery(iframeWindow).off('beforeunload');

                                    metformClosingPopup(window.parent);
                                } else {
                                    iframeWindow.jQuery(iframeWindow).off('beforeunload');
                                }
                                
                            } else {
                                metformClosingPopup(window.parent);
                            }
                        } else if(jQuery(this).hasClass('metform-picker-close')){

                            metformClosingPopup(window.parent);

                            var pickerContainer = window.parent.jQuery('#metform-open-content-editor'),
                                tabValue = pickerContainer.find('.metform-content-editor-radio:checked').val(),
                                templateValue = pickerContainer.find('.metform-open-content-editor-templates').val();

                            
                            if(tabValue == 'saved'){
                                window.parent.jQuery('body').attr('data-metform-template-key', templateValue);
                            }
                            metformClosingPopup(window.parent);
                        }
                        else {
                            metformClosingPopup(window.parent);
                        }

                        window.parent.jQuery('#metform-open-content-editor').find('.metform-picker-close').hide();
                        window.parent.jQuery('#metform-open-content-editor').find('.metform-template-radio').removeAttr('checked').first().attr('checked', 'checked');
                        
                    });
                }

                window.parent.jQuery('#metform-open-content-editor').find('.metform-open-content-editor-templates').on('change', function(){
                    window.parent.jQuery('#metform-open-content-editor').find('.metform-picker-close').fadeIn();
                });
            });
        },
    };

    jQuery(window).on('elementor/frontend/init', ElementsKit_WidgetArea.init);

}(jQuery, window.elementorFrontend) );