/**
 * p_ => p: portofolio
 * pd_ => pd: portofolio dialog
 */

(() => {

const
    p_dialog = $('#p-dialog'),
    pd_img = $('img', p_dialog),
    pd_h3 = $('h3', p_dialog),
    pd_p = $('.pd-content > div > p', p_dialog),
    pd_prev_button = $('#pdcc-prev'),
    pd_next_button = $('#pdcc-next'),
    pd_counter_p = $('.pdc-counter > p', p_dialog),
    pd_counter_div = $('.pdc-counter', p_dialog),
    pd_close_button = $('#pda-close'),
    pd_open_a = $('.pd-actions > a', p_dialog)
;
let
    partIndex = 0,
    gDetails = []
;

$ev(pd_close_button, 'click', () => p_dialog.close());

$ev(pd_prev_button, 'click', ev => {
    partIndex = partIndex == 0
        ? gDetails.length - 1
        : partIndex - 1;

    pd_counter_p.textContent = `${partIndex + 1}/${gDetails.length}`;
    pd_img.src = gDetails[partIndex].image.src;
    pd_img.alt = gDetails[partIndex].image.alt;
    pd_h3.innerHTML = gDetails[partIndex].header;
    pd_p.innerHTML = gDetails[partIndex].description;
    ev.stopImmediatePropagation(); // !important
});

$ev(pd_next_button, 'click', ev => {
    partIndex = partIndex == gDetails.length-1
        ? 0
        : partIndex + 1;

    pd_counter_p.textContent = `${partIndex + 1}/${gDetails.length}`;
    pd_img.src = gDetails[partIndex].image.src;
    pd_img.alt = gDetails[partIndex].image.alt;
    pd_h3.innerHTML = gDetails[partIndex].header;
    pd_p.innerHTML = gDetails[partIndex].description;
    ev.stopImmediatePropagation(); // !important
});

for (const button of $$('#portofolio > div > button')){
    const details = [];

    for (const div of $$('div', button)){
        const img = $('img', div);
        const h3 = $('h3', div);
        const p = $('p', div);

        if (!img || !h3 || !p) continue;

        details.push({
            image: {
                src: img.src,
                alt: img.alt
            },
            header: h3.innerHTML,
            description: p.innerHTML
        });
    }

    $ev(button, 'click', ev => {
        if (details.length < 1) return;

        partIndex = 0;
        gDetails = [...details];
        pd_img.src = details[partIndex].image.src;
        pd_img.alt = details[partIndex].image.alt;
        pd_h3.innerHTML = details[partIndex].header;
        pd_p.innerHTML = details[partIndex].description;
        pd_counter_p.textContent = `${1}/${details.length}`;
        pd_counter_div.toggleAttribute('data-hide', details.length <= 1);
        pd_open_a.href= button.getAttribute('data-url');
        p_dialog.showModal();
    });
}

})();