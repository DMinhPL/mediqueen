/* global Swiper */
(function($){
    function form_validation(){
        $('.form-validate').each(function(){
            const $this = $(this);
            $this.validate();
        });
    }
    function slider(){
        new Swiper('#thumbNews .swiper-container',{
            slidesPerView:1,
            pagination: {
                el: '#thumbNews .swiper-pagination',
                type: 'bullets',
            },
            autoplay:true,
            simulateTouch:false,
            mouseDrag:false,
            touchDrag:false,
        });
    }
    $(function(){
        form_validation();
        slider();
    });
})(jQuery);