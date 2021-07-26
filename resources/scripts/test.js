let testSum = 0;

document.addEventListener('change', function (e) {
    switch (e.target.name) {
        case 'step_1':
            testSum += +e.target.value;
            document.querySelector(`[data-modal-open="test_3"]`).dataset.disabled = 'off';
            break;
        case 'step_2':
            testSum += +e.target.value;
            document.querySelector(`[data-modal-open="test_4"]`).dataset.disabled = 'off';
            break;
        case 'step_3':
            testSum += +e.target.value;
            document.querySelector(`[data-modal-open="test_5"]`).dataset.disabled = 'off';
            break;
        case 'step_4':
            testSum += +e.target.value;
            setResult();
            document.querySelector(`[data-modal-open="test_6"]`).dataset.disabled = 'off';
            break;
        default:
            return true;
    }

    function setResult() {
        let result;

        if (testSum <= 70) {
            result = 1;
        }
        else if (testSum <= 100) {
            result = 2;
        }
        else if (testSum <= 130) {
            result = 3;
        }
        else {
            result = 4;
        }

        const results = document.querySelectorAll(`[data-modal-name="test_6"] [data-result="${result}"]`);

        for (let result of results) {
            result.dataset.hidden = 'off';
        }
    }
});

document.addEventListener('click', function (e) {
    if (!e.target.closest(`[data-modal-open="test_6"]`)) return true;

    setTimeout(() => {
        testSum = 0;

        document.querySelector(`[data-modal-name="test_2"] form`).reset();
        document.querySelector(`[data-modal-name="test_3"] form`).reset();
        document.querySelector(`[data-modal-name="test_4"] form`).reset();
        document.querySelector(`[data-modal-name="test_5"] form`).reset();

        document.querySelector(`[data-modal-open="test_3"]`).dataset.disabled = 'on';
        document.querySelector(`[data-modal-open="test_4"]`).dataset.disabled = 'on';
        document.querySelector(`[data-modal-open="test_5"]`).dataset.disabled = 'on';
        document.querySelector(`[data-modal-open="test_6"]`).dataset.disabled = 'on';
    }, 10);
});

document.addEventListener('click', function (e) {
    if (!e.target.closest(`[data-modal-open="test_1"]`)) return true;

    const results = document.querySelectorAll(`[data-modal-name="test_6"] [data-result]`);

    for (let result of results) {
        result.dataset.hidden = 'on';
    }
});

document.addEventListener('click', function (e) {
    const button = e.target.closest('[data-pens-toggler]');

    if (!button) return true;

    const pens = button.closest('[data-result]');
    const result = +pens?.dataset.result;

    if (result < 1) return true;

    const slides = pens.querySelectorAll('[data-slider]');

    if (!slides.length) return true;

    const oldNumber = +pens.querySelector(`[data-slider][data-hidden="off"]`).dataset.slider;
    const newNumber = oldNumber < (slides.length - 1) ? oldNumber + 1 : 0;

    slides[oldNumber].dataset.hidden = 'on';
    slides[newNumber].dataset.hidden = 'off';
});