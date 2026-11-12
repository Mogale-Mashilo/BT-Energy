const slider = document.querySelector(".services-slider");
const cards = document.querySelectorAll(".service-card");

const nextBtn = document.querySelector(".next");
const prevBtn = document.querySelector(".prev");

if (slider && cards.length > 0 && nextBtn && prevBtn) {
    let position = 0;

    function getMetrics() {
        const cardStyle = window.getComputedStyle(cards[0]);
        const sliderStyle = window.getComputedStyle(slider);
        const gap = parseFloat(sliderStyle.columnGap) || 0;
        const cardWidth =
            cards[0].getBoundingClientRect().width +
            parseFloat(cardStyle.marginLeft) +
            parseFloat(cardStyle.marginRight) +
            gap;
        const maxOffset = Math.max(
            0,
            slider.scrollWidth - slider.parentElement.clientWidth
        );

        return { cardWidth, maxOffset };
    }

    function moveSlider() {
        const { cardWidth, maxOffset } = getMetrics();
        const offset = Math.min(position * cardWidth, maxOffset);
        slider.style.transform = `translateX(-${offset}px)`;
    }

    function moveNext() {
        const { cardWidth, maxOffset } = getMetrics();
        const maxPosition = cardWidth > 0 ? Math.ceil(maxOffset / cardWidth) : 0;

        position = position >= maxPosition ? 0 : position + 1;
        moveSlider();
    }

    function movePrevious() {
        const { cardWidth, maxOffset } = getMetrics();
        const maxPosition = cardWidth > 0 ? Math.ceil(maxOffset / cardWidth) : 0;

        position = position <= 0 ? maxPosition : position - 1;
        moveSlider();
    }

    nextBtn.addEventListener("click", moveNext);
    prevBtn.addEventListener("click", movePrevious);

    window.addEventListener("resize", moveSlider);

    setInterval(moveNext, 3000);
}