    $(document).ready(function() {
        const slides = $('.slide');
        let currentSlide = 0;

        function showSlide() {
            $(slides).hide(); // Hide all slides
            $(slides[currentSlide]).show(); // Show the current slide

            
            

            const numItems = $('.slide:visible .item').length;
            $(".slide:visible span").css("opacity", "0"); // Reset opacity
            setTimeout(() => { // This timeout ensures the opacity reset is applied before starting the transition
                for (let i = 1; i <= numItems; i++) {
                    $(".slide:visible .item:nth-child(" + i + ")").css({
                        "opacity": "1",
                        "transition": "opacity 0.7s ease",
                        "transition-delay": i / 10 + "s"
                    });
                }
            }, 0);
        }

    function nextSlide() {
        currentSlide = (currentSlide + 1) % slides.length;
        showSlide();
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
});
    });
