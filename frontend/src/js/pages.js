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
        // Product thumb slide
        const thumb = new Swiper('.s__products .thumbDetail .swiper-container',{
            slidesPerView:'auto',
            spaceBetween: 0,
            pagination: {
                el: '.s__products .thumbDetail .swiper-pagination',
                type: 'bullets',
            },
            navigation: {
                nextEl: '.s__products .thumbDetail .swiper-button-next',
                prevEl: '.s__products .thumbDetail .swiper-button-prev',
              },
        });
        const $item = $('.s__products .thumbDetail .swiper-slide');
        const $magnifyThumb = $('.s__products .productItem .magnifyImg .magItem');
        $item.on('click',function(){
            const _index  = thumb.clickedIndex;
            $magnifyThumb.addClass('d-none');
            $('.s__products .productItem .magnifyImg .magItem')
                .filter(`[data-id=${_index}]`).removeClass('d-none');

        });

    }
    $(function(){
        form_validation();
        slider();
    });
})(jQuery);