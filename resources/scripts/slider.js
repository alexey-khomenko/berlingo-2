const slides = document.querySelectorAll('.index-top__back[data-slider]');

if (slides.length) {
    let oldNumber = 0;
    const max = slides.length - 1;

    let timerId = setTimeout(function tick() {
        let newNumber = oldNumber < max ? oldNumber + 1 : 0;

        slides[oldNumber].dataset.hidden = 'on';
        slides[newNumber].dataset.hidden = 'off';

        oldNumber = newNumber;

        timerId = setTimeout(tick, 3200);
    }, 3200);
}