import { companies, states } from './companies.js';

const $cardContainer = $('.card-container');
const $companyCard = $('.company-card');
const $sortRegionBtn = $('.sort-region-btn');

let currentRegion = 'all';

const generateCardLinks = links => {
    let renderedLinks = '';
    links.forEach( link => {
        const linkKey = Object.keys(link)[0];
        renderedLinks += `<a href="${link[linkKey]}">${linkKey}</a>`
    });
    return renderedLinks;
};

const generateCompanyCard = card => {
    const linkElements = generateCardLinks(card.links);
    const cardDiv = `<div class="company-card row">
                    <div class="col-sm-8">
                       <h3 class="card-title">${card.name}</h3>
                        <h5 class="card-subtitle">${card.location}</h5>
                        <p class="card-text">Impact type: ${card.impactType}</p>
                        <p class="card-text">Description: ${card.desc}</p>
                        <a href="${card.links}">Campaign Link</a>
                        ${linkElements}
                    </div>
                    <div class="col-sm-4">
                        <img class="company-logo" src="${card.logo}" alt="card image for ${card.name}"/>
                    </div>
            </div>`;
    if (card.region === currentRegion || currentRegion === 'all') {
        return cardDiv;
    } else if (currentRegion === 'US' && states.includes(card.region)) {
        return cardDiv;
    }
};

const parseCompanies = companies => {
    $cardContainer.empty();
    companies.forEach( company => {
        $cardContainer.append(generateCompanyCard(company));
    });
};

$(document).ready(() => {
    parseCompanies(companies);

    $sortRegionBtn.on('click', function() {
        currentRegion = $(this).attr('id');
        parseCompanies(companies);
    })
});
