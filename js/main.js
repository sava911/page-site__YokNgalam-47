$(function () {

    const _telewidth = 768;

    //Hat 
    {
        $('.hat__burger, .hat__menu a').click(function () {
            $('.hat__burger').toggleClass('active');
            if ($('.hat__burger').hasClass('active')) 
                bodyScrollLock.disableBodyScroll(document.body);
            else
                bodyScrollLock.enableBodyScroll(document.body);
        });

        $('.hat__home-button').click(function () {
            $([document.documentElement, document.body]).animate({
                scrollTop: $(".header").offset().top
            }, 800);
        });
        $('.hat__review-button').click(function () {
            $([document.documentElement, document.body]).animate({
                scrollTop: $(".city").offset().top
            }, 800);
        });
        $('.hat__destination-button').click(function () {
            $([document.documentElement, document.body]).animate({
                scrollTop: $(".destination").offset().top
            }, 1200);
        });
        $('.hat__itinerary-button').click(function () {
            $([document.documentElement, document.body]).animate({
                scrollTop: $(".itinerary").offset().top
            }, 1500);
        });
    
        $('.hat__contact-button').click(function () {
            $([document.documentElement, document.body]).animate({
                scrollTop: $(".contact").offset().top
            }, 1800);
        });
    }



    $('.header__button').click(function () {
        $([document.documentElement, document.body]).animate({
            scrollTop: $(".city").offset().top
        }, 800);
    });

    //Places 
    {
        $('.destination__toggleBlock *').click(function(){
            $('.toggled').removeClass('toggled');
            $(this).addClass('toggled');
            $('.place').addClass('place_appeare');
            setTimeout(() =>
                $('.place').removeClass('place_appeare'), 500);
        });

        $('.place__description').click(function () {
            $(this).parent().first().toggleClass('hidden')
        });

        $('.number').click(function () {
            $('.number.special').toggleClass('special');
            $(this).toggleClass('special');
            $('.place').addClass('place_appeare');
            setTimeout(() =>
                $('.place').removeClass('place_appeare'), 500);
        });

        $('.addPage').click(function () {
            let first = $('.number__first'), l = $('.number__last');

            if (l.next('.number')[0]) {
                first.toggleClass('number__first');
                first.next().toggleClass('number__first');
                l.toggleClass('number__last');
                l.next().toggleClass('number__last');

                if (!first.prev('.number')[0]) $('.removePage, .remove5Page').toggleClass('arrow_disabled');
            }
        });

        $('.removePage').click(function () {
            let first = $('.number__first'), l = $('.number__last');

            if (first.prev('.number')[0]) {

                first.toggleClass('number__first');
                first.prev().toggleClass('number__first');
                l.toggleClass('number__last');
                l.prev().toggleClass('number__last');

                if (!first.prev().prev('.number')[0]) $('.removePage, .remove5Page').toggleClass('arrow_disabled');
            }
        });

        $('.add5Page').click(function () {
            for (let i = 0; i < 5; i++)
                $('.addPage').trigger('click');
        });

        $('.remove5Page').click(function () {
            for (let i = 0; i < 5; i++)
                $('.removePage').trigger('click');
        });
    }


    //Ittinery
    {
        var inputHandler = function () {
            if (this.value == "") $(this).remove();
        }

        $('.day__add-button').click(function () {
            let el = $('<input type="text" value="">');
            el.on('focusout', inputHandler);
            el.appendTo($(this).prev());
            el.trigger('focus');
        });

        $('.day__subdestinations input').on('focusout', inputHandler);
        $('.itinerary__search').on('focusout', ()=> $('.itinerary__drag-search-icon').removeClass("itinerary__drag-search-icon_active"));
        $('.itinerary__search').on('enter', ()=> $('.itinerary__drag-search-icon').removeClass("itinerary__drag-search-icon_active"));

        $(".itinerary__search").on('keyup', function(event) {
            if (event.keyCode === 13) {
                $('.itinerary__drag-search-icon').removeClass("itinerary__drag-search-icon_active");
            }

            $('.Searched').removeClass("Searched");
            $('.itinerary__drag-list').children().each(function(i, item){
                if($(".itinerary__search").val().length > 2 && $(item).find("span").first().text().match($(".itinerary__search").val()))
                    $(item).addClass('Searched')
                    
            });

        });


        $('.itinerary__drag-search-icon').click( function() {
            $('.itinerary__drag-search-icon').addClass("itinerary__drag-search-icon_active");
            $('.itinerary__search').trigger('focus');
        });

        $('.draggable').draggable({
            revert: true, revertDuration: 0,
            start: function (event, ui) {
                if ($('body').first().outerWidth() <= _telewidth) event.preventDefault();
            }
        });

        $('.sort-type').select2({
            minimumResultsForSearch: Infinity
        });

        $('.sort-type').on('select2:open', function (e) {
            $('.select2-dropdown').hide();
            setTimeout(() => $('.select2-dropdown').slideDown());
        });

        $('.sort-type').on('select2:select', function (e) {
            let SortClass = e.params.data.text;
            $('.Searched').removeClass('Searched');
            $('.Sorted').removeClass('Sorted');
            $('.' + SortClass).addClass('Sorted');
        });

        $(".day__drop-place").droppable({
            over: function (event, ui)//если фигура над клеткой- выделяем её границей
            {
                $(this).addClass('day__drop-place_hover');
            },
            out: function (event, ui)//если фигура ушла- снимаем границу
            {
                $(this).removeClass('day__drop-place_hover');
            },
            drop: function (event, ui)//если бросили фигуру в клетку
            {
                if (!$(this).children().first().hasClass('draggable'))
                    $(this).prepend(ui.draggable);//перемещаем фигуру в нового предка

                $(this).removeClass('day__drop-place_hover');//убираем выделение
            }
        });

        $(".itinerary__drag-list").droppable({
            over: function (event, ui)//если фигура над клеткой- выделяем её границей
            {
                $(this).addClass('itinerary__drag-list_hover');
            },
            out: function (event, ui)//если фигура ушла- снимаем границу
            {
                $(this).removeClass('itinerary__drag-list_hover');
            },
            drop: function (event, ui)//если бросили фигуру в клетку
            {
                $(this).append(ui.draggable);//перемещаем фигуру в нового предка      
                $(this).removeClass('itinerary__drag-list_hover');//убираем выделение
            }
        });


        //Mobile select
        var target = 0;
        $(".day__drop-place").click(function () {
            if ($('body').first().outerWidth() <= _telewidth) $('.itinerary__path-container').addClass('itinerary__path-container_moved');
            target = $(this);
        });

        $('.draggable').click(function () {
            if (!target)
                return;
            let prev = target.children().first();
            if (prev.hasClass('draggable')) prev.appendTo($('.itinerary__drag-list'));
            target.prepend($(this));
            $('.itinerary__path-container').removeClass('itinerary__path-container_moved');
        });

        $(".datepicker").datepicker({
            dateFormat: "dd/mm/yy"
        });
        $(".datepicker").each(function (i, item) {
            $(item).datepicker("setDate", `${i}`);
            $(item).datepicker('option', 'onSelect', function () {
                let SecondDate = $(item).datepicker('getDate');
                SecondDate.setDate(SecondDate.getDate() + (i ? -1 : 1));
                $(".datepicker").eq(i ? 0 : 1).datepicker("setDate", SecondDate);
            }
            );
        });


        $('.button').click(function(){
            $(this).addClass('button_pressed');
            setTimeout(() => $(this).removeClass('button_pressed'), 200);
        });
    }


    //Effects
    {
        new WOW().init();

        var controller = new ScrollMagic.Controller();


        var ScenePages = new ScrollMagic.Scene({
            triggerElement: ".destination__pages",
            triggerHook: .8
        })
            .addTo(controller);

        ScenePages.on('enter', function () {
            gsap.fromTo(".destination__pages li:first-child, .destination__pages li:nth-child(2), .number__first, .number__first+*, .number__first+*+*, .number__first+*+*+*, .number__first+*+*+*+*, .destination__pages li:nth-last-child(2), .destination__pages li:last-child",
                { css: {opacity: 0, y: -100 },  ease: "elastic",  },
                { css: { opacity: 1, y: -0 }, ease: "elastic", duration: 1.5, stagger: .1 });
            setTimeout( ()=> $('.destination__pages li').css('opacity', 1), 1500);
            ScenePages.destroy();
        });
        var MakeParallax = function (element, Speed = 0, ExistingScene = false, H = element.outerHeight()) {

            //Calculations
            let duration = H + $(window).outerHeight(), moveValue = Speed * duration;
            let correction = Math.max(Math.min(1, Speed), -1) - (Math.abs(Speed) < 1 ? 1 - Math.abs(Speed) : 0);
            let elHeight = Math.abs(moveValue) - correction * H;
            let startPos = (Speed > 0 ? H - elHeight - Math.min(Speed, 1) * H : 0)

            //setting css starting properties
            element.css('background-size', "auto " + elHeight + "px");
            element.css('background-position-y', startPos + 'px');

            //Making new scene or updating existing
            if (ExistingScene == false)
                return new ScrollMagic.Scene({ triggerElement: element, triggerHook: "onEnter", duration: duration })
                    .setTween(element, { backgroundPositionY: moveValue + startPos + 'px', ease: Linear.easeNone })
                    .addTo(controller);
            else
                ExistingScene.duration(duration);
            ExistingScene.progress(0);
            ExistingScene.setTween(element, { backgroundPositionY: moveValue + startPos + 'px', ease: Linear.easeNone });
        }

        let speed = .5;
        var Scene = MakeParallax($('.contact'), speed);
        $(window).bind('resize', function () {
            MakeParallax($(Scene.triggerElement()), speed, Scene);
        })
    }
});