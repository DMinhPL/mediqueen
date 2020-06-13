/* global Swiper */
(function($) {
    function form_validation() {
        $('.form-validate').each(function() {
            const $this = $(this);
            $this.validate();
        });
    }
    function slider() {
        new Swiper('#thumbNews .swiper-container', {
            slidesPerView: 1,
            pagination: {
                el: '#thumbNews .swiper-pagination',
                type: 'bullets',
            },
            autoplay: true,
            simulateTouch: false,
            mouseDrag: false,
            touchDrag: false,
        });
        // Product thumb slide
        const thumb = new Swiper('.s__products .thumbDetail .swiper-container', {
            slidesPerView: 'auto',
            spaceBetween: 0,
            pagination: {
                el: '.s__products .thumbDetail .swiper-pagination',
                type: 'bullets',
                clickable: true,
            },
            navigation: {
                nextEl: '.s__products .thumbDetail .swiper-button-next',
                prevEl: '.s__products .thumbDetail .swiper-button-prev',
            },
        });
        const $item = $('.s__products .thumbDetail .swiper-slide');
        const $magnifyThumb = $('.s__products .productItem .magnifyImg .magItem');
        $item.on('click', function() {
            const _index = thumb.clickedIndex;
            $magnifyThumb.addClass('d-none');
            $('.s__products .productItem .magnifyImg .magItem')
                .filter(`[data-id=${_index}]`)
                .removeClass('d-none');
        });
    }
    function droplist_selectbox_handle() {
        const $select = $('.nl-dropbox .nl-select');
        const $item = $('.nl-dropbox .nl-droplist .item-value');
        let result = null;

        $select.on('click', function() {
            const $this = $(this);
            if (!$this.hasClass('focusing')) {
                $select.removeClass('focusing');
                $this.addClass('focusing');
            } else $this.removeClass('focusing');
        });

        let isMouseOutside = false;
        $select
            .on('mouseenter', function() {
                isMouseOutside = false;
            })
            .on('mouseleave', function() {
                isMouseOutside = true;
            });

        $(window).on('click', function() {
            if (isMouseOutside) $select.removeClass('focusing');
        });

        $item.on('click', function(e) {
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
    function scrollToDetail() {
        const $more = $('.s__products .moreDetail');
        const $detail = $('.s__products .detailPanel.top');
        $more.on('click', function(e) {
            e.preventDefault();
            $('html,body').animate(
                {
                    scrollTop: $detail.offset().top - 80,
                },
                800
            );
        });
    }
    function step_payment() {
        $('.s__cart .block__content .step-app .step-footer').css({'justify-content': 'flex-end'});
        $('#cartProducts').steps({
            onChange: function(currentIndex, newIndex, stepDirection){
                //step 1
                if (currentIndex === 0) {
                    $('.s__cart .block__content .step-app .step-footer').css({'justify-content': 'flex-end'});
                    if(stepDirection === 'forward') return true;
                }
                if (currentIndex === 1){
                    $('.s__cart .block__content .step-app .step-footer').css({'justify-content': ''});
                    if(stepDirection === 'forward') return true;
                }
            },
            onFinish: function() {
                alert('Wizard Completed');
            },
        });

        const $activePromo = $('.s__cart .card__payment  .btn-custom.activePromo');
        $activePromo.on('click', function(e) {
            e.preventDefault();
            $(this)
                .closest('.card__payment__content--line')
                .find('input.inputCode')
                .removeClass('disabled')
                .focus();
        });
    }
    function custom_ordering_number(){
        const $decrease = $('.s__cart .card__order__content .customNum .decrease');
        const $increase = $('.s__cart .card__order__content .customNum .increase');
        $increase.on('click',function(){
            const $num = $(this).parent().find('input[type="number"]');
            const currentVal = parseInt($num.val());
            if (!isNaN(currentVal)) 
                $num.val(currentVal + 1);
        });
        $decrease.on('click',function(){
            const $num = $(this).parent().find('input[type="number"]');
            const currentVal = parseInt($num.val());
            if (!isNaN(currentVal) && currentVal > 0) 
                $num.val(currentVal - 1);
                if ($(window).outerWidth() < 992)
                    if($num.val() < 1){
                        $(this).closest('table').addClass('d-none');
                        cartEmptyState();
                    }
                    else {
                        $(this).closest('table').removeClass('d-none');
                        cartNoEmptyState();
                    }
                    
        });
    }
    const cartEmptyState = ()=>{
        $('.card__order .empty').removeClass('d-none');
        $('.card.card__payment').addClass('d-none');
        $('.s__cart .step-app .step-footer').addClass('d-none');
        $('.s__cart .step-app .step-steps').addClass('d-none');
        $('.s__cart .step-content .row .col-lg-8').addClass('col-lg-12');
    };
    const cartNoEmptyState = ()=>{
        $('.card__order .empty').addClass('d-none');
        $('.card.card__payment').removeClass('d-none');
        $('.s__cart .step-app .step-footer').removeClass('d-none');
        $('.s__cart .step-app .step-steps').removeClass('d-none');
        $('.s__cart .step-content .row .col-lg-8').removeClass('col-lg-12');
    };
    function remove_item_cart(){
        const $deleteDesktop = $('.tableOrdering.mobile-hide .deleteRow');
        $deleteDesktop.on('click',function(e){
            e.preventDefault();
            $.deleteRow(this,'.mobile-hide');
        });
        $.deleteRow = function(itself, _class){
            $(itself).closest('tr').animate({opacity:0},200,function(){
                $(this).remove();
            });
            setTimeout(() => {
                $.countItem(`${_class}`);
            }, 300);
        };
        $.countItem = function(_class){
            const $item = $(`.tableOrdering${_class} tbody tr`);
            const length = $item.length;
            if (length  < 2) {
                $(`.tableOrdering${_class}`).addClass('d-none');
                cartEmptyState();
            }
            else {
                $(`.tableOrdering${_class}`).removeClass('d-none');
                cartNoEmptyState();
            }
        };

    }
    $(function() {
        form_validation();
        slider();
        droplist_selectbox_handle();
        scrollToDetail();
        step_payment();
        custom_ordering_number();
        remove_item_cart();
    });
})(jQuery);
