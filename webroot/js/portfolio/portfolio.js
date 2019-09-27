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

const formatCompanyName = name => {
    const separateName = name.split(': ');
    return `<h3><span class="red-text">${separateName[0]}</span></h3>
            <h4><span> ${separateName[1]}</span></h4>`;
};

const formatInvestType = (type, link) => {
    const splitString = type.split('(');
    return link ? `<p>${splitString[0]}<a href="${link}">(${splitString[1]}</a></p>`
        : `<p>${type}</p>`;
};

const itemHighlighter = item => {
    const itemArray = item.split(':');
    return `<p><span style="font-weight: bold">${itemArray[0]}</span>: ${itemArray[1]}</p>`
};
{/* <img class="img-fluid w-100" src=${card.logo} alt=""></img> */}

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
        `<div class="grid-item ${regionCategory}">
        <div class="portfolio-item">
            <div class="img-fluid w-100">
            <img src="${card.logo}" class="card-logo" alt="company logo" />
            </div>
            <h3>${card.name}</h3>
            <h4>${card.location}, ${card.region}</h4>
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

$(document).ready(() => {
    parseCompanies(companies);
    $('.popup-gallery').append(generateCompanyCard(companies[0]));

    $navRegionBtn.on('click', function () {
        currentRegion = $(this).attr('id');
        parseCompanies(companies);
        $navRegionBtn.removeClass('shadow');
        $(this).addClass('shadow');
    })
});
