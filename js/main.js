/* -------------------------------------------

Name: 		Ruizarch
Version:    1.0
Developer:	Nazar researchiler (researchilerDigitalDesign)
Portfolio:  https://themeforest.net/user/researchilerdigitaldesign/portfolio?ref=researchilerDigitalDesign

p.s. I am available for Freelance hire (UI design, web development). email: researchiler.themes@gmail.com

------------------------------------------- */

$(function () {

    "use strict";

    /***************************

    swup

    ***************************/
    const options = {
        containers: ['#swupMain', '#swupMenu'],
        animateHistoryBrowsing: true,
        linkSelector: 'a:not([data-no-swup])',
        animationSelector: '[class="researchi-main-transition"]'
    };
    const swup = new Swup(options);

    /***************************

    register gsap plugins

    ***************************/
    gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);
    /***************************

    color variables

    ***************************/

    var accent = 'rgba(255, 152, 0, 1)';
    var dark = '#000';
    var light = '#fff';

    /***************************

    preloader
    
    ***************************/

    var timeline = gsap.timeline();

    timeline.to(".researchi-preloader-animation", {
        opacity: 1,
    });

    timeline.fromTo(
        ".researchi-animation-1 .researchi-h3", {
            y: "30px",
            opacity: 0
        }, {
            y: "0px",
            opacity: 1,
            stagger: 0.4
        },
    );

    timeline.to(".researchi-animation-1 .researchi-h3", {
        opacity: 0,
        y: '-30',
    }, "+=.3");

    timeline.fromTo(".researchi-reveal-box", 0.1, {
        opacity: 0,
    }, {
        opacity: 1,
        x: '-30',
    });

    timeline.to(".researchi-reveal-box", 0.45, {
        width: "100%",
        x: 0,
    }, "+=.1");
    timeline.to(".researchi-reveal-box", {
        right: "0"
    });
    timeline.to(".researchi-reveal-box", 0.3, {
        width: "0%"
    });
    timeline.fromTo(".researchi-animation-2 .researchi-h3", {
        opacity: 0,
    }, {
        opacity: 1,
    }, "-=.5");
    timeline.to(".researchi-animation-2 .researchi-h3", 0.6, {
        opacity: 0,
        y: '-30'
    }, "+=.5");
    timeline.to(".researchi-preloader", 0.8, {
        opacity: 0,
        ease: 'sine',
    }, "+=.2");
    timeline.fromTo(".researchi-up", 0.8, {
        opacity: 0,
        y: 40,
        scale: .98,
        ease: 'sine',

    }, {
        y: 0,
        opacity: 1,
        scale: 1,
        onComplete: function () {
            $('.researchi-preloader').addClass("researchi-hidden");
        },
    }, "-=1");
    /***************************

    anchor scroll

    ***************************/
    $(document).on('click', 'a[href^="#"]', function (event) {
        event.preventDefault();

        var target = $($.attr(this, 'href'));
        var offset = 0;

        if ($(window).width() < 1200) {
            offset = 90;
        }

        $('html, body').animate({
            scrollTop: target.offset().top - offset
        }, 400);
    });
    /***************************

    append

    ***************************/
    $(document).ready(function () {
        $(".researchi-arrow").clone().appendTo(".researchi-arrow-place");
        $(".researchi-dodecahedron").clone().appendTo(".researchi-animation");
        $(".researchi-lines").clone().appendTo(".researchi-lines-place");
        $(".researchi-main-menu ul li.researchi-active > a").clone().appendTo(".researchi-current-page");
    });
    /***************************

    accordion

    ***************************/

    let groups = gsap.utils.toArray(".researchi-accordion-group");
    let menus = gsap.utils.toArray(".researchi-accordion-menu");
    let menuToggles = groups.map(createAnimation);

    menus.forEach((menu) => {
        menu.addEventListener("click", () => toggleMenu(menu));
    });

    function toggleMenu(clickedMenu) {
        menuToggles.forEach((toggleFn) => toggleFn(clickedMenu));
    }

    function createAnimation(element) {
        let menu = element.querySelector(".researchi-accordion-menu");
        let box = element.querySelector(".researchi-accordion-content");
        let symbol = element.querySelector(".researchi-symbol");
        let minusElement = element.querySelector(".researchi-minus");
        let plusElement = element.querySelector(".researchi-plus");

        gsap.set(box, {
            height: "auto",
        });

        let animation = gsap
            .timeline()
            .from(box, {
                height: 0,
                duration: 0.4,
                ease: "sine"
            })
            .from(minusElement, {
                duration: 0.4,
                autoAlpha: 0,
                ease: "none",
            }, 0)
            .to(plusElement, {
                duration: 0.4,
                autoAlpha: 0,
                ease: "none",
            }, 0)
            .to(symbol, {
                background: accent,
                ease: "none",
            }, 0)
            .reverse();

        return function (clickedMenu) {
            if (clickedMenu === menu) {
                animation.reversed(!animation.reversed());
            } else {
                animation.reverse();
            }
        };
    }
    /***************************

    back to top

    ***************************/
    const btt = document.querySelector(".researchi-back-to-top .researchi-link");

    gsap.set(btt, {
        x: -30,
        opacity: 0,
    });

    gsap.to(btt, {
        x: 0,
        opacity: 1,
        ease: 'sine',
        scrollTrigger: {
            trigger: "body",
            start: "top -40%",
            end: "top -40%",
            toggleActions: "play none reverse none"
        }
    });
    /***************************

    cursor

    ***************************/
    const cursor = document.querySelector('.researchi-ball');

    gsap.set(cursor, {
        xPercent: -50,
        yPercent: -50,
    });

    document.addEventListener('pointermove', movecursor);

    function movecursor(e) {
        gsap.to(cursor, {
            duration: 0.6,
            ease: 'sine',
            x: e.clientX,
            y: e.clientY,
        });
    }

    $('.researchi-drag, .researchi-more, .researchi-choose').mouseover(function () {
        gsap.to($(cursor), .2, {
            width: 90,
            height: 90,
            opacity: 1,
            ease: 'sine',
        });
    });

    $('.researchi-drag, .researchi-more, .researchi-choose').mouseleave(function () {
        gsap.to($(cursor), .2, {
            width: 20,
            height: 20,
            opacity: .1,
            ease: 'sine',
        });
    });

    $('.researchi-accent-cursor').mouseover(function () {
        gsap.to($(cursor), .2, {
            background: accent,
            ease: 'sine',
        });
        $(cursor).addClass('researchi-accent');
    });

    $('.researchi-accent-cursor').mouseleave(function () {
        gsap.to($(cursor), .2, {
            background: dark,
            ease: 'sine',
        });
        $(cursor).removeClass('researchi-accent');
    });

    $('.researchi-drag').mouseover(function () {
        gsap.to($('.researchi-ball .researchi-icon-1'), .2, {
            scale: '1',
            ease: 'sine',
        });
    });

    $('.researchi-drag').mouseleave(function () {
        gsap.to($('.researchi-ball .researchi-icon-1'), .2, {
            scale: '0',
            ease: 'sine',
        });
    });

    $('.researchi-more').mouseover(function () {
        gsap.to($('.researchi-ball .researchi-more-text'), .2, {
            scale: '1',
            ease: 'sine',
        });
    });

    $('.researchi-more').mouseleave(function () {
        gsap.to($('.researchi-ball .researchi-more-text'), .2, {
            scale: '0',
            ease: 'sine',
        });
    });

    $('.researchi-choose').mouseover(function () {
        gsap.to($('.researchi-ball .researchi-choose-text'), .2, {
            scale: '1',
            ease: 'sine',
        });
    });

    $('.researchi-choose').mouseleave(function () {
        gsap.to($('.researchi-ball .researchi-choose-text'), .2, {
            scale: '0',
            ease: 'sine',
        });
    });

    $('a:not(".researchi-choose , .researchi-more , .researchi-drag , .researchi-accent-cursor"), input , textarea, .researchi-accordion-menu').mouseover(function () {
        gsap.to($(cursor), .2, {
            scale: 0,
            ease: 'sine',
        });
        gsap.to($('.researchi-ball svg'), .2, {
            scale: 0,
        });
    });

    $('a:not(".researchi-choose , .researchi-more , .researchi-drag , .researchi-accent-cursor"), input, textarea, .researchi-accordion-menu').mouseleave(function () {
        gsap.to($(cursor), .2, {
            scale: 1,
            ease: 'sine',
        });

        gsap.to($('.researchi-ball svg'), .2, {
            scale: 1,
        });
    });

    $('body').mousedown(function () {
        gsap.to($(cursor), .2, {
            scale: .1,
            ease: 'sine',
        });
    });
    $('body').mouseup(function () {
        gsap.to($(cursor), .2, {
            scale: 1,
            ease: 'sine',
        });
    });
    /***************************

     menu

    ***************************/
    $('.researchi-menu-btn').on("click", function () {
        $('.researchi-menu-btn').toggleClass('researchi-active');
        $('.researchi-menu').toggleClass('researchi-active');
        $('.researchi-menu-frame').toggleClass('researchi-active');
    });
    /***************************

    main menu

    ***************************/
    $('.researchi-has-children a').on('click', function () {
        $('.researchi-has-children ul').removeClass('researchi-active');
        $('.researchi-has-children a').removeClass('researchi-active');
        $(this).toggleClass('researchi-active');
        $(this).next().toggleClass('researchi-active');
    });
    /***************************

    progressbar

    ***************************/
    gsap.to('.researchi-progress', {
        height: '100%',
        ease: 'sine',
        scrollTrigger: {
            scrub: 0.3
        }
    });
    /***************************

    scroll animations

    ***************************/

    const appearance = document.querySelectorAll(".researchi-up");

    appearance.forEach((section) => {
        gsap.fromTo(section, {
            opacity: 0,
            y: 40,
            scale: .98,
            ease: 'sine',

        }, {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: .4,
            scrollTrigger: {
                trigger: section,
                toggleActions: 'play none none reverse',
            }
        });
    });

    const scaleImage = document.querySelectorAll(".researchi-scale");

    scaleImage.forEach((section) => {
        var value1 = $(section).data("value-1");
        var value2 = $(section).data("value-2");
        gsap.fromTo(section, {
            ease: 'sine',
            scale: value1,

        }, {
            scale: value2,
            scrollTrigger: {
                trigger: section,
                scrub: true,
                toggleActions: 'play none none reverse',
            }
        });
    });

    const parallaxImage = document.querySelectorAll(".researchi-parallax");


    if ($(window).width() > 960) {
        parallaxImage.forEach((section) => {
            var value1 = $(section).data("value-1");
            var value2 = $(section).data("value-2");
            gsap.fromTo(section, {
                ease: 'sine',
                y: value1,

            }, {
                y: value2,
                scrollTrigger: {
                    trigger: section,
                    scrub: true,
                    toggleActions: 'play none none reverse',
                }
            });
        });
    }

    const rotate = document.querySelectorAll(".researchi-rotate");

    rotate.forEach((section) => {
        var value = $(section).data("value");
        gsap.fromTo(section, {
            ease: 'sine',
            rotate: 0,

        }, {
            rotate: value,
            scrollTrigger: {
                trigger: section,
                scrub: true,
                toggleActions: 'play none none reverse',
            }
        });
    });
    /***************************

    fancybox

    ***************************/
    $('[data-fancybox="gallery"]').fancybox({
        buttons: [
            "slideShow",
            "zoom",
            "fullScreen",
            "close"
          ],
        loop: false,
        protect: true
    });
    $.fancybox.defaults.hash = false;
    /***************************

    reviews slider

    ***************************/

    var menu = ['<div class="researchi-custom-dot researchi-slide-1"></div>', '<div class="researchi-custom-dot researchi-slide-2"></div>', '<div class="researchi-custom-dot researchi-slide-3"></div>', '<div class="researchi-custom-dot researchi-slide-4"></div>', '<div class="researchi-custom-dot researchi-slide-5"></div>', '<div class="researchi-custom-dot researchi-slide-6"></div>', '<div class="researchi-custom-dot researchi-slide-7"></div>']
    var mySwiper = new Swiper('.researchi-reviews-slider', {
        // If we need pagination
        pagination: {
            el: '.researchi-revi-pagination',
            clickable: true,
            renderBullet: function (index, className) {
                return '<span class="' + className + '">' + (menu[index]) + '</span>';
            },
        },
        speed: 800,
        effect: 'fade',
        parallax: true,
        navigation: {
            nextEl: '.researchi-revi-next',
            prevEl: '.researchi-revi-prev',
        },
    })

    /***************************

    infinite slider

    ***************************/
    var swiper = new Swiper('.researchi-infinite-show', {
        slidesPerView: 2,
        spaceBetween: 30,
        speed: 5000,
        autoplay: true,
        autoplay: {
            delay: 0,
        },
        loop: true,
        freeMode: true,
        breakpoints: {
            992: {
                slidesPerView: 4,
            },
        },
    });

    /***************************

    portfolio slider

    ***************************/
    var swiper = new Swiper('.researchi-portfolio-slider', {
        slidesPerView: 1,
        spaceBetween: 0,
        speed: 800,
        parallax: true,
        mousewheel: {
            enable: true
        },
        navigation: {
            nextEl: '.researchi-portfolio-next',
            prevEl: '.researchi-portfolio-prev',
        },
        pagination: {
            el: '.swiper-portfolio-pagination',
            type: 'fraction',
        },
    });
    /***************************

    1 item slider

    ***************************/
    var swiper = new Swiper('.researchi-1-slider', {
        slidesPerView: 1,
        spaceBetween: 30,
        speed: 800,
        parallax: true,
        navigation: {
            nextEl: '.researchi-portfolio-next',
            prevEl: '.researchi-portfolio-prev',
        },
        pagination: {
            el: '.swiper-portfolio-pagination',
            type: 'fraction',
        },
    });
    /***************************

    2 item slider

    ***************************/
    var swiper = new Swiper('.researchi-2-slider', {
        slidesPerView: 1,
        spaceBetween: 30,
        speed: 800,
        parallax: true,
        navigation: {
            nextEl: '.researchi-portfolio-next',
            prevEl: '.researchi-portfolio-prev',
        },
        pagination: {
            el: '.swiper-portfolio-pagination',
            type: 'fraction',
        },
        breakpoints: {
            992: {
                slidesPerView: 2,
            },
        },
    });

    /*----------------------------------------------------------
    ------------------------------------------------------------

    REINIT

    ------------------------------------------------------------
    ----------------------------------------------------------*/
    document.addEventListener("swup:contentReplaced", function () {

        $('html, body').animate({
            scrollTop: 0,
        }, 0);

        gsap.to('.researchi-progress', {
            height: 0,
            ease: 'sine',
            onComplete: () => {
                ScrollTrigger.refresh()
            },
        });
        /***************************

         menu

        ***************************/
        $('.researchi-menu-btn').removeClass('researchi-active');
        $('.researchi-menu').removeClass('researchi-active');
        $('.researchi-menu-frame').removeClass('researchi-active');
        /***************************

        append

        ***************************/
        $(document).ready(function () {
            $(".researchi-arrow-place .researchi-arrow, .researchi-animation .researchi-dodecahedron, .researchi-current-page a").remove();
            $(".researchi-arrow").clone().appendTo(".researchi-arrow-place");
            $(".researchi-dodecahedron").clone().appendTo(".researchi-animation");
            $(".researchi-lines").clone().appendTo(".researchi-lines-place");
            $(".researchi-main-menu ul li.researchi-active > a").clone().appendTo(".researchi-current-page");
        });
        /***************************

        accordion

        ***************************/

        let groups = gsap.utils.toArray(".researchi-accordion-group");
        let menus = gsap.utils.toArray(".researchi-accordion-menu");
        let menuToggles = groups.map(createAnimation);

        menus.forEach((menu) => {
            menu.addEventListener("click", () => toggleMenu(menu));
        });

        function toggleMenu(clickedMenu) {
            menuToggles.forEach((toggleFn) => toggleFn(clickedMenu));
        }

        function createAnimation(element) {
            let menu = element.querySelector(".researchi-accordion-menu");
            let box = element.querySelector(".researchi-accordion-content");
            let symbol = element.querySelector(".researchi-symbol");
            let minusElement = element.querySelector(".researchi-minus");
            let plusElement = element.querySelector(".researchi-plus");

            gsap.set(box, {
                height: "auto",
            });

            let animation = gsap
                .timeline()
                .from(box, {
                    height: 0,
                    duration: 0.4,
                    ease: "sine"
                })
                .from(minusElement, {
                    duration: 0.4,
                    autoAlpha: 0,
                    ease: "none",
                }, 0)
                .to(plusElement, {
                    duration: 0.4,
                    autoAlpha: 0,
                    ease: "none",
                }, 0)
                .to(symbol, {
                    background: accent,
                    ease: "none",
                }, 0)
                .reverse();

            return function (clickedMenu) {
                if (clickedMenu === menu) {
                    animation.reversed(!animation.reversed());
                } else {
                    animation.reverse();
                }
            };
        }

        /***************************

        cursor

        ***************************/

        $('.researchi-drag, .researchi-more, .researchi-choose').mouseover(function () {
            gsap.to($(cursor), .2, {
                width: 90,
                height: 90,
                opacity: 1,
                ease: 'sine',
            });
        });

        $('.researchi-drag, .researchi-more, .researchi-choose').mouseleave(function () {
            gsap.to($(cursor), .2, {
                width: 20,
                height: 20,
                opacity: .1,
                ease: 'sine',
            });
        });

        $('.researchi-accent-cursor').mouseover(function () {
            gsap.to($(cursor), .2, {
                background: accent,
                ease: 'sine',
            });
            $(cursor).addClass('researchi-accent');
        });

        $('.researchi-accent-cursor').mouseleave(function () {
            gsap.to($(cursor), .2, {
                background: dark,
                ease: 'sine',
            });
            $(cursor).removeClass('researchi-accent');
        });

        $('.researchi-drag').mouseover(function () {
            gsap.to($('.researchi-ball .researchi-icon-1'), .2, {
                scale: '1',
                ease: 'sine',
            });
        });

        $('.researchi-drag').mouseleave(function () {
            gsap.to($('.researchi-ball .researchi-icon-1'), .2, {
                scale: '0',
                ease: 'sine',
            });
        });

        $('.researchi-more').mouseover(function () {
            gsap.to($('.researchi-ball .researchi-more-text'), .2, {
                scale: '1',
                ease: 'sine',
            });
        });

        $('.researchi-more').mouseleave(function () {
            gsap.to($('.researchi-ball .researchi-more-text'), .2, {
                scale: '0',
                ease: 'sine',
            });
        });

        $('.researchi-choose').mouseover(function () {
            gsap.to($('.researchi-ball .researchi-choose-text'), .2, {
                scale: '1',
                ease: 'sine',
            });
        });

        $('.researchi-choose').mouseleave(function () {
            gsap.to($('.researchi-ball .researchi-choose-text'), .2, {
                scale: '0',
                ease: 'sine',
            });
        });

        $('a:not(".researchi-choose , .researchi-more , .researchi-drag , .researchi-accent-cursor"), input , textarea, .researchi-accordion-menu').mouseover(function () {
            gsap.to($(cursor), .2, {
                scale: 0,
                ease: 'sine',
            });
            gsap.to($('.researchi-ball svg'), .2, {
                scale: 0,
            });
        });

        $('a:not(".researchi-choose , .researchi-more , .researchi-drag , .researchi-accent-cursor"), input, textarea, .researchi-accordion-menu').mouseleave(function () {
            gsap.to($(cursor), .2, {
                scale: 1,
                ease: 'sine',
            });

            gsap.to($('.researchi-ball svg'), .2, {
                scale: 1,
            });
        });

        $('body').mousedown(function () {
            gsap.to($(cursor), .2, {
                scale: .1,
                ease: 'sine',
            });
        });
        $('body').mouseup(function () {
            gsap.to($(cursor), .2, {
                scale: 1,
                ease: 'sine',
            });
        });
        /***************************

        main menu

        ***************************/
        $('.researchi-has-children a').on('click', function () {
            $('.researchi-has-children ul').removeClass('researchi-active');
            $('.researchi-has-children a').removeClass('researchi-active');
            $(this).toggleClass('researchi-active');
            $(this).next().toggleClass('researchi-active');
        });
        /***************************

        scroll animations

        ***************************/

        const appearance = document.querySelectorAll(".researchi-up");

        appearance.forEach((section) => {
            gsap.fromTo(section, {
                opacity: 0,
                y: 40,
                scale: .98,
                ease: 'sine',

            }, {
                y: 0,
                opacity: 1,
                scale: 1,
                duration: .4,
                scrollTrigger: {
                    trigger: section,
                    toggleActions: 'play none none reverse',
                }
            });
        });

        const scaleImage = document.querySelectorAll(".researchi-scale");

        scaleImage.forEach((section) => {
            var value1 = $(section).data("value-1");
            var value2 = $(section).data("value-2");
            gsap.fromTo(section, {
                ease: 'sine',
                scale: value1,

            }, {
                scale: value2,
                scrollTrigger: {
                    trigger: section,
                    scrub: true,
                    toggleActions: 'play none none reverse',
                }
            });
        });

        const parallaxImage = document.querySelectorAll(".researchi-parallax");


        if ($(window).width() > 960) {
            parallaxImage.forEach((section) => {
                var value1 = $(section).data("value-1");
                var value2 = $(section).data("value-2");
                gsap.fromTo(section, {
                    ease: 'sine',
                    y: value1,

                }, {
                    y: value2,
                    scrollTrigger: {
                        trigger: section,
                        scrub: true,
                        toggleActions: 'play none none reverse',
                    }
                });
            });
        }

        const rotate = document.querySelectorAll(".researchi-rotate");

        rotate.forEach((section) => {
            var value = $(section).data("value");
            gsap.fromTo(section, {
                ease: 'sine',
                rotate: 0,

            }, {
                rotate: value,
                scrollTrigger: {
                    trigger: section,
                    scrub: true,
                    toggleActions: 'play none none reverse',
                }
            });
        });
        /***************************

        fancybox

        ***************************/
        $('[data-fancybox="gallery"]').fancybox({
            buttons: [
            "slideShow",
            "zoom",
            "fullScreen",
            "close"
          ],
            loop: false,
            protect: true
        });
        $.fancybox.defaults.hash = false;
        /***************************

        reviews slider

        ***************************/

        var menu = ['<div class="researchi-custom-dot researchi-slide-1"></div>', '<div class="researchi-custom-dot researchi-slide-2"></div>', '<div class="researchi-custom-dot researchi-slide-3"></div>', '<div class="researchi-custom-dot researchi-slide-4"></div>', '<div class="researchi-custom-dot researchi-slide-5"></div>', '<div class="researchi-custom-dot researchi-slide-6"></div>', '<div class="researchi-custom-dot researchi-slide-7"></div>']
        var mySwiper = new Swiper('.researchi-reviews-slider', {
            // If we need pagination
            pagination: {
                el: '.researchi-revi-pagination',
                clickable: true,
                renderBullet: function (index, className) {
                    return '<span class="' + className + '">' + (menu[index]) + '</span>';
                },
            },
            speed: 800,
            effect: 'fade',
            parallax: true,
            navigation: {
                nextEl: '.researchi-revi-next',
                prevEl: '.researchi-revi-prev',
            },
        })

        /***************************

        infinite slider

        ***************************/
        var swiper = new Swiper('.researchi-infinite-show', {
            slidesPerView: 2,
            spaceBetween: 30,
            speed: 5000,
            autoplay: true,
            autoplay: {
                delay: 0,
            },
            loop: true,
            freeMode: true,
            breakpoints: {
                992: {
                    slidesPerView: 4,
                },
            },
        });

        /***************************

        portfolio slider

        ***************************/
        var swiper = new Swiper('.researchi-portfolio-slider', {
            slidesPerView: 1,
            spaceBetween: 0,
            speed: 800,
            parallax: true,
            mousewheel: {
                enable: true
            },
            navigation: {
                nextEl: '.researchi-portfolio-next',
                prevEl: '.researchi-portfolio-prev',
            },
            pagination: {
                el: '.swiper-portfolio-pagination',
                type: 'fraction',
            },
        });
        /***************************

        1 item slider

        ***************************/
        var swiper = new Swiper('.researchi-1-slider', {
            slidesPerView: 1,
            spaceBetween: 30,
            speed: 800,
            parallax: true,
            navigation: {
                nextEl: '.researchi-portfolio-next',
                prevEl: '.researchi-portfolio-prev',
            },
            pagination: {
                el: '.swiper-portfolio-pagination',
                type: 'fraction',
            },
        });
        /***************************

        2 item slider

        ***************************/
        var swiper = new Swiper('.researchi-2-slider', {
            slidesPerView: 1,
            spaceBetween: 30,
            speed: 800,
            parallax: true,
            navigation: {
                nextEl: '.researchi-portfolio-next',
                prevEl: '.researchi-portfolio-prev',
            },
            pagination: {
                el: '.swiper-portfolio-pagination',
                type: 'fraction',
            },
            breakpoints: {
                992: {
                    slidesPerView: 2,
                },
            },
        });

    });

});
