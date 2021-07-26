document.addEventListener('click', function (e) {
    const newTabNumber = e.target.dataset.tabOpen ?? e.target.closest('[data-tab-open]')?.dataset.tabOpen;

    if (!newTabNumber) return true;

    if ((e.target.dataset.selected ?? e.target.closest('[data-tab-open]')?.dataset.selected) === 'on') return true;

    const tabs = e.target.closest('.tabs');

    const oldTabNumber = tabs.querySelector(`[data-tab-open][data-selected="on"]`).dataset.tabOpen;

    tabs.querySelector(`[data-tab-open="${oldTabNumber}"]`).dataset.selected = 'off';
    tabs.querySelector(`[data-tab-body="${oldTabNumber}"]`).dataset.hidden = 'on';

    tabs.querySelector(`[data-tab-open="${newTabNumber}"]`).dataset.selected = 'on';
    tabs.querySelector(`[data-tab-body="${newTabNumber}"]`).dataset.hidden = 'off';
});