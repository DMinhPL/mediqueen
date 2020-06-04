/* global SimpleBar, Swiper */
(function($){
    function ui() {
        // Select UI
        $.fn.select2.defaults.set('width', '100%');
        $('.select-ui').each(function() {
            const el = $(this);
            const selectUI = el.select2({
                placeholder: el.data('placeholder')
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
        $('[data-paroller-factor]').paroller();
    }
    // Image svg
    function imgSVG() {
        $('img.svg').each(function() {
            const $img = $(this);
            const imgID = $img.attr('id');
            const imgClass = $img.attr('class');
            const imgURL = $img.attr('src');
    
            $.get(
                imgURL,
                function(data) {
                    // Get the SVG tag, ignore the rest
                    let $svg = $(data).find('svg');
    
                    // Add replaced image's ID to the new SVG
                    if (typeof imgID !== 'undefined') $svg = $svg.attr('id', imgID);
    
                    // Add replaced image's classes to the new SVG
                    if (typeof imgClass !== 'undefined') $svg = $svg.attr('class', imgClass + ' replaced-svg');
    
                    // Remove any invalid XML tags as per http://validator.w3.org
                    $svg = $svg.removeAttr('xmlns:a');
    
                    // Replace image with new SVG
                    $img.replaceWith($svg);
                },
                'xml'
            );
        });
    }
    function gotoTop() {
        const topTop = $('.toTop');
        $(window).scroll(function() {
            if ($(this).scrollTop() > 200) topTop.addClass('active');
            else topTop.removeClass('active');
        });
        topTop.click(function() {
            $('body,html').animate(
                {
                    scrollTop: 0
                },
                500
            );
            return false;
        });
    }
    
    function init() {
        // Base
        // ui();
        // Image SVG
        imgSVG();
        // Go to top
        gotoTop();
    
        // $(window).on("debouncedresize", function (event) {
        //     // ...
        // });
        if (1 == 2) ui();
    }
    function slider_banner(){
        // $('.banner-home .owl-carousel').owlCarousel({
        //     // stagePadding: 50,
        //     loop:true,
        //     margin:80,
        //     dots:true,
        //     lazyLoad: true,
        //     mouseDrag:false,
        //     touchDrag:false,
        //     autoplay:true,
        //     items:1
        // });
        const swiper = new Swiper('.banner-home .swiper-container', {
            // Disable preloading of all images
            preloadImages: false,
            // Enable lazy loading
            lazy: true,
            effect: 'coverflow',
            grabCursor: false,
            simulateTouch:false,
            mouseDrag:false,
            touchDrag:false,
            centeredSlides: true,
            slidesPerView: 'auto',
            autoplay: {
                delay: 5000,
            },
            spaceBetween:150,
            coverflow: {
              rotate: 0,
              stretch: 0,
              depth: 0,
              modifier: 1,
              slideShadows : true
            },
            pagination: {
                el: '.banner-home .swiper-pagination',
                type: 'bullets',
            },
            navigation: {
                nextEl: '.banner-home .swiper-button-next',
                prevEl: '.banner-home .swiper-button-prev',
              },
            loop: true
          });
    }
    function slider_content(){
        const _social = ()=>{
            // new Swiper('#sSocials .swiper-container', {
            //     speed: 400,
            //     spaceBetween: 0,
            //     slidesPerView:1,
            //     navigation: {
            //         nextEl: '.swiper-button-next',
            //         prevEl: '.swiper-button-prev',
            //       },
            // });
            const owl = $('#sSocials .dm-width .owl-carousel').owlCarousel({
                items: 1,
                singleItem:true,
                nav: false,
                dots: false,
                loop: true,
                margin:0,
                mouseDrag:false,
                touchDrag:false,
                // autoplay:3000,
            });
            $('.customNextBtn').click(function(e) {
                e.preventDefault();
                owl.trigger('next.owl.carousel');
            });
            $('.customPrevBtn').click(function(e) {
                e.preventDefault();
                owl.trigger('prev.owl.carousel', [300]);
            });
        };
        _social();
        const _sliderChangeText = () =>{
            let $item = null;
            new Swiper('.slider-changeContent .swiper-container', {
                slidesPerView:'auto',
                pagination: {
                    el: '.slider-changeContent .swiper-pagination',
                    type: 'bullets',
                },
                on: {
                    init: function () {
                        $item = $('.slider-changeContent .avaGroup .img-bg');
                        $item.activeItemIndex = $('.slider-changeContent .avaGroup .img-bg.choosing');
                    },
                  },
            });
            // $('.slider-changeContent .owl-carousel').owlCarousel({
            //     // stagePadding: 50,
            //     loop:true,
            //     margin:40,
            //     dots:true,
            //     nav:false,
            //     lazyLoad: true,
            //     items:4,
            // });
            const item = '.slider-changeContent .avaGroup .img-bg';
            $(document.body).on('click',item,function(e){
                e.preventDefault();
                const $this = $(this);
                if($this.index()=== $item.activeItemIndex) return;
                $item.removeClass('choosing');
                $this.addClass('choosing');
                $item.activeItemIndex = $this.index();
            });
        };
        _sliderChangeText();
    };
    $(function(){
        $('body').imagesLoaded(function() {
            init();
            $('body').addClass('loaded');
            $('.pageLoad').fadeOut();
        });
        slider_banner();
        slider_content();
    });
})(jQuery);