import Inputmask from 'inputmask';

Inputmask('+7(999)999-99-99').mask(document.querySelector(`[name="register-phone"]`));

window.misc = {
    mobile: /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent),
    header: document.querySelector('header') ,
};

document.addEventListener('click', function (e) {
    if (e.target.closest(`[href="#"]`)) e.preventDefault();
});

document.addEventListener('click', function (e) {
    const link = e.target.closest('[href]') || e.target.closest('button');

    if (!link) return true;

    setTimeout(() => link.blur(), 700);
});

setTimeout(() => {
    document.querySelector('header').style.visibility = 'visible';
}, 700);

document.querySelector('.wrapper-outer').focus();