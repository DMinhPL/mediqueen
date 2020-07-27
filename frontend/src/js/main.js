/* global SimpleBar, Swiper */
(function($){
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
                clickable: true
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
            const $name = $('section.s__home--customers .sgrid__right .block__content__text .name');
            const mySlider = $('.sliderChange .avaGroup .slider').slick({
                dots: false,
                infinite: true,
                speed: 500,
                slidesToShow: 4,
                arrows:false,
                slidesToScroll: 1,
                centerPadding: '60px',
                focusOnSelect: true,
                asNavFor:'.content-changing .thumbSlider'
            });
            $('.content-changing .thumbSlider').slick({
                dots: false,
                infinite: true,
                speed: 500,
                slidesToShow: 1,
                arrows:false,
                slidesToScroll: 1,
                centerPadding: '60px',
                asNavFor:'.sliderChange .avaGroup .slider'
            });
            mySlider.on('afterChange', (e, slick, currentIndex) => {
                $name.addClass('d-none');
                $name
                  .filter(`[data-slider="${currentIndex + 1}"]`)
                  .removeClass('d-none');
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