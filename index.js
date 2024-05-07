$(document).ready(function() {
    const slides = $('.slide');
    let currentSlide = 0;

    function resetTextAnimation(slide) {
        const items = $(slide).find('.item');
        items.css("opacity", "0");
        setTimeout(() => {
            items.each(function(index, item) {
                $(item).css({
                    "opacity": "1",
                    "transition": "opacity 0.7s ease",
                    "transition-delay": (index + 1) / 12 + "s"
                });
            });
        }, 0);
    }

    function showSlide() {
        $(slides).hide();
        $(slides[currentSlide]).show();
        resetTextAnimation(slides[currentSlide]);
    }

    function nextSlide() {
        currentSlide++;
        if (currentSlide >= slides.length) {
            currentSlide = 0;
            $(slides).hide();
        }
        showSlide();
    }

    function hideGuidelines() {
        $("#guidelines").css("opacity", "0");
        setTimeout(() => {
            $("#guidelines").remove();
        }, 300); // matches the transition duration
    }

    // Convert each p.item_holder's text to individual span items
    $(".slide p.items_holder").each(function() {
        const textContent = $(this).text();
        const spanizer = $.trim(textContent).split("");
        $(this).html('<span class="item">' + spanizer.join('</span><span class="item">') + '</span>');
    });

    // Detect swipe to the left
    let touchStartX = 0;
    let touchEndX = 0;

    $("#mainHolder").on('touchstart', function(event) {
        touchStartX = event.changedTouches[0].screenX;
    });

    $("#mainHolder").on('touchend', function(event) {
        touchEndX = event.changedTouches[0].screenX;
        if (touchEndX < touchStartX) {
            nextSlide();
        }
    });

    // Start by showing the first slide
    showSlide();

    $("#swipeIcon").on('click', function() {
        nextSlide();
        
        // Add animation class
        $(this).addClass('animate');
    
        // Remove the animation class after it's done so it can be triggered again
        setTimeout(() => {
            $(this).removeClass('animate');
        }, 300); // matches the animation duration
    });

    $("body").on("swipeleft", function() {
        nextSlide();
    });
    
    $("body").on("swiperight", function() {
        currentSlide = (currentSlide - 1 + slides.length) % slides.length;
        showSlide();
        hideGuidelines();
    });
});
