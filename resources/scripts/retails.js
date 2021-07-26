const shopsForm = document.querySelector('[data-form-shops]');

if (shopsForm) {
    const shopsInput = shopsForm.querySelector(`[name="search"]`);
    const shopsCities = document.querySelector('.retails-wrapper .cities');
    const shopsRetails = document.querySelector('.retails-wrapper .retails');

    shopsForm.addEventListener('submit', function (e) {
        e.preventDefault();
    });

    shopsInput.addEventListener('focus', shopsInputListener);
    shopsInput.addEventListener('input', shopsInputListener);
    shopsInput.addEventListener('paste', shopsInputListener);

    document.addEventListener('click', function (e) {
        if (e.target.closest('.cities') || e.target.closest('[data-form-shops]')) return true;

        shopsCities.dataset.hidden = 'on';
    });

    document.addEventListener('click', async function (e) {
        if (!e.target.closest('[data-city]') || e.target.tagName === 'LI') return true;

        shopsInput.value = e.target.textContent.trim();

        shopsCities.dataset.hidden = 'on';

        let data = new FormData();
        data.append('city', shopsInput.value);
        const response = await fetch('/ajax/retail_stores.php', {method: 'POST', body: data});
        let results;

        if (response.status === 200) {
            results = await response.json();
        }
        else {
            results = [
                {
                    title: 'Гипермаркет «Анвар»',
                    address: 'г. Актобе, ул. Нокина, д. 35',
                    link: '#',
                },
                {
                    title: '«Мега Анвар»',
                    address: 'г. Актобе, ул. Маметова, д. 4',
                    link: '#',
                },
                {
                    title: '«Школьник»',
                    address: 'г. Алексин, ул. Мира, д. 18',
                    link: '#',
                },
                {
                    title: '«Книги»',
                    address: 'г. Алексин, ул. Мира, д. 18/11',
                    link: '#',
                },
                {
                    title: '«Арт-Изо»',
                    address: 'г. Архангельск, пер. Троицкий, д.18',
                    link: '#',
                },
                {
                    title: '«Арт-Изо»',
                    address: 'г. Архангельск, пер. Троицкий, д.18',
                    link: '#',
                },
                {
                    title: 'Гипермаркет «Анвар»',
                    address: 'г. Актобе, ул. Нокина, д. 35',
                    link: '#',
                },
                {
                    title: '«Мега Анвар»',
                    address: 'г. Актобе, ул. Маметова, д. 4',
                    link: '#',
                },
                {
                    title: '«Школьник»',
                    address: 'г. Алексин, ул. Мира, д. 18',
                    link: '#',
                },
                {
                    title: '«Книги»',
                    address: 'г. Алексин, ул. Мира, д. 18/11',
                    link: '#',
                },
                {
                    title: '«Арт-Изо»',
                    address: 'г. Архангельск, пер. Троицкий, д.18',
                    link: '#',
                },
                {
                    title: '«Арт-Изо»',
                    address: 'г. Архангельск, пер. Троицкий, д.18',
                    link: '#',
                },
                {
                    title: 'Гипермаркет «Анвар»',
                    address: 'г. Актобе, ул. Нокина, д. 35',
                    link: '#',
                },
                {
                    title: '«Мега Анвар»',
                    address: 'г. Актобе, ул. Маметова, д. 4',
                    link: '#',
                },
                {
                    title: '«Школьник»',
                    address: 'г. Алексин, ул. Мира, д. 18',
                    link: '#',
                },
                {
                    title: '«Книги»',
                    address: 'г. Алексин, ул. Мира, д. 18/11',
                    link: '#',
                },
                {
                    title: '«Арт-Изо»',
                    address: 'г. Архангельск, пер. Троицкий, д.18',
                    link: '#',
                },
                {
                    title: '«Арт-Изо»',
                    address: 'г. Архангельск, пер. Троицкий, д.18',
                    link: '#',
                },
            ];
        }

        const origin = document.querySelector('.retail-origin li');

        shopsRetails.innerHTML = '';

        for (let result of results) {
            const li = origin.cloneNode(true);

            li.querySelector('.retails__title').innerHTML = `<span>${result.title}</span>`;
            li.querySelector('.retails__address').innerHTML = `<span>${result.address}</span>`;

            li.querySelector('.retails__link').href = result.link;
            li.querySelector('.retails__sm a').href = result.link;

            shopsRetails.append(li);
        }

        shopsRetails.dataset.hidden = 'off';
    });

    function shopsInputListener(e) {
        shopsCities.dataset.hidden = 'off';
        shopsRetails.dataset.hidden = 'on';

        const value = e.target.value.trim().toLowerCase();

        const cities = shopsCities.querySelectorAll('li');

        for (let city of cities) {
            const cityName = city.querySelector('span').textContent.toLowerCase();

            if (cityName.indexOf(value) === -1 && value.length > 0) {
                city.dataset.hidden = 'on';
            }
            else {
                city.dataset.hidden = 'off';
            }
        }
    }
}