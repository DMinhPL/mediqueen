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
                clickable:true
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
    function droplist_selectbox_handle() {
        const $select = $('.nl-dropbox .nl-select');
        const $item = $('.nl-dropbox .nl-droplist .item-value');
        let result = null;

        $select.on('click', function () {
            const $this = $(this);
            if (!$this.hasClass('focusing')) {
                $select.removeClass('focusing');
                $this.addClass('focusing');
            } else $this.removeClass('focusing');
        });

        let isMouseOutside = false;
        $select
            .on('mouseenter', function () {
                isMouseOutside = false;
            })
            .on('mouseleave', function () {
                isMouseOutside = true;
            });

        $(window).on('click', function () {
            if (isMouseOutside) $select.removeClass('focusing');
        });

        $item.on('click', function (e) {
            result = null;
            const it = e.currentTarget;
            const itVal = $(it).attr('data-value');
            $item.removeClass('choosing');
            $(it).addClass('choosing');

            result = itVal;
            $(it)
                .closest('.nl-dropbox')
                .find('.nl-select span')
                .text(result);
        });
    }
    function scrollToDetail(){
        const $more = $('.s__products .moreDetail');
        const $detail = $('.s__products .detailPanel.top');
        $more.on('click',function(e){
            e.preventDefault();
            $('html,body').animate({
                scrollTop: $detail.offset().top - 80
            },800);
            
        });
    }
    $(function(){
        form_validation();
        slider();
        droplist_selectbox_handle();
        scrollToDetail();
    });
})(jQuery);