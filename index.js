$(document).ready(function() {
    const slides = $('.slide');
    let currentSlide = 0;
    let startTime = null;
    let interval = null;

    function showSlide() {
        $(slides[currentSlide]).show();
        
        $(".slide:visible span").css("animation", "anim 0.8s ease both running");
        const numItems = $('.slide:visible .item').length;
        for (let i = 1; i <= numItems; i++) {
            $(".slide:visible .item:nth-child(" + i + ")").css("animation-delay", i / 10 + "s");
        }

        // Start the reading timer
        startTime = new Date();
        if(interval) clearInterval(interval);
        interval = setInterval(function(){
            let currentTime = new Date();
            let diff = currentTime - startTime;
            let seconds = Math.round(diff / 1000);
            $("#timer").text("Time: " + seconds + " seconds");
        }, 1000);
    }

    function hideSlide() {
        $(slides[currentSlide]).hide();
        currentSlide = (currentSlide + 1) % slides.length;

        // Stop the reading timer and show the share button
        if(interval) clearInterval(interval);
        $("#shareBtn").show();
    }

    $(".slide p.items_holder").each(function() {
        const textContent = $(this).text();
        const spanizer = $.trim(textContent).split("");
        $(this).html('<span class="item">' + spanizer.join('</span><span class="item">') + '</span>');
    });

    $("#mainHolder").on("mousedown touchstart", function() {
        showSlide();
    });

    $("#mainHolder").on("mouseup touchend", function() {
        hideSlide();
    });

    // Share functionality
    $("#shareBtn").hide().click(function() {
        const time = $("#timer").text();
        prompt("Copy and share your reading time!", time);
        $(this).hide();
    });

    $(document).ready(function() {
        let isTouching = false;
        let hasNavigatedToBubble = false;
        
        function createBubble() {
            const bubble = $('<div></div>');
            bubble.addClass('bubble');
            bubble.css('left', (Math.random() * ($('#mainHolder').width() - 50)) + 'px'); // Randomly position the bubble
            
            $('#mainHolder').append(bubble);
    
            setTimeout(function() {
                if (!hasNavigatedToBubble && $.contains(document, bubble[0])) {
                    bubble.remove();
                    alert('You lost! You didn\'t reach the bubble in time.');
                    // Here, you can reset the challenge or stop the game
                }
            }, 3000);
        }
    
        setInterval(function() {
            hasNavigatedToBubble = false;
            createBubble();
        }, 10000);
    
        $("#mainHolder").on("mousedown touchstart", function() {
            isTouching = true;
        });
    
        $("#mainHolder").on("mouseup touchend", function() {
            isTouching = false;
        });
    
        $("#mainHolder").on('mousemove touchmove', function(event) {
            if (!isTouching) return; 
    
            const touch = event.touches ? event.touches[0] : event;
            $('.bubble').each(function() {
                const bubble = $(this);
                const bubblePos = bubble.offset();
                const bubbleRadius = bubble.width() / 2;
                
                const dist = Math.sqrt(Math.pow(touch.pageX - (bubblePos.left + bubbleRadius), 2) + 
                                       Math.pow(touch.pageY - (bubblePos.top + bubbleRadius), 2));
                
                if (dist < bubbleRadius) {
                    hasNavigatedToBubble = true;
                    bubble.remove();
                }
            });
        });
    });
    
});
