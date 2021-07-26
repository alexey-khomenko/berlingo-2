document.addEventListener('click', function (e) {
    const anchor = e.target.dataset.anchor || e.target.closest('[data-anchor]')?.dataset.anchor;

    if (!anchor) return true;

    const menuIsOpen = window.misc.header.classList.contains('open');

    if (menuIsOpen) {
        window.misc.header.classList.remove('open');
    }

    const modalIsOpen = !!document.querySelector('.modal.open');

    if (modalIsOpen) {
        window.misc.modalClose();
    }

    setTimeout(() => {
        const target = document.querySelector(`.index-${anchor}__main`) || document.querySelector(`.account-${anchor}__main`);
        const wrapper = document.querySelector('.wrapper-outer');

        if (target) {
            wrapper.scrollTo(0, getY(target));
        }
        else {
            document.querySelector('.content__logo').click();
            localStorage.setItem('anchor', anchor);
        }
    }, menuIsOpen || modalIsOpen ? 700 : 10);
});

{
    const anchor = localStorage.getItem('anchor');

    if (anchor) {
        const target = document.querySelector(`.index-${anchor}__main`);
        const wrapper = document.querySelector('.wrapper-outer');

        if (target) {
            wrapper.scrollTo(0, getY(target));
        }

        localStorage.removeItem('anchor');
    }
}

function getY(elem) {
    return elem.getBoundingClientRect().top + pageYOffset - 5;
}