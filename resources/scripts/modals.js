document.addEventListener('click', function (e) {
    const modal = e.target.dataset.modalOpen ?? e.target.closest('[data-modal-open]')?.dataset.modalOpen;

    if (!modal) return true;

    const disabled = e.target.dataset.disabled === 'on' || e.target.closest('[data-disabled]')?.dataset.disabled === 'on';

    if (disabled) return true;

    const header = document.querySelector('header');
    const menuIsOpen = header.classList.contains('open');

    if (menuIsOpen) {
        header.classList.remove('open');
    }

    setTimeout(() => {
        window.misc.modalOpen(modal);
    }, menuIsOpen ? 700 : 10);
});

document.addEventListener('click', function (e) {
    const [shadow, wrapper, modal] = getModalElements();

    if (e.target !== shadow && e.target !== wrapper) return true;

    if (modal.dataset.modalImportant === 'on') return true;

    window.misc.modalClose();
});

document.addEventListener('click', function (e) {
    const close = e.target.hasAttribute('data-modal-close') || e.target.closest('[data-modal-close]');

    if (!close) return true;

    window.misc.modalClose();
});

window.misc.modalClose = function () {
    const [shadow, wrapper, modal] = getModalElements();

    wrapper.classList.remove('open');

    setTimeout(function () {
        modal.classList.remove('open');
        shadow.classList.remove('open');

        document.querySelector('.wrapper-outer').focus();
    }, 600);
};

window.misc.modalOpen = function(t) {
    const [shadow, wrapper, modal] = getModalElements();
    const target = document.querySelector(`[data-modal-name="${t}"]`);

    let timeout = wrapper.classList.contains('open') ? 500 : 10;

    if (wrapper.classList.contains('open')) {
        wrapper.classList.remove('open');

        setTimeout(function () {
            modal.classList.remove('open');
            target.classList.add('open');
        }, timeout);
    }
    else {
        shadow.classList.add('open');
        target.classList.add('open');
    }

    setTimeout(function () {
        wrapper.classList.add('open');
    }, timeout);

    setTimeout(function () {
        target.focus();
    }, timeout + 10);
}

function getModalElements() {
    return [
        document.querySelector('.shadow'),
        document.querySelector('.modal-wrapper'),
        document.querySelector('.modal.open'),
    ];
}