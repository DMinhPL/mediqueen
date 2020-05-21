// eslint-disable-next-line no-console
console.log('Common All Page');
(function($){
    function ui_scroll_fixNav() {
        const $headerTop = $('header .header__top');
        const $headermain = $('header .header__main');
        const height = $headermain.outerHeight();
        const _resize = () => {
            if ($(window).outerWidth() >= 992)
                $(window).on('scroll', function () {
                    if ($(this).scrollTop() > $headerTop.outerHeight()) {
                        $('.wrap-sticky-header').addClass('fixed');
                        $('main.wrapper').css({ paddingTop: height });
                    } else {
                        $('.wrap-sticky-header').removeClass('fixed');
                        $('main.wrapper').css({ paddingTop: '' });
                    }
                });
        };
        $(window).on('resize', _resize);
        _resize();
    }
    function ui_toggle_sidebarMenu(){
        $.bodyScrollTop = 0;
        $.bodyDisableScroll = function () {
            const $w = $(window);
            if ($w.width() > 992) return;
            $.bodyScrollTop = $w.scrollTop();
            $('#page').css({ height: $w.height(), overflow: 'hidden' });
        };
        $.bodyReturnScroll = function () {
            const $w = $(window);
            if ($w.width() > 992) return;
            $('#page').css({ height: '', overflow: '' });
            $w.scrollTop($.bodyScrollTop);
        };
        $('.wrap-sticky-header .bg-cover').on('click',function(){
            $('.wrap-sticky-header').removeClass('expandMenu');
            $('.wrap-sticky-header .btn-toggle-menu').removeClass('expand');
            $.bodyReturnScroll();
        });
        $('.wrap-sticky-header .btn-toggle-menu').on('click',function(e){
            e.preventDefault();
            if(!$(this).hasClass('expand')){
                $(this).addClass('expand');
                $('.wrap-sticky-header').addClass('expandMenu');
                $.bodyDisableScroll();
            }
            else{
                $(this).removeClass('expand');
                $('.wrap-sticky-header').removeClass('expandMenu');
                $.bodyReturnScroll();
            }
        });
    }
    $(function(){
        ui_scroll_fixNav();
        ui_toggle_sidebarMenu();
    });
})(jQuery);