function resetError(e) {
    e.target.closest('.form__input').classList.remove('error');
    e.target.closest('.form__input').dataset.error = '';
}

//----------------------------------------------------------------------------------------------------------------------

document.querySelector(`[name="login-email"]`).addEventListener('focus', resetError);
document.querySelector(`[name="login-email"]`).addEventListener('paste', resetError);
document.querySelector(`[name="login-email"]`).addEventListener('input', resetError);

document.querySelector(`[name="login-password"]`).addEventListener('focus', resetError);
document.querySelector(`[name="login-password"]`).addEventListener('paste', resetError);
document.querySelector(`[name="login-password"]`).addEventListener('input', resetError);

//----------------------------------------------------------------------------------------------------------------------

document.querySelector(`[data-modal-name="login"] .form`).addEventListener('submit', async function (e) {
    e.preventDefault();

    const email = document.querySelector(`[name="login-email"]`).value.trim();
    const password = document.querySelector(`[name="login-password"]`).value.trim();

    const emailLabel = document.querySelector(`[name="login-email"]`).closest('.form__input');
    const pwdLabel = document.querySelector(`[name="login-password"]`).closest('.form__input');

    if (email.length < 4) {
        emailLabel.classList.add('error');
    }

    if (password.length < 4) {
        pwdLabel.classList.add('error');
    }

    if (email.length < 4 || password.length < 4) return true;

    let data = new FormData();
    data.append('email', email);
    data.append('password', password);
    const response = await fetch('/ajax/login_ajax.php', {method: 'POST', body: data});
    let results;

    if (response.status === 200) {
        results = await response.json();
    }
    else {
        results = {
            status: '+',
            demo: '+',
        };
    }

    console.log(results);

    if (results.status !== '+') {
        emailLabel.classList.add('error');
        pwdLabel.classList.add('error');

        return true;
    }

    document.querySelector(`[name="login-email"]`).value = '';
    document.querySelector(`[name="login-password"]`).value = '';

    location.reload();
});

//----------------------------------------------------------------------------------------------------------------------

document.querySelector(`[name="register-email"]`).addEventListener('focus', resetError);
document.querySelector(`[name="register-email"]`).addEventListener('paste', resetError);
document.querySelector(`[name="register-email"]`).addEventListener('input', resetError);

document.querySelector(`[name="register-phone"]`).addEventListener('focus', resetError);
document.querySelector(`[name="register-phone"]`).addEventListener('paste', resetError);
document.querySelector(`[name="register-phone"]`).addEventListener('input', resetError);

document.querySelector(`[name="register-password"]`).addEventListener('focus', resetError);
document.querySelector(`[name="register-password"]`).addEventListener('paste', resetError);
document.querySelector(`[name="register-password"]`).addEventListener('input', resetError);

document.querySelector(`[name="register-city"]`).addEventListener('focus', resetError);
document.querySelector(`[name="register-city"]`).addEventListener('paste', resetError);
document.querySelector(`[name="register-city"]`).addEventListener('input', resetError);

//----------------------------------------------------------------------------------------------------------------------

document.querySelector(`#register-agree`).addEventListener('change', function () {
    document.querySelector(`.form__check`).classList.remove('error');
});

//----------------------------------------------------------------------------------------------------------------------

document.querySelector(`[data-modal-name="register"] .form`).addEventListener('submit', async function (e) {
    e.preventDefault();

    const checkbox = document.querySelector(`#register-agree`);

    if (!checkbox.checked) {
        document.querySelector(`.form__check`).classList.add('error');
        return false;
    }

    const email = document.querySelector(`[name="register-email"]`).value.trim();
    const phone = document.querySelector(`[name="register-phone"]`).value.trim();
    const password = document.querySelector(`[name="register-password"]`).value.trim();
    const city = document.querySelector(`[name="register-city"]`).value.trim();

    if (email.length < 4) {
        const emailLabel = document.querySelector(`[name="register-email"]`).closest('.form__input');

        emailLabel.classList.add('error');
    }

    if (phone.length !== 16 || phone.indexOf('_') > -1) {
        const phoneLabel = document.querySelector(`[name="register-phone"]`).closest('.form__input');

        phoneLabel.classList.add('error');
        phoneLabel.dataset.error = 'Недопустимый формат';
    }

    const pwd_check = /^[a-zA-Z0-9]+$/.test(password);

    if (!pwd_check) {
        const passwordLabel = document.querySelector(`[name="register-password"]`).closest('.form__input');

        passwordLabel.classList.add('error');
        passwordLabel.dataset.error = 'Пароль должен содержать только латинские буквы и цифры';
    }

    if (city.length < 2) {
        const cityLabel = document.querySelector(`[name="register-city"]`).closest('.form__input');

        cityLabel.classList.add('error');
    }

    if (email.length < 4 || phone.length !== 16 || phone.indexOf('_') > -1 || password.length < 4 || city.length < 2 || !pwd_check) return true;

    let data = new FormData();
    data.append('email', email);
    data.append('phone', phone);
    data.append('password', password);
    data.append('city', city);
    const response = await fetch('/ajax/register_ajax.php', {method: 'POST', body: data});
    let results;

    if (response.status === 200) {
        results = await response.json();
    }
    else {
        results = {
            status: '+',
            demo: '+',
        };
    }

    console.log(results);

    if (results.status !== '+') return true;

    document.querySelector(`[name="register-email"]`).value = '';
    document.querySelector(`[name="register-phone"]`).value = '';
    document.querySelector(`[name="register-password"]`).value = '';
    document.querySelector(`[name="register-city"]`).value = '';

    window.misc.modalOpen('success');
});

document.querySelector(`[data-modal-name="register"] #register-agree`).addEventListener('change', svgColor);

svgColor();

function svgColor() {
    const input = document.querySelector(`[data-modal-name="register"] #register-agree`);
    const svg = document.querySelector(`[data-modal-name="register"] .form__check svg`);

    svg.style.color = input.checked ? '#000000' : 'transparent';
}

//----------------------------------------------------------------------------------------------------------------------

const regForm = document.querySelector('[data-modal-name="register"] .form');

if (regForm) {
    const cityInput = regForm.querySelector(`[name="register-city"]`);
    // const citiesList = document.querySelector('.form__input_select .cities');

    // cityInput.addEventListener('focus', cityInputListener);
    // cityInput.addEventListener('input', cityInputListener);
    // cityInput.addEventListener('paste', cityInputListener);

    // document.addEventListener('click', function (e) {
    //     if (e.target.closest('.cities') || e.target.closest('[name="register-city"]')) return true;
    //
    //     citiesList.dataset.hidden = 'on';
    // });

    document.querySelector('.form__input_select').addEventListener('click', function (e) {
        e.preventDefault();
    });

    document.addEventListener('click', function (e) {
        if (!e.target.closest('[data-city]') || e.target.tagName === 'LI') return true;

        cityInput.value = e.target.textContent.trim();

        // citiesList.dataset.hidden = 'on';
    });

    // function cityInputListener(e) {
    //     citiesList.dataset.hidden = 'off';
    //
    //     const value = e.target.value.trim().toLowerCase();
    //
    //     const cities = citiesList.querySelectorAll('li');
    //
    //     for (let city of cities) {
    //         const cityName = city.querySelector('span').textContent.toLowerCase();
    //
    //         if (cityName.indexOf(value) === -1 && value.length > 0) {
    //             city.dataset.hidden = 'on';
    //         }
    //         else {
    //             city.dataset.hidden = 'off';
    //         }
    //     }
    // }
}