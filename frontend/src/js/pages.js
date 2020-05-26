(function($){
    function form_validation(){
        $('.form-validate').each(function(){
            const $this = $(this);
            $this.validate();
        });
    }
    $(function(){
        form_validation();
    });
})(jQuery);