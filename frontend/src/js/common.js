// eslint-disable-next-line no-console
/*global SimpleBar */
(function($) {
    function ui() {
        // Select UI
        // $.fn.select2.defaults.set('width', '100%');
        $('.select-ui').each(function() {
            const el = $(this);
            const selectUI = el.select2({
                placeholder: el.data('placeholder'),
                minimumResultsForSearch: -1,
            });

            // Update UI Scroll - Open dropdown
            selectUI.on('select2:open', function() {
                const id = $('.select2-results  > .select2-results__options').attr('id');
                $('.select2-results')
                    .attr({ id: id + '-group' })
                    .queue(function(next) {
                        new SimpleBar($('#' + id + '-group')[0]);
                        next();
                    });
            });
        });

        // Range UI
        $('.range-ui').each(function(key) {
            const el = $(this);
            el.attr({ id: 'range-ui-' + key }).queue(function(next) {
                $('#range-ui-' + key).ionRangeSlider();
                next();
            });
        });

        // Scroll
        $('.scroll-ui').each(function(key) {
            const el = $(this);
            el.attr({ id: 'scroll-ui-' + key }).queue(function(next) {
                new SimpleBar($('#' + el.attr('id'))[0]);
                next();
            });
        });

        // File Browse UI
        $('.file-ui .file-ui-input').change(function(e) {
            if (typeof e.target.files[0] !== 'undefined') {
                const fileName = e.target.files[0].name;
                $(this)
                    .siblings('.file-ui-label')
                    .text(fileName);
            }
        });

        // Parallax
    }
    function ui_scroll_fixNav() {
        const $headerTop = $('header .header__top');
        const $headermain = $('header .header__main');
        const height = $headermain.outerHeight();
        const _resize = () => {
            if ($(window).outerWidth() >= 992)
                $(window).on('scroll', function() {
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
    function ui_toggle_sidebarMenu() {
        $.bodyScrollTop = 0;
        $.bodyDisableScroll = function() {
            const $w = $(window);
            if ($w.width() > 992) return;
            $.bodyScrollTop = $w.scrollTop();
            $('#page').css({ height: $w.height(), overflow: 'hidden' });
        };
        $.bodyReturnScroll = function() {
            const $w = $(window);
            if ($w.width() > 992) return;
            $('#page').css({ height: '', overflow: '' });
            $w.scrollTop($.bodyScrollTop);
        };
        $('.wrap-sticky-header .bg-cover').on('click', function() {
            $('.wrap-sticky-header').removeClass('expandMenu');
            $('.wrap-sticky-header .btn-toggle-menu').removeClass('expand');
            $.bodyReturnScroll();
        });
        $('.wrap-sticky-header .btn-toggle-menu').on('click', function(e) {
            e.preventDefault();
            if (!$(this).hasClass('expand')) {
                $(this).addClass('expand');
                $('.wrap-sticky-header').addClass('expandMenu');
                $.bodyDisableScroll();
            } else {
                $(this).removeClass('expand');
                $('.wrap-sticky-header').removeClass('expandMenu');
                $.bodyReturnScroll();
            }
        });
    }
    function ui_dotdotdot() {
        $('.big-dotdotdot').dotdotdot({
            height: 90,
            fallbackToLetter: true,
            watch: true,
            truncate: 'word',
        });
        $('.dotdotdot').dotdotdot({
            height: 60,
            fallbackToLetter: true,
            watch: true,
            truncate: 'word',
        });
        $('.thumb-dotdotdot').dotdotdot({
            height: 70,
            fallbackToLetter: true,
            watch: true,
            truncate: 'word',
        });
    }
    function lazy_load() {
        setTimeout(() => {
            $('.productItem .imgPanel .magItem .item').removeClass('lazyLoad');
            $('.itemProduct.reverseFlex .imgPanel').removeClass('lazyLoad');
            $('.banner-home .imgPanel').removeClass('lazyLoad');
        }, 200);
    }
    $(function() {
        ui();
        ui_scroll_fixNav();
        ui_toggle_sidebarMenu();
        lazy_load();
        // ui_dotdotdot();
    });
})(jQuery);
