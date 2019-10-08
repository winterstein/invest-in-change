import { companies, states } from './companies.js';

const $cardContainer = $('.card-container');
const $companyCard = $('.company-card');
const $navRegionBtn = $('.nav-region');

let currentRegion = 'all';

const generateCardLinks = links => {
    let renderedLinks = '';
    links.forEach(link => {
        const linkKey = Object.keys(link)[0];
        renderedLinks += `<a class="company-link" href="${link[linkKey]}">${linkKey}</a>`
    });
    return renderedLinks;
};

const getRegionCategory = card => {
    if (card.region === 'UK') { return 'UK' }
    else if (states.includes(card.region)) { return 'US' }
    else { return 'WORLD' }
}

// Generate html card 'component' and return it, as long as it belong to currentRegion
const generateCompanyCard = card => {
    const linkElements = generateCardLinks(card.links);
    const regionCategory = getRegionCategory(card);
    return (
        `<div class="grid-item  ${regionCategory}">
        <div class="portfolio-item" id="${card.name}">
            <div class="img-fluid w-100">
            <img src="${card.logo}" class="card-logo" alt="company logo" />
            </div>
            <h3>${card.name}</h3>
            <h4>${card.location}, ${card.region}</h4>
            </br>
        </div>
    </div>`
    );
};

// Empty card container and repopulate it
const parseCompanies = companies => {
    $cardContainer.empty();
    companies.forEach(company => {
        $('.popup-gallery').append(generateCompanyCard(company));
    });
};

const handleItemClick = e => {
    console.log(e.target.id);
    const currentUrl = location.pathname;
    window.location.assign(`https://invest-in-change.com/portfolio/portfolio-details.html?id=${e.target.id}`)
}

$(document).ready(() => {
    parseCompanies(companies);

    $navRegionBtn.on('click', function () {
        currentRegion = $(this).attr('id');
        parseCompanies(companies);
        $navRegionBtn.removeClass('shadow');
        $(this).addClass('shadow');
    })

    $('.portfolio-item').on('click', handleItemClick);
});
