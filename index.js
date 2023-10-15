$(document).ready(function() {
    const slides = $('.slide');
    let currentSlide = 0;

    function showSlide() {
        $(slides[currentSlide]).show();

        const numItems = $('.slide:visible .item').length;
        $(".slide:visible span").css("animation", "anim 0.7s ease both running");
        for (let i = 1; i <= numItems; i++) {
            $(".slide:visible .item:nth-child(" + i + ")").css("animation-delay", i / 10 + "s");
        }
    }

    function hideSlide() {
        $(slides[currentSlide]).hide();
        currentSlide = (currentSlide + 1) % slides.length;

        // Update the icons after hiding a slide
        updateSavedTexts();
    }

    function updateSavedTexts() {
        $('#savedTextHolder .icon').each(function() {
            const slideIndex = $(this).data('slide');
            if (slideIndex < currentSlide) {
                $(this).css('background-color', '#f5f7fa');
            }
        });
    }

    $("#mainHolder").on("mousedown touchstart", showSlide);
    $("#mainHolder").on("mouseup touchend", hideSlide);

    // Convert each p.item_holder's text to individual span items
    $(".slide p.items_holder").each(function() {
        const textContent = $(this).text();
        const spanizer = $.trim(textContent).split("");
        $(this).html('<span class="item">' + spanizer.join('</span><span class="item">') + '</span>');
    });

    // When an icon is clicked, show the text of its respective slide
    $("#savedTextHolder .icon").click(function() {
        const slideIndex = $(this).data('slide');
        if (slideIndex < currentSlide) {
            alert($(slides[slideIndex]).find('.items_holder').text());
        }
    });
    $("#savedTextHolder .icon").hover(function() {
        const slideIndex = $(this).data('slide');
        if ($(this).css('background-color') === 'rgb(245, 247, 250)') { // Converted #f5f7fa to its RGB equivalent
            $("#previewText").text($(slides[slideIndex]).find('.items_holder').text());
            $("#previewHolder").show();
        }
    }, function() {
        // This is the hover out function
        $("#previewHolder").hide();
    });
    $("#savedTextHolder .icon").hover(function() {
        const slideIndex = $(this).data('slide');
        if ($(this).css('background-color') === 'rgb(245, 247, 250)') {
            $("#previewText").text($('.slide').eq(slideIndex).find('.items_holder').text());
            $("#previewHolder").show();
        }
    }, function() {
        $("#previewHolder").hide();
    });
    const touchParticle = document.getElementById('touchParticle');


    
});
