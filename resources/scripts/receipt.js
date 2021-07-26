document.querySelector(`[data-modal-name="receipt"] .form`).addEventListener('submit', async function (e) {
    e.preventDefault();

    const checkbox = document.querySelector(`#receipt-agree`);

    if (!checkbox.checked) return false;

    const shop = document.querySelector(`[name="receipt-shop"]`).value.trim();
    const files = document.querySelector(`[name="receipt-file"]`).files;

    if (files.length === 0) return true;

    let data = new FormData();
    data.append('shop', shop);
    data.append('file', files[0]);
    const response = await fetch('/ajax/check_registration.php', {method: 'POST', body: data});
    let results;

    if (response.status === 200) {
        results = await response.json();
    }
    else {
        results = {
            status: '+',
            demo: '+',
        }
    }

    console.log(results);

    if (results.status !== '+') return true;

    window.misc.modalClose();
    resetFile();
});

document.querySelector(`[ name="receipt-file"]`).addEventListener('change', function () {

    if (!this.files[0]) return true;

    const types = ['image/png', 'image/jpg', 'image/jpeg'];

    const title = this.files[0].name;
    const type = this.files[0].type;

    if (types.indexOf(type) === -1) return true;

    document.querySelector('.form__file-selected span').textContent = title;

    const fr = new FileReader();

    fr.addEventListener('load', function () {
        document.querySelector('.form__file-selected img').src = fr.result;
    }, false);

    fr.readAsDataURL(this.files[0]);

    document.querySelector('.form__file-selected').dataset.hidden = 'off';
    document.querySelector('.form__file').dataset.hidden = 'on';
});

document.querySelector(`[data-receipt-shop-reset]`).addEventListener('click', resetFile);

document.querySelector(`[data-modal-name="receipt"] #receipt-agree`).addEventListener('change', svgColor);

svgColor();

function svgColor() {
    const input = document.querySelector(`[data-modal-name="receipt"] #receipt-agree`);
    const svg = document.querySelector(`[data-modal-name="receipt"] .form__check svg`);

    svg.style.color = input.checked ? '#000000' : 'transparent';
}

function resetFile() {
    document.querySelector('.form__file').dataset.hidden = 'off';
    document.querySelector('.form__file-selected').dataset.hidden = 'on';

    document.querySelector(`[name="receipt-file"]`).value = [];
}